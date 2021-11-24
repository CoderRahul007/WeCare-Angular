const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const errorLogger = require('./Utilities/errorLogger');
const route = require('./Routes/routing');


const app = express();
app.use(bodyparser.json());
app.use(cors());
//app.use(myReqLogger);
app.use('/', route);
app.use(errorLogger);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
