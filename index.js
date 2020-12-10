const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes');

app.use(cors());

app.use(express.json()); 
 
app.use('/api/items', routes.items);

app.listen(3001, () => console.log('서버가 3001 포트에서 가동 중입니다.'));
