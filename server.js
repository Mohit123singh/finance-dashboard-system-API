const path=require('path');
const express=require('express');
const dotenv=require('dotenv')
const morgan=require('morgan')
const colors=require('colors')
const cookieParser=require('cookie-parser')
const rateLimit=require('express-rate-limit')



const connectDB=require('./config/db')
const notFound=require('./middleware/notFound')
const errorHandler=require('./middleware/error')


//load env vars
dotenv.config({path:'./config/config.env'});

// connect to database
connectDB();

// Route Files
const auth = require('./routes/auth');
const user = require('./routes/user');
const record = require('./routes/record');
const dashboard = require('./routes/dashboard');




const app=express();

// app.get('/',(req,res)=>{
//     res.send({message:'hello world'})
// })

// app.get('/about',(req,res)=>{
//     res.send('About page')
// })

// body parser:
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Cookie parser
app.use(cookieParser())


// Dev logging middleware
if(process.env.NODE_ENV==='development')
{
    app.use(morgan('dev'))
}




// Rate limiting
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   });
//app.use(limiter);






// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);
app.use('/api/v1/records', record);
app.use('/api/v1/dashboard', dashboard);


app.use(notFound)
app.use(errorHandler);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold);
})