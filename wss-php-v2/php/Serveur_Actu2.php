<?php
	
	class Actu {
		
		public function actualiter() {
			$url = 'https://www.minecraft.net/content/minecraft-net/_jcr_content.articles.grid?tileselection=auto&offset=0&pageSize=6&locale=fr-fr&lang=/content/minecraft-net/language-masters/fr-fr';
			
			// function get_http_response_code($url) {
			// 	$headers = get_headers($url);
			// 	return substr($headers[0], 9, 3);
			// }

			// function confirmStatut($url) {
			// 	$url_confirm = get_http_response_code($url);
				
			// 	if($url_confirm == 200) {
			// 		return true;
			// 	} else if($url_confirm == 404) {
			// 		echo 'Problème d\'accès vers le serveur "minecraft.net" !';
			// 	} else {
			// 		echo 'erreur interne !';
			// 	}
			// }

			// $rss = confirmStatut($url);

			// $curl_handle=curl_init();
			// curl_setopt($curl_handle, CURLOPT_URL, $url);
			// curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
			// curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
			// curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Neko-Wold');
			// $query = curl_exec($curl_handle);
			// curl_close($curl_handle);

			// echo $query;

			$opts = array(
				'http'=>array(
					'method'=>"GET",
					'header'=>	"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\n".
								"Accept-language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3\r\n"
								
				)
			);

			$context = stream_context_create($opts);

			// if(file_get_contents($url, false, $context)) {
				// $retour = file_get_contents($url, false, $context);
				$retour = fopen($url, 'r', false, $context);
			// } else {
			// 	$retour = 'flux rss vide';
			// }
			
			return $retour;
		}
		
	}
	
	$fonction = new Actu();

	if(isset($_POST['actu'])) {
		echo $fonction->actualiter();
	}

?>