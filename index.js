import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import schema from './graphql/schema.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import { Gpio } from 'pigpio';
const dht = require('pigpio-dht');
const admin = require('firebase-admin');

let serAccount = require('./pushKey/findpet-59545-firebase-adminsdk-y60y5-3a2a8b545b.json');
admin.initializeApp({
  credential: admin.credential.cert(serAccount),
})
let controlObject = {
  waveEngine: false,
  engineId: null
};
let password = '1260';
let tokens = [];
const server = new GraphQLServer({
  typeDefs: schema,
  resolvers,
  context: { bcrypt, jwt, admin, controlObject, password, tokens }
});

const httpsOptions = {
  ca: fs.readFileSync('../cert/ca_bundle.crt'),
  key: fs.readFileSync('../cert/private.key'),
  cert: fs.readFileSync('../cert/certificate.crt'),
};

const options = {
  port: 4000,
  https: httpsOptions
}




server.express.use(bodyParser.json());
server.start(options, (async () => {
  console.log('Graphql-express for RP server is running');
  try {

    const dataPin = 5;
    const dhtType = 11; //optional
    const sensor = dht(dataPin, dhtType);
    
    setInterval(() => { 
        sensor.read((d)=>console.log(d));
    }, 2500); // the sensor can only be red every 2 seconds
    

    sensor.on('end', data => {
      console.log(data);
  });

  sensor.on('start', data => {
    console.log(data);
});

    sensor.on('result', data => {
        console.log(data);
        console.log(`temp: ${data.temperature}°c`); 
        console.log(`rhum: ${data.humidity}%`); 
    });
    
    sensor.on('badChecksum', () => {
        console.log('checksum failed');
    });
   
  } catch (err) {
    console.log(err);

  }
}));