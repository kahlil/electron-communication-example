const path = require('path');
const ipc = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow;
const openSecondWindowButton = document.getElementById('open-second-window');

ipc.on('messageFromMain', (event, message) => {
	console.log(`This is the message from the second window sent via main: ${message}`);
});

openSecondWindowButton.addEventListener('click', (event) => {
	let win = new BrowserWindow({width: 400, height: 275});
  	win.webContents.on('did-finish-load', () => {
		win.webContents.send('message', 'This is a message from the renderer process to the second window.')
	});
	win.webContents.openDevTools();
  	win.on('close', () => {
    	win = null;
  	});
  	win.loadURL(path.join('file://', process.cwd(), 'index-2.html'));
  	win.show();
});
