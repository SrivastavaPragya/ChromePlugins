import express from 'express';
import fs from "fs";
import path from 'path';
import { dataFolderName } from './constants.js'


const __dirname = path.resolve();


const startHttpServer = () => {
  const app = express();
  app.use(express.static('public'));

  app.get('/rrweb-events', (req, res) => {
    res.sendFile((__dirname + '/public/rrweb_events.html'));
  });

  // Nested routing (api/rrweb_events) is a bit tricky, leaving for the take home assignment
  app.get('/api-rrweb-events', (req, res) => {
    const { id } = req.query; // Extract id from query parameter
    if (!id) {
      return res.status(400).send('ID is required');
    }
    try {
      const data = fetchRrwebEvents(id);
      return res.json(data);
    } catch (error) {
      return res.status(404).send('Data not found');
    }
  });
  

  const port = 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}
const fetchRrwebEvents = (id) => {
  const dataFilePath = path.join(dataFolderName, `data_${id}.json`); // Ensure .json extension is included
  try {
    if (!fs.existsSync(dataFilePath)) {
      throw new Error('File does not exist');
    }
    const rrwebEvents = fs.readFileSync(dataFilePath, 'utf-8');
    return rrwebEvents.split("\n").filter(line => line.length > 0).map(line => JSON.parse(line));
  } catch (error) {
    throw error; // Rethrow the error to be caught by the calling function
  }
}

export {
  startHttpServer
}





