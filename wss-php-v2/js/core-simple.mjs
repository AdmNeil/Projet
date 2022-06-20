export function $(_, __ = 0) {
	return document.getElementsByClassName(_)[__];
}

export function Rm(a, b, c) {
	$(a).remove();
	let y = document.createElement(b);
	y.setAttribute(`class`, a);
	document.querySelector(c).appendChild(y);
}

export function Gen2(...args) {
	let x = new DocumentFragment();

	for(let a of args) {
		let b = document.createElement(a.cont);

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

		if(a.text !== undefined) {
			if(a.cont === `input`) {
				b.value = a.text;
			} else {
				b.innerText = a.text;
			}
		}

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