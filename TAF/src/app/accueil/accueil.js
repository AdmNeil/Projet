import { $, Gen2, notif } from '../core.js';
const { ipcRenderer } = require('electron');

//bug chronium

$(`nav-2`).appendChild(Gen2({cont: `option`}));

////

function initTableau(...args) {

	for(let a of args) {
		a.trame.value = ``;

		if(a.listTableau.childElementCount !== 0) {
			let val = a.listTableau;

			while (val.firstChild) val.removeChild(val.firstChild);
		}

		if(a.listRef.childElementCount !== 0) {
			let val = a.listRef;

			while (val.firstChild) val.removeChild(val.firstChild);
		}
	}

}

function GenTableau(list) {
	let trame = $(`accueil-6`);
	let listTableau = $(`accueil-8`);
	let listRef = $(`accueil-list`);
	let implement = [];

	initTableau({trame: trame, listTableau: listTableau, listRef: listRef});

	for(let a of list.sub) {

		// Trame
		for(let b of a.Trame) {
			const regex = new RegExp(`\xa0`, 'g');
			
			if(regex.test(b.text)) {
				b.text = b.text.replace(regex, ` `);
			}

			if(b.implement.length !== 0) {
				implement.push({text: b.text, groupe: b.implement});
			}

			trame.value += b.text + `\n`;
		}

		//List
		for(let [k, b] of Object.entries(a)) {
			if(k !== `Trame`) {
				listTableau.appendChild(Gen2({ cont: `h4`, data: [{ attrib: `class`, value: `accueil-19`}],
				event: [{
					type: `click`,
					func: e => {
						for(let f of document.querySelectorAll(`.accueil-19`)) f.style.removeProperty("border-bottom");

						e.style.borderBottom = "1px solid #3877ff";

						let val = document.querySelectorAll(`.accueil-20[infoListTableau]`);

						for(let c of val) {
							if(c.attributes.infoListTableau.textContent === k) {
								c.style.display = `block`;
							} else {
								c.style.display = `none`;
							}
						}
					}
				}], text: k }));

				//ref pièce
				listRef.appendChild(Gen2({
					cont: `div`,
					data: [{ attrib: `class`, value: `accueil-20`}, { attrib: `infoListTableau`, value: k}],
					event: [{
						func: e => {
							for(let c of b[0].list) {
								if(b[0].mode === false) {
									e.appendChild(Gen2({
										cont: `div`,
										data: [{ attrib: `class`, value: `accueil-9`}],
										sub: [{
											cont: `input`,
											data: [{ attrib: `class`, value: `accueil-10`}, { attrib: `type`, value: `checkbox` }, { attrib: `id`, value: `${k}_${c[0].pièce}`}],
											event: [{
												type: `click`,
												func: (_, f) => {
													if(f.target.checked === false) {
														let trames = trame.value;
														let reg = new RegExp(`\r?\n?- ${c[0].pièce} \((.+)\)`, `ig`);
														let modif = trames.replace(reg, ``);

														trame.value = modif;
													} else if(f.target.checked === true) {
														let acc20 = document.querySelector(`.accueil-20[infolisttableau="infoPanne"]`);

														if(acc20.style.getPropertyValue(`display`) === `none` || acc20.style.getPropertyValue(`display`) === ``) {
															for(let g of c[1].panne) {
																acc20.appendChild(Gen2({
																	cont: `div`,
																	data: [{ attrib: `class`, value: `accueil-22`}],
																	sub: [{
																		cont: `input`,
																		data: [{ attrib: `class`, value: `accueil-23`}, { attrib: `type`, value: `checkbox` }, { attrib: `id`, value: `${k}_${c[0].pièce}_${g}`}],
																		event: [{
																			type: `click`,
																			func: () => {
																				acc20.style.display = `none`;

																				if(implement.length === 0) notif(`Aucun rôle n'à été ajouté`, `info`);
																				else {
																					for(let a of implement) {
																						for(let b of a.groupe) {
																							if(k === b) {
																								let trames = trame.value;
																								let modif = trames.replace(a.text, `${a.text}\r\n- ${c[0].pièce} (${g})`);

																								trame.value = modif;
																							}
																						}
																					}
																				}
												
																				if(acc20.childElementCount !== 0) {
																					while(acc20.firstChild) acc20.removeChild(acc20.firstChild);
																				}

																				e.style.display = `block`;
																			}
																		}]
																	}, {
																		cont: `label`,
																		data: [{ attrib: `class`, value: `accueil-24`}, { attrib: `for`, value: `${k}_${c[0].pièce}_${g}`}],
																		text: g
																	}]
																}));
															}

															e.style.display = `none`;
															acc20.style.display = `block`;
														} else {
															acc20.style.display = `none`;
															e.style.display = `block`;

															//fonctionne??
															// if(acc20.childElementCount !== 0) {
															// 	while(acc20.firstChild) acc20.removeChild(acc20.firstChild);
															// }
														}
													}
												}
											}]
										}, {
											cont: `label`,
											data: [{ attrib: `class`, value: `accueil-11`}, { attrib: `for`, value: `${k}_${c[0].pièce}`}],
											text: c[0].pièce
										}],
										event: [{
											func: f => {
												if(c[2].ref !== "") {
													f.appendChild(Gen2({
														cont: `span`,
														data: [{ attrib: `class`, value: `accueil-13`}, { attrib: `title`, value: c[2].ref }],
														text: `?`
													}));
												}
											}
										}]
									}));
								} else if(b[0].mode === true) {
									e.appendChild(Gen2({
										cont: `div`,
										data: [{ attrib: `class`, value: `accueil-9`}],
										sub: [{
											cont: `input`,
											data: [{ attrib: `class`, value: `accueil-10`}, { attrib: `type`, value: `checkbox` }, { attrib: `id`, value: `${k}_${c[0].commentaire}`}],
											event: [{
												type: `click`,
												func: (_, f) => {
													if(f.target.checked === false) {
														let trames = trame.value;
														let reg = new RegExp(`\r?\n?\\* ${c[0].commentaire}`, `i`);
														let modif = trames.replace(reg, ``);

														trame.value = modif;
													} else if(f.target.checked === true) {
														if(implement.length === 0) notif(`Aucun rôle n'à été ajouté`, `info`);
														else {
															for(let a of implement) {
																for(let b of a.groupe) {
																	if(k === b) {
																		let trames = trame.value;
																		let modif = trames.replace(a.text, `${a.text}\r\n* ${c[0].commentaire}`);

																		trame.value = modif;
																	}
																}
															}
														}
													}
												}
											}]
										}, {
											cont: `label`,
											data: [{ attrib: `class`, value: `accueil-11`}, { attrib: `for`, value: `${k}_${c[0].commentaire}`}],
											text: c[0].commentaire
										}]
									}));
								}
							}
						}
					}]
				}))
			}
		}

		$(`accueil-19`).style.borderBottom = "1px solid #3877ff";

		listRef.appendChild(Gen2({
			cont:  `div`,
			data: [{ attrib: `class`, value: `accueil-20`}, { attrib: `infoListTableau`, value: `infoPanne` }]
		}));
	}
}

let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));

if(appareil.length !== 0) {
	for(let [key, val] of Object.entries(appareil)) {
		$(`nav-2`).appendChild(Gen2({
			cont: `option`,
			text: val.appareil,
			data: [{ attrib: `value`, value: val.appareil }],
			event: [{
				func: e => {
					if(val.appareil === appareil[0].appareil) {
						e.selected = true;
					}
				}
			}]
		}));

		if(val.appareil === appareil[0].appareil) GenTableau(val);
	}
} else notif(`Aucun appareil disponible\nLa liste est vide.`, `erreur`);

$(`nav-2`).addEventListener(`change`, e => {
	let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));

	for(let [key, val] of Object.entries(appareil)) {
		if(val.appareil === e.target.value) GenTableau(val);
	}
})

$(`nav-1`, 1).addEventListener(`click`, () => {
	let appareil = JSON.parse(localStorage.getItem(`List_Appareil`));

	for(let [key, val] of Object.entries(appareil)) {
		if(val.appareil === $(`nav-2`).value) GenTableau(val);
	}
})

$(`nav-1`).addEventListener(`click`, () => {
	let trame = $(`accueil-6`).value;
	let tableau = "";
	let indicateur = "";
	let countElement = 0;

	for(let a of document.querySelectorAll(`.accueil-9 > .accueil-10[type=checkbox]:checked`)) {
		if(a.parentElement.querySelector(`.accueil-13[title]`)) {
			let b = a.parentElement.querySelector(`.accueil-13[title]`).attributes.title.textContent;
			tableau += `Changement (pièce)				${b}\n`;
			indicateur += `							10	100\n`;
			countElement += 1;
		}
	}

	ipcRenderer.send('copy', JSON.stringify({trame: trame, tableau: tableau, indicateur: indicateur}));

	notif(`Nombre de ligne: ${countElement}`, `info`);
	notif(`Copié`, `ok`);
});