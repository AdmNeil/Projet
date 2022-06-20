<?php
	class Structure {
		
		protected $title;
		protected $preload;
		protected $nav;
		protected $buffer;
		protected $footer;

		public function __set($propriete, $valeur) {
			switch ($propriete) {
				case 'title' : {
					$this->title = $this->title.$valeur;
					break;
				}
				case 'preload' : {
					$this->preload = $this->preload.$valeur;
					break;
				}
				case 'nav' : {
					$this->nav = $this->nav.$valeur;
					break;
				}
				case 'buffer' : {
					$this->buffer = $this->buffer.$valeur;
					break;
				}
				case 'footer' : {
					$this->footer = $this->footer.$valeur;
					break;
				}
			}
		}
		
		public function affiche() {
		?>	<!DOCTYPE html>
			<html lang="fr">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="canonical" href="https://neko-world.fr.nf/Index">
				<link rel="icon" type="image/x-icon" href="icon.ico">
				<link rel="shortcut icon" href="img/icon.ico" type="image/x-icon">
				<title><?php echo $this->title; ?></title>
				<link rel="stylesheet" type="text/css" href="css/all.css" />
			</head>
			<body>

				<?php echo $this->preload; ?>

				<main>
					<nav class="nav-0">

						<?php echo $this->nav; ?>

					</nav>
					<buffer>

						<?php echo $this->buffer; ?>

					</buffer>

				</main>

				<?php echo $this->footer; ?>

				<script src="js/websocket.mjs" type="module"></script>
				<script src="js/script.mjs" type="module"></script>
			</body>
			</html>
			<?php
		}

		public function simplePath(int $bool = 0, string $path) {
			$arr = [];

			$arr[] = array('path' => $path);

			if($bool == 1) {
				$arr[] = array('type' => 'nav', 'data' => $this->nav);
			}

			$arr[] = array('type' => 'buffer', 'data' => $this->buffer);
			
			return $arr;
		}
	}
?>