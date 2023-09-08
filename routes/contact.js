import { Router } from 'express'
import mail from '../mail.js'
const router = Router()

router.get('/', (req, res) => {
  res.render('contact')
})

router.post('/', (req, res) => {
  mail.sendMail({ from: 'info@itcscience.org', to: 'info@itcscience.org', html: mailGenerateHtml(req.body), subject: 'contacto' }, (err) => {
    if (err) {
      console.log('error: ' + err)
      return res.status(500)
    }
  })

  res.status(201).end()
})

export default router

function mailGenerateHtml (data) {
  const html = `
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Datos de contacto</title>
  </head>
  <body>
    <h1>Datos de contacto recibidos</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Información de contacto</h2>
          <ul class="list-unstyled">
            <li>
              <strong>Nombre:</strong> ${data.name}
            </li>
            <li>
              <strong>Correo electrónico:</strong> ${data.email}
            </li>
            <li>
              <strong>Teléfono:</strong> ${data.phone}
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h2>Mensaje</h2>
          <p>${data.message}</p>
        </div>
      </div>
    </div>
  </body>
  </html>`

  return html
}
