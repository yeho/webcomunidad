import { Router } from 'express'
const router = Router()

router.get('/', function (req, res, next) {
  res.render('playground')
})

export default router
