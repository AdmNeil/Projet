<?php

ini_set('display_errors', 1); // a masqué

include('./../Route.php');

class webSocket {

	private $route;
	private $connex;
	private $ssl;
	private $ssl_context;
	private $socket;
	private $connections = array();
	public $except = NULL;
	
	public function __construct() {
		$this->route = new Route;
		$this->ssl = ['ssl' => [
			'local_cert' => '/etc/letsencrypt/live/'. $_ENV['WS_HOST'] .'/cert.pem',
			'local_pk' => '/etc/letsencrypt/live/'. $_ENV['WS_HOST'] .'/privkey.pem',
			'disable_compression' => true,
			'verify_peer' => false,
			'ssltransport' => $_ENV['WS_TLS'],
	 		'verify_peer_name' => false,
	 		'allow_self_signed' => true,
	 		'verify_depth' => 0
        ]];
	}

	public function InitConnexion() {
		$this->ssl_context = stream_context_create($this->ssl);
		$this->socket = stream_socket_server($_ENV['WS_TLS'].'://'.$_ENV['WS_HOST'].':'.$_ENV['WS_PORT'], $errno, $errstr, STREAM_SERVER_BIND|STREAM_SERVER_LISTEN, $this->ssl_context);

		if(!$this->socket) {
			die("$errstr ($errno)");
		}

		if(is_resource($this->socket)) {
			while(true) {
				$read = array($this->socket);
				$write = array();

				if(stream_select($read, $write, $except, 0, 50000)) {
					foreach($read as $client) {
						$ip = stream_socket_get_name($client, true);
						$buffer = stream_get_contents($client);

						if($clientU = @stream_socket_accept($this->socket, 2, $ip)) {// met une erreur 1 ou fail Success
							$this->newClient($clientU, $ip);
						}
					}
				} else {
					foreach($this->connections as $client) {
						$ip = stream_socket_get_name($client, true);
						
						if(strlen($ip) === 0) {
							fclose($client);
							break;
						}

						$buffer = stream_get_contents($client);

						$this->currentClient($client, $buffer, $ip);
						$this->oldClient($client, $buffer, $ip);
					}
				}
			}

			fclose($this->socket);
		}
		
	}

	public function send($client, $data) {
		fwrite($client, $this->encode(json_encode($data)));
	}

	public function broadcast($data) {
		foreach($this->connections as $client) {
			$this->send($client, array('type' => 'broadcast', 'info' => $data));
		}
	}

	private function newClient($client, $ip) {
		$this->SwitchProtocol($client);
		$this->connections[$ip] = $client; //(object) array('client' => $client, 'user' => 'guest'); default $client;
		//echo $ip.' connected'.PHP_EOL;
		$this->send($client, array("ip" => (string) "$ip", "statut" => (string) "1"));
	}

	private function currentClient($client, string $buffer, string $ip) {
		$decode = $this->decode($buffer);

	    if($decode != "") {
	    	$val = json_decode($decode);
			list($ip, $port) = explode(":", $ip);

			if(empty($val->emit) == 0) {
				switch ($val->emit) {
					case 'ping':
						$this->send($client, array("pong" => true));
						break;
					case 'route':
						$rr = $this->route->WssGetContainer((object) array("path" => $val->path, "ip" => $ip));
						$this->send($client, array("newPath" => $rr));
						break;
					case 'Connexion':
						$this->connex = new Connexion;
						$val->object->ip = $ip;
						$val->object->port = $port;
						$returnData = $this->connex->connect(json_encode($val->object));
						
						if($returnData["bool"] == "1") {
							$val->emit = "SuccessLogin";
						}

						$rr = $this->route->WssGetContainer((object) array("path" => $val->emit, "ip" => $returnData["ip"]));
						$returnData["ip"] = "null";
						$this->send($client, array("returnData" => (string) json_encode($returnData), "newPathI" => $rr));
						break;
					default:
						echo 'default: '.$val->emit.PHP_EOL;
						break;
				}
			}
		}
	}

	private function oldClient($client, $buffer, $ip) {
		if(feof($client)) { //$buffer == false ||
			echo 'Connection closed '.$ip.PHP_EOL;
			fclose($client);
			unset($this->connections[(string) $ip], $this->socket[(string) $ip]);
		}
	}

	private function encode($text) {
		$b1 = 0x80 | (0x1 & 0x0f);
		$length = strlen($text);

		if($length <= 125)
			$header = pack('CC', $b1, $length);
		elseif($length > 125 && $length < 65536)
			$header = pack('CCn', $b1, 126, $length);
		elseif($length >= 65536)
			$header = pack('CCNN', $b1, 127, $length);
		return $header.$text;
	}

	private function decode($text) {
		$length = @ord($text[1]) & 127;

	    if($length == 126) {
	    	$masks = substr($text, 4, 4);
	    	$data = substr($text, 8);
	    } elseif($length == 127) {
	    	$masks = substr($text, 10, 4);
	    	$data = substr($text, 14);
	    } else {
	    	$masks = substr($text, 2, 4);
	    	$data = substr($text, 6);
	    }

	    $text = "";

	    for($i = 0; $i < strlen($data); ++$i) {
	    	$text .= $data[$i] ^ $masks[$i % 4];
	    }

	    return $text;
	}

	private function SwitchProtocol($client) {
		stream_set_blocking($client, true);
		$rcvd = fread($client, 1500);
		$headers = array();
		$lines = preg_split("/\r\n/", $rcvd);

		foreach($lines as $line) {
			$line = rtrim($line);
			if(preg_match('/\A(\S+): (.*)\z/', $line, $matches)){
				$headers[$matches[1]] = $matches[2];
			}
		}

		if(@$headers['Sec-WebSocket-Key'] != NULL) {
			$secKey = $headers['Sec-WebSocket-Key'];
			$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
			$upgrade = [];
			$upgrade[] = "HTTP/1.1 101 Switching Protocols";
			$upgrade[] = "Upgrade: websocket";
			$upgrade[] = "Connection: Upgrade";
			$upgrade[] = "WebSocket-Origin: ".$_ENV['WS_HOST'];
			$upgrade[] = "WebSocket-Location: wss://".$_ENV['WS_HOST'].":".$_ENV['WS_PORT'];
			$upgrade[] = "Sec-WebSocket-Version: 13";
			$upgrade[] = "Sec-WebSocket-Accept:$secAccept";
			fwrite($client, implode("\r\n", $upgrade)."\r\n\r\n");
		}
		stream_set_blocking($client, false);
	}

}

$serveur = new webSocket();
$serveur->InitConnexion();

?>