<?php
	
	class Actu {
		
		public function actualiter() {
			
			$url = 'https://www.minecraft.net/content/minecraft-net/_jcr_content.articles.grid?tileselection=auto&offset=0&pageSize=6&locale=fr-fr&lang=/content/minecraft-net/language-masters/fr-fr';
			
			$ch = curl_init($url);

			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_USERAGENT, 'muryo.ovh');

			$retour = curl_exec($ch);

			curl_close($ch);

			return $retour;
		}
		
	}
	
	$fonction = new Actu();

	if(isset($_POST['actu'])) {
		echo $fonction->actualiter();
	}
?>