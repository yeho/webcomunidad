var express = require("express");
var router = express.Router();

const posts = [
  {
    title: "el top de los mejores distribuciones de linux",
    description:
      "En la siguiente lista hemos recopilado algunas de las distribuciones de Linux más populares y también algunas distros que vienen pisando fuerte. Los sistemas operativos GNU/Linux son de tipo Unix y de código abierto, y están basados en el kernel de Linux. Entre la larga lista de distribuciones de Linux, hay unas cuantas que destacan entre el resto ",
    image: "https://i.blogs.es/68825f/linuxap/450_1000.jpg",
    autor: "Anonimo",
    date: "14.10.2022 18:05 h",
  },
  {
    title: "Turing machine",
    description:
      "un dispositivo que manipula símbolos sobre una tira de cinta de acuerdo con una tabla de reglas. A pesar de su simplicidad, una máquina de Turing puede ser adaptada para simular la lógica de cualquier algoritmo de computador y es particularmente útil en la explicación de las funciones de una CPU dentro de un computador.",
    image:
      "https://imagenes.elpais.com/resizer/00aRr553FHrPv7h11eRsVXQo4mE=/1960x0/filters:focal(53x134:63x144)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/3FKNA3NWMRFJBOIDWNISFFW4KY.jpg",
    autor: "Anonimo",
    date: "14.10.2022 18:05 h",
  },
  {
    title: "Lenguaje C",
    description:
      "riginalmente desarrollado por Dennis Ritchie entre 1969 y 1972 en los Laboratorios Bell,1​ como evolución del anterior lenguaje B, a su vez basado en BCPL.2​: 1 3​4​Al igual que B, es un lenguaje orientado a la implementación de sistemas operativos, concretamente Unix. C es apreciado por la eficiencia del código que produce y es el lenguaje de programación más popular para crear softwares de sistemas y aplicaciones",
    image: "https://i.blogs.es/21f7ba/c-lenguaje/1366_2000.jpg",
    autor: "Anonimo",
    date: "14.10.2022 18:05 h",
  },
  {
    
    title: "aprende a programar",
    description: "aprender a programar con los mejores libros de programacion",
    image:
      "https://aprenderbigdata.com/wp-content/uploads/mejores-libros-programacion.jpg",
    autor: "Anonimo",
    date: "14.10.2022 18:05 h",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("blog", { posts });
});

module.exports = router;
