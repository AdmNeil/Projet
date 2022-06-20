<?php

ini_set('display_errors', 1); // a masqué

include('./Route.php');

class Index {

	private $route;

	public function __construct() {
		$this->route = new Route;
	}
	
	public function Init() {
		$parse = pathinfo($_SERVER['REQUEST_URI']);
		$uri = $parse['filename'];

		if($parse["dirname"] == "/git") { // a mettre / par défaut
			$uri = "/";
		}

		$this->route->HTMLGetContainer($uri);
	}
}

$index = new Index;
$index->Init();
?>