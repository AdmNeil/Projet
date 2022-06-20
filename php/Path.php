<?php

include_once('php/Serveur_Autoload.php');

class Path {
	private $site;
	private $ajout;

	public function InitPath($path = '') {
		$this->site = new Structure;
		$this->ajout = new Fonction;
		$this->site->title = $this->ajout->title();
		$this->site->preload = $this->ajout->preload();
		$this->site->nav = $this->ajout->nav();
		$this->site->footer = $this->ajout->footer();

		$realPath = $this->GeneratePath($path);

		$this->site->affiche();
	}

	public function CustPath($path = '', $i = 0) {
		$this->site = new Structure;
		$this->ajout = new Fonction;
		$this->GeneratePath($path);

		return $this->site->simplePath($i, $path);
	}

	public function isRealPath($site = null, string $ajout, $complement = NULL) {
		if($complement != NULL) {
			$func = $this->ajout->{$ajout}($complement);
		} else {
			$func = $this->ajout->{$ajout}();
		}

		if(property_exists($func, 'Location')) {
			return $this->GeneratePath($func->Location);
		} else if($ajout == 'logout') {
			if(!$func->bool) {
				$this->site->buffer = '<div class="infoLog-0"><h4 class="infoLog-1">'. $func->erreur .'</h4></div>';
				
				return false;
			}
		} else {
			$this->site->{$site} = $func;
		}
	}

	public function GeneratePath($uri) {
		$redirect = NULL;
		switch ($uri) {
			case 'Logout':
				$retour = $this->isRealPath(null, 'logout');
				$this->GeneratePath($retour);

				break;
			case 'SuccessLogin':
				$redirect = $this->isRealPath('nav','nav');
			case 'Index':
			case '/';
				$redirect = $this->isRealPath('buffer','header');
		 		$redirect = $this->isRealPath('buffer','index');
				break;
			case 'Support':
				$redirect = $this->isRealPath('buffer','support');
				break;
			case 'Connexion':
				$redirect = $this->isRealPath('buffer','compte');
				break;
			case 'Skin':
				$redirect = $this->isRealPath('buffer','skin');
				break;
			case 'Launcher':
				$redirect = $this->isRealPath('buffer','launcher');
				break;
			case (preg_match('/TP-([0-9]){1,5}/', $uri) == true):
				$redirect = $this->isRealPath('buffer','sujet', $uri);
				break;
			case (preg_match('/([0-9a-fA-F]){8}-([0-9a-f]){4}-([0-9a-f]){4}-([0-9a-f]){4}-([0-9a-f]){12}/', $uri) == true):
				$redirect = $this->isRealPath('buffer','verif');
				break;
			case 'Verif':
				header("Location:Index");
				break;
			default:
				$redirect = $this->isRealPath('buffer','r404');
				break;
		}

		return $redirect;
	}
}

?>