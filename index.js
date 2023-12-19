const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
mongoose.connect("mongodb+srv://demo:gQ1wMMDRI4nva5tR@cluster0.bw6vdpx.mongodb.net/internshipmodel", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 3005, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3005))
});

//mongoose.connect('mongodb+srv://demo:gQ1wMMDRI4nva5tR@cluster0.bw6vdpx.mongodb.net/book', 