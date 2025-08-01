const app = require('./app');
const config = require('./config/config');
// const db = require('./models');

app.listen(config.port, () => {
    // db.sequelize.authenticate()
    //     .then(() => {
    //         console.log('Connected to the database');
    //     })
    //     .catch(err => {
    //         console.error('Unable to connect to the database:', err);
    //     });
    console.log(`Server is running on port ${config.port}`);
    // console.log(`Database host: ${config.db.host}`);
});
