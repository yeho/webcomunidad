import { Router } from 'express'
import connection from '../db.js'
import multer from 'multer'
import fs from 'fs/promises'
import path from 'path'
import mail from '../mail.js'
const upload = multer({ dest: '../newsletter' })
const router = Router()

router.get('/', async (req, res) => {
  try {
    const [result] = await connection.query('SELECT name,create_at,path FROM newsletterFile')
    const files = result.map((x) => { return { ...x, create_at: `${x.create_at.getDate()}/${x.create_at.getMonth()}/${x.create_at.getFullYear()}` } })
    res.render('newsletter', { files })
  } catch (err) {
    return res.status(500).end()
  }
})

router.get('/:id', (req, res) => {
  console.log(process.cwd())
  res.sendFile(path.join(process.cwd(), '../newsletter', req.params.id), (err) => {
    if (err) {
      res.status(404).end()
    }
  })
})

router.post('/', async (req, res) => {
  const data = req.body
  if (data.name === '' || data.email === '') {
    res.status(400).end()
  }

  try {
    await connection.query('INSERT INTO newsletter (name, email) VALUES (?, ?)', [data.name, data.email])
    res.end()
  } catch (e) {
    console.log('yes')
    if (e) {
      console.log(e)
      if (e.code === 'ER_DUP_ENTRY') {
        return res.status(409).end()
      }
      res.status(400).end()
    }
  }
}
)

router.post('/file', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'portada', maxCount: 1 }]), async (req, res) => {
  let ruta
  let file
  try {
    const portada = req.files.portada[0]
    file = req.files.file[0]
    ruta = renameFile(file.filename, file.originalname)
    renameFile(portada.filename, file.originalname + '-image.' + 'png')
  } catch (e) {
    console.log(e)
    return res.status(401).end()
  }

  try {
    await connection.query('INSERT INTO newsletterFile (name,path,description) VALUES (?,?,?)', [file.originalname, ruta, req.body.description])
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }

  const [[{ size }]] = await connection.query('SELECT COUNT(*) as size FROM newsletterFile')

  const [emails] = await connection.query('select email from newsletter')
  const mapEmail = emails.map((email) => email.email).filter((email) => email !== '').join(',')

  mail.sendMail({ from: 'info@itcscience.org', subject: `${file.originalname.split('.')[0]}, newsletter ITCScience #${size}`, text: req.body.description, bcc: mapEmail, attachments: [{ name: 'newsletter', path: ruta }] }, (err, info) => {
    if (err) {
      console.log(err)
      return res.status(500).end()
    }
    console.log('emails send')
    res.status(201).end()
  })
})

export default router

function renameFile (old, newname) {
  const ruta = path.join('../newsletter', newname)
  fs.rename(path.join('../newsletter', old), ruta)
  return ruta
}
