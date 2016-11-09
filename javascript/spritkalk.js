//https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv

document.getElementById("btn").onclick = getData;

function getData(){

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = statusforandring;
  xmlhttp.open("GET", "../resources/produkter.csv", true);
  xmlhttp.send();

}

function statusforandring() {

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = xmlhttp.responseText;
        var produkt = data.split("\n");
        console.log("started");

        for (var i = 0; i < produkt.length; i++) {

            var info = produkt[i].split(";");

            document.getElementById("output").innerHTML += "Navn:" + info[2] + " Pris:" + info[4] + "<br />";



        }
        console.log("finished");
    }
}
