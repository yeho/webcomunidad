/* eslint-disable no-undef */
const frame = document.getElementById('visualizer')
const editorHtml = document.getElementById('editor-html')
const editorCss = document.getElementById('editor-css')
const editorJs = document.getElementById('editor-js')
const $console = document.getElementById('console')
let htmlText = ''
let cssText = ''
let jsText = ''
let tab = 'html'

const customConsole = `

window.onerror = (message, source, lineno, colno, error) => {
    const lineWithcol = lineno + ':' + colno
    window.parent.postMessage({ console: { type: 'error', payload: [message,lineWithcol ] } }, '*')
}

 console.log = (...args) => {
    window.parent.postMessage({ console: { type: 'log', payload: args } }, '*')
  }
    console.error = (...args) => {
        window.parent.postMessage({ console: { type: 'error', payload: args } }, '*')
    }
`

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.47.0/min/vs' } })
require(['vs/editor/editor.main'], () => {
  function makeEditor (text, language, ele) {
    return monaco.editor.create(ele, {
      value: text,
      language,
      theme: 'vs-dark'
    })
  }

  function onWrite (editor, type) {
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue()

      if (type === 'html') {
        htmlText = value
      }
      if (type === 'css') {
        cssText = value
      }

      if (type === 'js') {
        jsText = value
      }
      $console.innerHTML = ''
      const html = `<html>
        <head>
        <style>
        ${cssText}
        </style>
        </head>
        <body>
        ${htmlText}
        </body>
        <script type='module'>
        ${customConsole}
        ${jsText}
        </script>
        </html>`

      frame.srcdoc = html
    })
  }

  document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      tab = li.dataset.set

      document.querySelectorAll('li').forEach(li => {
        li.classList.remove('active')
      })

      li.classList.add('active')

      if (tab === 'html') {
        editorHtml.style.display = 'block'
        editorCss.style.display = 'none'
        editorJs.style.display = 'none'
      }
      if (tab === 'css') {
        editorHtml.style.display = 'none'
        editorCss.style.display = 'block'
        editorJs.style.display = 'none'
      }
      if (tab === 'js') {
        editorHtml.style.display = 'none'
        editorCss.style.display = 'none'
        editorJs.style.display = 'block'
      }
    })
  })

  const firstEditor = makeEditor(htmlText, 'html', document.getElementById('editor-html'))
  onWrite(firstEditor, 'html')
  const secondEditor = makeEditor(cssText, 'css', document.getElementById('editor-css'))
  onWrite(secondEditor, 'css')
  const thirdEditor = makeEditor(jsText, 'javascript', document.getElementById('editor-js'))
  onWrite(thirdEditor, 'js')

  document.getElementById('editor-css').style.display = 'none'
  document.getElementById('editor-js').style.display = 'none'
})

window.addEventListener('message', (ev) => {
  const { console: consoleData } = ev.data
  const payload = consoleData?.payload
  const type = consoleData?.type

  if (ev.source === frame.contentWindow) {
    const text = payload.map((item) => {
      if (typeof item === 'object') {
        return JSON.stringify(item, null, 2)
      }
      return item
    })
    const li = document.createElement('li')
    li.textContent = text.join(' ')
    li.classList.add(type)
    $console.appendChild(li)
  }
})
