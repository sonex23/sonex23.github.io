if (!("serviceWorker" in navigator)) {
    console.log("Service Worker tidak didukung di browser ini");
} else {
    registerServiceWorker();
}

function registerServiceWorker() {
    return navigator.serviceWorker.register("../sw.js")
        .then(function (registration) {
            console.log("Registrasi ServiceWorker Berhasil !");
            return registration;
        })
        .catch(function () {
            console.log("Error : Registrasi serviceWorker gagal");
        });
}


function loadFooter() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            var content = document.querySelector("#footer");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            }
        }
    };
    xhttp.open("GET", "footer.html", true);
    xhttp.send();
}

function loadPage() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            var content = document.querySelector("#body-content");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            }
        }
    };
    xhttp.open("GET", "pages/sub-content.html", true);
    xhttp.send();
}