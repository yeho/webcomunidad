# Web Comunidad
Este es el repositorio oficial del sitio web de Comunidad IT.


## Como puedo contribuir?
Para tener un orden y direccion en el proyecto deberas hacer un pull request que debera ser aprobado por al menos una persona, puedes ir subiendo tus cambios a medida que vayas avanzando pero el pull request hazlo hasta que hayas terminado el cambio y asegurate de que tu codigo compile

## Como hacer un pull request?
Primero asegurate de tener el codigo mas actualizado
```sh
git fetch
git pull
```

despues crea una rama a partir de la rama master, deberas nombrar tu rama segun la feature que vayas a desarrollar ejemplo si vas a colaborar con el menu nombra tu rama feature/menu
```sh
git checkout -b feature/menu
```

despues de que hagas tus cambios guardalos con uno o varios commits
```sh
git add .
git commit -m "tu mensaje describiendo los cambios va aqui"
```

si no has subido tu rama no existe en github, subela asi y recuerda cambiar el nombre de la rama
```sh
git push -u origin feature/menu
```

despues de subirla ve a https://github.com/yeho/webcomunidad/pulls y crea tu pull request
