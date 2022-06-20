<?php
	function autoLoad($nom_classe) {
		require_once(__DIR__.'/Serveur_'.$nom_classe.'.php');
	}
	
	spl_autoload_register('autoLoad');
?>