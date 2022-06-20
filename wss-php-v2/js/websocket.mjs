import { $, eventEmitter } from './core-simple.mjs';

class Wss {
	
	constructor() {
		this.n = `/git/wss-php-v2/`; // à modifier par /
		this.title = document.title;
		this.conn = new WebSocket("wss://muryo.ovh:8080");
		this.listenerPage = this.listenerPage.bind(this.conn);
	}

	async SocketClient() {
		eventEmitter.emit('path', 'nav');

		var timerID = 0;
		var getInfoIp = 0;
		let d = setInterval(() => {
			switch(this.conn.readyState) {
				case 0:
					console.log("connection");
					break;
				case 1:
					console.log("ouvert");
					
					if(getInfoIp === -1) {
						console.log("-1") // info -1 erreur ping
						this.conn.close();
					} else if(getInfoIp === 1) {
						timerID +=1;
						if(timerID === 5) {
							this.conn.send(JSON.stringify({'emit': 'ping'}));  
							console.log('ping')
						}
					} else {
						getInfoIp = -1;
					}
					break;
				case 2:
					console.log("se coupe");
				case 3:
					console.log("fermer");
					clearInterval(d);
					setTimeout(() => {
						this.reloadPage(1);
						new Wss().SocketClient();
					}, 3000);
					break;
			}
		}, 1000);

		this.conn.addEventListener(`message`, event => {
			let json = JSON.parse(event.data);

			if(json.pong !== undefined && json.pong === true) {
				timerID = 0;
			}
			
			if(json.ip !== undefined) {
				getInfoIp = 1;
				console.log(json.ip);

				// let a = document.createElement(`script`);
				// a.src = `js/script.mjs`;
				// a.type = `module`;
				// a.onload = () => {
				// 	document.getElementsByTagName(`script`)[1].remove();
				eventEmitter.emit('statut', json.statut);
				// }
				// document.body.appendChild(a);
				
			}

			if(json.returnData !== undefined) {
				let val = JSON.parse(json.returnData);

				if(val.bool === "1") {
					this.receiveDataPath(json.newPathI);
				} else {
					eventEmitter.emit('returnData', json.returnData);
				}
			}

			if(json.newPath !== undefined) {
				this.receiveDataPath(json.newPath);
			}
		});

		eventEmitter.register('data', e => {
			if(typeof e === "string") this.conn.send(e)
		})

		this.reloadPage();
	}

	receiveDataPath(dataPath) {
		const promise1 = new Promise(resolve => {
			dataPath.forEach(element => {
				if(element.path !== undefined && element.path !== null) {
					history.replaceState({}, "", "/" === element.path ? this.n : this.n + element.path);
					document.title = this.title + " | " + (element.path === "" ? 'Index' : element.path);
					return;
				}

				let a = document.getElementsByTagName(element.type)[0];

				for(let e of a.children) e.remove();

				a.innerHTML = element.data;
				
				if(element.type === "nav") eventEmitter.emit('path', element.type);
			});

			resolve(dataPath[0].path);
		});

		promise1.then(value => {
			this.reloadPage();
			eventEmitter.emit('path', "/" === value ? "Index" : value);
		});
	}
	
	reloadPage(init = 0) {
		for(let list of document.querySelectorAll(`[path]`)) {
			list.removeEventListener(`click`, this.listenerPage, false);
			if(init === 0) list.addEventListener(`click`, this.listenerPage);
		}
	}

	listenerPage(e) {
		$(`nav-5_0`).style.setProperty(`--value4`, `none`);
		$(`nav-6_0`).style.setProperty(`--value5`, `none`);
	
		this.send(JSON.stringify({ "emit": "route", "path": e.target.attributes.path.textContent}))
	}

}

(() => {
	const Projet1 = new Wss()
	
	if(Projet1 instanceof Object !== true) {
		console.error(`Projet1 n'est pas un Objet`)
		void 0;
	} else {
		window.addEventListener("load", () => Projet1.SocketClient()); //DOMContentLoaded
	}
})()

void 0;