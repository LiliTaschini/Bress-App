// Llamadas del DOM - Variables
let container = document.querySelector(".container-cards");
let containerFiltered = document.querySelector(".container-filtered");
let genresLink = document.getElementById("genres-link");
let searchLink = document.getElementById("search-link");
let nav = document.querySelector(".navbar-toggler");
let tagsContainerGenres = document.getElementById("genres-options");
let searchInput = document.getElementById("search-input");
let searchTerm;
let selectedGenre;
let count = 1;
let filteredCount = 1;
let array = [];

// trae los juegos (Página principal)
getMoreGames();
// Funciones: 
function getMoreGames() {
  let loadedGameIds = new Set();
  let url = `https://api.rawg.io/api/games?&page=${count}&page_size="20"&key=3d26304b3548429894b87a33d4615c13`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.results.forEach((game) => {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.src = game.background_image;
        card.appendChild(img);
        let name = document.createElement("h5");
        name.classList.add("card-title");
        name.textContent = game.name;
        let divBoton = document.createElement("div");
        divBoton.classList.add("button_card");
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-outline-dark");
        button.classList.add("btn-sm");
        button.textContent = "View More";
        divBoton.appendChild(button);
        divBoton.appendChild(name);
        card.appendChild(divBoton);
        if (!loadedGameIds.has(game.id)) {
          container.appendChild(card);
          loadedGameIds.add(game.id); 
        }

        // Abre el modal al hacer clic en el botón "View More"
        button.addEventListener("click", () => {
          openModal(game.id);
          array = [...game.short_screenshots];
        });

        // Efecto para hover en imágenes, le falta transition
        let screenshotIndex = 1;
        let screenshotInterval;
        card.addEventListener("mouseover", () => {
          if (game.short_screenshots && game.short_screenshots.length > 0) {
            clearInterval(screenshotInterval);
            screenshotInterval = setInterval(() => {
              img.src = game.short_screenshots[screenshotIndex].image;
              screenshotIndex =
                (screenshotIndex + 1) % game.short_screenshots.length; // Avanzar al siguiente índice circularmente
            }, 500);
          }
        });
        card.addEventListener("mouseout", () => {
          clearInterval(screenshotInterval);
          img.src = game.background_image;
        });
      });
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}
 // Trae filtrados para géneros y buscador
function showFilteredGames(searchTerm) {
  let loadedGameIds = new Set();
  let api_key = "3d26304b3548429894b87a33d4615c13";
  let url = `https://api.rawg.io/api/games?&key=${api_key}`;
  
  if (selectedGenre) {
    url += `&genres=${selectedGenre}&page=${filteredCount}&page_size=20`;
  }
  if (searchTerm) {
    url += `&search=${searchTerm}&page=${filteredCount}&page_size=20`;
  }
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((game) => {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.src = game.background_image;
        card.appendChild(img);
        let name = document.createElement("h5");
        name.classList.add("card-title");
        name.textContent = game.name;
        let divBoton = document.createElement("div");
        divBoton.classList.add("button_card");
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-outline-dark");
        button.classList.add("btn-sm");
        button.textContent = "View More";
        divBoton.appendChild(button);
        divBoton.appendChild(name);
        card.appendChild(divBoton);
        if (!loadedGameIds.has(game.id)) {
          containerFiltered.appendChild(card);
          loadedGameIds.add(game.id); 
        }

        // Abre el modal al hacer clic en el botón "View More"
        button.addEventListener("click", () => {
          openModal(game.id);
          array = [...game.short_screenshots];
        });

        // Efecto para hover en imágenes, le falta transition
        let screenshotIndex = 1;
        let screenshotInterval;
        card.addEventListener("mouseover", () => {
          if (game.short_screenshots && game.short_screenshots.length > 0) {
            clearInterval(screenshotInterval);
            screenshotInterval = setInterval(() => {
              img.src = game.short_screenshots[screenshotIndex].image;
              screenshotIndex =
                (screenshotIndex + 1) % game.short_screenshots.length; // Avanzar al siguiente índice circularmente
            }, 500);
          }
        });
        card.addEventListener("mouseout", () => {
          clearInterval(screenshotInterval);
          img.src = game.background_image;
        });
      });
    
   
  })
  .catch((err) => console.log(err));
 
}

// Función para verificar si el usuario está al final de la página
function userAtTheBottom() {
  // Obtiene altura total del documento
  let totalHeight = document.documentElement.scrollHeight;
  // Obtiene la altura de la ventana del navegador
  let windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  // Obtiene la posición actual del desplazamiento vertical
  let actualPosition =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // Verifica si el usuario está cerca del final de la página
  if (totalHeight - windowHeight - actualPosition <= 0) {
    return true;
  } else {
    return false;
  }
}

// Abre el modal con la información más especifica de los juegos
function openModal(gameId) {
  let modalBody = document.querySelector(".modal-body");
  let modalHeader = document.querySelector(".modal-header");
  let modalMenu = document.querySelector(".modal-menu");
  let modalInfo = document.querySelector(".modal-info");
  let slider = document.querySelector(".swiper-wrapper");
  let swipered = document.querySelector(".swiper");
  let raiting = document.querySelector(".container-raiting");
  let raitingInputs = document.querySelector(".raiting");
  let giBtn = document.querySelector(".gi-btn");
  let dBtn = document.querySelector(".d-btn");
  let gBtn = document.querySelector(".g-btn");
  let pBtn = document.querySelector(".p-btn");
  let sBtn = document.querySelector(".s-btn");

  modalBody.innerHTML = "";
  modalInfo.innerHTML = "";
  slider.innerHTML = "";

  let viewUrl = `https://api.rawg.io/api/games/${gameId}?key=3d26304b3548429894b87a33d4615c13`;
  fetch(viewUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (game) {
      let title = document.querySelector(".title");
      title.textContent = game.name;

      array.forEach((i) => {
        let img = document.createElement("img");
        let div = document.createElement("div");
        img.src = i.image;
        div.classList.add("swiper-slide");
        div.appendChild(img);
        slider.appendChild(div);
      });
      swipered.appendChild(slider);
      modalBody.appendChild(swipered);
      modalBody.appendChild(raiting);

      let swiper = new Swiper(".swiper", {
        loop: true,
        autoplay: {
          delay: 2000,
        },
        speed: 1,
        effect: "slide",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      let date = game.updated.slice(0, 10).replace("T", " ");

      // Botones del Menú - Según cual se toque, va a mostrar info diferente
      giBtn.addEventListener("click", () => {
        const developerNames = game.developers.map(
          (developer) => developer.name
        );
        const developersString = developerNames.join(", ");
        modalInfo.innerHTML = `
        <div class="description-div">
        <div class="column">
        <div><span class="info-title">Developed by:</span> ${developersString}</div>
        <div><span class="info-title">Release Date:</span> ${
          game.released || "Unknow"
        }</div>
        <div><span class="info-title">Update Date:</span> ${
          date || "Unknow"
        }</div>
        </div>
        <div class="column">
        <div><a target="_blank" href="${
          game.website || "Unknow"
        }"><span class="info-title">Click and Go To Web Page</span></a></div>
        <div><span class="info-title">Metacritic:</span> ${
          game.metacritic
        }/100</div>
        </div>
        </div>
        `;
      });
      dBtn.addEventListener("click", () => {
        modalInfo.innerHTML = `
        <div class="description">${game.description_raw}</div>
        `;
      });
      gBtn.addEventListener("click", () => {
        const genresNames = game.genres.map((genre) => genre.name);
        const tags = genresNames.map((name) => createTagElement(name));
        modalInfo.innerHTML = "";
        tags.forEach((tag) => modalInfo.appendChild(tag));
      });
      pBtn.addEventListener("click", () => {
        const platformsNames = game.parent_platforms.map(
          (platform) => platform.platform.name
        );
        const tags = platformsNames.map((name) => createTagElement(name));
        modalInfo.innerHTML = "";
        tags.forEach((tag) => modalInfo.appendChild(tag));
      });
      sBtn.addEventListener("click", () => {
        const storesNames = game.stores.map((stores) => stores.store.name);
        const tags = storesNames.map((name) => createTagElement(name));
        modalInfo.innerHTML = "";
        tags.forEach((tag) => modalInfo.appendChild(tag));
      });

      raitingInputs.querySelectorAll("input").forEach((input) => {
        if (input.value == game.rating_top) {
          input.checked = true;
        }
      });

      modalHeader.appendChild(title);
      modalBody.appendChild(modalMenu);
      modalBody.appendChild(modalInfo);

      let modal = new bootstrap.Modal(document.getElementById("gameModal"));
      modal.show();
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

// Crea tags para géneros, plataformas, stores
function createTagElement(name) {
  const tag = document.createElement("div");
  const tags = document.createElement("div");
  tag.classList.add("tag");
  tag.textContent = name;
  return tag;
}

// Función de creación de tags y escucha para el nav - géneros
function showGenres() { 
  let api_key = "3d26304b3548429894b87a33d4615c13";
  let url3 = `https://api.rawg.io/api/genres?key=${api_key}`;
  fetch(url3)
    .then((res) => res.json())
    .then((data) => {
      let tagsContainer = document.getElementById("genres-options");
      tagsContainer.classList.remove("hidde-tags");
      tagsContainer.innerHTML = ''
      data.results.forEach((genre) => {
        const tag = createTagElement(genre.name);
        tag.addEventListener("click", () => {
          tag.classList.toggle("selected");
          selectedGenre = genre.slug;
          showFilteredGames();
          container.innerHTML = "";
        });
        tagsContainer.appendChild(tag);
      });
    })
    .catch((err) => console.log(err));
}

// Función de creación de input de búsqueda y escucha para el nav - search
function searchGame(){
  let input = document.createElement("input");
  input.classList.add("input")
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Search for a game");
  input.addEventListener("input", () => {
  searchTerm = input.value.trim().toLowerCase();
    if (searchTerm !== "") {
      container.innerHTML = "";
      containerFiltered.innerHTML = "";
      count = 1; 
      filteredCount = 1; 
      showFilteredGames(searchTerm);
    }
  });
  searchInput.appendChild(input);
}

// Arreglar, cuando hago scroll con alguno de estos dos se rompe la busqueda y me trae getmoregames
// AddEventListeners:
window.addEventListener("scroll", function () {
  if (userAtTheBottom() && selectedGenre || searchTerm) { 
    console.log("entro al filtro");
    filteredCount++;
    showFilteredGames(); 
  } else if (userAtTheBottom() && !selectedGenre || !searchTerm) {
    count++;
    console.log("Pagina normal");
    getMoreGames(); 
  }
});
genresLink.addEventListener("click",()=>{
 genresLink.classList.toggle("active");
 searchLink.classList.remove("active");
  searchInput.innerHTML = " ";
  showGenres();
});
searchLink.addEventListener("click", ()=>{
  searchLink.classList.toggle("active");
  genresLink.classList.remove("active");
  tagsContainerGenres.innerHTML = " ";
  searchGame()
});

nav.addEventListener("click", () => {
  tagsContainerGenres.classList.toggle("hidde-tags")
})

 