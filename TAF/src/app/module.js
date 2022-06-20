import { RouterModule } from './routes.js';
// import { exl } from './core.js';

let ifLocalGet = localStorage.getItem('SideMenu');

if(ifLocalGet === null) {
	localStorage.setItem('SideMenu', 'left');
} else if(ifLocalGet === 'right') {
	document.getElementsByTagName(`menu`)[0].style.setProperty(`--SideMenu0`, `initial`);
	document.getElementsByTagName(`menu`)[0].style.setProperty(`--SideMenu1`, `0`);
	document.getElementsByTagName(`main`)[0].style.setProperty(`--SideMenu2`, `0`);
	document.getElementsByTagName(`info`)[0].style.setProperty(`--SideMenu3`, `80px`);
}

const routes = [
	{ title: 'Accueil', color: '#ffde3c', src: './assets/editeur.svg', defaut: true },
	{ title: 'Dymo', color: '#40b8ff', src: './assets/dymo.webp' },
	{ title: 'Pièces', color: '#ff7740', src: './assets/pieces.webp', backgroundActive: true },
	{ title: 'Options', color: '#77c3b0', src: './assets/options.svg', backgroundActive: true }
];

RouterModule.forRoot(routes);

// exl.init();