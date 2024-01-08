---
id:bun
title: Bun, ¿el asesino de Node.js?
image:/images/bun.webp
description:Bun rendimiento, seguridad y simplicidad  ¿lograra vencer a nodejs?
---

# Bun, ¿el asesino de Node.js?

![bun](/images/bun.webp)

Antes de ir al punto, ¿qué es Bun? Bun podría definirse solo como un entorno de
ejecución de javascript pero es mas que eso,ya que es un entorno de ejecución de
javascript que incluye un empaquetador, un administrador de paquetes y testing.

que hace a Bun diferente de Node.js? Bun esta escrito en zig ,un lenguaje de
programación que permite manejar la memoria de manera segura y eficiente,Bun fue
programado para tener un rendimiento superior a Node.js.

ademas bun esta siendo desarrollado por una empresa privada llamada
[Oven](https://oven.sh/) a diferencia de nodejs que es desarrollado por la
[OpenJS Foundation](https://openjsf.org/) una organización sin fines de lucro.

## el rendimiento de Bun

En realidad Bun es mas rápido que Node.js?,la respuesta corta es si. en los
benchmarks de oven se puede ver que bun es mas rápido que nodejs, en su web se
muestra que Bun consigue 66,706 en comparación con 13,967 Node.js en el manejo
de peticiones HTTP por segundo,ademas bun alcanza 1,098,870 que con nodejs
179,185 en el manejo de mensajes (websocket) por segundo y 81.37 donde nodejs
solo consigue 21.29 en el manejo de consultas a la base de datos por segundo.

dando como resultado que bun es 4 veces mas rápido que nodejs en el manejo de
peticiones HTTP, 6 veces mas rápido en el manejo de mensajes y 4 veces mas
rápido en el manejo de consultas a la base de datos.

## Bun como administrador de paquetes

Bun también es un administrador de paquetes y en comparación con npm, bun es
mucho mas rápido, en el benchmark de oven se puede ver que bun tarda 00.36s en
instalar paquetes mientras que npm tarda 10.58s en instalar la misma cantidad
paquetes.

lo interesante es que también es compatible con los paquetes de npm, por lo que
se puede usar los paquetes de npm con bun y instalar tus paquetes de npm con bun
sin tener que utilizar bun como runtime.

## entonces Bun aniquilara a Node.js?

Bun es un proyecto muy interesante y prometedor, pero aun esta en desarrollo y
tiene una comunidad muy pequeña en comparación con nodejs. Bun es un proyecto
que vale la pena seguir de cerca, pero aun no es el momento de abandonar nodejs,
ya que nodejs es muy usado por las empresas, la mayoría de hosting y servidores
soportan nodejs y bun muy pocos lo soportan.

- [Bun repositorio](https://github.com/oven-sh/bun)
- [Documentación de Bun](https://bun.sh/docs)
