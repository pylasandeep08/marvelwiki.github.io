// SEARCH FUNCTION
function searchMovies() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("p").innerText.toLowerCase();

        if (title.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// FILTER BY PHASE
function filterPhase(phase) {
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        // Show all
        if (phase === "all") {
            card.style.display = "block";
        }
        // Show selected phase
        else if (card.classList.contains(phase)) {
            card.style.display = "block";
        }
        // Hide others
        else {
            card.style.display = "none";
        }

    });
}


// OPTIONAL: COMBINE SEARCH + FILTER (ADVANCED)
function searchAndFilter() {
    let input = document.getElementById("search").value.toLowerCase();
    let selectedPhase = document.getElementById("phaseFilter").value;
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("p").innerText.toLowerCase();

        let matchesSearch = title.includes(input);
        let matchesPhase = (selectedPhase === "all" || card.classList.contains(selectedPhase));

        if (matchesSearch && matchesPhase) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}