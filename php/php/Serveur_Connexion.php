<?php
    
    include_once('Serveur_Autoload.php');
	
    class Connexion {

		private $vpdo;
		private $db;
        private $stockIp;
        
		function __construct() {
            (new DotEnv(__DIR__ . '/../.env'))->load();
            require_once __DIR__ . '/../Request.php';
            $this->stockIp = new IdProto;
            $this->req = new Request;
            $this->vpdo = new BDD;
			$this->db = $this->vpdo->connexion;
		}

		public function connect() {
            if($_POST) {
                $data = json_decode($_POST['obj']);
                $user_pseudo = $data->ps;
                $user_password = $data->pw;

                try {
                    $result = $this->vpdo->donneeCompteConnexion();
                    $result->bindParam("1", $user_pseudo, PDO::PARAM_STR);
                    if($result->execute()) {
                        $donnees = $result->fetch();
                        $checkMail = !empty($donnees['ConfirmMail']) ? $donnees['ConfirmMail'] : NULL ;
                        $checkPsw = !empty($donnees['Psw']) ? $donnees['Psw'] : NULL ;
                        
                        if(password_verify($user_password, $checkPsw) && $checkMail === '1') {
                            $date = new DateTime('NOW');
                            $obj = (object)[];
                            $obj->date = $date->format('Y-m-d');
                            $obj->hour = $date->format('H:i');
                            $obj->ipClient = $this->stockIp->getUserIP();
                            $cvrt = (string) json_encode($obj);

                            $result = $this->vpdo->donneeCompteSessionActive();
                            $result->bindParam("1", $cvrt, PDO::PARAM_STR);
                            $result->bindParam("2", $user_pseudo, PDO::PARAM_STR);

                            if($result->execute()) {
                                $retour = array("bool" => "1", "info" => $this->req->getPath('SuccessLogin', 1));
                            } else {
                                $retour = array("bool" => "0", "erreur" => "Une erreur est survenue lors de la requête de connexion.");
                            }
                        } else {
                            $retour = array("bool" => "0", "erreur" => "Mauvais mot de passe ou identifiant");
                        }
                    } else {
                        $retour = array("bool" => "0", "erreur" => "La requête n'a pas pu s'exécuter");
                    }
                } catch(PDOException $e) {
                    $retour = array("bool" => "0", "erreur" => $e->getMessage());
                }

                return json_encode($retour);
            }
		}
	}

    $fonction = new Connexion();
	
	if(isset($_POST['func'])) {
		echo $fonction->connect();
	}
?>