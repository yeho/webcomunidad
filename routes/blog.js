import { Router } from 'express'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({ html: true })

const router = Router()

router.get('/', async function (req, res, next) {
  readdir(join('posts')).then(async (files) => {
    const data = []

    for await (const file of files) {
      const text = await readFile(join('posts', file), 'utf-8')
      const header = Extra(text)
      data.push(header)
    }

    if (data.length === 0) {
      return res.render('blog', { posts: false })
    }
    return res.render('blog', { posts: data })
  }).catch(err => {
    console.log(err)
    res.status(500).send()
  })
}
)

router.get('/:idPost', function (req, res) {
  readFile(join('posts', `${req.params.idPost}.md`)).then((data) => {
    try {
      const info = Extra(data.toString())
      const dataHTML = md.render((data.toString().replace(/-{3}([\w\s:"',{}/.-])*-{3}/gm, '')))
      res.render('post', { text: dataHTML, title: info.title, description: info.description })
    } catch (err) {
      console.log(err)
      res.status(500).send()
    }
  }).catch((err) => {
    console.log(err)
    res.status(404).send()
  })
})

export default router

function Extra (fileText) {
  const headers = /(?<=-{3})([\w\s:"',{}/.-])*(?=-{3})/gm
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
