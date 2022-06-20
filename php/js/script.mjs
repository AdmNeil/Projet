import { $, Gen2, Rm, eventEmitter } from './core-simple.mjs';

class Webex {
	
	constructor() {
		this.n = '/git/php/'; // à modifier par /
		this.title = document.title;
		this.getTitle = location.pathname.replace(this.n, "");
		this.preload(); // if reload only
		this.is_function(this.getTitle);
		this.regenPath();
	}

	callFunc(arg) {
		for(let list of arg) {
			list.addEventListener(`click`, e => this.listenerPage(e));
		}
	}

	regenPath(val = null) {
		if(val !== null) this.callFunc((document.getElementsByTagName(val)[0] || document.getElementsByClassName(val)[0]).querySelectorAll(`[path]`));
		else this.callFunc(document.querySelectorAll(`[path]`));
	}

	is_function(path, complement = null) {
		if(/TP-[0-9]{1,5}/.test(path)) {
			complement = path;
			path = "Sujet";
		};
		/[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}/.test(path) && (path = "Verif"); // à verifier
		
		if(path === "nav") {
			this[path]();
		} else {
			if(path === '' || path === "/") {
				path = 'Index';
			}

			if({}.toString.call(this[path]) === '[object Function]') {
				//if back or foward use fetch and reload url
				document.title = this.title + " | " + (complement ? complement : path);
				history.replaceState({}, "", this.n +  (complement ? complement : path));
				this[path]();
			}
		}
	}

	listenerPage(e) {
		$(`nav-5_0`).style.setProperty(`--value4`, `none`);
		$(`nav-6_0`).style.setProperty(`--value5`, `none`);
	
		let formData = new FormData();
		formData.append('Uri', e.target.attributes.path.textContent);
		
		fetch(`Request.php`, {
			method: "POST",
			mode: "cors",
			credentials: "same-origin",
			body: formData
		}).then(response => {
			return response.json();
		}).then(body => {
			body.forEach(c => {
				location.history = e.target.attributes.path.textContent;
				document.getElementsByTagName(c.type)[0].innerHTML = c.data;
				this.regenPath(c.type);
				this.is_function(c.locate); //  c.locate ? c.locate : e.target.attributes.path.textContent
			})
		}).catch(e => console.error(`Problème de réseau ou Parse: ${e}`));
	}

	preload() {
		// if(document.getElementsByTagName(`main`)[0].style.cssText === "--valueInit:1;") return;

		this.nav();
		
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

	nav() {
		function initScroll(_) {
			if(window.scrollY > _) {
				$(`nav-0`).style.setProperty("--background", "#ffffffd1");
				$(`nav-2`).style.setProperty("--value3", "20px");
			} else {
				$(`nav-0`).style.setProperty("--background", "#fff");
				$(`nav-2`).style.setProperty("--value3", "50px");
			}
		}

		const a = document.getElementsByTagName(`main`)[0].offsetTop;
		
		initScroll(a);

		window.addEventListener(`scroll`, () => initScroll(a));

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

		fetch(`${this.n}php/Serveur_Actu2.php`, {
			method: "POST",
			mode: "same-origin",
			credentials: "same-origin",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: formData
		}).then(response => {
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
		}).catch(e => console.log(new Error(`Problème de réseau ou Parse: ${e}`)));
	}

	Support() {
		function getValCat() {
			let cat = [];

			document.querySelectorAll(`.support-3`).forEach(f => {
				if(f.control.checked) cat.push(f.control.value);
			});

			return cat;
		}

		let clearSave;

		document.querySelectorAll(`.support-3`).forEach(f => {
			f.addEventListener('click', () => { //bug click

				clearTimeout(clearSave);
			
				clearSave = setTimeout(() => {
					let formData = new FormData();
					formData.append('schSuppC', JSON.stringify(getValCat()));

					fetch(`${this.n}php/Serveur_Request.php`, {
						method: "POST",
						mode: "same-origin",
						credentials: "same-origin",
						body: formData
					}).then(response => {
						return response.json();
					}).then(body => {
						if(body.bool === '1') {
							$(`support-6`).innerHTML = body.info;
							this.regenPath(`support-6`);
						} else {
							let info = body.erreur;
							
							e.target.style.setProperty('--colorSupportInit', "#F00");
							console.error(info);
						}
					}).catch(e => console.log(new Error(`Problème de réseau ou Parse: ${e}`)));
				}, 500);
			})
		});

		$(`support-1`).addEventListener(`keyup`, e => {
			let inp = String.fromCharCode(e.keyCode);
			
			if(/[a-zA-Z0-9-_ ?!#"'[\]+@&=.,;:]/.test(inp) || e.keyCode === 8) {
				if(e.target.style.getPropertyValue('--colorSupportInit') === "#F00") e.target.style.setProperty('--colorSupportInit', "var(--colorBlack)");

				clearTimeout(clearSave);
			
				clearSave = setTimeout(() => {
					Rm(`support-6`, `div`, `.support-0`);

					let formData = new FormData();
					formData.append('schSuppV', JSON.stringify(e.target.value.toLowerCase()));
					formData.append('schSuppC', JSON.stringify(getValCat()));

					fetch(`${this.n}php/Serveur_Request.php`, {
						method: "POST",
						mode: "same-origin",
						credentials: "same-origin",
						body: formData
					}).then(response => {
						return response.json();
					}).then(body => {
						if(body.bool === '1') {
							$(`support-6`).innerHTML = body.info;
							this.regenPath(`support-6`);
						} else {
							let info = body.erreur;
							
							e.target.style.setProperty('--colorSupportInit', "#F00");
							console.error(info);
						}
					}).catch(e => console.log(new Error(`Problème de réseau ou Parse: ${e}`)));
				}, 500);
			} else {
				e.target.style.setProperty('--colorSupportInit', "#F00");
				console.error('Caratère illégal détecté dans la barre de recherche');
			}
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
			const obj = {'ps': '', 'pw': ''};
			
			if($(`compte-7`).validity.valid === true && $(`compte-7`).size !== 0) {
				obj['ps'] = $(`compte-7`).value;
			} else {
				return false;
			}
			if($(`compte-8`).validity.valid === true && $(`compte-8`).size !== 0) {
				obj['pw'] = $(`compte-8`).value;
			} else {
				return false;
			}

			let formData = new FormData();
			formData.append('func', '');
			formData.append('obj', JSON.stringify(obj));

			fetch(`${this.n}php/Serveur_Connexion.php`, {
				method: "POST",
				mode: "cors",
				credentials: "same-origin",
				body: formData
			}).then(response => {
				return response.json();
			}).then(body => {
				if(body.bool === '1') {
					let jsn = JSON.parse(body.info);
					
					jsn.forEach(c => {
						document.getElementsByTagName(c.type)[0].innerHTML = c.data;
						this.regenPath(c.type);
						this.is_function(c.locate);
					});
				} else {
					let info = body.erreur;

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
								text: info
							}]
						}],
						event: [{ type: `click`, func: e => e.remove() }]
					}));
				}
			});
		});

		/* Inscription */
		$(`compte-19`).addEventListener(`click`, e => {
			let obj = {'ps': '', 'ml': '', 'pw': ''};
			
			if($(`compte-11`).validity.valid === true && $(`compte-11`).size !== 0) {
				obj['ps'] = $(`compte-11`).value;
			} else {
				return false;
			}
			if($(`compte-12`).validity.valid === true && $(`compte-12`).size !== 0) {
				obj['ml'] = $(`compte-12`).value;
			} else {
				return false;
			}
			if($(`compte-14`).validity.valid === true && $(`compte-14`).size !== 0 && $(`compte-17`).validity.valid === true && $(`compte-17`).size !== 0 && $(`compte-14`).value === $(`compte-17`).value) {
				obj['pw'] = $(`compte-14`).value;
			} else {
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
							text: "Mot de passe non identique"
						}]
					}],
					event: [{ type: `click`, func: e => e.remove() }]
				}));
				
				return false;
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

								fetch(`${this.n}php/Serveur_CreaCompte.php`, {
									method: "POST",
									mode: "cors",
									credentials: "same-origin",
									body: formData
								}).then(response => {
									return response.json();
								}).then(body => {
									if(body.bool === '1') {
										let info = body.info;
										
										e.innerText = info;
									} else {
										let info = body.erreur;
										
										e.innerText = `Echec de l'envoi : ${info}`;
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
				return false;
			}
			if($(`compte-21`).validity.valid === true && $(`compte-21`).size !== 0) {
				obj['ml'] = $(`compte-21`).value;
			} else {
				return false;
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

								fetch(`${this.n}php/Serveur_CreaCompte.php`, {
									method: "POST",
									mode: "same-origin",
									credentials: "same-origin",
									body: formData
								}).then(response => {
									return response.json();
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

	Launcher() {
		console.log('laucher')
	}

	Verif() {
		/*confirme compte*/
		if($(`verif-8`) !== undefined) {
			$(`verif-8`).addEventListener(`click`, e => {
				let obj = {'ps': '', 'pw': ''}
				
				if($(`verif-5`).validity.valid === true && $(`verif-5`).size !== 0) {
					obj['ps'] = $(`verif-5`).value
				} else {
					return;
				}

				if($(`verif-7`).validity.valid === true && $(`verif-7`).size !== 0) {
					obj['pw'] = $(`verif-7`).value
				} else {
					return;
				}

				let formData = new FormData()
				formData.append('func', '')
				formData.append('obj', JSON.stringify(obj))

				fetch(`${this.n}php/Serveur_Confirm`, {
					method: "POST",
					mode: "same-origin",
					credentials: "same-origin",
					body: formData
				}).then(response => {
					return response.json();
				}).then(body => {
					$(`verif-0`).appendChild(Gen2({
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
										if(body.bool === '1') {
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
										if(body.bool === '1') {
											e.innerText = `Votre compte à bien été enregistré. (Redirection dans 3 secondes)`;

											setTimeout(() => {
												window.location = "Index";
											}, 3000);
										} else {
											let info = body.erreur;
										
											e.innerText = `Echec de l'envoi : ${info}`;
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

		/* MDP oublié*/
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
					return response.json();
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

		/*if(/[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}/.test(_)) {
			$(`cpt-36`).addEventListener(`click`, e => {
				let obj = {'ps': '', 'pw': ''}
				
				if($(`cpt-9`).validity.valid === true && $(`cpt-9`).size !== 0) {
					obj['ps'] = $(`cpt-9`).value
				} else {
					return;
				}

				if($(`cpt-12`).validity.valid === true && $(`cpt-12`).size !== 0) {
					obj['pw'] = $(`cpt-12`).value
				} else {
					return;
				}

				// console.log(obj)

				var formData = new FormData()
				formData.append('func', '')
				formData.append('obj', JSON.stringify(obj))

				fetch("/php/Serveur_Confirm.php", {
					method: "POST",
					mode: "same-origin",
					credentials: "same-origin",
					body: formData
				}).then(function (response) {
					return response.text();
				}).then(function (body) {
					let z = new DocumentFragment()
					let a = $(`create`, `div`)
					let b = $(`create`, `div`)
					let c = $(`create`, `span`)
					let d = $(`create`, `p`)

					a.setAttribute(`class`, `mail-0`)
					b.setAttribute(`class`, `mail-1`)
					c.setAttribute(`class`, `mail-2`)
					d.setAttribute(`class`, `mail-3`)

					a.appendChild(b)
					b.appendChild(c)
					b.appendChild(d)
					z.appendChild(a)
					$(`cpt-1`).appendChild(z)

					if(body === '1') {
						c.innerText = `🗹`
						d.innerText = `Votre compte à bien été enregistré. (Redirection dans 3 secondes)`

						setTimeout(function(){
							window.location = "index"
						}, 3000)
					} else {
						c.innerText = `☒`
						d.innerText = body

						$(`mail-0`).addEventListener(`click`, () => {
							$(`mail-0`).remove();
						})
					}
				});
			})
		}*/

	}

	Sujet() {
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
	const Projet1 = new Webex()
	
	if(Projet1 instanceof Object !== true) {
		console.error(`Le Script n'est pas un Objet`);
		void 0;
	} else {
		window.addEventListener("load", () => {}, { once: true }); //DOMContentLoaded
	}
})()

void 0;