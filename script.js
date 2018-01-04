const electron = require('electron');

const { ipcRenderer } = electron;

const submitForm = event => {
  event.preventDefault();

  const { path } = document.querySelector('input').files[0];

  ipcRenderer.send('video:SUBMIT', path);
};

ipcRenderer.on('video:METADATA', (event, duration) => {
  document.querySelector('#result').innerHTML = `Video is ${duration} seconds.`;
});

document.querySelector('form').addEventListener('submit', submitForm);
