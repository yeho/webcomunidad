import { md5 } from './md5.js'
document.addEventListener('DOMContentLoaded', () => {
  const read = '5d6db920ddb20ca0c26a4597b8b56c3e38f4ca6e3593c093b1425c116668eca3'
  const lista = []

  document.querySelector('.container').addEventListener('click', () => {
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.remove()
    }
  }

  )

  document.addEventListener('keypress', async (evt) => {
    if (evt.key !== ',') lista.push(evt.key)
    if (evt.key === ',') {
      const com = await md5({ message: lista.join('') })
      if (com === read) {
        modalNewletterUp()
        lista.length = 0
      } else {
        lista.length = 0
      }
    }
  })

  const Buttons = document.querySelectorAll('.input-effect input,textarea')
  const form = document.querySelector('.card')
  Buttons.forEach((val) => {
    val.addEventListener('focusout', (evt) => {
      const Button = evt.target
      if (Button.value !== '') {
        Button.classList.add('hasContent')
      } else {
        Button.classList.remove('hasContent')
      }
    })
  })

  form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const data = new FormData(evt.target)
    const body = { name: data.get('name'), email: data.get('email') }
    fetch('/newsletter', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (res.status === 409) {
        form.classList.add('email-erro')
        // quitar error luego de unos segundos
        setTimeout(() => {
          form.classList.remove('email-erro')
        }, 2000)
      } else if (res.status === 200) {
        form.classList.add('sucess-email')
        setTimeout(() => {
          form.classList.remove('sucess-email')
        }, 2000)
      }
    }

    )
  })
})

function modalNewletterUp () {
  const div = document.createElement('form')
  div.classList.add('modal')
  div.setAttribute('enctype', 'multipart/form-data')
  const title = document.createElement('p')
  div.appendChild(title)
  title.innerHTML = 'subir newsletter'
  div.appendChild(title)
  div.addEventListener('submit', async (evt) => {
    evt.preventDefault()
    //   // the formdata contain a file;
    const data = new FormData(evt.target)
    div.classList.add('loading')
    fetch('/newsletter/file', { method: 'POST', body: data })
      .then((res) => {
        if (res.status === 201) {
          div.classList.remove('loading')
          div.classList.add('sucess')
          setTimeout(() => {
            div.classList.remove('sucess')
          }, 2000)
        }
      })
  })

  // add a input file  and button to submit
  const file = document.createElement('input')
  const portada = document.createElement('input')
  const description = document.createElement('textarea')
  const label1 = document.createElement('label')
  const label2 = document.createElement('label')
  const label3 = document.createElement('label')
  const button = document.createElement('button')
  const loader = document.createElement('div')
  const text = document.createElement('p')
  // label 1 archivo
  label1.innerText = 'Archivo'
  label1.style.color = 'black'
  // label 2 portada
  label2.innerText = 'Portada del newsletter'
  label2.style.color = 'black'
  // label 3 descripcion
  label3.innerText = 'Descripcion del newsletter'
  label3.style.color = 'black'
  // boton
  button.setAttribute('type', 'submit')
  button.textContent = 'Subir'
  // loader
  loader.classList.add('loader')
  // file
  file.setAttribute('type', 'file')
  file.setAttribute('name', 'file')
  file.setAttribute('required', 'true')
  // file 2 portada
  portada.setAttribute('type', 'file')
  portada.setAttribute('name', 'portada')
  portada.setAttribute('required', 'true')
  // texarea
  description.setAttribute('name', 'description')
  description.style.color = 'black'

  // text result
  text.textContent = 'subido con exito'
  text.classList.add('none')

  div.appendChild(label1)
  div.appendChild(file)
  div.appendChild(label2)
  div.appendChild(portada)
  div.appendChild(label3)
  div.appendChild(description)
  div.appendChild(button)
  div.appendChild(loader)
  div.appendChild(text)

  document.body.appendChild(div)
}
