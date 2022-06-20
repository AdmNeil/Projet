<?php

	class Connexion {

		private $vpdo;
		private $db;
		private $sp;

		function __construct() {
			$this->vpdo = new BDD;
			$this->db = $this->vpdo->connexion;
		}

		public function connect(string $decode) {
			$data = json_decode($decode);
			$user_pseudo = $data->ps;
			$user_password = $data->pw;

			try {
				$result = $this->vpdo->donneeCompteConnexion();
				$result->bindParam("1", $user_pseudo, PDO::PARAM_STR);
				if($result->execute()) {
					$donnees = $result->fetch();
					
					if(password_verify($user_password, $donnees['Psw']) && $donnees['ConfirmMail'] == '1') {
						$date = new DateTime('NOW');
						$obj = (object)[];
						$obj->date = $date->format('Y-m-d');
						$obj->hour = $date->format('H:i');
						$obj->ipClient = $data->ip;
						$obj->portClient = $data->port;
						$cvrt = (string) json_encode($obj);

						$result = $this->vpdo->donneeCompteSessionActive();
						$result->bindParam("1", $cvrt, PDO::PARAM_STR);
						$result->bindParam("2", $user_pseudo, PDO::PARAM_STR);

						if($result->execute()) {
							$retour = array("bool" => "1", "ip" => $data->ip);
						} else {
							$retour = array("bool" => "0", "erreur" => "Une erreur est survenue lors de la requête de connexion.");
						}
					} else {
						$retour = array("bool" => "0", "erreur" => "Mauvais mot de passe");
					}
				} else {
					$retour = "La requête n'a pas pu s'exécuter";
				}
			} catch(PDOException $e) {
				$retour = $e->getMessage();
			}

			return $retour;
		}
	}
?>