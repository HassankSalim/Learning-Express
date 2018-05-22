const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// const sql = require('mysql');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT;

// const config = {
//   host: 'localhost',
//   user: 'hassan',
//   password: 'ml@345',
//   database: 'PSLibrary'
// };

// const connection = sql.createConnection(config);
// connection.connect(function(err) {
//   if(!err){
//     debug('Connection Successful');
//   }
//   else{
//     debug('MySql connection error');
//   }
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//   debug('my middleware')
//   next();
// });

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/author', title: 'Authors' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Library',
      nav: [{ link: '/books', title: 'Books' },
        { link: '/author', title: 'Author' }]
    }
  );
  // sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
