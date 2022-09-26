let pokemon = fetch(
  "https://pokeapi.co/api/v2/pokemon?page=1?limit=100&offset=0"
).then((request) => request.json());

document.addEventListener("DOMContentLoaded", function () {
  var contatore = 1;
  var next = "";
  var prev = "";
  var contenitore = document.getElementById("contenitore");
  var container = document.getElementById("container");
  container.innerHTML = "";
  container.innerHTML += `
    <nav aria-label="Page navigation example" class="navBtn">
            <ul class="pagination">
              <li class="page-item">
                <a id="prev" class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
                <a id="next" class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
          <div id="contenitore" class="row row-cols-1 row-cols-md-5 g-4"></div>

    `;
  var contenitore = document.getElementById("contenitore");
  aggiorna(pokemon);

  function aggiorna(pokemon) {
    contenitore.innerHTML = "";
    pokemon.then((pokemon) => {
      next = pokemon.next;
      pokemon.previous !== null ? (prev = pokemon.previous) : (prev = "");
      console.log(pokemon);
      let nextE = document.getElementById("next");
      let prevE = document.getElementById("prev");
      prevE.addEventListener("click", prevF);
      nextE.addEventListener("click", nextF);
      pokemon.results.forEach((element) => {
        let dati = fetch(element.url).then((resolve) => resolve.json());
        dati.then((dati) => {
          element.dati = dati;
          let url =
            element.dati.sprites.other["official-artwork"].front_default;
          let tipi = element.dati.types;
          let stringaTipi = "";
          tipi.forEach((tipo) => {
            stringaTipi += tipo.type.name + "<br>";
          });
          let statistiche = element.dati.stats;
          let nome = element.name;

          stampaCard(nome.toUpperCase(), url, stringaTipi, statistiche);
        });
      });
    });
  }

  function prevF() {
    if (prev !== "") {
    contatore = contatore - 40;
      let pokemon = fetch(prev).then((request) => request.json());
      aggiorna(pokemon);
    }
  }
  function nextF() {
    let pokemon = fetch(next).then((request) => request.json());
    aggiorna(pokemon);
  }

  function stampaCard(nome, immagine, stringaTipi, statistiche) {
    let card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `<div class="card h-100">
                                 <img src=${immagine} class="card-img-top" alt="...">
                                 <div class="card-body">
                                     <h4 class="card-title">#${contatore} ${nome}</h4>
                                     <h6 class="card-text">Tipo/i</h6>
                                    <p class="card-text">${stringaTipi}</p>
                                    <h6 class="card-text">Statistiche</h6>
                                    <p class="card-text">${statistiche[0].stat.name} : ${statistiche[0].base_stat} <br>
                                                        ${statistiche[1].stat.name} : ${statistiche[1].base_stat} <br>
                                                        ${statistiche[2].stat.name} : ${statistiche[2].base_stat} <br>
                                                        ${statistiche[3].stat.name} : ${statistiche[3].base_stat} <br>
                                                        ${statistiche[4].stat.name} : ${statistiche[4].base_stat} <br>
                                                        ${statistiche[5].stat.name} : ${statistiche[5].base_stat}  <br>                                                           
                                    </p>
                                </div>
                        </div>`;
    contenitore.appendChild(card);
    contatore++;
  }
});
