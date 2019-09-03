const path = require('path');
const express = require('express');
const sassMiddleware = require('node-sass-middleware');

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const weatherRoute = require('./routes/weather');
const locationRoute = require('./routes/location');

router.use('/weather', weatherRoute).use('/location', locationRoute);

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(PUBLIC_DIR))
  .use(
    sassMiddleware({
      src: PUBLIC_DIR,
      dest: PUBLIC_DIR,
      indentedSyntax: false,
      sourceMap: false,
    })
  )
  .use('/api', router);

app.get('*', (req, res) => {
  res.sendFile('public/index.html', {root: __dirname});
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
