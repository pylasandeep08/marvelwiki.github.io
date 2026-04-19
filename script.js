
/* =========================
   🌙 THEME TOGGLE
========================= */
function toggleTheme() {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

// Apply saved theme
window.onload = function () {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    loadReviews(); // load reviews if present
};



/* =========================
   🔍 SEARCH FUNCTION (UPDATED)
========================= */
function searchMovies() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    let suggestions = document.getElementById("suggestions");

    if (suggestions) suggestions.innerHTML = "";

    cards.forEach(card => {
        let title = card.querySelector("p").innerText.toLowerCase();

        if (title.includes(input)) {
            card.style.display = "block";

            // Suggestions
            if (suggestions && input !== "") {
                let div = document.createElement("div");
                div.innerText = card.querySelector("p").innerText;

                div.onclick = () => {
                    window.location = card.querySelector("a").href;
                };

                suggestions.appendChild(div);
            }

        } else {
            card.style.display = "none";
        }
    });
}



/* =========================
   🎬 FILTER BY PHASE (FIXED)
========================= */
function filterPhase(phase) {
    let blocks = document.querySelectorAll(".phase-block");

    blocks.forEach(block => {
        if (phase === "all") {
            block.style.display = "block";
        } else {
            block.style.display = block.classList.contains(phase)
                ? "block"
                : "none";
        }
    });
}



/* =========================
   🔀 COMBINED SEARCH + FILTER
========================= */
function searchAndFilter() {
    let input = document.getElementById("search").value.toLowerCase();
    let selectedPhase = document.getElementById("phaseFilter").value;

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector("p").innerText.toLowerCase();

        let matchesSearch = title.includes(input);
        let matchesPhase =
            selectedPhase === "all" || card.classList.contains(selectedPhase);

        if (matchesSearch && matchesPhase) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}



/* =========================
   💬 REVIEW SYSTEM
========================= */
function addReview() {
    let movie = document.title;
    let user = localStorage.getItem("user");

    if (!user) {
        alert("Please login first!");
        return;
    }

    let textBox = document.getElementById("reviewText");
    if (!textBox) return;

    let text = textBox.value.trim();

    if (text === "") {
        alert("Please write a review!");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem(movie)) || [];

    reviews.push(user + ": " + text);

    localStorage.setItem(movie, JSON.stringify(reviews));

    textBox.value = "";

    loadReviews();

    alert("✅ Review submitted successfully!");
}



/* =========================
   📄 LOAD REVIEWS
========================= */
function loadReviews() {
    let movie = document.title;
    let container = document.getElementById("reviews");

    if (!container) return;

    let reviews = JSON.parse(localStorage.getItem(movie)) || [];

    container.innerHTML = "";

    reviews.forEach(r => {
        let p = document.createElement("p");
        p.innerText = r;
        container.appendChild(p);
    });
}



/* =========================
   🔐 LOGIN SYSTEM
========================= */
function loginUser() {
    let username = document.getElementById("username").value;

    if (username.trim() === "") {
        alert("Enter username");
        return;
    }

    localStorage.setItem("user", username);

    alert("Login successful!");

    window.location = "index.html";
}
/* =========================
   🔐 SIGNUP FUNCTION
========================= */
function signup() {
    let user = document.getElementById("signupUser").value;
    let pass = document.getElementById("signupPass").value;

    if (user === "" || pass === "") {
        alert("Please fill all fields!");
        return;
    }

    // get users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if already exists
    let exists = users.find(u => u.username === user);

    if (exists) {
        alert("User already exists!");
        return;
    }

    // save user
    users.push({ username: user, password: pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Now login.");
}



/* =========================
   🔐 LOGIN FUNCTION
========================= */
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(u => u.username === user && u.password === pass);

    if (validUser) {
        localStorage.setItem("user", user);
        alert("Login successful!");

        // REDIRECT
        window.location.href = "index.html";

    } else {
        alert("Invalid username or password!");
    }
}
