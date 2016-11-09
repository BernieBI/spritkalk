//https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv



xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = statusforandring;
xmlhttp.open("GET", "https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv", true);
xmlhttp.send();



function statusforandring() {

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = xmlhttp.responseText;
        var produkt = data.split("\n");


        for (var i = 0; i < produkt.length; i++) {

            var info = produkt[i].split(";");

            document.getElementById("output").innerHTML +="Navn:" + deler[2] + " Pris:" + deler[4] + "<br />";



        }
    }
}
