//https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv

document.getElementById("btn").onclick = getData;
var xmlhttp

function getData() {

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = statusforandring;
    xmlhttp.open("GET", "../resources/produkter.csv", true);
    xmlhttp.send();
}

function statusforandring() {
    var bildeUrl = "https://bilder.vinmonopolet.no/cache/1200x1200-0/";
    var bildeUrlSlutt = "-1.jpg";
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = xmlhttp.responseText;
        var produkt = data.split("\n");
        for (var i = 0; i < /*produkt.length*/ 50; i++) {
            var info = produkt[i].split(";");
            document.getElementById("output").innerHTML += "<img scr = \"" + bildeUrl + info[1] + bildeUrlSlutt + "\">" + "Navn:" + info[2] + " Pris:" + info[4] + "<br />";
        }
    }

    console.log("finished");
}
