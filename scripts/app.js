fetch("../data/projekcije.json")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Greska pri ucitavanju JSON fajla.");
        }
        return response.json();
    })
    .then(function(podaci) {
        inicijalizujKinoSalu(podaci);
    })
    .catch(function(greska) {
        console.error(greska);
        var grid = document.getElementById("sjedista-grid");
        if (grid) {
            grid.innerHTML = "<p style='color:red;font-weight:bold;'>Greska pri ucitavanju podataka!</p>";
        }
    });