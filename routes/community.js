var express = require("express");
var router = express.Router();

/* serve community links */
const groups = [
  {
    name: "ITCScience",
    link: "https://chat.whatsapp.com/EtQk9oMhecp1aFt3akPaOA",
    image: "https://pps.whatsapp.net/v/t61.24694-24/232554796_158300713481337_7899660378279633601_n.jpg?ccb=11-4&oh=01_AdRVNkIAe-0n0f_T5eO_xr9VPfV-WcMLfjFBPaZOIbN-ww&oe=635B7490",
  },
  {
    name: "Ciencias👾Computacionales",
    link: "https://chat.whatsapp.com/FTSALNW5qCwK2Yjlszi1Pq",
    image: "https://pps.whatsapp.net/v/t61.24694-24/256423780_259012619658215_8190985447252023560_n.jpg?ccb=11-4&oh=01_AdR9kDADtVKbJIdhZwnHdLD14l6FDE1OImGVBEoQ1xin3g&oe=635BA847",
  },
  {
    name: "👾 Programadores 🖥️",
    link: "https://chat.whatsapp.com/Gqcit7OCPiiIoZp93wjNjF",
    image: "https://pps.whatsapp.net/v/t61.24694-24/287130181_764639738244062_5004074417705977081_n.jpg?ccb=11-4&oh=01_AdRyGgcy5_EhBSLOLMri3X7ZROFr6_BtMFv4I-AYE-qf3w&oe=635BF8CE",
  },
  {
    name: "🤖 Programadores 101 👾",
    link: "https://chat.whatsapp.com/IFFG3uUQNO2DfrKzUiOCBo",
    image: "https://pps.whatsapp.net/v/t61.24694-24/298821478_782982026276520_2193611541114376391_n.jpg?ccb=11-4&oh=01_AdT3Vla-XSloF0NTkG1_u0GASKcGelUHjiiSWYGFU5QEBQ&oe=635B2559",
  },
  {
    name: "🐧 IT & SysAdmin 💻",
    link: "https://chat.whatsapp.com/Cn2s8jDntv9InrNlB8Ni93",
    image: "https://pps.whatsapp.net/v/t61.24694-24/309309342_1720545304991103_4196417582560774868_n.jpg?ccb=11-4&oh=01_AdSpciBNKuX0nII6DXMnKg0cFp1XqkYkULfidc2uMb29HQ&oe=635BC7B7",
  },
  {
    name: "📚 Recursos Informatica 🤓",
    link: "https://chat.whatsapp.com/ER1SMqM6GmZKGBIWD7JUEs",
    image: "https://pps.whatsapp.net/v/t61.24694-24/301223286_1063348574311066_6999902353584985666_n.jpg?ccb=11-4&oh=01_AdQiS5Wjwqu0swWthsY9peWmMlusAqioyE3BYucc_ZoipA&oe=635A923E",
  },
  
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("community", { groups });
});

module.exports = router;
