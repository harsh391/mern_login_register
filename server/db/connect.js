const mongoose = require('mongoose')

const connectDB = (URI) => {
    return mongoose.connect(URI,
        {
            // useFindAndModify: true,
            // useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log(err))
}

module.exports = connectDB;