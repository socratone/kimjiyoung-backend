require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes');
const auth = require('./auth');

app.use(cors());

app.use(express.json()); 
 
app.use('/api/signup', routes.signup);
app.use('/api/signin', routes.signin);
app.use('/api/items', routes.items);
app.use('/api/item', auth, routes.item);

app.listen(3001, () => console.log('서버가 3001 포트에서 가동 중입니다.'));
