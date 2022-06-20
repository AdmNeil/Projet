<?php
    
    include_once('Serveur_Autoload.php');
	
	class CreaCompte {

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
		
		function __get($propriete) {
			switch($propriete) {
				case 'vpdo' : {
						return $this->vpdo;
						break;
					}
					
				case 'db' : {
						return $this->db;
						break;
					}
			}
		}
		
		function data() {

			if($_POST) {
				$obj = json_decode($_POST['obj']);
				$user_pseudo = $obj->ps;
				$user_mail = $obj->ml;
				$user_password = $obj->pw;

				try {
					$result = $this->vpdo->donneeCompteVerif($user_pseudo);
					$donnees = $result->fetch();
					$count = $result->rowCount();

					if((int) $count === (int) 0) {
						$result = $this->vpdo->donneeCompteVerifMail($user_mail);
						$donnees = $result->fetch();
						$count = $result->rowCount();
                        $checkMail = !empty($donnees['Mail']) ? $donnees['Mail'] : NULL ;

                        if((int) $count === (int) 0 && (string) strtolower($checkMail) !== (string) strtolower($user_mail)) {
							if(preg_match("/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/", $user_password)) {
								$pass = password_hash($user_password, PASSWORD_ARGON2I);
								
								if(password_verify($user_password, $pass)) {
                                    $ip = $this->stockIp->getUserIP();
									$result = $this->vpdo->donneeCompteInsert();
									$result->bindParam("1", $user_pseudo, PDO::PARAM_STR);
									$result->bindParam("2", $user_mail, PDO::PARAM_STR);
									$result->bindParam("3", $pass, PDO::PARAM_STR);
									$result->bindParam("4", $ip, PDO::PARAM_STR);

									if($result->execute()) {
										$result = $this->vpdo->donneeCompteGenerateUUID();
										$result->bindValue('1', $user_pseudo, PDO::PARAM_STR);

										if($result->execute()) {
											$donnees = $result->fetch();
											
											ini_set( 'display_errors', 1 );
		 
		  									error_reporting( E_ALL );

											$to = $user_mail;
											$subject = "Inscription ". $_ENV['NAME_SITE'];
											$headers = "Mime-Version: 1.0"."\r\n";
											$headers .= "From : no-reply <". $_ENV['EMAIL_GENERAL'] .">" . "\r\n";
											$headers .= "Disposition-Notification-To:". $_ENV['EMAIL_GENERAL'];
											$headers .= "X-Priority : 3\n";
											$headers .= "Content-type: text/html; charset=utf-8"."\r\n";
											$headers .= "\r\n";
											$msg = '<div style="margin:0 auto;width:70%"><h1 style="font-family:Helvetica,Arial,sans-serif;font-size:24px;line-height:31px;color:#777777;padding:0;margin:28px 0 32px 0;font-weight:400;text-align:left;text-decoration:none">'.$user_pseudo.'</h1><p style="font-size:16px;line-height:20px;color:#333333;padding:0;margin:0 0 33px 0;text-align:left;font-family:Helvetica,Arial,sans-serif">Il ne vous reste plus qu’une étape pour activer votre compte. Cliquez sur le bouton ci-dessous pour confirmé votre adresse courriel :</p><a href="'. $_ENV['PATH_URL'].$donnees['UUID'] .'" style="font-size:16px;line-height:20px;color:#d90007;text-decoration:none;overflow:hidden;text-overflow:ellipsis;word-wrap:break-word;word-break:break-all" target="_blank" lang="fr">'. $_ENV['PATH_URL'].$donnees['UUID'] .'</a><div style="text-align:center;padding:25px 0 28px 0;"><p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#999999;padding:0;margin:4px 0 22px 0">'. $_ENV['NAME_SITE'] .'</p></div></div>';

											if(!mail($to, $subject, $msg, $headers)){
												$retour = array("bool" => "0", "erreur" => error_get_last()['message']);
											}else{
												$retour = array("bool" => "1", "info" => "Un mail vient d'être envoyé sur votre messagerie afin de finir votre inscription. (Le lien sera périmé dans 10 minutes), Vous pouvez fermé cette page.");
											}
										}
										else {
											$retour = array("bool" => "0", "erreur" => "UUID non récupéré");
										}
									} else {
										$retour = array("bool" => "0", "erreur" => "La requête n'a pas pu s'exécuter");
									}
								} else {
								    $retour = array("bool" => "0", "erreur" => "Le mot de passe n'est pas valide");
								}
							} else {
								$retour = array("bool" => "0", "erreur" => "Le mot de passe ne contient pas les arguments demandés");
							}
						} else {
							$retour = array("bool" => "0", "erreur" => "L'Email est déjà utilisé");
						}
					} else {
						$retour = array("bool" => "0", "erreur" => "Le Pseudo est déjà utilisé");
					}
				}
				catch(PDOException $e) {
					array("bool" => "0", "erreur" => $e->getMessage());
				}

                return json_encode($retour);
			}
		}
	}
	
	$fonction = new CreaCompte();
	
	if(isset($_POST['func'])) {
		echo $fonction->data();
	}
?>