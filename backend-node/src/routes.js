const express = require('express');
const routes = express.Router();
const QuestionController = require('./controllers/QuestionController');
const UserController = require('./controllers/UserController');
const SchoolController = require('./controllers/SchoolController');
const LikeController = require('./controllers/LikeController');
const AdditionalInfoController = require('./controllers/AdditionalInfoController');


routes.post('/question',  QuestionController.store);
routes.get('/questions',  QuestionController.index);
routes.post('/user',  UserController.store);
routes.get('/users',  UserController.index);
routes.get('/schools/', SchoolController.show);
routes.get('/schools/:latitude/:longitude', SchoolController.index);
routes.post('/school', SchoolController.store);
routes.post('/schools/:school_id/like', LikeController.store);
routes.get('/schools/:school_id/additionalInfo', AdditionalInfoController.show);
routes.post('/schools/:school_id/additionalInfo', AdditionalInfoController.store);

module.exports = routes;