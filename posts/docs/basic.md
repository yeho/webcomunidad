---
id:basic
title:Funcionamiento basico de la web
description:explicacion basica las bibliotecas y arquitectura de la web
image:/images/arqui.png
---

# Funcionamiento basico de la web

![imagen de arquitectura de codigo](/images/arqui.png)

## Lo basico

La web esta creada sobre nodejs con el framework de express
sobre esto se utiliza un motor de plantilla conocido como [Swig](https://node-swig.github.io/swig-templates/)

El funcionamiento en si es nodejs  sirviendo archivos html atraves del motor del plantillas.
ademas de un servicio estatico que sirve archivos,imagenes,css y javascript.
ademas de eso no se utiliza ninguna biblioteca o framework

## estructura

```bash
webcomunidad/
|-- bin/
|--|-- www.js
|-- posts/
|--|-- docs/
|-- public/
|--|-- css/
|--|-- images/
|--|-- js/
|-- routes/
|-- views/
|-- app.js
|-- db.js
|-- mail.js
```

### bin/

dentro de esta carpeta se encuentra un solo archivo que es **www.js** este archivo contiene el codigo js que inicia el servidor y ademas genera logs de las rutas ingresadas


### posts/

Esta es una carpeta donde se guardan los Posts.
* en esta carpeta se deben de guardar los archivos markdown para luego ser utilizados en el blog.

### docs/

Esta carpeta se encuentra dentro de la carpeta posts y justamente es donde se guarda la documentacion de la web, dicha documentacion es mostrada en el blog solo cuando se inicia el servidor en modo desarrollo.

### public/

en esta carpeta se guardan los archivos estaticos que seran servidos automaticamente por el servidor
ademas se encunetran 3 subcarpetas:
* css
* js
* images
donde se debe de guardar cada tipo de archivo respectivamente


## app.js
Es el archivo **principal** donde se exporta la mayoria del codigo.

Lo primero que se hace es exportar las dependencias externas

```js
import createError from 'http-errors'
import express, { json, urlencoded } from 'express' 
import { join } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { swig } from 'consolidate' //motor de plantilla
```

Luego exporta los routers 

```js
import indexRouter from './routes/index.js'
import blogRouter from './routes/blog.js'
import communityRouter from './routes/community.js'
import ContactRouter from './routes/contact.js'
import NewletterRouter from './routes/newsletter.js'
```

E  inicia la app de express y se  configura el motor de plantilla

```js
const app = new express()

// configuracion del motor de plantilla
app.engine('html', swig)
// ruta de las vistas
app.set('views', join(process.cwd(), 'views'))
app.set('view engine', 'html')

// sevir archivos estaticos 
app.use(express.static(join(process.cwd(), 'public')))


//se define con express para servir las rutas con los routers
app.use('/', indexRouter)
app.use('/blog', blogRouter)
app.use('/community', communityRouter)
app.use('/contacto', ContactRouter)
app.use('/newsletter', NewletterRouter)

```













### routes/

Esta carpeta contiene las rutas del servidor, por comodidad por cada ruta se debe de crear un archivo,
las rutas deben ser creadas usando el router del express y ser exportada para luego ser utilizada.

se recomienda colocar el nombre del archivo que tenga relacion con el recurso que maneja, ejemplo para manejar todas las rutas de los post
el archivo seria blog.js.

ademas para usar la plantillas, express implementa el metodo render en res
ejemplo de codigo de como crear una rutas

```js
//archivo ejemplo blog.js
import { Router } from 'express'
const router = Router()

router.get('/', function (req, res, next) {

  res.render('blog')
})

export default router

```
El codigo anterior definiria un router que luego se exportaria en app, este router solo tiene una ruta get "/" y cuando se ingresa se renderiza el archivo blog que este en view.

Ademas el metodo render recibe dos parametros el primero el archivo a renderizar el segundo un objecto con informacion que sera recibida en la plantilla

```js
const post =  getPost()
res.render("blog",{post})

```
Entonces de esta forma se podria pasar un objecto con informacio a la plantilla.

## view

En esta carpeta se guarda las vistas, que son archivos html que seran leiodos por el motor de plantillas, lo que tiene de especial que tienen algunas directivas que permiten pasar mostrar informacion de distintas formas.

Dentro de las vistas existe una vista general que **layout** que contiene una aspecto basico de la web, como es el esquema principal siendo el header,footer y los colores basicos de la web.

para agilar el desarrollo se crearon diferentes bloques para insertar html en el **layout**.

### ejemplo de archivo blog.html

```html
{% extends 'layout.html' %} 

{%block header %}
<title>itcscience | blog</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/atom-one-dark-reasonable.min.css">
<link rel="stylesheet" href="/css/article.css">

{% endblock %}



{% block content %}


<h1>esto es el blog</h1>

{% if posts %}

<article class="article-container">
  {% for post in posts %}
  <div class="post">
    <img src="{{post.image}}" alt="imagen post" />
    <div class="pst_body">
      <a href="/blog/{{post.id}}">
        <h2 class="post-title">{{post.title}}</h2>
      </a>
      <p>{{post.description}}</p>
    </div>
  </div>
  {% endfor %}
</article>



{% else %}
<div>

  <p class="no-content">no existen publicaciones en el blog</p>


</div>


{% endblock %}




```

Lo primero que se nota en el archivo es **{% extends 'layout.html' %}** esta es una directiva del motor de plantilla que dice que utilizaremos layout como el html principal.

seguidamente se ve otra directiva **{%block header %}** que dice que el texto que contiene a continuacion se guardara en el bloque de header que ha sido colocado en el **layout**, dentro de este bloque se debe colocar todo lo que van en el head del html, meta etiquetas el titulo de pagina y las importaciones de css. luego del todo se encuntra un **{% endblock %}** que indica el final del bloque header.

acontinuacion se encuentra una **{% block content %}** que indica que el texto contenido se guardara en el bloque content que ha sido colocado en **layout**, dentro de este bloque vemos que se utilizan distintas directivas como  **{% if posts %}** que verifica si se le han pasado posts al render de la plantilla, si se ha pasado nos ecnontramos con una directiva que  es un ciclo que itera la informacion pasada **{% for post in posts %}**,  y ademas se ve que para mostrar la informacion en la plantilla solo se debe usar {{variables}} donde variable puede ser lo que a recibido el render. 

 y al seguir nos encontramos con la directiva **{% endfor %}** que indica el final del ciclo, y como se puede ver se sigue con una directiva **{% else %}**  que simplemente renderizara su contenido si el la directiva **{% if posts %}** obtiene un falso.

  al final nos encontramos con **{% endblock %}** que cierra el bloque content.