var STORAGE_KEY = "kinoSala_v1_projekcije";
 
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

function prikaziSalu(projekcije, trenutniIndex) {
    var grid = document.getElementById("sjedista-grid");
    if (!grid) return;
 
    var projekcija = projekcije[trenutniIndex];
 
    azurirajPodatkeOFilmu(projekcija);
 
    grid.innerHTML = "";
 
    var redovi = {};
    var redoslijed = [];
 
    for (var i = 0; i < projekcija.sjedista.length; i++) {
        var sjediste = projekcija.sjedista[i];
        if (!redovi[sjediste.red]) {
            redovi[sjediste.red] = [];
            redoslijed.push(sjediste.red);
        }
        redovi[sjediste.red].push(sjediste);
    }
 
    for (var r = 0; r < redoslijed.length; r++) {
        var red = redoslijed[r];
 
        var oznaka = document.createElement("div");
        oznaka.className = "oznaka-reda";
        oznaka.textContent = red;
        grid.appendChild(oznaka);
 
        var sjedistaUreda = redovi[red];
        for (var s = 0; s < sjedistaUreda.length; s++) {
            var sjed = sjedistaUreda[s];
 
            var div = document.createElement("div");
            div.className = "sjediste " + sjed.status;
 
            (function(projekcijaRef, sjedisteRef, indeks) {
                div.addEventListener("click", function() {
                    if (sjedisteRef.status === "slobodno") {
                        sjedisteRef.status = "rezervisano";
                        sacuvajStanje(projekcije);
                        prikaziSalu(projekcije, indeks);
                    }
                });
            })(projekcija, sjed, trenutniIndex);
 
            grid.appendChild(div);
        }
    }

    var brojac = document.getElementById("projekcija-brojac");
    if (brojac) {
        brojac.textContent = (trenutniIndex + 1) + " / " + projekcije.length;
    }
}
 
function inicijalizujNavigaciju(projekcije, ref) {
    var btnPrev = document.getElementById("btn-prethodna");
    var btnNext = document.getElementById("btn-sljedeca");
 
    if (btnPrev) {
        btnPrev.addEventListener("click", function() {
            if (ref.index > 0) {
                ref.index--;
                prikaziSalu(projekcije, ref.index);
            }
        });
    }
 
    if (btnNext) {
        btnNext.addEventListener("click", function() {
            if (ref.index < projekcije.length - 1) {
                ref.index++;
                prikaziSalu(projekcije, ref.index);
            }
        });
    }
}

function inicijalizujKinoSalu(defaultPodaci) {
    var projekcije = ucitajStanje();

    if (!projekcije) {
        projekcije = defaultPodaci.projekcije;
        sacuvajStanje(projekcije);
    }
 
    if (!validirajPodatke(projekcije)) {
        var grid = document.getElementById("sjedista-grid");
        if (grid) {
            grid.innerHTML = "<p style='color:red;font-weight:bold;'>Podaci nisu validni!</p>";
        }
        return;
    }
 
    var ref = { index: 0 };
 
    prikaziSalu(projekcije, ref.index);
    inicijalizujNavigaciju(projekcije, ref);
}