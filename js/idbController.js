const idbPromised = idb.open("myDatabase", 2, function (upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favoriteClub")) {
        var club = upgradeDb.createObjectStore("favoriteClub", {
            keypath: "clubId"
        });
        club.createIndex("id", "id", {
            unique: true
        });
        club.createIndex("name", "name", {
            unique: false
        });
    }
});

//add
const dbInsertClub = club => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("favoriteClub", `readwrite`);
            transaction.objectStore("favoriteClub").add(club);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};