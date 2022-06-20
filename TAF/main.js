const { app, BrowserWindow, ipcMain, globalShortcut, clipboard, dialog } = require('electron');
const { localStorage } = require('electron-browser-storage');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

app.allowRendererProcessReuse = true;

let win, zin;
app.mainWindow = win;

async function readXmlBDDPieces(reload = 0) {
	let pieces = await localStorage.getItem('Pièces');
	let loadBDD = JSON.parse(pieces);
	let erreur = ``;
	const group = new Set();
	let version = `NaN`;

	try {
		const workbook = xlsx.readFile(loadBDD.PathBDD);
		const worksheet = workbook.Sheets["LISTE"];
		const listColumn = ["ref", "nom pieces", "produits"];
		const filtre = [];
		version = worksheet['F5'].w;;
		

		for(let a of listColumn) {
			for(let z in worksheet) {
				if(/^[A-Z]1$/.test(z)) {
					if(a === worksheet[z].w) {
						filtre.push({word : a, column: z});
						break;
					};
				}
			}
		}

		const uniqueValuesSet = new Set();
		const filteredArr = filtre.filter(obj => {
			const isPresentInSet = uniqueValuesSet.has(obj.word);

			uniqueValuesSet.add(obj.word);

			return !isPresentInSet;
		});

		let obj = {};

		for(let [z, v] of Object.entries(worksheet)) {
			for(let [b, a] of Object.entries(filteredArr)) {
				if(z.toString()[0] === a.column[0] && !/^[A-Z]1$/.test(z)) {
					if(/[0-9]{1,}/.test(z)) {
						let reg = new RegExp(/^[A-Z](.*?)$/, "gi");
						let rr = z.split(reg);

						obj[`${a.column}`] = v.w;

						group[rr[1]] = obj;

						if(b === (filteredArr.length -1).toString()) {
							obj = {};
						}
					}
				}
			}
		}
	} catch (e) {
		erreur = e;
	}

	if(reload === 1) {
		if(erreur.length !== 0) return {msg: JSON.stringify(erreur), version: version, reload: reload};
		else return {msg: JSON.stringify(group), version: version, reload: reload};
	}

	ipcMain.on('getVal', (event, arg) => {
		if(erreur.length !== 0) event.reply('valXmlBDD', {msg: JSON.stringify(erreur), version: version, reload: reload});
		else event.reply('valXmlBDD', {msg: JSON.stringify(group), version: version, reload: reload});
	});
}

function initApp() {
	zin = new BrowserWindow({
		width: 300,
        height: 300,
		show: false,
		resizable: false,
		movable: false,
		type: 'toolbar',
		alwaysOnTop: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true
		}
	});

	zin.once('show', initPresentation);
	zin.loadURL(`file://${__dirname}/src/app/load/load.html`);

	zin.once('ready-to-show', async () => {
		await zin.show();
		await readXmlBDDPieces();

		win.webContents.once('dom-ready', () => {
			win.once('ready-to-show', async () => {
				await zin.hide();
				await zin.close();
				win.show();
			});
		});
	});
}

function resetRaccourcieRegister(val, i = 0) {
	if(i === 0) {
		globalShortcut.unregister('Alt+c'); //test
		globalShortcut.register('Alt+c', () => {
			clipboard.writeText(val);
			globalShortcut.unregister('Alt+c');
		});
	} else if(i === 1) {
		globalShortcut.unregister('Alt+v'); //test
		globalShortcut.register('Alt+v', () => {
			clipboard.writeText(val);
			globalShortcut.unregister('Alt+v');
		});
	}
}

function initPresentation() {
	win = new BrowserWindow({
		width: 1200,
        height: 600,
		show: false,
		frame: true,
		resizable: true,
		movable: true,
		autoHideMenuBar: true,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true
		}
	});
		
	win.on('closed', () => {
		win = null
	});
	
	win.loadURL(`file://${__dirname}/src/index.html`);

	ipcMain.on('autoStart', (event, arg) => {
		app.setLoginItemSettings({ openAtLogin: arg });
	});

	ipcMain.on('copy', (event, arg) => {
		let json = JSON.parse(arg);
	
		//ctrl+V
		clipboard.writeText(json.trame);

		//ctrl+shift+C
		resetRaccourcieRegister(json.tableau);

		//ctrl+shift+V
		resetRaccourcieRegister(json.indicateur, 1);
	});

	ipcMain.on('reloadBDD', async (event, arg) => {
		let getInfo = await readXmlBDDPieces(1);
		
		event.reply('valXmlBDD', getInfo);
	})

	function imprimanteMag(ev, mag) {
		if(decompPieces.Magasin.length !== 0) {
			const options = {
				silent: true,
				printBackground: true,
				deviceName: mag,
				pageSize: 'A4'
			}

			win.webContents.print(options, (success, errorType) => {
				if (!success) throw ev.reply('printerInfo', {msg: errorType, type: 'erreur'});
				ev.reply('printerInfo', {msg: 'Impréssion Magasin réussie', type: 'ok'});
			});
		} else ev.reply('printerInfo', {msg: `Imprimante Magasin vide`, type: 'info'});
	}

	async function listPrinter(ev) {
		let pieces = await localStorage.getItem('Pièces');
		decompPieces = JSON.parse(pieces);
		
		if(decompPieces.Atelier.length !== 0) {
			const options = {
				silent: true,
				printBackground: true,
				deviceName: decompPieces.Atelier,
				pageSize: 'A4'
			}

			win.webContents.print(options, (success, errorType) => {
				if (!success) throw ev.reply('printerInfo', {msg: errorType, type: 'erreur'});
				ev.reply('printerInfo', {msg: 'Impréssion Atelier réussie', type: 'ok'});
	
				imprimanteMag(ev, decompPieces.Magasin);
			});
		} else {
			ev.reply('printerInfo', {msg: `Imprimante Atelier vide`, type: 'info'});
			imprimanteMag(ev, decompPieces.Magasin);
		}
	}

	ipcMain.on('printer', (event, arg) => listPrinter(event));

	ipcMain.on('export', (event, arg) => {
		let date = new Date();

		dialog.showSaveDialog({
			title: "Sauvegardé sous",
			defaultPath: `Tableau ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}H${date.getMinutes()}.json`,
		}).then(result => {
			if(!result.canceled) {
				fs.writeFile(result.filePath, arg, 'utf8', err => {
					if(err) throw event.reply('infoImportExport', {msg: err, type: 'erreur'});
					event.reply('infoImportExport', {msg: 'Exportation réussie', type: 'ok'});
				})
			} else {
				event.reply('infoImportExport', {msg: 'Exportation annulé', type: 'erreur'});
			}
		}).catch(err => {
			event.reply('infoImportExport', {msg: err, type: 'erreur'});
		})
	});

	ipcMain.on('import', (event, arg) => {
		dialog.showOpenDialog({
			title: "Importation",
			properties: ["openFile"]
		}).then(result => {
			if(!result.canceled) {
				fs.readFile(result.filePaths[0], 'utf8', (err, data) => {
					if(err) throw event.reply('infoImportExport', {msg: err, type: 'erreur'});
					event.reply('returnImport', data);
				  });
			} else {
				event.reply('infoImportExport', {msg: 'Importation annulé', type: 'erreur'});
			}
		}).catch(err => {
			event.reply('infoImportExport', {msg: err, type: 'erreur'});
		})
	});
}

app.whenReady().then(initApp);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		initApp()
	}
});