import { $, Gen2, Rm, eventEmitter } from './core-simple.mjs';

class Webex {
	
	constructor() {
		this.n = `/git/wss-php-v2/`; // à modifier par /
		this.title = document.title;
		
		eventEmitter.register('statut', e => {
			if(e === "1") {
				let getTitle = location.pathname.replace(this.n, "");
				this.preload();
				this.is_function(getTitle === '' ? 'Index' : getTitle);
			}
		})

		eventEmitter.register('path', e => this.is_function(e));

		document.querySelectorAll(`[class*=nav-5_]`).forEach((e, i) => {
			e.addEventListener(`click`, f => {
				if(f.target.style.getPropertyValue('--value4') === '' || f.target.style.getPropertyValue('--value4') === 'none') {
					document.querySelectorAll(`[class*=nav-5_]`).forEach((e, i) => {
						if(getComputedStyle(document.querySelector(`.${e.className}`)).getPropertyValue('--value4') !== 'none') {
							e.style.setProperty(`--value4`, `none`);
							$(`nav-6_${i}`).style.setProperty(`--value5`, `none`);
						}
					});

					f.target.style.setProperty(`--value4`, `unset`);
					$(`nav-6_${i}`).style.setProperty(`--value5`, `grid`);
				} else {
					f.target.style.setProperty(`--value4`, `none`);
					$(`nav-6_${i}`).style.setProperty(`--value5`, `none`);
				}
			});
		});
	}
	
	is_function(path) {
		/TP-[0-9]{1,5}/.test(path) && (path = "Sujet");
		/[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}/.test(path) && (path = "Verif"); // à verifier

		if({}.toString.call(this[path]) === '[object Function]') {
			if(path !== "nav") {
				document.title = this.title + " | " + (path === "" ? 'Index' : path);
			}

			path === "" ? this['Index']() : this[path]();
		}
	}

	preload() {
		$(`preload-3`).style.setProperty(`--valueInit`, `100%`);
		$(`preload-2`).addEventListener(`animationiteration`, e => {
			e.target.style.animation = "preloadIcon 1s 0";
			e.target.style.margin = ".5rem";
			e.target.style.padding = ".5rem";
			e.target.style.width = "50px";
			e.target.style.height = "50px";
			e.target.style.boxShadow = "0 0 0";

			setTimeout(() => {
				$(`preload-0`).style.top = "0";
				// $(`preload-0`).style.left = "5%";
				$(`preload-0`).style.right = "90%"; // ici faire un calcule en fonction de l'écran ou du temps (recommandé)
				$(`preload-0`).style.bottom = "100%";
				$(`preload-3`).style.setProperty(`--value0`, "20px");

				setTimeout(() => {
					document.getElementsByTagName(`main`)[0].style.setProperty("--valueInit", "1");
					document.getElementsByTagName(`footer`)[0].style.setProperty("--valueInit", "1");
					document.body.style.setProperty("--value2", "auto");
					$(`preload-0`).style.opacity = "0";
					$(`preload-0`).style.setProperty(`--value1`, "-1");
				}, 1500);
			}, 500);
		})
	}

	initScroll() {
		if(window.scrollY > 100) {
			$(`nav-0`).style.setProperty("--background", "#ffffffd1");
			$(`nav-2`).style.setProperty("--value3", "20px");
		} else {
			$(`nav-0`).style.setProperty("--background", "#fff");
			$(`nav-2`).style.setProperty("--value3", "50px");
		}
	}

	nav() {
		window.removeEventListener(`scroll`, this.initScroll, false);
		window.addEventListener(`scroll`, this.initScroll);

		this.initScroll;
	}

	Index() {
		$(`index-14`).addEventListener(`click`, e => {
			let a = document.createElement("textarea");
			a.value = e.target.textContent;
			document.body.appendChild(a);
			a.select();

			if(document.execCommand("copy")) {} else console.error(`La copie n'a pas pu se faire`);

			a.remove();

			$(`index-15`).textContent = `Adresse copier !`;

			setTimeout(() => {
				$(`index-15`).textContent = `Copier l\'adresse !`;
			}, 1000);
		})

		let formData = new FormData();
		formData.append('actu', '');

		fetch(`${this.n}php/Serveur_Actu2`, {
			method: "POST",
			mode: "same-origin",
			credentials: "same-origin",
			body: formData
		}).then(response => {
			console.log(response)
			return response.json();
		}).then(body => {
			let x = new DocumentFragment();

			for(let [b, a] of Object.entries(body.article_grid)) {
				x.appendChild(Gen2({
					cont: `a`,
					data: [{ attrib: `class`, value: `item-${b}`}, { attrib: `href`, value: `https://www.minecraft.net${a.article_url}` }, { attrib: `target`, value: `_blank` }],
					sub: [{
						cont: `img`,
						data: [{ attrib: `class`, value: `item_0`}, { attrib: `decoding`, value: `async`}, { attrib: `loading`, value: `lazy`}, { attrib: `importance`, value: `high`}, { attrib: `width`, value: `125px`}, { attrib: `height`, value: `125px`}, { attrib: `src`, value: `https://www.minecraft.net${a.default_tile.image.imageURL}` }]
					}, {
						cont: `h3`,
						data: [{ attrib: `class`, value: `item_1`}],
						text: a.default_tile.title
					}]
				}))
			}

			$(`index-9`).appendChild(x);
		}).catch(e => console.log(new Error(`Problème de réseau ou Parse: ${e}`)))
	}

	Support() {
		let a = document.querySelectorAll(`.support-7`);
		
		$(`support-1`).addEventListener(`keyup`, e => {
			// let items = [];
			// setTimeout(() => {
			Rm(`support-6`, `div`, `.support-0`);

			// let searchText = e.target.value.toLowerCase();
			let formData = new FormData();
			formData.append('schSuppV', JSON.stringify(e.target.value.toLowerCase()));

			fetch(`${this.n}php/Serveur_Requete`, {
				method: "POST",
				mode: "same-origin",
				credentials: "same-origin",
				body: formData
			}).then(response => {
				return response.json();
			}).then(body => {
				$(`support-6`).innerHTML = body;
			}).catch(e => console.log(new Error(`Problème de réseau ou Parse: ${e}`)))
			// }, 1000);
			
			/*for(let item of a) {
				for(let it of item.children) {
					if(it.textContent.toLowerCase().indexOf(searchText) > -1) {
						items.push(item);
						break;
					}
				};
			}

			console.log('items: ', items)*/
			
		})
	}

	Connexion() {
		/* Toggle click menu sub */
		document.querySelectorAll(`[class*=compte-2_]`).forEach((e, i) => {
			e.addEventListener(`click`, f => {
				if(f.target.style.getPropertyValue('--value4') === '' || f.target.style.getPropertyValue('--value4') === 'none') {
					document.querySelectorAll(`[class*=compte-2_]`).forEach((e, i) => {
						if(getComputedStyle(document.querySelector(`.${e.className}`)).getPropertyValue('--value4') !== 'none') {
							e.style.setProperty(`--value4`, `none`);
							$(`compte-3_${i}`).style.setProperty(`--value5`, `none`);
						}
					});

					f.target.style.setProperty(`--value4`, `2px underline var(--defaultColorSecondary)`);
					$(`compte-3_${i}`).style.setProperty(`--value5`, `block`);
				}
			});
		});

		/* Connexion */
		$(`compte-10`).addEventListener(`click`, () => {
			const obj = {'emit': location.pathname.replace(this.n, ""), 'object' : {'ps': '', 'pw': ''}};
			
			if($(`compte-7`).validity.valid === true && $(`compte-7`).size !== 0) {
				obj.object['ps'] = $(`compte-7`).value;
			} else {
				return;
			}
			if($(`compte-8`).validity.valid === true && $(`compte-8`).size !== 0) {
				obj.object['pw'] = $(`compte-8`).value;
			} else {
				return;
			}

			eventEmitter.emit('data', JSON.stringify(obj));
		});

		eventEmitter.register('returnData', data => {
			let f = JSON.parse(data);

			if(f.bool !== "1") {
			// 	window.location = "Index";
			// } else {
				$(`compte-0`).appendChild(Gen2({
					cont: `div`,
					data: [{ attrib: `class`, value: `mail-0` }],
					sub: [{
						cont: `div`,
						data: [{ attrib: `class`, value: `mail-1` }],
						sub: [{
							cont: `span`,
							data: [{ attrib: `class`, value: `mail-2` }],
							text: `☒`
						}, {
							cont: `p`,
							data: [{ attrib: `class`, value: `mail-3` }],
							text: f.erreur
						}]
					}],
					event: [{ type: `click`, func: e => e.remove() }]
				}));
			}
		});

		/* Inscription */
		$(`compte-19`).addEventListener(`click`, e => {
			let obj = {'ps': '', 'ml': '', 'pw': ''};
			//console.log('status: ', $(`cpt-20`).validationMessage)
			//console.log($(`cpt-20`).validity.valid === true && $(`cpt-20`).size !== 0)
			if($(`compte-11`).validity.valid === true && $(`compte-11`).size !== 0) {
				obj['ps'] = $(`compte-11`).value;
			} else {
				return;
			}
			if($(`compte-12`).validity.valid === true && $(`compte-12`).size !== 0) {
				obj['ml'] = $(`compte-12`).value;
			} else {
				return;
			}
			if($(`compte-14`).validity.valid === true && $(`compte-14`).size !== 0 && $(`compte-17`).validity.valid === true && $(`compte-17`).size !== 0 && $(`compte-14`).value === $(`compte-17`).value) {
				obj['pw'] = $(`compte-14`).value;
			} else {
				return;
			}

			$(`compte-0`).appendChild(Gen2({
				cont: `div`,
				data: [{ attrib: `class`, value: `mail-0` }],
				sub: [{
					cont: `div`,
					data: [{ attrib: `class`, value: `mail-1` }],
					sub: [{
						cont: `span`,
						data: [{ attrib: `class`, value: `mail-2` }],
						text: `📧`
					}, {
						cont: `p`,
						data: [{ attrib: `class`, value: `mail-3` }],
						text: `Envoie en Cours...`,
						event: [{
							func: e => {
								let formData = new FormData();
								formData.append('func', '');
								formData.append('obj', JSON.stringify(obj));

								fetch(`${this.n}php/Serveur_CreaCompte`, {
									method: "POST",
									mode: "same-origin",
									credentials: "same-origin",
									body: formData
								}).then(response => {
									return response.text();
								}).then(body => {
									if(body === '1') {
										e.innerText = `Un mail vient d'être envoyé sur votre messagerie afin de finir votre inscription. (Le lien sera périmé dans 10 minutes), Vous pouvez fermé cette page.`;
									} else {
										e.innerText = `Echec de l'envoi : ${body}`;
									}
								});
							}
						}]
					}]
				}],
				event: [{ type: `click`, func: e => e.remove() }]
			}));
		});

		/* Mdp Oublier */
		$(`compte-9`).addEventListener(`click`, e => {
			let obj = {'ps': '', 'ml': ''};
			
			if($(`compte-20`).validity.valid === true && $(`compte-20`).size !== 0) {
				obj['ps'] = $(`compte-20`).value;
			} else {
				return;
			}
			if($(`compte-21`).validity.valid === true && $(`compte-21`).size !== 0) {
				obj['ml'] = $(`compte-21`).value;
			} else {
				return;
			}

			/*e.target.classList.add(`loader`);
			e.target.innerText = ``;*/

			$(`compte-0`).appendChild(Gen2({
				cont: `div`,
				data: [{ attrib: `class`, value: `mail-0` }],
				sub: [{
					cont: `div`,
					data: [{ attrib: `class`, value: `mail-1` }],
					sub: [{
						cont: `span`,
						data: [{ attrib: `class`, value: `mail-2` }],
						text: `📧`
					}, {
						cont: `p`,
						data: [{ attrib: `class`, value: `mail-3` }],
						text: `Envoie en Cours...`,
						event: [{
							func: e => {
								let formData = new FormData();
								formData.append('forget', '');
								formData.append('obj', JSON.stringify(obj));

								fetch(`${this.n}php/Serveur_CreaCompte`, {
									method: "POST",
									mode: "same-origin",
									credentials: "same-origin",
									body: formData
								}).then(response => {
									return response.text();
								}).then(body => {
									if(body === '1') {
										e.innerText = `Un mail vient d'être envoyé sur votre messagerie. (Le lien sera périmé dans 10 minutes), Vous pouvez fermé cette page.`;
									} else {
										e.innerText = `Echec de l'envoi : ${body}`;
									}
								});
							}
						}]
					}]
				}],
				event: [{ type: `click`, func: e => e.remove() }]
			}));
		});
	}

	Verif() {
		/*
			INSERT INTO `compte` (`Id`, `S_Id`, `Ps`, `Mail`, `ConfirmMail`, `VerifyConfirmMail`, `Psw`, `UUID`, `Cle`, `DateNewUser`, `Ip_User`, `User Level`, `Statut`, `Ban`) VALUES ('0', NULL, 'Neil', 'COntact.MangaDDL6@gmail.com', '0', '2020-12-29 18:40:15', '$argon2i$v=19$m=65536,t=4,p=1$Q25MdndjU3hIQ2tESWIvTA$qIspD4K/az9izitEyQltJiFra2+ICCrpqnpGrCt1kbg', '8eae5801-49f8-11eb-8412-6a9c78186fe2', 'GSO1GN', NULL, NULL, '0', 'Joueur', '0')
		*/
		
		if($(`compte-24`) !== undefined) {
			$(`compte-24`).addEventListener(`click`, e => {
				let obj = {'ps': '', 'pw': ''}
				
				if($(`compte-22`).validity.valid === true && $(`compte-22`).size !== 0) {
					obj['ps'] = $(`compte-22`).value
				} else {
					return;
				}

				if($(`compte-23`).validity.valid === true && $(`compte-23`).size !== 0) {
					obj['pw'] = $(`compte-23`).value
				} else {
					return;
				}

				// console.log(obj)

				let formData = new FormData()
				formData.append('func', '')
				formData.append('obj', JSON.stringify(obj))

				fetch(`${this.n}php/Serveur_Confirm`, {
					method: "POST",
					mode: "same-origin",
					credentials: "same-origin",
					body: formData
				}).then(response => {
					return response.text();
				}).then(body => {
					$(`compte-0`).appendChild(Gen2({
						cont: `div`,
						data: [{ attrib: `class`, value: `mail-0` }],
						sub: [{
							cont: `div`,
							data: [{ attrib: `class`, value: `mail-1` }],
							sub: [{
								cont: `span`,
								data: [{ attrib: `class`, value: `mail-2` }],
								event: [{
									func: e => {
										if(body === '1') {
											e.innerText = `🗹`;
										} else {
											e.innerText = `☒`;
										}
									}
								}]
							}, {
								cont: `p`,
								data: [{ attrib: `class`, value: `mail-3` }],
								event: [{
									func: e => {
										if(body === '1') {
											e.innerText = `Votre compte à bien été enregistré. (Redirection dans 3 secondes)`;

											setTimeout(() => {
												window.location = "Index";
											}, 3000);
										} else {
											e.innerText = body;
										}
									}
								}]
							}]
						}],
						event: [{ type: `click`, func: e => e.remove() }]
					}));
				});
			})
		}

		if($(`compte-29`) !== undefined) {
			$(`compte-29`).addEventListener(`click`, e => {
				let obj = {'ps': '', 'cl': '', 'pw': ''}
				
				if($(`compte-25`).validity.valid === true && $(`compte-25`).size !== 0) {
					obj['ps'] = $(`compte-25`).value
				} else {
					return;
				}

				if($(`compte-26`).validity.valid === true && $(`compte-26`).size !== 0) {
					obj['cl'] = $(`compte-26`).value
				} else {
					return;
				}

				if($(`compte-27`).validity.valid === true && $(`compte-27`).size !== 0 && $(`compte-28`).validity.valid === true && $(`compte-28`).size !== 0 && $(`compte-27`).value === $(`compte-28`).value) {
					obj['pw'] = $(`compte-27`).value;
				} else {
					return;
				}

				let formData = new FormData()
				formData.append('forget', '')
				formData.append('obj', JSON.stringify(obj))

				fetch(`${this.n}php/Serveur_Confirm`, {
					method: "POST",
					mode: "same-origin",
					credentials: "same-origin",
					body: formData
				}).then(response => {
					return response.text();
				}).then(body => {
					$(`compte-0`).appendChild(Gen2({
						cont: `div`,
						data: [{ attrib: `class`, value: `mail-0` }],
						sub: [{
							cont: `div`,
							data: [{ attrib: `class`, value: `mail-1` }],
							sub: [{
								cont: `span`,
								data: [{ attrib: `class`, value: `mail-2` }],
								event: [{
									func: e => {
										if(body === '1') {
											e.innerText = `🗹`;
										} else {
											e.innerText = `☒`;
										}
									}
								}]
							}, {
								cont: `p`,
								data: [{ attrib: `class`, value: `mail-3` }],
								event: [{
									func: e => {
										if(body === '1') {
											e.innerText = `Votre mot de passe à bien été changé. (Redirection dans 3 secondes)`;

											setTimeout(() => {
												window.location = "Index";
											}, 3000);
										} else {
											e.innerText = body;
										}
									}
								}]
							}]
						}],
						event: [{ type: `click`, func: e => e.remove() }]
					}));
				});
			})
		}
	}

	Sujet() {
		console.log('sujet OK')

		if($(`sujet-8`) !== undefined) {
			$(`sujet-8`).addEventListener(`click`, e => {
				let obj = {'sj': ''}
				
				if($(`sujet-7`).size !== 0) {
					obj['sj'] = $(`sujet-7`).value
				} else {
					return;
				}

				console.log($(`nav-10`).textContent)

				const formData = new FormData();
				formData.append('support', $(`nav-10`).textContent);
				formData.append('obj', JSON.stringify(obj));

				const array = new Uint32Array(1);
				window.crypto.getRandomValues(array);

				fetch(`${this.n + array[0]}`, { //serveur_confim
					method: "POST",
					mode: "same-origin",
					credentials: "same-origin",
					body: formData
				}).then(response => {
					return response.text();
				}).then(body => {
					console.log(body)
				});
			})
		}

	}
}

(() => {
	const Projet1 = new Webex();
	
	if(Projet1 instanceof Object !== true) {
		console.error(`Projet1 n'est pas un Objet`);
		void 0;
	} else {
		window.addEventListener("load", () => {}); //DOMContentLoaded
	}
})()

void 0;