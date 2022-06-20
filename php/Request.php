<?php

class Request {
	private $retour;

    public function __construct() {
        include_once(__DIR__ .'/Path.php');
		$this->route = new Path;
	}

    public function getPath(string $val = 'null', int $i = 0) {
        if($val === 'null' && !empty($_POST['Uri'])) {
            $val = $_POST['Uri'];
        }
        
        if(!empty($_POST['Uri']) && $_POST['Uri'] === 'Logout') {
            $i = 1;
        }

        if($val !== 'null') {
            return json_encode($this->route->CustPath($val, $i));
        } else {
            return json_encode('none');
        }
    }

}

$fonction = new Request;

if(isset($_POST['Uri'])) {
    echo $fonction->getPath();
}

?>