---
id:post
title:Como crear y subir un Post
image:/images/post.jpg
description:minima guia de como crear un post
---


# Como crear y subir un Post

![imagen de codigo](/images/post.jpg)


El sistema de blog fue creado para ser simple y rapido,
el sistema funciona atraves de fichero Markdown que son leidos por el servidor, analizados y transformados a html estatico.

## Estandar
se utilizo un estandar para definir la informacion del Post, el estandar es el siguiente:

```markdown
 ---
id:identificador en la url
title: titulo del post
image: url de la imagen dentro de la carpeta public
description:descripcion del post
\---
```
en el  anterior ejemplo no va el '\\', fue colocado para evitar la convencion de markdown

* El **id** es utilizado es para identificar el post en la url itcscience.org/blog/id
* **title** es el titulo mostrado en la parte del blog
* **image** es la imagen que es mostrada en el blog
* **description** es la description mostrada en el blog 

Luego de definir esto,se escribe  el post .

## Como crear y subirlo ?
De una forma sencilla se debe crear una nueva rama en git, y en la carpeta /posts  guardar archivo markdown.

* Crear la rama 
```bash
git checkout -b  Post/{nombre del post}
```

Luego crea el archivo del post  y guardarlo en /post, El nombre del archivo debe ser igual a la id definida en el archivo.


* Hacer commit 
```bash
git add .
git commit -m "create post {nombre del post}"
git push -u origin post/{nombre del post}
```
Para terminar hacer la pull request para que post sea revisado.


