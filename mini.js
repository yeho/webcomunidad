import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./public/js/*', './public/css/*'],
  outdir: './public/min/',
  minify: true
})
