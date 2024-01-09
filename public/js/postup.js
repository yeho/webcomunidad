document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form')
  const form2 = document.getElementById('form2')
  form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const data = new FormData(form)
    const res = await fetch('/blog/admin', {
      method: 'POST',
      body: data
    })
    const text = await res.text()
    console.log(text)
  })

  form2.addEventListener('submit', async function (e) {
    e.preventDefault()
    const selectedValue = document.getElementById('selected').value
    const data = new FormData(form2)
    data.append('posts', selectedValue)
    // remove  children of dom with value selected
    const cp = document.querySelector(`[value="${selectedValue}"]`).innerHTML
    document.querySelector(`[value="${selectedValue}"]`).remove()
    const res = await fetch('/blog/admin', {
      method: 'delete',
      body: data
    })
    if (res.status !== 200) {
      document.querySelector('#selected').innerHTML += `<option value="${selectedValue}">${cp}</option>`
    }
  })
})
