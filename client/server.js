const express = require("express");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('dist'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});
