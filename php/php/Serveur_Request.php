<?php
	
	include_once('Serveur_Autoload.php');

	class Requete {

		private $vpdo;
		private $db;
		
		public function __construct() {
			(new DotEnv(__DIR__ . '/../.env'))->load();
            require_once __DIR__ . '/../Request.php';
            $this->req = new Request;
			$this->vpdo = new BDD;
			$this->db = $this->vpdo->connexion;
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
		
		// public function getValInBDD() { // verif to protected or private

		// }

		public function supportSearch() {
			$jsonDecode = json_decode($_POST['schSuppC'])

			$count = count(json_decode($jsonDecode));
			$chk = NULL;

			if((int) $count >= (int) 1) {
				$chk = jsonDecode
			}

			// //avec cat
			// if((int) $count >= (int) 1) {
			// 	//avec string val
			// 	if() {

			// 	//sans string val
			// 	} else {

			// 	}
			// //sans cat
			// } else {
			// 	//avec string val
			// 	if() {

			// 	//sans string val
			// 	} else {

			// 	}
			// }




			$result = $this->vpdo->getSubCateSearchSupport(json_decode($_POST['schSuppV']), $chk);
			
			if($result->execute()) {
				$retour = (object) array("bool" => "1", "info" => '');

				while($donnees = $result->fetch()) {
					$retour->info = $retour->info.'<div class="support-7">
						<a class="support-8" path="TP-'. $donnees['sub_id'] .'" >'. $donnees['sub_subject'] .'</a>
						<span class="support-11">'. $donnees['cat_name'] .'</span>
						<h4 class="support-9">Par '. $donnees['Ps'] .', '. $this->date($donnees['date']) .'</h4>
						<p class="support-10">'. $donnees['sub_description'] .'</p>
					</div>';
				}
			} else {
				return (object) array("bool" => "0", "erreur" => 'Erreur lors de la récupération de la requête.');
			}

			return json_encode($retour);
		}
		
	}
	
	$fonction = new Requete();

	if(isset($_POST['schSuppV']) && is_string($_POST['schSuppV']) || isset($_POST['schSuppC']) && is_string($_POST['schSuppC'])) {
		echo $fonction->supportSearch();
	}

?>