var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cons = require('consolidate');

var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var communityRouter = require('./routes/community');
var newsRouter = require('./routes/newsletter');
const fs = require('fs');
let MarkdownIt = require('markdown-it')
md = new MarkdownIt()

var app = express();

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/blog/:idPost',(req,res)=>{

// const data = path.join(__dirname, 'posts',`${req.params.idPost}.md`)

fs.readFile(path.join(__dirname, 'posts',`${req.params.idPost}.md`),(err,data)=>{

// console.log(data.toString())

  const dataHTML =  md.render(data.toString(),)
    res.render("post",{text:dataHTML})
//  res.send("hola")


})











});
app.use('/community', communityRouter);
app.use('/newsletter', newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//YEHO test Deploy

module.exports = app;
