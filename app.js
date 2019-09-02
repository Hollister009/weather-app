const path = require('path');
const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const app = express();

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public')

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(PUBLIC_DIR))
  .use(sassMiddleware({
    src: PUBLIC_DIR + 'styles/scss',
    dest: PUBLIC_DIR + 'styles/css',
    indentedSyntax: false,
  }))
  .get('*', (req, res) => {
    res.render('index');
  });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
