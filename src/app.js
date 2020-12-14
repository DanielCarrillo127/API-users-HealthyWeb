const express = require('express');
const app = express();
const router = require('./controllers/RoutesConfig');
const cors = require('cors');

app.set('port',process.env.PORT || 4000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

router(app);

module.exports = app;
