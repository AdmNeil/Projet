<?php
	
	class Fonction {
		
		private $vpdo;
		private $db;
		public $stockIp;
		public $resultCallUser;
		
		public function __construct($getIp) {
			$this->vpdo = new BDD;
			$this->db = $this->vpdo->connexion;
			
			if(gettype($getIp) != "NULL") {
				$this->stockIp = $getIp;
			} else if(gettype($getIp) == "NULL") {
				$this->stockIp = $_SERVER["REMOTE_ADDR"];
			}

			$this->callUser();
		}

		private function callUser() {
			$result = $this->vpdo->donneeCompteSessionActiveGetUser();
			$callVal = '%"ipClient":"'.$this->stockIp.'"%';
			$result->bindParam("1", $callVal, PDO::PARAM_STR);
			
			if($result->execute() && $result->rowCount() == 1) {
				$donnees = $result->fetch();
				$this->resultCallUser = (object) array("return" => true, "value" => $donnees);
			} else {
				$this->stockIp = NULL;
				$this->resultCallUser = (object) array("return" => false, "value" => NULL);
			}
		}

		public function logout() {
			$donnees = $this->resultCallUser;
			
			if($donnees->return) {
				$result = $this->vpdo->donneeCompteSessionLogout();
				$result->bindParam("1", $donnees->value['Ps'], PDO::PARAM_STR);
				$callVal = '%"ipClient":"'.$this->stockIp.'"%';
				$result->bindParam("2", $callVal, PDO::PARAM_STR);

				if($result->execute()) {
					$this->stockIp = NULL;
					$this->callUser();
					
					return (object) array('Location' => "Index");
				} else {
					return (object) array("bool" => "0", "erreur" => "Une erreur est survenue lors l'éxécution de la déconnexion");
				}
			} else {
				return (object) array("bool" => "0", "erreur" => "Une erreur est survenue lors de l'étape de la déconnexion");
			}	
		}

		public function title() {
			$retour = 'NEKO-WORLD';
			
			return $retour;
		}

		public function preload() {
			$retour = '<div class="preload-0">
				<div class="preload-1">
					<img class="preload-2" decoding="sync" loading="eager" importance="high" height="64px" width="64px" src="img/icon.ico" />
					<h3 class="preload-3">'. $this->title() .'</h3>
				</div>
			</div>';
			
			return $retour;
		}

		public function nav() {
			$retour = '<div class="nav-1">
					<img class="nav-2" decoding="async" loading="lazy" height="64px" width="64px" src="img/icon.ico" />
					<a class="nav-3" path="/">'. $this->title() .'</a>
				</div>
				<div class="nav-4">';
					$donnees = $this->resultCallUser;
					
					if($donnees->return) {
						$retour .= '<a class="nav-10" path="Logout" title="Déconnexion">'. $donnees->value['Ps'] .'</a>';
					}

					$retour .= '<span class="nav-5_0"></span>
					<div class="nav-6_0">
						<a class="nav-7" href="https://discord.gg/A5Q8JrAC" target="_blank">
							<img class="nav-8" src="./img/discord.svg" />
							<span class="nav-9">Discord</span>
						</a>';

						if(!$donnees->return) {
							$retour .= '<a class="nav-7" path="Connexion">
								<img class="nav-8" src="./img/user.svg" />
								<span class="nav-9">Connexion</span>
							</a>';
						}

						if($donnees->return) {
							$retour .= '<a class="nav-7" path="Skin">
								<img class="nav-8" src="./img/skin.svg" />
								<span class="nav-9">Skin</span>
							</a>
							<a class="nav-7" path="Launcher">
								<img class="nav-8" src="./img/launcher.svg" />
								<span class="nav-9">Launcher</span>
							</a>';
						}

						$retour .= '<a class="nav-7" path="Support">
							<img class="nav-8" src="./img/support.svg" />
							<span class="nav-9">Support</span>
						</a>
					</div>
				</div>';
			
			return $retour;
		}

		public function header() {
			$retour = '<div class="header-0">
				<img decoding="async" width="100%" src="./img/header.webp" />
				<figcaption class="index-13">ADRESSE: <b class="index-14">'. strtolower('play.'. $this->title() .'.fr.nf').'</b>
				<span class="index-15">Copier l\'adresse !</span></figcaption>
			</div>';
			
			return $retour;
		}

		public function index() {
			$result = $this->vpdo->infoIndex();

			if($result->execute()) {
				$donnees = $result->fetch();

				$retour = '<div class="index-0">
					<div class="index-6">
						<hr class="index-7">
							<h3 class="index-8">Information</h3>
						<hr class="index-7">
					</div>';
					$article = explode(";", $donnees['Article']);

					if(count($article)-1 !== 0 ) {
						for($i=0; $i<=count($article)-1; ++$i) {
							list($titre, $img, $lien) = explode("$", $article[$i]);

							$cont = '<div class="index-1">
									<img class="index-2" decoding="async" loading="lazy" importance="high" width="400px" height="225px" src="./img/article/'.$img.'" />
									<div class="index-3">
										<p class="index-4">'.$titre.'</p>
										<a class="index-5" path="'.$lien.'" target="_blank"><< Y Aller</a>
									</div>
								</div>';

							$retour .= $cont;
						};
					}
					
				$retour .= '<div class="index-6">
						<hr class="index-7">
							<h3 class="index-8">Actualités</h3>
						<hr class="index-7">
					</div>
					<div class="index-9"></div>
					<div class="index-6">
						<hr class="index-7">
							<h3 class="index-8">Partenariat</h3>
						<hr class="index-7">
					</div>
					<div class="index-10">';

					$rtn = json_decode($donnees['Partenariat']);

					foreach ($rtn as $key => $val) {
				   		$retour .= '<a class="index-11" href="'.$val->url.'" target="_blank" title="'. $val->title .'"><img class="index-12" decoding="async" loading="lazy" importance="high" src="'.$val->img.'" /></a>'; 
					}

					$retour .= '</div>
				</div>';

				return $retour;

			} else {
				$retour = 'Erreur lors de la récupération de la requête.';

				return $retour;
			}
		}

		public function launcher() {
			$retour = '<div class="launcher-0">
				<h2 class="launcher-1">Choisissez votre plateforme</h2>
			</div>
			<div class="launcher-2">
				<a class="launcher-3" href="./upload/Neko-World%20Launcher.exe" download>
					<img class="launcher-4" decoding="async" loading="eager" importance="high" src="./img/windows.svg">
					PC (.exe)</a>
				</a>
				<a class="launcher-3" href="./upload/Neko-World%20Launcher.jar" download>
					<img class="launcher-4" decoding="async" loading="eager" importance="high" src="./img/linux.svg">
					LINUX (.jar)</a>
				</a>
				<a class="launcher-3" href="./upload/Neko-World%20Launcher.jar" download>
					<img class="launcher-4" decoding="async" loading="eager" importance="high" src="./img/apple.svg">
					MAC (.jar)</a>
				</a>
			</div>';

			return $retour;
		}

		private function date($convert) {
			$years = ($convert / 365);
			$years = floor($years);

			$month = ($convert % 365) / 30.5;
			$month = floor($month);

			$days = ($convert % 365) % 30.5;

			if($years != 0) {
				$date = 'Il y a '.$years.' An';
			} elseif($month != 0) {
				$date = 'Il y a '.$month.' Mois';
			} elseif($days != 0) {
				$date = 'Il y a '.$days.' Jours';
			} elseif($days == 0) {
				$date = "Aujourd'hui";
			} else {
				$date = "non défini";
			}

			return $date;
		}
		
		public function support() {
			$retour = '<div class="support-0">
				<input class="support-1" type="text" placeholder="Recherche ..." />
				<div class="support-2">';

				$result = $this->vpdo->getCateSupport();

				if($result->execute()) {
					while($donnees = $result->fetch()) {
						$retour .= '<label class="support-3" for="support_'. $donnees['cat_name'] .'">
							<input id="support_'. $donnees['cat_name'] .'" class="support-4" type="checkbox" value="'. $donnees['cat_id'] .'" />
							<span class="support-5">'. $donnees['cat_name'] .'</span>
						</label>';
					}
				} else {
					$retour = 'Erreur lors de la récupération de la requête.';
				}

			$retour .= '</div>
			<div class="support-6">';

			$result = $this->vpdo->getSubCateSupport();
				
			if($result->execute()) {
				while($donnees = $result->fetch()) {
					$retour .= '<div class="support-7">
						<a class="support-8" path="TP-'. $donnees['sub_id'] .'" >'. $donnees['sub_subject'] .'</a>
						<span class="support-11">'. $donnees['cat_name'] .'</span>
						<h4 class="support-9">Par '. $donnees['Ps'] .', '. $this->date($donnees['date']) .'</h4>
						<p class="support-10">'. $donnees['sub_description'] .'</p>
					</div>';
				}
			} else {
				$retour .= 'Erreur lors de la récupération de la requête.';
			}

			$retour .= '</div></div>';

			return $retour;
		}

		public function sujet($val) {
			$recup = $this->resultCallUser;
	
			$retour = '<div class="sujet-0">';

			$result = $this->vpdo->getSubCateSujetSupport();
			$replace = str_replace("TP-", "", $val);
			$result->bindParam("1", $replace, PDO::PARAM_STR);
				
			if($result->execute()) {
				$donnees = $result->fetch();

				if(gettype($donnees) == 'array') {
					$retour = $retour.'<div class="sujet-1">
						<h2 class="sujet-2">'. $donnees['sub_subject'] .'</h2>
						<h4 class="sujet-3">Par '. $donnees['Ps'] .', '. $this->date($donnees['date']) .'</h4>
						<p class="sujet-4">'. $donnees['sub_description'] .'</p>
						<span class="sujet-5">'. $donnees['cat_name'] .'</span>
					</div>
					<div class="sujet-6">';

					$result = $this->vpdo->getSubCateSujetSupportComment();
					$result->bindParam("1", $replace, PDO::PARAM_STR);

					if($result->execute()) {
						while($donnees = $result->fetch()) {
							if($donnees['block'] != "1") {
								$retour .= '<div class="sujet-10">
									<h4 class="sujet-11">Par '. $donnees['user'] .', '. $this->date($donnees['date']) .'</h4>
									<p class="sujet-12">'. $donnees['comment'] .'</p>
								</div>';
							}
						}
					}

					if($recup->return) {
						$retour .= '<div class="sujet-13">
							<textarea class="sujet-7" placeholder="Votre commentaire"></textarea>
							<button class="sujet-8">Envoyer</button>
						</div>';
					} else {
						$retour .= '<div class="sujet-9">Connectez-vous afin de pouvoir répondre.</div>';
					}

					$retour .= '</div>';
				} else {
					// header("Location:Support");
					return (object) array('Location' => "Support");
				}
				
			} else {
				$retour .= 'Erreur lors de la récupération de la requête.';
			}

			$retour .= '</div>';

			return $retour;
		}

		public function compte() {
			$donnees = $this->resultCallUser;

			if($donnees->return) {
				// header("Location:Index");
				return (object) array('Location' => "Index");
			}

			$retour = '<div class="compte-0">
				<div class="compte-1">
					<h2 class="compte-2_0">Connexion</h2>
					<h2 class="compte-2_1">Inscription</h2>
				</div>'.
				$this->connexion().
				$this->inscription().
				$this->passwordOublier().
			'</div>';

			return $retour;
		}

		private function connexion() {
			$retour = '<div class="compte-3_0">
				<div class="compte-4">
					<h4 class="compte-6">Pseudo</h4>
					<input class="compte-7" type="text" spellcheck="false" autocomplete="username" required />
				</div>
				<div class="compte-4">
					<h4 class="compte-6">Mot de passe</h4>
					<input class="compte-8" type="password" spellcheck="false" autocomplete="current-password" required />
				</div>
				<div class="compte-5">
					<span class="compte-2_2">Mot de passe oublié ?</span>
					<span class="compte-10">Connexion</span>
				</div>
			</div>';

			return $retour;
		}

		private function inscription() {
			$retour = '<div class="compte-3_1">
				<div class="compte-4">
					<h4 class="compte-6">Pseudo Minecraft</h4>
					<input class="compte-11" type="text" spellcheck="false" autocomplete="username" required />
				</div>
				<div class="compte-4">
					<h4 class="compte-6">Adresse e-mail</h4>
					<input class="compte-12" type="email" spellcheck="false" autocomplete="email" minlength="15" maxlength="40" required />
				</div>
				<div class="compte-4">
					<div class="compte-15">
						<h4 class="compte-6">Mot de Passe</h4>
						<span class="compte-16">!</span>
						<p class="compte-13">Le Mot de passe doit contenir au moins 8 Caractères, 1 Majuscule, 1 Chiffre, 1 Minuscule & 1 Caractère Spécial.</p>
					</div>
					<input class="compte-14" type="password" spellcheck="false" minlength="8" pattern="^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$" autocomplete="new-password" required />
				</div>
				<div class="compte-4">
					<h4 class="compte-6">Confirmé</h4>
					<input class="compte-17" type="password" spellcheck="false" pattern="^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$" autocomplete="new-password" required />
				</div>
				<div class="compte-18">
					<span class="compte-19">S\'inscrire</span>
				</div>
			</div>';

			return $retour;
		}

		private function passwordOublier() {
			$retour = '<div class="compte-3_2">
				<h2 class="compte-6">Mot de passe oublié</h2>
				<div class="compte-4">
					<h4 class="compte-6">Pseudo Minecraft</h4>
					<input class="compte-20" type="text" spellcheck="false" autocomplete="username" required />
				</div>
				<div class="compte-4">
					<h4 class="compte-6">Adresse e-mail</h4>
					<input class="compte-21" type="email" spellcheck="false" autocomplete="email" minlength="15" maxlength="40" required />
				</div>
				<div class="compte-18">
					<span class="compte-9">Envoyé</span>
				</div>
			</div>';

			return $retour;
		}

		public function skin() {
			return include(__DIR__.'/../resources/server/skinCore.php');
		}
		
		public function footer() {
			$retour = '<footer>
					<h3>©️ 2018-'. date('Y') .' | '. $this->title() .' Serveur Minecraft non affilié à Mojang/Microsoft</h3>
				</footer>';

			return $retour;
		}

		public function r404() {
			$retour = '<div class="r404-0">
					<h2 class="r404-1">404 Page non trouvé!</h2>
				</div>';
			
			return $retour;
		}
	}
?>