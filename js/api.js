var base_url = "https://api.football-data.org/v2/";
const api_key = "b864eea518104ee49de111f1d442d85e";

const league_id = getId();

function getId() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    return idParam;
}

const endpoint_competition = `${base_url}competitions/${league_id}/standings`;

const fetchApi = url => {
    return fetch(url, {
            headers: {
                'X-Auth-Token': api_key
            }
        })
        .then(status)
        .then(json)
        .catch(error);
};

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);

        //method reject akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        //Mengubah suatu objek menjadi promise agar bisa di-then-kan
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getAllStandings() {
    if ("caches" in window) {
        caches.match(endpoint_competition).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition data : ", data);
                    showStandings(data);
                })
            }
        })
    }

    fetchApi(endpoint_competition)
        .then(data => {
            showStandings(data);
        })
}

function showStandings(data) {
    let standings = "";
    let standingElement = document.getElementById("standing");

    data.standings[0].table.forEach(standing => {
        standings += `
            <tr>
                <td>${standing.position}</td>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${standing.team.name}</td>
                <td>${standing.points}</td>
                <td>${standing.playedGames}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
                <td>
                    <a class="waves-effect btn addButton" id=${standing.team.id}>Add to Favorite</a>
                    <a class="waves-effect btn detailButton" id=${standing.team.id}>Detail</a>
                </td>
            </tr>
        `;
    });

    standingElement.innerHTML = `

    <h3 class="cyan-text darken-2">Standings</h3>
    <table class="striped responsive-table">
        <thead>
            <tr>
                <th>Position</th>
                <th>Logo</th>
                <th>Team Name</th>
                <th>Pts</th>
                <th>PG</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody id="standings">
            ${standings}
        </tbody>
    </table>
    `;
}

const endpoint_match = `${base_url}competitions/${league_id}/matches`;

function getAllMatch() {
    if ("caches" in window) {
        caches.match(endpoint_match).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Match data : ", data);
                })
            }
        })
    }

    fetchApi(endpoint_match)
        .then(data => {
            showAllMatch(data);
        })
}

function showAllMatch(data) {
    console.log("Match Data", data);
}