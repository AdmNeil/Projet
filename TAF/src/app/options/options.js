import { $, Gen2, notif, Rm } from '../core.js';
const { ipcRenderer } = require('electron');
let os = require('os');
let info = require('../package.json');

console.info('refresh accueil page only in $(`nav-2`) ');
console.info('bug initialise contextmenu after timeout');

// demarage

let ifLocalGet = localStorage.getItem('AutoStart');

if(ifLocalGet === null) {
	localStorage.setItem('AutoStart', 'false');
} else if(ifLocalGet === 'true') {
	$(`options-5`).setAttribute(`checked`, ``)
}

$(`options-5`).addEventListener(`change`, e => {
	if(e.target.checked === true) {
		localStorage.setItem('AutoStart', 'true');
		ipcRenderer.send('autoStart', e.target.checked);
	} else { //if(e.target.checked === false) 
		localStorage.setItem('AutoStart', 'false');
		ipcRenderer.send('autoStart', e.target.checked);
	}
})

// information

$(`version`).textContent = info.version;
$(`author`).textContent = info.author;

// menu

let ifLocalGet1 = localStorage.getItem('SideMenu');

if(ifLocalGet1 === null) {
	localStorage.setItem('SideMenu', 'left');
} else if(ifLocalGet1 === 'right') {
	$(`options-13`).setAttribute(`checked`, ``);
}

$(`options-13`).addEventListener(`change`, e => {
	if(e.target.checked === true) {
		localStorage.setItem('SideMenu', 'right');
		document.getElementsByTagName(`menu`)[0].style.setProperty(`--SideMenu0`, `initial`);
		document.getElementsByTagName(`menu`)[0].style.setProperty(`--SideMenu1`, `0`);
		document.getElementsByTagName(`main`)[0].style.setProperty(`--SideMenu2`, `0`);
		document.getElementsByTagName(`info`)[0].style.setProperty(`--SideMenu3`, `80px`);
	} else {
		localStorage.setItem('SideMenu', 'left');
		document.getElementsByTagName(`menu`)[0].style.setProperty(`--SideMenu0`, `0`);
		document.getElementsByTagName(`menu`)[0].style.setProperty(`--SideMenu1`, `initial`);
		document.getElementsByTagName(`main`)[0].style.setProperty(`--SideMenu2`, `calc(45px + 2rem)`);
		document.getElementsByTagName(`info`)[0].style.setProperty(`--SideMenu3`, `0`);
	}
})

// dymo name

/* TODO
* if update dymo JS add in /lib/Index.js => || '127.0.0.1'
*/

let ifLocalGet2 = localStorage.getItem('DymoLabel');

if(ifLocalGet2 === null) {
	const defautLabelDymo = 'DYMO LabelWriter 450 Turbo';
	localStorage.setItem('DymoLabel', defautLabelDymo);
	$(`options-15`).value = defautLabelDymo;
} else {
	$(`options-15`).value = ifLocalGet2;
}

let clearSave;

$(`options-15`).addEventListener(`keydown`, e => {
	clearTimeout(clearSave);

	clearSave = setTimeout(() => {
		localStorage.setItem(`DymoLabel`, e.target.value);
		notif(`Nom de l'appareil Dymo sauvegardé`, `ok`);
	}, 2000);
})

// Appareil

// init

let appareil = localStorage.getItem(`List_Appareil`);
let initNewAppareil = {appareil: "", VER_JSON: `1.1`, sub: [{ Trame: [{ line: 0, text: "init", implement: [] }] }]}; // trame obligatoire

if(appareil !== null) {
	let x = new DocumentFragment();

	for(let a of JSON.parse(appareil)) x.appendChild(Gen2({ cont: `option`, data: [{ attrib: `class`, value: `appareil-2_${a.appareil}` }, { attrib: `value`, value: a.appareil}], text: a.appareil }))

	$(`options-9`).appendChild(x);
} else {
	localStorage.setItem(`List_Appareil`, JSON.stringify([]));
}

// ADD Appareil

function checkedListAppareil(nom, complement = null) {
	let info = {statut: true, list: []};
	let appareil = localStorage.getItem(`List_Appareil`);
	let listAppareil = JSON.parse(appareil);
	
	if(complement === null) {
		if(listAppareil !== null) {
			if(nom.length >= 2) {
				if(!/^\s+$/.test(nom)) {
					for(let a of listAppareil) {
						info.list.push(a);

						if(a.appareil == nom) {
							info.statut = false;
						}
					}
				} else {
					info.statut = false;
				}
			} else {
				info.statut = false;
			}
		} else {
			info.statut = false;
		}
	} else {
		if(nom.length >= 2) {
			if(!/^\s+$/.test(nom)) {
				for(let b of listAppareil) {
					if(b.appareil === $(`appareil-25`).textContent) {
						for(let [k, v] of Object.entries(b[complement][0])) {
							info.list.push(k);
							
							if(k == nom) {
								info.statut = false;
							}
						}
					}
				}
			} else {
				info.statut = false;
			}
		} else {
			info.statut = false;
		}
	}

	return info;
}

$(`appareil-0`).addEventListener(`click`, () => {
	$(`appareil-12`).style.setProperty(`--pageList`, `block`);
});

$(`appareil-15`).addEventListener(`keydown`, e => {
    if(e.key === `Enter`) {
        e.preventDefault();

		let valueName = e.target.value;
		let confirmName = checkedListAppareil(valueName);

		if(confirmName.statut) {
			initNewAppareil.appareil = valueName;
			confirmName.list.push(initNewAppareil);
			localStorage.setItem(`List_Appareil`, JSON.stringify(confirmName.list));
			
			$(`appareil-12`).style.setProperty(`--pageList`, `none`);
			$(`options-9`).appendChild(Gen2({ cont: `option`, data: [{ attrib: `class`, value: `appareil-2_${valueName}` }, { attrib: `value`, value: valueName }], text: valueName }))
			
			notif(`Appareil ${valueName} ajouté`, `ok`);
		} else {
			notif(`Le model ${valueName} déjà existant`, `erreur`);
		}
		
		e.target.value = "";
    }
});

$(`appareil-12`).addEventListener(`click`, e => {
	if(e.target.className === "appareil-12") {
		e.target.style.setProperty(`--pageList`, `none`);
		$(`appareil-15`).value = "";
	}
});

// REMOVE appareil

$(`appareil-1`).addEventListener(`click`, () => {
	let valApp = $(`appareil-19`);

	if(valApp.children.length !== 0) {
		// for(let [b, a] of Object.entries(valApp.children)) a.remove();
		while (valApp.firstChild) valApp.removeChild(valApp.firstChild);
	}

	$(`appareil-16`).style.setProperty(`--pageList`, `block`);

	let appareil = localStorage.getItem(`List_Appareil`);
	let x = new DocumentFragment();

	for(let a of JSON.parse(appareil)) x.appendChild(Gen2({ cont: `div`, sub: [{ cont: `input`, data: [{ attrib: `type`, value: `checkbox`}, { attrib: `class`, value: `appareil-21` }, { attrib: `id`, value: `rmApp-${a.appareil}`}, { attrib: `name`, value: a.appareil}]}, { cont: `label`, data: [{ attrib: `for`, value: `rmApp-${a.appareil}`}], text: a.appareil}]}))

	valApp.appendChild(x);
});

$(`appareil-16`).addEventListener(`click`, e => {
	if(e.target.className === "appareil-16") e.target.style.setProperty(`--pageList`, `none`);
});

// $(`appareil-41`).addEventListener(`click`, e => {
// 	if(e.target.className === "appareil-41") e.target.style.setProperty(`--pageList`, `none`);
// });

// $(`appareil-48`).addEventListener(`click`, e => {
// 	if(e.target.className === "appareil-48") e.target.style.setProperty(`--pageList`, `none`);
// });

$(`appareil-20`).addEventListener(`click`, e => {
	if(e.target.className === "appareil-20") e.target.style.setProperty(`--pageList`, `none`);
});

$(`appareil-23`).addEventListener(`click`, e => {
	if(e.target.className === "appareil-23") {
		e.target.style.setProperty(`--pageList`, `none`);
		$(`appareil-context`).style.display = `none`;
		$(`options-9`).firstElementChild.selected = true;

		if($(`appareil-32`) !== undefined) Rm(`appareil-27`, `div`, `.appareil-26`, 2);
	
		if($(`appareil-34`) !== undefined) Rm(`appareil-31`, `div`, `.appareil-24`);
	}
});

$(`appareil-22`).addEventListener(`click`, e => {
	let ischeckedAppForRemove = document.querySelectorAll(`.appareil-21`);
	let appareil = localStorage.getItem(`List_Appareil`);
	let final = [];
	let list = [];

	for(let a of ischeckedAppForRemove) {
		if(a.checked === false) list.push(a.name);
		else if(a.checked === true) document.querySelector(`option.appareil-2_${a.name}`).remove();
	}

	JSON.parse(appareil).filter(b => {
		for(let val of list) {
			if(val === b.appareil) final.push(b);
		}
	});

	localStorage.setItem(`List_Appareil`, JSON.stringify(final));
	$(`appareil-16`).style.setProperty(`--pageList`, `none`);
	notif(`Appareil(s) supprimé`, `ok`);
});

$(`appareil-36`).addEventListener(`click`, e => {
	if(e.target.className === "appareil-36") {
		e.target.style.setProperty(`--pageList`, `none`);
		$(`appareil-39`).value = "";
	}
});

function genLine(line, node) {
	if(node.tagName === `DIV`) {
		let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));

		for(let [i, a] of Object.entries(appareil)) {
			if(a.appareil === $(`appareil-25`).textContent) {
				for(let [j, sub] of Object.entries(a.sub)) {
					for(let [table, val] of Object.entries(sub)) {
						if(table === "Trame") {
							if(node.textContent === "" && node.children.length === 0) {
								var br = document.createElement(`br`);
								br.innerHTML = "<br>";
								br.style.visibility = 0; 
								node.appendChild(br);
							}

							if(appareil[i].sub[0].Trame[line] === undefined) {
								appareil[i].sub[0].Trame.push({line: line, text: node.textContent, implement: [] });
							} else {
								appareil[i].sub[0].Trame[line].text = node.textContent;
							}							
						}
					}
				}
			}
		}
			
		localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));

		if(node.textContent.length !== 0 && node.textContent.trim()) {
			if(!/^\s+$/.test(node.textContent)) {
				node.classList.add(`test`);

				function context(e) {
					e.preventDefault();
					
					let styleContext = $(`appareil-context`).style;
						
					if(styleContext.getPropertyValue(`display`) === `none` || styleContext.getPropertyValue(`display`) === ``) {
						styleContext.display = `inline-grid`;

						let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));

						let d = new DocumentFragment();

						for(let [i, a] of Object.entries(appareil)) {
							if(a.appareil === $(`appareil-25`).textContent) {
								for(let [j, sub] of Object.entries(a.sub)) {
									for(let [table, val] of Object.entries(sub)) {
										if(table !== "Trame") {
											d.appendChild(Gen2({
												cont: `div`,
												data: [{ attrib: `class`, value: `appareil-option` }],
												sub: [{
													cont: `input`,
													data: [{ attrib: `class`, value: `appareil-option-1` }, { attrib: `type`, value: `checkbox` }, { attrib: `id`, value: `context_${table}`}, { attrib: `name`, value: `groupTable` }],
													event: [{
														func: e => {
															if(sub["Trame"][line].implement.length !== 0) {
																for(let a of sub["Trame"][line].implement) {
																	if(a === table) {
																		e.checked = true;
																	}
																}
															}
														}
													}, {
														type: `click`,
														func: e => {
															if(e.checked) {
																appareil[i].sub[0].Trame[line].implement.push(table);

																localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));
															} else {
																let initPlace = appareil[i].sub[0].Trame[line].implement;
																let place = initPlace.indexOf(table);

																initPlace.splice(place, 1);
																localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));
															}
														}
													}]
												}, {
													cont: `label`,
													data: [ { attrib: `for`, value: `context_${table}` }],
													text: table
												}]
											}));
										}
									}
								}
							}
						}

						$(`appareil-context`).appendChild(d);
					} else {
						for(let a of document.querySelectorAll(`.appareil-option`)) {
							a.remove();
						}

						styleContext.display = `none`;
					}
				}

				// node.removeEventListener(`contextmenu`, context, false);

				node.addEventListener(`contextmenu`, context);				
			}
		} else {
			if(node.classList.contains(`test`)) node.classList.remove(`test`);
		}
	} else {
		if(node.classList.contains(`test`)) node.classList.remove(`test`);
	}
}

function GenTable(w, x, y = null) {
	x.appendChild(Gen2({
		cont: `div`,
		data: [{ attrib: `class`, value: `configTable-1_${w}` }],
		sub: [{
			cont: `div`,
			data: [{ attrib: `class`, value: `configTable-5`}, { attrib: `title`, value: `Supprimé la ligne` }],
			sub: [{
				cont: `span`,
				text: `-`
			}],
		event: [{
			type: `dblclick`,
			func: f => {
				if(f.parentElement.classList.contains(`configTable-1_${w}`) === true) f.parentElement.remove();
				if(document.querySelector(`.configTable-1_${w}`) === null) GenTable(w, x);
			}
		}]
		}, {
			cont: `p`,
			data: [{ attrib: `contenteditable`, value: `true` }, { attrib: `class`, value: `configTable-2` }, { attrib: `info`, value: `pièce`}],
			event: [{
				func: f => {
					if(y !== null) {
						f.textContent = y[0].pièce;
					}
				}
			}, {
				type: `keydown`,
				func: (f, g) => {
					if(g.key === `Enter`) g.preventDefault();
				}
			}]
		}, {
			cont: `p`,
			data: [{ attrib: `contenteditable`, value: `true` }, { attrib: `class`, value: `configTable-2` }, { attrib: `info`, value: `panne`}],
			event: [{
				func: f => {
					if(y !== null) {
						let valContains = "";

						for(let c of y[1].panne) {
							valContains += c + `\n`;
						}
						
						f.innerText = valContains;
					}
				}
			}]
		}, {
			cont: `p`,
			data: [{ attrib: `contenteditable`, value: `true` }, { attrib: `class`, value: `configTable-2` }, { attrib: `info`, value: `ref`}],
			event: [{
				func: f => {
					if(y !== null) {
						f.textContent = y[2].ref;
					}
				}
			}, {
				type: `keydown`,
				func: (f, g) => {
					if(g.key === `Enter`) {
						g.preventDefault();
						GenTable(w, x);
					} else if(g.key === "ArrowLeft" || g.key === "ArrowRight" || g.keyCode === 9 || g.keyCode === 96 || g.keyCode === 97 || g.keyCode === 98 || g.keyCode === 99 || g.keyCode === 100 || g.keyCode === 101 || g.keyCode === 102 || g.keyCode === 103 || g.keyCode === 104 || g.keyCode === 105 || g.keyCode === 8 || g.keyCode === 49 || g.keyCode === 50 || g.keyCode === 51 || g.keyCode === 52 || g.keyCode === 53 || g.keyCode === 54 || g.keyCode === 55 || g.keyCode === 56 || g.keyCode === 57 || g.keyCode === 48) {
					} else g.preventDefault();
				}
			}]
		}]
	}))
}

function GenComm(w, x, y = null) {
	x.appendChild(Gen2({
		cont: `div`,
		data: [{ attrib: `class`, value: `configTable-9_${w}` }],
		sub: [{
			cont: `div`,
			data: [{ attrib: `class`, value: `configTable-11`}, { attrib: `title`, value: `Supprimé la ligne` }],
			sub: [{
				cont: `span`,
				text: `-`
			}],
		event: [{
			type: `dblclick`,
			func: f => {
				if(f.parentElement.classList.contains(`configTable-9_${w}`) === true) f.parentElement.remove();
				if(document.querySelector(`.configTable-9_${w}`) === null) GenComm(x);
			}
		}]
		}, {
			cont: `p`,
			data: [{ attrib: `contenteditable`, value: `true` }, { attrib: `class`, value: `configTable-10`}, { attrib: `info`, value: `commentaire`}],
			event: [{
				func: f => {
					if(y !== null) {
						f.textContent = y[0].commentaire;
					}
				}
			}, {
				type: `keydown`,
				func: (f, g) => {
					if(g.key === `Enter`) {
						g.preventDefault();
						GenComm(w, x);
					}
				}
			}]
		}]
	}))
}

function addTable(val, typeMode, prio = 0) {
	let x = new DocumentFragment();
	let y = new DocumentFragment();
	let clearSave1;
	let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));

	x.appendChild(Gen2({ 
		cont: `div`,
		data: [{
			attrib: `class`, value: `appareil-32`
		}],
		sub: [{ 
			cont: `h4`, 
			data: [{ 
				attrib: `class`, value: `appareil-28` 
			}, {attrib: `key`, value: val }],
			text: val,
			event: [{
				type: `click`,
				func: e => {
					for(let [i, a] of Object.entries(document.querySelectorAll(`.appareil-34`))) {
						a.style.display = `none`;
						$(`appareil-28`, i).style.removeProperty("border-bottom");
					}

					e.style.borderBottom = "1px solid #3877ff";
					document.querySelector(`.appareil-34[key="${val}"]`).style.display = `block`;
				}
			}]
			}, { 
				cont: `span`, 
				data: [{ 
					attrib: `class`, value: `appareil-33`
				}, {
					attrib: `title`, value: `Supprimé ${val}`
				}], 
				text: `-`,
				event: [{
					type: `dblclick`,
					func: (e, f) => {
						if(document.querySelector(`.appareil-34[key="${val}"]`).attributes.key.textContent === val) {
							for(let [i, v] of Object.entries(appareil)) {
								for(let line of appareil[i].sub[0]["Trame"]) {
									let sch = line.implement.indexOf(val);

									if(sch > -1) {
										appareil[i].sub[0]["Trame"][line].implement.splice(sch, 1);
									}
								}
								

								if($(`appareil-25`).textContent === v.appareil) {
									delete appareil[i].sub[0][val];
									
									localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));
								}						
							}
							document.querySelector(`.appareil-34[key="${val}"]`).remove();
							f.target.parentElement.remove();
							document.querySelector(`.appareil-28`).style.borderBottom = "1px solid #3877ff";
							document.querySelector(`.appareil-34[key="Trame"]`).style.display = `block`;
							notif(`La Table ${val} à bien été supprimé`, `info`);
						}
					}
				}]
			}
		]
	}))

	y.appendChild(Gen2({ 
		cont: `div`,
		data: [{ attrib: `class`, value: `appareil-34` }, {attrib: `key`, value: val }],
		event: [{
			func: e => {
				let cust = new DocumentFragment();

				if(val === "Trame") {
					cust.appendChild(Gen2({
						cont: `div`,
						data: [{ attrib: `class`, value: `appareil-40` }, { attrib: `contenteditable`, value: `true` }],
						event: [{
							func: e => {
								for(let a of appareil) {
									if(a.appareil === $(`appareil-25`).textContent) {
										let getLine = new DocumentFragment();
										
										for(let [i, v] of Object.entries(a.sub)) {
											for(let line of v[val]) {
												let genDiv =  document.createElement(`div`);
												
												if(line.text !== ``) {
													genDiv.textContent = line.text;
												}

												getLine.appendChild(genDiv);
											}
										}

										e.appendChild(getLine);

										if(e.textContent === "") genLine(0, e);
										for(let [i, v] of Object.entries(e.children)) genLine(Number(i), v);
									}
								}
							}
						}, {
							type: `keydown`,
							func: (e, event) => {
								// if(event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "ArrowRight") return;
								
								clearTimeout(clearSave1);

								clearSave1 = setTimeout(() => {
									let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));

									for(let [i, a] of Object.entries(appareil)) {
										if(a.appareil === $(`appareil-25`).textContent) {
											if(e.textContent === "") {
												appareil[i].sub[0].Trame = [{ line: 0, text: "vide", implement: [] }]; 
											} else {
												appareil[i].sub[0].Trame = [];
											}
										}
									}

									localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));

									if(e.textContent === "") {
										e.textContent = "vide";
										genLine(0, e);
									}
									for(let [i, v] of Object.entries(e.children)) genLine(Number(i), v);

									notif(`Sauvegarde de la Trame Sauvegardé`, `ok`);
								}, 2000);
							}
						}, {
							type: `auxclick`,
							func: (f, event) => {
								let context = $(`appareil-context`);

								if(context.style.getPropertyValue(`display`) === `none` || context.style.getPropertyValue(`display`) === ``) {
									context.style.top = event.clientY + "px";
									context.style.left = event.clientX  + "px";
								}
							}
						}]
					}));

					e.appendChild(cust);
				} else {
					if(typeMode) {
						let name = $(`appareil-25`).textContent;

						e.appendChild(Gen2({
							cont: `div`,
							data: [{ attrib: `class`, value: `configTable-8`}],
							sub: [{
								cont: `div`,
								data: [{ attrib: `class`, value: `configTable-12` }],
								sub: [{
									cont: `h4`,
									data: [{ attrib: `class`, value: `configTable-4` }],
									text: `Information`
								}]
							}, {
								cont: `div`,
								event: [{
									func: f => {
										for(let [i, v] of Object.entries(appareil)) {
											if(name === v.appareil) {
												if(appareil[i].sub[0][val] !== undefined) {
													if(appareil[i].sub[0][val][0].list !== undefined && appareil[i].sub[0][val][0].list.length !== 0) {
														for(let getVal of appareil[i].sub[0][val][0].list) GenComm(`${name}_${val}`, f, getVal);
													} else GenComm(`${name}_${val}`, f);
												} else GenComm(`${name}_${val}`, f);
											}
										}
									}
								}]
							}, {
								cont: `div`,
								data: [{ attrib: `class`, value: `configTable-6`}],
								sub: [{
									cont: `div`,
									data: [{ attrib: `class`, value: `appareil-20` }],
									sub: [{
										cont: `button`,
										data: [{ attrib: `class`, value: `configTable-7_${name}_${val}` }, { attrib: `title`, value: `Validé` }],
										text: `✓`,
										event: [{
											type: `click`,
											func: () => {
												let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));
												let arrayVal = [];

												for(let [i, a] of Object.entries(document.querySelectorAll(`.configTable-9_${name}_${val}`))) {
													let groupValue = [];

													for(let b of a.children) {
														if(b.classList.contains(`configTable-10`) === true) {
															let initTableValue = {};

															switch (b.attributes.info.textContent) {
																case `commentaire`:
																	if(b.textContent.length !== 0 && b.textContent.trim()) {
																		initTableValue[b.attributes.info.textContent] = b.textContent;
																	} else {
																		notif(`Ligne ${Number(i) +1}, Commentaire vide`, `erreur`);
																		return;
																	}
																	
																	break;
															}

															groupValue.push(initTableValue);
														}
													}

													arrayVal.push(groupValue);
												}

												
												for(let [i, v] of Object.entries(appareil)) {
													if(name === v.appareil) {
														delete appareil[i].sub[0][val][0].list;

														appareil[i].sub[0][val][0].list = arrayVal;

														localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));

														notif(`Les valeurs de la Table ${val} à bien été enregistré`, `ok`)
													}				
												}
											}
										}]
									}]
								}]
							}]
						}));
					} else {
						let name = $(`appareil-25`).textContent;

						e.appendChild(Gen2({
							cont: `div`,
							data: [{ attrib: `class`, value: `configTable-8`}],
							sub: [{
								cont: `div`,
								data: [{ attrib: `class`, value: `configTable-3` }],
								sub: [{
									cont: `h4`,
									data: [{ attrib: `class`, value: `configTable-4` }],
									text: `Pièce`
								}, {
									cont: `h4`,
									data: [{ attrib: `class`, value: `configTable-4` }],
									text: `Panne`
								}, {
									cont: `h4`,
									data: [{ attrib: `class`, value: `configTable-4` }],
									text: `Référence`
								}]
							}, {
								cont: `div`,
								event: [{
									func: f => {
										for(let [i, v] of Object.entries(appareil)) {
											if(name === v.appareil) {
												if(appareil[i].sub[0][val] !== undefined) {
													if(appareil[i].sub[0][val][0].list !== undefined && appareil[i].sub[0][val][0].list.length !== 0) {
														for(let getVal of appareil[i].sub[0][val][0].list) GenTable(`${name}_${val}`, f, getVal);
													} else GenTable(`${name}_${val}`, f);
												} else GenTable(`${name}_${val}`, f);
											}
										}
									}
								}]
							}, {
								cont: `div`,
								data: [{ attrib: `class`, value: `configTable-6`}],
								sub: [{
									cont: `div`,
									data: [{ attrib: `class`, value: `appareil-20` }],
									sub: [{
										cont: `button`,
										data: [{ attrib: `class`, value: `configTable-7_${name}_${val}` }, { attrib: `title`, value: `Validé` }],
										text: `✓`,
										event: [{
											type: `click`,
											func: () => {
												let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));
												let arrayVal = [];

												for(let [i, a] of Object.entries(document.querySelectorAll(`.configTable-1_${name}_${val}`))) {
													let groupValue = [];

													for(let b of a.children) {
														if(b.classList.contains(`configTable-2`) === true) {
															let initTableValue = {};

															switch (b.attributes.info.textContent) {
																case `pièce`:
																	if(b.textContent.length !== 0 && b.textContent.trim()) {
																		initTableValue[b.attributes.info.textContent] = b.textContent;
																	} else {
																		notif(`Ligne ${Number(i) +1}, Pièce vide`, `erreur`);
																		return;
																	}
																	
																	break;
																case `panne`:
																	let valueFormat = [];

																	if(b.textContent.length !== 0 && b.textContent.trim()) {
																		for(let c of b.innerText.split(`\n`)) {
																			if(c.length !== 0 && c.trim()) {
																				valueFormat.push(c);
																			}
																		}

																		initTableValue[b.attributes.info.textContent] = valueFormat;
																	} else {
																		notif(`Ligne ${Number(i) +1}, Panne vide`, `erreur`);
																		return;
																	}
																	
																	break;
																case `ref`:
																	if(Number(b.textContent) !== NaN) {
																		initTableValue[b.attributes.info.textContent] = b.textContent;
																	} else if(b.textContent.length === 0) {
																		initTableValue[b.attributes.info.textContent] = '';
																	} else {
																		notif(`Ligne ${Number(i) +1}, Référence doit contenir que des chiffres ou rien`, `erreur`);
																		return;
																	}
																	
																	break;
															}

															groupValue.push(initTableValue);
														}
													}

													arrayVal.push(groupValue);
												}

												for(let [i, v] of Object.entries(appareil)) {
													if(name === v.appareil) {
														delete appareil[i].sub[0][val][0].list;

														appareil[i].sub[0][val][0].list = arrayVal;

														localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));
														
														notif(`Les valeurs de la Table ${val} à bien été enregistré`, `ok`)
													}				
												}
											}
										}]
									}]
								}]
							}]
						}));
					}
				}

				if(prio === 1) {
					for(let [i, a] of Object.entries(document.querySelectorAll(`.appareil-34`))) {
						a.style.display = `none`;
						$(`appareil-28`, i).style.removeProperty("border-bottom");
					}

					x.querySelector(`.appareil-28[key="${val}"]`).style.borderBottom = "1px solid #3877ff";
					e.style.display = `block`;
				}
			}
		}]
	}));
	
	return [x, y];
}

$(`options-9`).addEventListener(`change`, e => {
	$(`appareil-25`).textContent = e.target.selectedOptions[0].value;
	$(`appareil-23`).style.setProperty(`--pageList`, `block`);
	$(`appareil-30`).addEventListener(`click`, () => {
		$(`appareil-36`).style.setProperty(`--pageList`, `block`);
	})

	let appareil = localStorage.getItem(`List_Appareil`);

	for(let val of JSON.parse(appareil)) {
		if(val.appareil === e.target.selectedOptions[0].value) {
			
			let x = new DocumentFragment();
			let y = new DocumentFragment();
			
			for(let [key, value] of Object.entries(val.sub)) {
				for(let [i, v] of Object.entries(value)) {
					let rtn = addTable(i, v[0].mode);

					x.appendChild(rtn[0]);
					y.appendChild(rtn[1]);
				}
			}

			$(`appareil-31`).appendChild(y);
			$(`appareil-27`).appendChild(x);
			
			for(let [i, a] of Object.entries(document.querySelectorAll(`.appareil-34`))) {
				a.style.display = `none`;
				$(`appareil-28`, i).style.removeProperty("border-bottom");
			}

			document.querySelector(`.appareil-28`).style.borderBottom = "1px solid #3877ff";
			document.querySelector(`.appareil-34[key="Trame"]`).style.display = `block`;

			break;
		}
	};
})

$(`appareil-39`).addEventListener(`keydown`, e => {
	if(e.key === `Enter`) {
		e.preventDefault();

		let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));
		let valueName = e.target.value;
		let confirmName = checkedListAppareil(valueName, "sub");

		if(confirmName.statut) {
			$(`appareil-36`).style.setProperty(`--pageList`, `none`);
			
			let rtn = addTable(valueName,  $(`options-19`).checked, 1);

			$(`appareil-31`).appendChild(rtn[1]);
			$(`appareil-27`).appendChild(rtn[0]);

			for(let [key, val] of Object.entries(appareil)) {
				if(val.appareil === $(`appareil-25`).textContent) {
					appareil[key].sub[0][valueName] = [{mode: $(`options-19`).checked, list: []}];
				}
			}

			localStorage.setItem(`List_Appareil`, JSON.stringify(appareil));
			
			notif(`La Table ${valueName} ajouté`, `ok`);
			$(`options-19`).checked = false;
		} else {
			notif(`La Table ${valueName} déjà existant`, `erreur`);
		}
		
		e.target.value = "";
	}
});

// $(`appareil-10`).addEventListener(`click`, () => {
// 	let valApp = $(`appareil-44`);

// 	if(valApp.children.length !== 0) {
// 		while (valApp.firstChild) valApp.removeChild(valApp.firstChild);
// 	}

// 	$(`appareil-41`).style.setProperty(`--pageList`, `block`);

// 	let appareil = localStorage.getItem(`List_Appareil`);
// 	let x = new DocumentFragment();

// 	for(let a of JSON.parse(appareil)) x.appendChild(Gen2({ cont: `div`, sub: [{ cont: `input`, data: [{ attrib: `type`, value: `checkbox`}, { attrib: `class`, value: `appareil-47` }, { attrib: `id`, value: `rmApp-${a.appareil}`}, { attrib: `name`, value: a.appareil}]}, { cont: `label`, data: [{ attrib: `for`, value: `rmApp-${a.appareil}`}], text: a.appareil}]}))

// 	valApp.appendChild(x);
// });

// $(`appareil-46`).addEventListener(`click`, e => {
// 	let ischeckedAppForRemove = document.querySelectorAll(`.appareil-47`);
// 	let appareil = localStorage.getItem(`List_Appareil`);
// 	let final = [];
// 	let list = [];

// 	for(let a of ischeckedAppForRemove) {
// 		if(a.checked === true) {
// 			list.push(a.name);
// 		}
// 	}

// 	JSON.parse(appareil).filter(b => {
// 		for(let val of list) {
// 			if(val === b.appareil) final.push(b);
// 		}
// 	});

// 	if(final.length === 0) {
// 		notif(`Aucune Table sélectionné`, `info`);

// 		return;
// 	}

// 	$(`appareil-41`).style.setProperty(`--pageList`, `none`);

// 	ipcRenderer.send('export', JSON.stringify(final));
// });

ipcRenderer.on('infoImportExport', (event, arg) => {
	notif(arg.msg, arg.type);
});

// $(`appareil-11`).addEventListener(`click`, () => {
// 	ipcRenderer.send('import');
// });

let stockParseTemp;

ipcRenderer.on('returnImport', (event, arg) => {
	let parse;

	try {
        parse = JSON.parse(arg);
		stockParseTemp = parse;
    } catch (e) {
		notif(`Le fichier n'est pas codé en format JSON\n ${e}`, `erreur`);
        return;
    }

	let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));
	let x = new DocumentFragment();
	let valApp = $(`appareil-51`);

	if(valApp.children.length !== 0) {
		while (valApp.firstChild) valApp.removeChild(valApp.firstChild);
	}
	
	for(let a of parse) {
		x.appendChild(Gen2({cont: `div`, sub: [{ cont: `input`, data: [{ attrib: `type`, value: `checkbox`}, { attrib: `checked`, value: `true`}, { attrib: `class`, value: `appareil-54` }, { attrib: `id`, value: `impApp-${a.appareil}`}, { attrib: `name`, value: a.appareil}]}, { cont: `label`, data: [{ attrib: `for`, value: `impApp-${a.appareil}`}], text: a.appareil, 
		event: [{
			func: e => {
				for(let b of appareil) {
					if(b.appareil === a.appareil) {
						e.appendChild(Gen2({
							cont: `span`,
							data: [{ attrib: `class`, value: `appareil-55`}],
							text: `⚠ (Déjà présent)`
						}))
					}
				}
			}
		}]}]}));
	}

	valApp.appendChild(x);
	$(`appareil-48`).style.setProperty(`--pageList`, `block`);
});

// $(`appareil-53`).addEventListener(`click`, () => {
// 	let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));
// 	let obj = {cnt : 0, list: []};
// 	var appareilFilter = [];
// 	let stop = 0;

// 	for(let a of $(`appareil-51`).children) {
// 		if(a.children[0].checked === true) {
// 			obj.cnt += 1;

// 			for(let b of stockParseTemp) {
// 				if(b.appareil === a.children[0].name) {
// 					obj.list.push(b);
// 				}
// 			}
// 		}
// 	}

// 	if(obj.cnt === 0) {
// 		notif(`Auncun élément sélectionné.`, `info`);
// 		return;
// 	}
	
// 	// add verif if empty appareil
// 	for(let d of appareil) {
// 		appareilFilter.push(d);
// 	}
	
// 	for(let b of obj.list) {
// 		for(let [c, a] of Object.entries(appareilFilter)) {
// 			if(a.appareil.indexOf(b.appareil) !== -1) {
// 				appareilFilter[c] = b;
// 				break;
// 			} else if(a.appareil.indexOf(b.appareil) === -1) {
// 				for(let e of appareilFilter) if(e.appareil === b.appareil) {
// 					stop = 1;
// 				}
				
// 				if(stop === 0) appareilFilter.push(b);
// 				break;
// 			}
// 		}
// 	}

// 	console.info(appareilFilter)
// })

// Liste à Servir

let ifLocalGet3 = localStorage.getItem('Pièces');

if(ifLocalGet3 === null) {
	const defautIpPathLAS = { Name: ``, Atelier: `HP LaserJet M506 PCL 6`, Magasin: `Liste a Servir`, PathBDD: `C:/Users/${os.userInfo().username}/Vorwerk & Co. KG/Repair - PROD/LISTE_A_SERVIR/APPLI/Bddpieces.xlsm` };
	
	localStorage.setItem('Pièces', JSON.stringify(defautIpPathLAS));
	
	$(`options-16`).value = defautIpPathLAS.Atelier;
	$(`options-17`).value = defautIpPathLAS.Magasin;
	$(`options-21`).value = defautIpPathLAS.PathBDD;
	$(`options-22`).value = defautIpPathLAS.Name;
} else {
	let parse = JSON.parse(ifLocalGet3);
	
	$(`options-16`).value = parse.Atelier;
	$(`options-17`).value = parse.Magasin;
	$(`options-21`).value = parse.PathBDD;
	$(`options-22`).value = parse.Name
};

let clearSave1;

$(`options-22`).addEventListener(`keydown`, e => {
	clearTimeout(clearSave1);

	clearSave1 = setTimeout(() => {
		let pieces = JSON.parse(localStorage.getItem(`Pièces`));

		pieces.Name = e.target.value.toString();

		localStorage.setItem(`Pièces`, JSON.stringify(pieces));
		notif(`Nom sauvegardé`, `ok`);
	}, 2000);
});

let clearSave2;

$(`options-16`).addEventListener(`keydown`, e => {
	clearTimeout(clearSave2);

	clearSave2 = setTimeout(() => {
		let pieces = JSON.parse(localStorage.getItem(`Pièces`));

		pieces.Atelier = e.target.value.toString();

		localStorage.setItem(`Pièces`, JSON.stringify(pieces));
		notif(`Imprimante Atelier sauvegardé`, `ok`);
	}, 2000);
});

let clearSave3;

$(`options-17`).addEventListener(`keydown`, e => {
	clearTimeout(clearSave3);

	clearSave3 = setTimeout(() => {
		let pieces = JSON.parse(localStorage.getItem(`Pièces`));

		pieces.Magasin = e.target.value.toString();

		localStorage.setItem(`Pièces`, JSON.stringify(pieces));
		notif(`Imprimante Magasin sauvegardé`, `ok`);
	}, 2000);
});

let clearSave4;

$(`options-21`).addEventListener(`keydown`, e => {
	clearTimeout(clearSave4);

	clearSave4 = setTimeout(() => {
		let pieces = JSON.parse(localStorage.getItem(`Pièces`));

		pieces.PathBDD = e.target.value.toString();

		localStorage.setItem(`Pièces`, JSON.stringify(pieces));
		notif(`Chemin sauvegardé`, `ok`);
	}, 2000);
});

$(`options-23`).addEventListener(`click`, () => ipcRenderer.send('reloadBDD'));