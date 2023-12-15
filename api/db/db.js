const mongoose = require('mongoose');

uri = "mongodb+srv://tayyib:123@cluster0.qmijazu.mongodb.net/BlogProject?retryWrites=true&w=majority";

mongoose
.connect(uri)
.then(console.log("Connected to mongodb successfully!"))
.catch((e) => console.log('Could not connect'));