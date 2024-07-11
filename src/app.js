const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// Middleware
 const authMiddleware = require('./middleware/jtwAuth')

// Routers
const SystemRouter = require('./routes/systems');
const BookRouter = require('./routes/book');
const BannerRouter = require('./routes/banner');
const UserRouters = require('./routes/user');
const PostRouters = require('./routes/post');
const CommentRouters = require('./routes/comment');

//Configurações
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Rotas
app.use('/book', BookRouter);
app.use('/system', SystemRouter);
app.use('/banner', BannerRouter);
app.use('/user', UserRouters);
app.use('/post', PostRouters);
app.use('/comment', CommentRouters);


app.use('/',(req,res)=>{
  res.send("Hello World");
});

app.listen(app.get('port'),()=>{
console.log(`🤖 Start server on port ${app.get('port')} 🤖`)
})