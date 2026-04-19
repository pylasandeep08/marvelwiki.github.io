function login() {
    let user = document.getElementById("username").value;

    if (user === "") {
        document.getElementById("msg").innerText = "Enter username!";
        return;
    }

    localStorage.setItem("user", user);

    window.location.href = "index.html";
}