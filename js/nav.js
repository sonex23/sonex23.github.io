document.addEventListener("DOMContentLoaded", function () {
	//Active sidebar nav
	var elems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(elems);

	//load nav
	loadNav();

	function loadNav() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				// Muat daftar tautan menu
				document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
					elm.innerHTML = xhttp.responseText;
				});

				document.querySelectorAll(".sidenav a, .topnav a, .ikon").forEach(function (elm) {
					elm.addEventListener("click", function (event) {
						//Tutup Sidenav
						var sidenav = document.querySelector(".sidenav");
						M.Sidenav.getInstance(sidenav).close();
					});
				});
			}
		};
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}

	var page = window.location.hash.substr(1);
	if (page == "") page = "home";
	loadPage(page);

	function loadPage(page) {
		var xhttp = new XMLHttpRequest;
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				var content = document.querySelector("#body-content");
				if (this.status == 200) {
					content.innerHTML = xhttp.responseText;
				} else if (this.status == 404) {
					content.innerHTML = "<p>Halaman Tidak ditemukan.</p>"
				} else {
					content.innerHTML = "<p>Ups... Halaman tidak dapat diakses</p>"
				}
			}
		};
		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}
	//load footer
	loadFooter();

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
});