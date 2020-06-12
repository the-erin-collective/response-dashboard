# response-dashboard
 
Make sure nodeJS, NPM and PostgresSQL are installed on your computer.

Run `npm install` in the root directory to install dependencies.

## Development server

Edit the file `app\config\db.config.js` with the relevant connection details for your db.

Then run `node index.js` in the command line from the root of the project.

On first run test data will be inserted into the database from the file `app\config\testdata.js`

After the first run you can set the flag `insertTestData` to false to avoid producing warnings when running the server, it should still function with the warnings though.
