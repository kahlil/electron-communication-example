ipc = require('electron').ipcRenderer;
ipc.on('message', (event, message) => console.log(message));

const sendMessageButton = document.getElementById('send-message');

sendMessageButton.addEventListener('click', event => {
	ipc.send('reply', `Send message from second window to renderer via main.`);
	window.close();
});
