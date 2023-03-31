Link to hosted version : https://danx-games-reviews.onrender.com/api

Project summary:

This project is the backend of nc-games, a games review website where users can intereact with reviews people have left for a particular game. It uses the express framework for api managment.

Setup:

1. project can be cloned from github using command 'git clone https://github.com/Daniel17971/be-project-nc-games.git'
2. npm install will install all dependencies listed inside package.json.
3. two .env files will need to be set up ;  
   A .env.test with PGDATABASE=nc_games_test set inside,
   A .env.development with PGDATABASE=nc_games set inside,
4. Before anything is run the databases need to be created, this can be done by running 'npm run setup-dbs'.
5. Once setup development database can be seeded with 'npm run seed'.
6. To make use of the test database, inside a jest test file the testData should be required in and before any test the beforeEach function should run the seed with the testData, as shown below.
   'beforeEach(() => {
   return seed(testData);
   });'
   Addition function afterAll can be run at end of test file to end connection shown below,
   'afterAll(() => {
   connection.end();
   });'

7. The normal jest command can then be run 'npm test fileName' and a test database will be reseeded each time.

Requirements:
-This project was created and run using Node v19.5.0 and PSQL v14.7 (homebrew) on v15.2 server
