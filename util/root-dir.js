const path = require('path');

// require.main.filename refers to filename of main module that was used to start app (app.js)

// module.exports = path.dirname(process.mainModule.filename);
module.exports = path.dirname(require.main.filename); // path to file that is responsible for running app
