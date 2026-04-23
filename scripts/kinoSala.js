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