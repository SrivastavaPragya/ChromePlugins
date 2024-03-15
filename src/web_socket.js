import { WebSocketServer } from 'ws';
import fs from 'fs-extra';
import { dataFolderName } from './constants.js';
import path from 'path';

let id = 0; // Initialize id to 0
const urlToIdMap = new Map();

const startWebSocketServer = () => {
  fs.ensureDirSync(dataFolderName);
  const wss = new WebSocketServer({ port: 3008 });

  wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');
    ws.on('message', (message) => {
      const payload = JSON.parse(message.toString());
      processPayload(payload);
    });
  });
};

const processPayload = (payload) => {
  const { type, url, data } = payload;

  if (type !== 'rrweb events') {
    return;
  }

  if (!urlToIdMap.has(url)) {
    id += 1; // Increment ID for each new URL
    urlToIdMap.set(url, id);
  }

  const currentId = urlToIdMap.get(url);
  const dataFilePath = path.join(dataFolderName, `data_${currentId}.json`);
  
  fs.ensureFileSync(dataFilePath); // Ensure the file exists
  fs.appendFileSync(dataFilePath, JSON.stringify(data) + '\n'); // Append the data to the file
};

export { startWebSocketServer };