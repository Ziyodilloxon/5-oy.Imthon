const card = document.querySelector(".cards");
const input = document.getElementById("input");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
loader.classList.remove("hidden");

function create(data) {
  card.innerHTML = "";
  data.forEach(({ slug, name, flags, population, continents, capital }) => {
    let wrapper = document.createElement("article");
    wrapper.classList.add("content");
    wrapper.innerHTML = `
    <a class="" href="./about.html?id=${name.slug}">
    <div class="img-container">
    <img
      src="${flags.png}"
      alt=${"flags"}
    />
  </div>
  <div class="cocktail-footer">
    <h3>${name.common}</h3>
    <p><span class="kilop">Population:</span></h5>${population}</p>
    <p><span class="kilop">Region:</span></h5>${continents}</p>
    <p><span class="kilop">Capital:</span></>${capital}</p>
  </div>
    </a>
    `;
    card.appendChild(wrapper);
  });
}
const select = document.querySelector("#select");
console.log(select.value);
if (!select.value == "all") {
  fetch(
    `https://frontend-mentor-apis-6efy.onrender.com/countries?region=${select.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
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
      console.log(data.data);
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
      create(data.data);
      loader.classList.add("hidden");
    })
    .catch((error) => {
      error.classList.remove("hidden");
      loader.classList.add("hidden");
    });
});

function createFunc(func) {
  card.innerHTML = "";
  const { name, flags, population, continents, capital } = func;
  let wrapper = document.createElement("article");
  wrapper.classList.add("cardsswrap");
  wrapper.innerHTML = `
    <a class="" href="./about.html?id=${name.slug}">
    <div class="img-container">
    <img
      src="${flags.png}"
      alt=${flags.alt}
    />
  </div>
  <div class="cocktail-footer">
    <h3>${name.common}</h3>
    <p><span class="kilop">Population:</span></h5>${population}</p>
    <p><span class="kilop">Region:</span></h5>${continents}</p>
    <p><span class="kilop">Capital:</span></>${capital}</p>
  </div>
    </a>
    `;
  card.appendChild(wrapper);
}

const button = document.querySelector("#form");
const button1 = document.querySelector("#inp");

button.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!button1.value == "") {
    fetch(
      `https://frontend-mentor-apis-6efy.onrender.com/countries?region=${select.value}&search=${button1.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data[0].region == select.value || select.value == "all") {
          createFunc(data.data[0]);
          loader.classList.add("hidden");
        } else {
          error.classList.remove("hidden");
          card.innerHTML = `<h3>${select.value}-bu qitada siz izlagan davlat mavjud emas</h3>`;
          select.addEventListener("change", () => {
            error.classList.add("hidden");
          });
        }
      })
      .catch((error) => {
        error.classList.remove("hidden");
        card.innerHTML = `<h3 class="eror-title";>Bu davlat mavjud emas</h3>
        <a class="btn btn-primary bt7" href="./index.html">back home</a>`;
        loader.classList.add("hidden");
      });
  }
  button1.value = "";
});
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
