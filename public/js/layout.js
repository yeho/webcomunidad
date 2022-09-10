const $ = element => document.getElementById(element)


document.addEventListener('DOMContentLoaded',()=>{
let menuIsactive = false
menu = $("menu")

document.getElementsByTagName("body")[0].addEventListener("resize",()=>{

    console.log("screen is",screen.width)
})

menu.addEventListener('click',(e)=>{


if(menuIsactive){



let nodos = [...document.getElementsByClassName("nav_element")]


nodos.forEach((e)=>{
    e.classList.remove("active")
})
menuIsactive = false

}else{

    let nodos = [...document.getElementsByClassName("nav_element")]


    nodos.forEach((e)=>{
        e.classList.add("active")
    })

 menuIsactive = true

}




})










})