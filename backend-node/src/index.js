const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-ac3fq.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true});
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3333);