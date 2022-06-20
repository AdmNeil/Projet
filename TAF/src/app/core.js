import { Route } from './routes.js';

export function $(_, __ = 0) {
	return document.getElementsByClassName(_)[__];
}


/*$(`elementhtml`).clearChildren();

if( typeof Element.prototype.clearChildren === 'undefined' ) {
    Object.defineProperty(Element.prototype, 'clearChildren', {
      configurable: true,
      enumerable: false,
      value: function() {
        while(this.firstChild) this.removeChild(this.lastChild);
      }
    });
}*/

export function Rm(a, b, c, d = 1) {
	if($(a) === undefined) return;

	$(a).remove();
	let y = document.createElement(b);
	y.setAttribute(`class`, a);
	if(d == 2) {
		document.querySelector(c).prepend(y);
	} else {
		document.querySelector(c).appendChild(y);
	}
}

export function notif(_, __ = `info`) {
	document.getElementsByTagName(`info`)[0].prepend(Gen2({
		cont: `div`,
		data: [{ attrib: `class`, value: `info-0` }],
		event: [{ func: a => setTimeout(() => a.remove(), 5000) }],
		sub: [{
			cont: `div`,
			data: [{ attrib: `class`, value: `info-1` }],
			event: [{
				func: a => {
					switch(__)  {
				  		case 'info':
				  			a.style.setProperty(`--notifColor`, `#ffa50073`);
				  			break;
				  		case 'ok':
				  			a.style.setProperty(`--notifColor`, `#33ff0073`);
					  		break;
				  		case 'erreur':
				  			a.style.setProperty(`--notifColor`, `#ff000073`);
					  		break;
					}
				}
			}],
			sub: [{
				cont: `h4`,
				data: [{ attrib: `class`, value: `info-2` }],
				text: _,
				event: [{
					func: a => {
						if(__ === `erreur`)	a.style.setProperty(`--notifColorText`, `#fff`);
					}
				}]
			}]
		}]
	}));
}

export function Gen2(...args) {
	let x = new DocumentFragment();

	for(let a of args) {
		let b = document.createElement(a.cont);

		if(a.data !== undefined) {
			for(let c of a.data) {
				b.setAttribute(c.attrib, c.value);

				if(c.replace !== undefined) {
					for(let d of c.replace) {
						let save = c[d.target];
						c[d.target] = c[d.target].replace(d.regex, d.to);
						b.setAttribute(c.attrib, c.value);
						c[d.target] = save;
					}
				}
			}
		}

		if(a.text !== undefined) {
			if(a.cont === `input`) {
				b.value = a.text;
			} else if(a.cont === `textarea`) {
				b.textContent = a.text;
			} else {
				b.innerText = a.text;
			}
		}

		// if(a.menu !== undefined) {
			// menu({id: a.data})
		// }

		if(a.event !== undefined) {
			for(let d of a.event) {
				if(d.type !== undefined) {
					b.addEventListener(d.type, e => {
						return d.func(b, e);
					});
				} else d.func(b, d);
			}
		}

		if(typeof a.sub === 'object') {
			for(let e of a.sub) b.appendChild(Gen2(e));
		}

		x.appendChild(b);
	}

	return x;
}

export function Toggle(init, cible, arg) {
	$(init).addEventListener(`click`, () => {
		if($(cible).style.getPropertyValue(arg.attrib) !== arg.val) {
			return $(cible).style.setProperty(arg.attrib, arg.val);
		}
		
		if($(cible).style.getPropertyValue(arg.attrib) !== `none`) {
			return $(cible).style.setProperty(arg.attrib, `none`);
		}
	});
}

export function menu(_) {
	for(let [a, [b, c]] of Object.entries(_.sub).entries()) {
		$(_.id).appendChild(Gen2({
			cont: `span`,
			data: [{ attrib: `class`, value: `id-${_.id}-for-${_.for}-${b}` }],
			text: b,
			event: [{
				type: `click`,
				func: () => {
					const d = document.querySelector(`[contextMenu=true]`);

					if(d !== null) d.setAttribute(`contextMenu`, false);
					$(`for-${_.for}-id-${_.id}-${b}`).setAttribute(`contextMenu`, true);
				}
			}]
		}));

		$(_.for).appendChild(Gen2({
			cont: `div`,
			data: [{ attrib: `class`, value: `for-${_.for}-id-${_.id}-${b}` }, { attrib: `contextMenu`, value: false }],
			event: [{ func: () => { if(_.complement !== undefined) _.complement[a]() } }]
		}));
	}
}

function EventEmitter() {
	var eventListeners = [];

	this.emit = function(eventName, args) {
		for(var index in eventListeners) {
			var eventListener = eventListeners[index];

			if(eventListener.eventName === eventName) {
				eventListener.callback(args);
				return;
			}
		}
	};

	this.register = function(eventName, callback) {
		eventListeners.push({eventName: eventName, callback: callback});
	};
}

export const eventEmitter = new EventEmitter();

// class Exl {

// 	init() {
// 		let ifLocalGet = localStorage.getItem('Excel');
// 		let b = $(`menu-0_1`);

// 		if(ifLocalGet === null || ifLocalGet === '[]') {
// 			if(b !== undefined) b.remove();
// 			localStorage.setItem('Excel', JSON.stringify([]));
// 		} else {
// 			if(b === undefined) document.getElementsByTagName(`menu`)[0].appendChild(Gen2({cont:`hr`, data: [{ attrib: `class`, value: `menu-0_1` }]}));

// 			for(let a of JSON.parse(ifLocalGet)) Route({title: a.title, SubTitle: 'Excel', color: '#fff', src: './assets/excel.svg', eventEmitter: true});
// 		}
// 	}

// 	refresh() {
// 		let a = document.querySelectorAll(`[sub="Excel"]`);

// 		for(let b of a) b.remove();

// 		this.init();
// 	}
// }

// export const exl = new Exl();