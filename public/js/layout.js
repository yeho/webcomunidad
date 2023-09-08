const $ = (element) => document.getElementById(element)

document.addEventListener('DOMContentLoaded', () => {
  let menuIsactive = false
  menu = $('btn-ham')

  document.getElementsByTagName('body')[0].addEventListener('resize', () => {
    console.log('screen is', screen.width)
  })

  menu.addEventListener('click', (e) => {
    if (menuIsactive) {
      const nodos = [...document.getElementsByClassName('nav_element')]

      nodos.forEach((e) => {
        e.classList.remove('mobile-active')
      })
      menuIsactive = false
    } else {
      const nodos = [...document.getElementsByClassName('nav_element')]

      nodos.forEach((e) => {
        e.classList.add('mobile-active')
      })

      menuIsactive = true
    }
  })
})

/* Utiliti for hamburguer button */
const btn = document.getElementById('btn-ham')
btn.addEventListener('click', function () {
  if (this.classList.contains('active')) {
    this.classList.remove('active')
    this.classList.add('not-active')
  } else {
    this.classList.add('active')
    this.classList.remove('not-active')
  }
})
