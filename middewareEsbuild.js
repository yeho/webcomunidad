import * as esbuild from 'esbuild'
import { join } from 'node:path'
import fs from 'node:fs/promises'
export const esbuildMiddleware = async (req, res, next) => {
  // Verifica si la ruta del archivo termina en .css o .js
  if (req.url.endsWith('.css') || req.url.endsWith('.js')) {
    // Minifica el archivo usando esbuild
    const ext = req.url.split('.').at(-1)
    console.log(join(process.cwd(), 'public', req.url))
    const dataFile = await fs.readFile(join('public', req.url))
    esbuild.transform(dataFile, { loader: ext, minify: true, drop: ['console'] }).then((result) => {
      // Escribe el archivo minificado  la respuesta
      const mime = ext === 'css' ? 'text/css' : 'text/javascript'
      res.setHeader('Content-Type', mime)

      res.end(result.code)
    })
  } else {
    // Envía el archivo sin minificar
    next()
  }
}
