const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const mongoDbConnection = require('./db/connection');

const usersRoute = require('./routes/users.route');
const languagesRoute = require('./routes/languages.route');
const profilesRoute = require('./routes/profiles.route');
const languageSkillsRoute = require('./routes/languageSkills.route');

const app = express();
app.use(express.json());

app.use('/api/users', usersRoute);
app.use('/api/profiles', profilesRoute);
app.use('/api/languages', languagesRoute);
app.use('/api/languageSkills', languageSkillsRoute);

const PORT = process.env.PORT || 3000;

mongoDbConnection
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed, server not started', err);
  });
