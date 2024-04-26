const card = document.querySelector(".cards");
const input = document.getElementById("input");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const button = document.querySelector("#form");
const btn = document.querySelector("#button");
const select = document.querySelector("#select");

loader.classList.remove("hidden");

const darkMode = document.querySelector("#mode");
const modesimg = document.querySelector("#modesimg");
let modes = document.body;
if (localStorage.getItem("darkMode") === "dark") {
  modes.classList.remove("light");
  darkMode.lastChild.textContent = "Dark mode";
  modesimg.setAttribute("src", "./static/img/night-mode.png");
  localStorage.setItem("darkMode", "dark");
} else {
  modes.classList.add("light");
  darkMode.lastChild.textContent = "Light mode";
  modesimg.setAttribute("src", "./static/img/light-mode.png");
  localStorage.setItem("darkMode", "light");
}
darkMode.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    modes.classList.remove("light");
    darkMode.lastChild.textContent = "Dark mode";
    modesimg.setAttribute("src", "./static/img/night-mode.png");
    localStorage.setItem("darkMode", "dark");
  } else {
    modes.classList.add("light");
    darkMode.lastChild.textContent = "Light mode";
    modesimg.setAttribute("src", "./static/img/light-mode.png");
    localStorage.setItem("darkMode", "light");
  }
});

function create(data) {
  card.innerHTML = "";
  data.forEach(({ continents, name, population, flags, capital, slug }) => {
    let data1 = document.createElement("div");
    data1.classList.add("content");
    data1.innerHTML = `
    <a class="" href="./about.html?id=${name.slug}">
    <div class="img-container">
    <img
      src="${flags.png}"
      alt=${"flags"}
    />
  </div>
  <div class="aboutpopul">
    <h3>${name.common}</h3>
    <p><span class="aboutpage">Population:</span></h5>${population}</p>
    <p><span class="aboutpage">Region:</span></h5>${continents}</p>
    <p><span class="aboutpage">Capital:</span></>${capital}</p>
  </div>
    </a>
    `;
    card.appendChild(data1);
  });
}
if (!select.value == "all") {
  fetch(
    `https://frontend-mentor-apis-6efy.onrender.com/countries?region=${select.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      create(data.data);
      loader.classList.add("hidden");
    })
    .catch((eror) => {
      error.classList.remove("hidden");
      loader.classList.add("hidden");
    });
} else {
  fetch(`https://frontend-mentor-apis-6efy.onrender.com/countries`)
    .then((res) => res.json())
    .then((data) => {
      create(data.data);
      loader.classList.add("hidden");
    })
    .catch((eror) => {
      error.classList.remove("hidden");
      loader.classList.add("hidden");
    });
}
select.addEventListener("change", (e) => {
  card.innerHTML = "";
  loader.classList.remove("hidden");
  error.classList.add("hidden");
  fetch(
    `https://frontend-mentor-apis-6efy.onrender.com/countries?region=${e.target.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (select.value == "all") {
        fetch(`https://frontend-mentor-apis-6efy.onrender.com/countries`)
          .then((res) => res.json())
          .then((data) => {
            create(data.data);
            loader.classList.add("hidden");
          })
          .catch((eror) => {
            error.classList.remove("hidden");
            loader.classList.add("hidden");
          });
      }
      create(data.data);
      loader.classList.add("hidden");
    })
    .catch((eror) => {
      error.classList.remove("hidden");
      loader.classList.add("hidden");
    });
});

function creat(datab) {
  card.innerHTML = "";
  const { name, flags, population, continents, capital } = datab;
  let articel1 = document.createElement("article");
  articel1.classList.add("content");
  articel1.innerHTML = `
    <a class="" href="./about.html?id=${name.slug}">
    <div class="img-container">
    <img
      src="${flags.png}"
      alt=${flags.alt}
    />
  </div>
  <div class="aboutpopul">
    <h3>${name.common}</h3>
    <p><span class="aboutpage">Population:</span></h5>${population}</p>
    <p><span class="aboutpage">Region:</span></h5>${continents}</p>
    <p><span class="aboutpage">Capital:</span></>${capital}</p>
  </div>
    </a>
    `;
  card.appendChild(articel1);
}
button.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!btn.value == "") {
    fetch(
      `https://frontend-mentor-apis-6efy.onrender.com/countries?/countries?region=${select.value}&search=${btn.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data[0].region == select.value || select.value == "all") {
          creat(data.data[0]);
          loader.classList.add("hidden");
        } else {
          card.innerHTML = "";
          error.classList.remove("hidden");
          card.innerHTML = `<h3>${select.value}-Bu qit-ada siz izlagan davlat mavjud emas </h3>`;
          select.addEventListener("change", () => {
            error.classList.add("hiddin");
          });
        }
      })
      .catch((eror) => {
        error.classList.remove("hidden");
        card.innerHTML = `<h3 class="error-title";>Bu davlat mavjud emas</h3>
        <a class="btn back-home" href="./index.html">back home</a>
        `;
        loader.classList.add("hidden");
      });
  }
  btn.value = "";
});
