const article = [
  {
    title: "Cómo saber con cual lenguaje empezar",
    description:
      "¿Quieres empezar a programar y no sabes que lenguaje de programación aprender primero?",
    content: "This is the content of my first article",
    img: "img-article.webp",
  },
  {
    title: "Cómo ser un buen autodiiacta en el mundo IT",
    description: "This is my first article",
    content: "This is the content of my first article",
    img: "img-article.webp",
  },
  {
    title: "¿Cómo empezar en ciberseguridad?",
    description: "This is my first article",
    content: "This is the content of my first article",
    img: "img-article.webp",
  },
  {
    title: "Distros de Linux para programadores",
    description: "This is my first article",
    content: "This is the content of my first article",
    img: "img-article.webp",
  },
];

const $article = document.querySelector("#information");
$article.innerHTML = article.map((e) => {
  return `
  <article id="article">
        <div class="article-img">
          <img src="./assets/${e.img}" alt="front-1" />
        </div>
        <div class="article-content">
          <h1>${e.title}</h1>
          <p>${e.description}</p>
          <a href="#">Leer mas</a>
        </div>
      </article>
  `;
});
