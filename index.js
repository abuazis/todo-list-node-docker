const express = require('express');
const cors =  require('cors');
const sequelize = require('./config/database');
const { ActivityRoute, TodoRoute } = require('./routes');

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/activity-groups', ActivityRoute);

app.use('/todo-items', TodoRoute);

app.get('/', (_, res) => {
  res.send("Todo List");
});

sequelize.authenticate().then(() => {
  app.listen(process.env.PORT || 3030, '0.0.0.0', () => {
    console.log(`Connected to MySQL`);
    console.log(`Listening to Port 3030`);
  });
});