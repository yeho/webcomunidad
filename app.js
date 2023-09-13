import createError from 'http-errors'
import express, { json, urlencoded } from 'express'
import { join } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { swig } from 'consolidate'
import { esbuildMiddleware } from './middewareEsbuild.js'

// imports the routers
import indexRouter from './routes/index.js'
import blogRouter from './routes/blog.js'
import communityRouter from './routes/community.js'
import ContactRouter from './routes/contact.js'
import NewletterRouter from './routes/newsletter.js'

const app = express()

// view engine setup
app.engine('html', swig)
app.set('views', join(process.cwd(), 'views'))
app.set('view engine', 'html')
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(join(process.cwd(), 'public')))

// routes
app.use('/', indexRouter)
app.use('/blog', blogRouter)
app.use('/community', communityRouter)
app.use('/contacto', ContactRouter)
app.use('/newsletter', NewletterRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
