<?php

include('php/Serveur_Autoload.php');

use DevCoder\DotEnv;

class Route {
	private $site;
	private $ajout;

	public function __construct() {
		(new DotEnv(__DIR__ . '/.env'))->load();
	}

	public function isRealPath($site, $ajout, $complement = NULL) {
		if($complement != NULL) {
			$func = $this->ajout->{$ajout}($complement);
		} else {
			$func = $this->ajout->{$ajout}();
		}

		if(property_exists($func, 'Location')) {
			$this->GeneratePath($func->Location);
			
			return $func->Location;
		} else if($ajout == 'logout') {
			if(!$func->bool) {
				$this->site->buffer = '<div class="infoLog-0"><h4 class="infoLog-1">'. $func->erreur .'</h4></div>';
				
				return false;
			}
		} else {
			$this->site->{$site} = $func;
		}
	}

	public function GeneratePath($uri = '') {
		$redirect = NULL;

		switch ($uri) {
			case 'Logout': //prio
				$retour = $this->isRealPath('buffer','logout');

				if(!$retour) break;
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
			default:
				$redirect = $this->isRealPath('buffer','r404');
				break;
		}

		return $redirect;
	}

	public function HTMLGetContainer($route) {
		$this->site = new Structure;
		$this->ajout = new Fonction(NULL);
		$this->site->title = $this->ajout->title();
		$this->site->preload = $this->ajout->preload();
		$this->site->nav = $this->ajout->nav();
		$this->site->footer = $this->ajout->footer();

		$realPath = $this->GeneratePath($route);
		
		if($realPath == NULL || ($route == "Connexion" && $route != $realPath)) {
			if($route == "Logout" || $route == "SuccessLogin" || ($route == "Connexion" && $realPath == "Index")) {
				header("Location: ./");
			} else {
				$realPath = $route;
			}
		}

		$this->site->affiche();
	}

	public function WssGetContainer($info) {
		$this->site = new Structure;
		$this->ajout = new Fonction((string) $info->ip);
		$realPath = $this->GeneratePath($info->path);
		$i = 0;

		if($realPath == NULL) {
			if($info->path == 'Logout' || $info->path == 'SuccessLogin') {
				$realPath = "/";
				$i = 1;
			} else {
				$realPath = $info->path;
			}
		}

		return $this->site->simplePath($i, $realPath);
	}
}

?>