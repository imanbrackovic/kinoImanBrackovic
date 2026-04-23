var STORAGE_KEY = "kinoSala_v1_projekcije";

function sacuvajStanje(projekcije) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projekcije));
}

function ucitajStanje() {
    var sacuvano = localStorage.getItem(STORAGE_KEY);
    if (sacuvano) {
        return JSON.parse(sacuvano);
    }
    return null;
}

function validirajPodatke(projekcije) {
    var validniStatusi = ["slobodno", "zauzeto", "rezervisano"];

    if (!projekcije || projekcije.length === 0) {
        return false;
    }

    for (var i = 0; i < projekcije.length; i++) {
        var sjedista = projekcije[i].sjedista;

        for (var j = 0; j < sjedista.length; j++) {
            if (validniStatusi.indexOf(sjedista[j].status) === -1) {
                return false;
            }
        }
    }

    return true;
}

function azurirajPodatkeOFilmu(projekcija) {
    var kutije = document.querySelectorAll("#podaci-o-filmu .info-kutija");

    if (kutije.length >= 1) {
        kutije[0].querySelector(".vrijednost").textContent = projekcija.film;
    }

    if (kutije.length >= 2) {
        kutije[1].querySelector(".vrijednost").textContent = projekcija.vrijeme;
    }

    if (kutije.length >= 3) {
        kutije[2].querySelector(".vrijednost").textContent = projekcija.sala;
    }
}