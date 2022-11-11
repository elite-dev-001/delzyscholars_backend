const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')
const materialRoute = require('./routes/material')
const loginRoute = require('./routes/login')
const pinRoute = require('./routes/pin')

let port = process.env.PORT || 5000;


const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//API Routes
app.use('/api/', userRoute);
app.use('/api/login', loginRoute);

//API ROUTES FOR MATERIALS
app.use('/api/materials', materialRoute);

//API ROUTES FOR ADMIN
app.use('/api/admin', adminRoute)

//API ROUTES FOR PIN
app.use('/api/activation', pinRoute)

mongoose.connect(
    'mongodb+srv://delzyscholars:BEMXoHPIxeTOYzQ3@delzyscholars.6j7es2o.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
    }
).then(() => {
    app.listen(port, () => {
        console.log('API running at: http://localhost:5000')
    })
}).catch((err) => {
    console.log(err)
})

//MZt5u1I8Jj0XsLhQ
//mongodb+srv://delzyscholars:BEMXoHPIxeTOYzQ3@delzyscholars.6j7es2o.mongodb.net/?retryWrites=true&w=majority
//BEMXoHPIxeTOYzQ3