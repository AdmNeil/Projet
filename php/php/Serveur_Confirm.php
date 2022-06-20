<?php

	include_once('Serveur_Autoload.php');
	
	class Confirm {

		private $vpdo;
		private $db;
		public $stockIp;
		
		function __construct() {
			(new DotEnv(__DIR__ . '/../.env'))->load();
			$this->stockIp = new IdProto();
			$this->vpdo = new BDD;
			$this->db = $this->vpdo->connexion;
		}
		
		function data() {
			if($_POST) {
				$obj = json_decode($_POST['obj']);
				$user_pseudo = $obj->ps;
				$user_password = $obj->pw;

				try {
					$result = $this->vpdo->donneeComptePassword();
					$result->bindParam("1", $user_pseudo, PDO::PARAM_STR);
					
					if($result->execute()) {
						$donnees = $result->fetch();
						$checkMail = !empty($donnees['ConfirmMail']) ? $donnees['ConfirmMail'] : NULL ;
                        $checkPsw = !empty($donnees['Psw']) ? $donnees['Psw'] : NULL ;

						if(password_verify($user_password, $checkPsw) && $checkMail === '0') {
							$S_IP = $this->stockIp->getUserIP();
							$result = $this->vpdo->donneeCompteConfirm($S_IP);
							$result->bindParam("1", $user_pseudo, PDO::PARAM_STR);

							if($result->execute()) {
								$retour = array("bool" => "1");
							} else {
								$retour = array("bool" => "0", "erreur" => "Erreur de traitement SQL");
							}
						} else {
						    $retour = array("bool" => "0", "erreur" => "Mauvais mot de passe");
						}
					}
				} catch(PDOException $e) {
					$retour = array("bool" => "0", "erreur" => $e->getMessage());
				}
			}
		
			return json_encode($retour);
		}
	}
	
	$fonction = new Confirm();
	
	if(isset($_POST['func'])) {
		echo $fonction->data();
	}
?>