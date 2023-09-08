document.addEventListener('DOMContentLoaded', () => {
  const Buttons = document.querySelectorAll('.input-effect input,textarea')
  const form = document.querySelector('.contact-form')
  const buttonform = document.querySelector('.btn-submit')
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
    buttonform.innerHTML = '<div class=\'loader\'></div>'
    const data = new FormData(evt.target)
    const name = data.get('name')
    const email = data.get('email')
    const phone = data.get('phone')
    const menssage = data.get('menssage')
    if (name === '' || email === '' || phone === '' || menssage === '') {
      buttonform.innerHTML = '<span style="color:red">error</span>'
      setTimeout(() => {
        buttonform.innerHTML = 'Enviar'
      }, 1000)
      return
    }

    const body = { name: data.get('name'), email: data.get('email'), phone: data.get('phone'), message: data.get('menssage') }
    fetch('/contacto', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        if (!res.ok) {
          buttonform.innerHTML = '<span style="color:red">error</span>'
          setTimeout(() => {
            buttonform.innerHTML = 'Enviar'
          }, 1000)
          return
        }
        form.reset()
        buttonform.innerHTML = '<span style="color:green">Enviado</span>'
        setTimeout(() => {
          buttonform.innerHTML = 'Enviar'
        }, 1000)
      })
  })
})
