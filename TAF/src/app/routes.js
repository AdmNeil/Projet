const fs = require('fs');
const path = require('path');
import { eventEmitter } from './core.js';

function smpl0(_) {
	for(let b of document.querySelectorAll(`[zone]`)) b.style.setProperty(`--containerC`, `none`);

	_.style.setProperty(`--containerC`, `block`);
}

function smpl2(_) {
	let c = document.createElement(`script`);
	c.setAttribute(`src`, `./app/${_}/${_}.js`);
	c.setAttribute(`type`, `module`);
	document.body.appendChild(c);
}

function smpl1(_, a) {
	if(a === 'defaut' || a === 'window' || document.querySelector(`[zone="${_.title}"]`) === null) {
		let e;
		let d = document.createElement(`div`);

		if(_.SubTitle !== undefined) {
			e = _.SubTitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		} else {
			e = _.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		}

		const data = fs.readFileSync(path.join(__dirname, `./app/${e}/${e}.html`));
		
		if(document.querySelector(`[src="./app/${e}/${e}.js"]`) === null && _.SubTitle !== undefined) {
			smpl2(e);
		} else if(_.SubTitle === undefined) {
			smpl2(e);
		}
		
		if(a !== 'backgroundActive') smpl0(d);
		else d.style.setProperty(`--containerC`, `none`);

		d.innerHTML = data.toString();
		d.setAttribute(`zone`, _.title);

		document.getElementsByTagName(`main`)[0].appendChild(d);
	} else smpl0(document.querySelector(`[zone="${_.title}"]`));
}

export function Route(_, __ = 'custom') {
	if(_.backgroundActive === true) {
		smpl1(_, 'backgroundActive');

		if(__ === 'custom') return;
	}
	if(_.defaut === true) {
		smpl1(_, __);

		if(__ === 'custom') return;
	}

	let a = document.createElement(`div`);
	let b = document.createElement(`img`);
	let c = document.createElement(`h3`);

	a.setAttribute(`class`, `menu-0`);
	if(_.SubTitle !== undefined) a.setAttribute(`sub`, _.SubTitle);
	a.setAttribute(`route`, _.title);
	b.setAttribute(`class`, `menu-1`);
	b.setAttribute(`src`, _.src);
	b.style.setProperty(`--color`, _.color);
	c.setAttribute(`class`, `menu-2`);
	c.textContent = _.title;

	a.appendChild(b);
	a.appendChild(c);
	document.getElementsByTagName(`menu`)[0].appendChild(a);

	a.addEventListener(`click`, () => {
		smpl1(_, a)

		if(_.eventEmitter === true) {
			setTimeout(() => eventEmitter.emit('SendTitre', _.title), 500)
		}
	})
}

class RouterModules {

	forRoot(routes) {
		for(let route of routes) {
			Route(route, 'init');
		}
	}
}

export const RouterModule = new RouterModules();