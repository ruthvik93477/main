const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const PORT = 3000;
mongoose.connect('mongodb+srv://ruthvik:ruthvik@cluster1.onhko9g.mongodb.net/ecom');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const inputDataSchema = new mongoose.Schema({
    cn: String,
    clientName: String,
    name: String,
    cf: Number,
    ml: Number,
    jan: Number,
    feb: Number,
    mar: Number,
    apr: Number,
    may: Number,
    jun: Number,
    jul: Number,
    aug: Number,
    sep: Number,
    oct: Number,
    nov: Number,
    dec: Number,
    jan_ml: Number,
    feb_ml: Number,
    mar_ml: Number,
    apr_ml: Number,
    may_ml: Number,
    jun_ml: Number,
    jul_ml: Number,
    aug_ml: Number,
    sep_ml: Number,
    oct_ml: Number,
    nov_ml: Number,
    dec_ml: Number,
    aLeaves: Number,
    mLeaves: Number,
});
const InputData = mongoose.model('InputData', inputDataSchema);
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.post('/submit', async (req, res) => {
    let {cn,clientName,name,cf,ml,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,jan_ml,feb_ml,mar_ml,apr_ml,may_ml,jun_ml,jul_ml,aug_ml,sep_ml,oct_ml,nov_ml,dec_ml} = req.body;
    const aLeaves = parseInt(jan)+parseInt(feb)+parseInt(mar)+parseInt(apr)+parseInt(may)+parseInt(jun)+parseInt(jul)+parseInt(aug)+parseInt(sep)+parseInt(oct)+parseInt(nov)+parseInt(dec);
    const mLeaves = parseInt(jan_ml)+parseInt(feb_ml)+parseInt(mar_ml)+parseInt(apr_ml)+parseInt(may_ml)+parseInt(jun_ml)+parseInt(jul_ml)+parseInt(aug_ml)+parseInt(sep_ml)+parseInt(oct_ml)+parseInt(nov_ml)+parseInt(dec_ml);
    try {
      const inputData = new InputData({
        cn: cn,
        clientName: clientName,
        name: name,
        cf: parseInt(cf),
        ml: parseInt(ml),
        jan: parseInt(jan),
        feb: parseInt(feb),
        mar: parseInt(mar),
        apr: parseInt(apr),
        may: parseInt(may),
        jun: parseInt(jun),
        jul: parseInt(jul),
        aug: parseInt(aug),
        sep: parseInt(sep),
        oct: parseInt(oct),
        nov: parseInt(nov),
        dec: parseInt(dec),
        jan_ml: parseInt(jan_ml),
        feb_ml: parseInt(feb_ml),
        mar_ml: parseInt(mar_ml),
        apr_ml: parseInt(apr_ml),
        may_ml: parseInt(may_ml),
        jun_ml: parseInt(jun_ml),
        jul_ml: parseInt(jul_ml),
        aug_ml: parseInt(aug_ml),
        sep_ml: parseInt(sep_ml),
        oct_ml: parseInt(oct_ml),
        nov_ml: parseInt(nov_ml),
        dec_ml: parseInt(dec_ml),
        aLeaves: 12-parseInt(aLeaves)+parseInt(cf),
        mLeaves: parseInt(ml)-parseInt(mLeaves),
      });
      await inputData.save();
      let a = fs.readFileSync("submit.html")
      res.send(a.toString())
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
