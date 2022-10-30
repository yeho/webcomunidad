var express = require("express");
var router = express.Router();

/* serve community links */
const groups = [
  {
    name: "ITCScience",
    link: "https://chat.whatsapp.com/EtQk9oMhecp1aFt3akPaOA",
    image: "/images/itcs.jpeg",
  },
  {
    name: "Ciencias👾Computacionales",
    link: "https://chat.whatsapp.com/FTSALNW5qCwK2Yjlszi1Pq",
    image: "/images/cien.jpeg",
  },
  {
    name: "👾 Programadores 🖥️",
    link: "https://chat.whatsapp.com/Gqcit7OCPiiIoZp93wjNjF",
    image: "/images/pog.jpeg",
  },
  {
    name: "🤖 Programadores 101 👾",
    link: "https://chat.whatsapp.com/IFFG3uUQNO2DfrKzUiOCBo",
    image: "/images/101.jpeg",
  },
  {
    name: "🐧 IT & SysAdmin 💻",
    link: "https://chat.whatsapp.com/Cn2s8jDntv9InrNlB8Ni93",
    image: "/images/it.jpeg",
  },
  {
    name: "📚 Recursos Informatica 🤓",
    link: "https://chat.whatsapp.com/ER1SMqM6GmZKGBIWD7JUEs",
    image: "/images/recur.jpeg",
  },
  
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("community", { groups });
});

module.exports = router;
