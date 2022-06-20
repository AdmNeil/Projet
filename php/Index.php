<?php

ini_set('display_errors', 1); // a masqué
// header("Access-Control-Allow-Origin: *");

class Index {
	private $uri;
    private $route;

	public function __construct() {
        include('./Path.php');
		$this->route = new Path;
	}

    public function Init() {
        $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->uri = preg_split('/\//', $this->uri);
        $this->uri = end($this->uri);
        
        if(empty($this->uri)) {
            $this->uri = '/';
        }
        
        return $this->route->InitPath($this->uri);
    }

}
	
$index = new Index;
$index->Init();
?>