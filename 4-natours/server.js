const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');
// console.log(process.env);
// server
const port = process.env.PORT ;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
