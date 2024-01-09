import { Router } from 'express'
import { readdir, readFile, rm, rename } from 'fs/promises'
import { join } from 'path'
import MarkdownIt from 'markdown-it'
import multer from 'multer'

const md = new MarkdownIt({ html: true })

const upload = multer({ dest: '../tmp' })
const router = Router()

router.get('/', async function (req, res, next) {
  readdir(join('posts'))
    .then(async (files) => {
      const data = []

      for await (const file of files) {
        if (file === 'docs') continue
        const text = await readFile(join('posts', file), 'utf-8')
        const header = Extra(text)
        data.push(header)
      }

      if (process.env.NODE_ENV === 'development') {
        const docsFile = await readdir(join('posts', 'docs'))
        for await (const file of docsFile) {
          const text = await readFile(join('posts', 'docs', file), 'utf-8')
          const header = Extra(text)
          data.push({ ...header, id: `docs/${header.id}` })
        }
      }

      const filesout = await readdir(join(process.cwd(), '..', 'posts'))

      for await (const file of filesout) {
        const text = await readFile(join(process.cwd(), '..', 'posts', file), 'utf-8')
        const header = Extra(text)
        data.push(header)
      }

      if (data.length === 0) {
        return res.render('blog', { posts: false })
      }
      return res.render('blog', { posts: data })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send()
    })
})

router.get('/admin', async function (req, res, next) {
  const dir1 = await readdir(join(process.cwd(), '..', 'posts'))
  const dir2 = await readdir(join(process.cwd(), '..', 'postsImage'))
  const data = dir1.concat(dir2)

  res.render('postup', { posts: data })
})

router.post('/admin', upload.fields([{ name: 'posts', maxCount: 1 }, { name: 'images' }]), async function (req, res, next) {
  const posts = req.files.posts[0]
  const images = req.files.images
  const password = req.body.pass
  if (password !== process.env.password) {
    rm(posts.posts.path)

    if (images) {
      for await (const image of images) {
        rm(image.path)
      }
    }

    return res.status(401).send()
  }

  await rename(posts.path, join(process.cwd(), '..', 'posts', `${posts.originalname}`))
  if (images) {
    for await (const image of images) {
      await rename(image.path, join(process.cwd(), '..', 'postsImage', `${image.originalname}`))
    }
  }

  return res.send('ok')
})

router.delete('/admin', upload.none(), async function (req, res, next) {
  const password = req.body.passw
  const seleced = req.body.posts

  if (password !== process.env.password) {
    return res.status(401).send()
  }

  try {
    if (!seleced.includes('.webp')) {
      await rm(join(process.cwd(), '..', 'posts', seleced))
    } else {
      await rm(join(process.cwd(), '..', 'postsImage', seleced))
    }
  } catch (e) {
    console.log(e)
    return res.status(400).send()
  }
  return res.send('ok')
})

router.get('/:idPost', async function (req, res, next) {
  let data = ''
  try {
    data = await readFile(join('posts', `${req.params.idPost}.md`))
  } catch (err) {
    try {
      data = await readFile(join(process.cwd(), '..', 'posts', `${req.params.idPost}.md`))
    } catch (err) {
      console.log(err)
      next(404)
    }
  }

  try {
    const info = Extra(data.toString())
    console.log(info.id)
    const dataHTML = md.render(
      data.toString().replace(/-{3}([\w\s:"',{}/.-?¿])*-{3}/gm, '')
    )
    res.render('post', {
      text: dataHTML,
      title: info.title,
      description: info.description,
      id: info.id,
      image: info.image
    })
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}
)

router.get('/docs/:id', function (req, res, next) {
  readFile(join('posts', 'docs', `${req.params.id}.md`))
    .then((data) => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('pagina no encontrada en producion')
      }

      try {
        const info = Extra(data.toString())
        const dataHTML = md.render(
          data.toString().replace(/-{3}([\w\s:"',{}/.-?¿])*-{3}/gm, '')
        )
        res.render('post', {
          text: dataHTML,
          title: info.title,
          description: info.description,
          id: info.id
        })
      } catch (err) {
        console.log(err)
        res.status(500).send()
      }
    })
    .catch((err) => {
      console.log(err)
      next(404)
    })
})

export default router

function Extra (fileText) {
  const headers = /(?<=-{3})([\w\s:"',{}/.-?¿])*(?=-{3})/gm
  let data
  try {
    data = headers.exec(fileText.trim())
  } catch (e) {
    throw new Error('ivalid header or not fount')
  }
  const parse = data[0].trim()

  const dataFilter = parse.split('\n').filter(Boolean)

  const abs = {}
  dataFilter.forEach((line) => {
    const [key, value, more] = line.split(':')
    if (more) {
      abs[key] = value + ':' + more
      return abs[key]
    }
    abs[key] = value
    return abs[key]
  })

  return abs
}
