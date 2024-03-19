'use strict';

const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mongodb = require('mongodb');
const path = require('path');
const sendPostRequest = require('request').post;
const colors = require('colors/safe');

const app = express();
const MongoClient = mongodb.MongoClient;
const port = 4000;
const mongoURL = 'mongodb://vboyce:vboyce@localhost:2999/firstcrankreplication';
const handlers = {};


function makeMessage(text) {
  return `${colors.blue('[store]')} ${text}`;
}

function log(text) {
  console.log(makeMessage(text));
}

function error(text) {
  console.error(makeMessage(text));
}

function failure(response, text) {
  const message = makeMessage(text);
  console.error(message);
  return response.status(500).send(message);
}

function success(response, text) {
  const message = makeMessage(text);
  console.log(message);
  return response.send(message);
}

function mongoConnectWithRetry(delayInMilliseconds, callback) {
  MongoClient.connect(mongoURL, (err, connection) => {
    if (err) {
      console.error(`Error connecting to MongoDB: ${err}`);
      setTimeout(() => mongoConnectWithRetry(delayInMilliseconds, callback), delayInMilliseconds);
    } else {
      log('connected succesfully to mongodb');
      callback(connection);
    }
  });
}

// // this function isn't currently being used, but might be once there are >1 databases
// function getDatabaseList(connection, callback) {
//    connection.admin().listDatabases(function(err, result) {
//       if (err) {
//         console.error('Error listing databases from this MongoDB connection');
//       } else {
//         log('success: got list of databases from this mongo connection')
//         callback(result.databases);
//       }
//    })
// }

// // also not being used, but might be later to scale to new db/cols
// function getCollectionList(db, callback) {
//     db.listCollections().toArray(function(err, collections) {
//         // collections is an array of collection info objects that look like:
//         // { name: 'test', options: {} }
//         if (err) {
//           console.error(`Error retrieving collections: ${err}`)
//         } else {
//           log('success: retrieved collection information from this database');
//           callback(collections);
//         }
//     });
// }




function serve() {

  mongoConnectWithRetry(2000, (connection) => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/db/exists', (request, response) => {            

      if (!request.body) {
        return failure(response, '/db/exists needs post request body');
      }
      const databaseName = request.body.dbname;
      const database = connection.db(databaseName);
      const query = request.body.query;
      const projection = request.body.projection;

      var collectionList = ['sketchpad','sketchpad_repeated']; // hardcoded for now

      function checkCollectionForHits(collectionName, query, projection, callback) {
        const collection = database.collection(collectionName);        
        collection.find(query, projection).limit(1).toArray((err, items) => {          
          callback(!_.isEmpty(items));
          });  
      }

      function checkEach(collectionList, checkCollectionForHits, query, projection, evaluateTally) {
          var doneCounter = 0
          var results = 0;          
          collectionList.forEach(function (collectionName) {
              checkCollectionForHits(collectionName, query, projection, function (res) {
              log(`got request to find_one in ${collectionName} with` +
                ` query ${JSON.stringify(query)} and projection ${JSON.stringify(projection)}`);          
                  doneCounter += 1;
                  results+=res;
                  if (doneCounter === collectionList.length) {
                      evaluateTally(results);
                  }
              });
          });
      }
      function evaluateTally(hits) {
        console.log("hits: ", hits);
        response.json(hits>0);
      }

      checkEach(collectionList, checkCollectionForHits, query, projection, evaluateTally);

    });


    ////// original implementation to check within specific database
    // app.post('/db/exists', (request, response) => {      
    //   if (!request.body) {
    //     return failure(response, '/db/exists needs post request body');
    //   }
    //   const databaseName = request.body.dbname;
    //   const collectionName = request.body.colname;
    //   if (!collectionName) {
    //     return failure(response, '/db/exists needs collection');
    //   }
    //   if (!databaseName) {
    //     return failure(response, '/db/exist needs database');
    //   }

    //   const database = connection.db(databaseName);
    //   console.log(request.body);
    //   const query = request.body.query;
    //   const projection = request.body.projection;
    //   const collection = database.collection(collectionName);

    //   log(`got request to findOne in ${collectionName} with` +
    //       ` query ${JSON.stringify(query)} and projection ${JSON.stringify(projection)}`);
    //   collection.find(query, projection).limit(1).toArray((err, items) => {
    //     console.log('got items ' + JSON.stringify(items));
    //     response.json(!_.isEmpty(items));
    //   });
    // });

    // app.post('/db/find', (request, response) => {
    //   if (!request.body) {
    //         return failure(response, '/db/find needs post request body');
    //   }
    //   const databaseName = request.body.dbname
    //   const collectionName = request.body.colname;
    //   if (!collectionName) {
    //         return failure(response, '/db/find needs collection');
    //   }
    //   const query = request.body.query || {};
    //   const projection = request.body.projection;
    //   const collection = database.collection(collectionName);
    //   log(`got request to find in ${collectionName} with` +
    //           ` query ${JSON.stringify(query)} and projection ${JSON.stringify(projection)}`);
    //   collection.find(query, projection).toArray().then((data) => {
    //         response.json(data);
    //   });
    // });

    app.post('/db/insert', (request, response) => {
      if (!request.body) {
        return failure(response, '/db/insert needs post request body');
      }
      log(`got request to insert into ${request.body.colname}`);
      
      const databaseName = request.body.dbname;
      const collectionName = request.body.colname;
      if (!collectionName) {
        return failure(response, '/db/insert needs collection');
      }
      if (!databaseName) {
        return failure(response, '/db/insert needs database');
      }

      const database = connection.db(databaseName);
      
      // Add collection if it doesn't already exist
      if (!database.collection(collectionName)) {
        console.log('creating collection ' + collectionName);
        database.createCollection(collectionName);
      }

      const collection = database.collection(collectionName);

      const data = _.omit(request.body, ['colname', 'dbname']);
      // log(`inserting data: ${JSON.stringify(data)}`);
      collection.insert(data, (err, result) => {
        if (err) {
          return failure(response, `error inserting data: ${err}`);
        } else {
          return success(response, `successfully inserted data. result: ${JSON.stringify(result)}`);
        }
      });
    });

    app.listen(port, () => {
      log(`running at http://localhost:${port}`);
    });
    
  });
  
}

serve();
