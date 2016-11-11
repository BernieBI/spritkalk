//https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv
var page = 1;
var perPage = 20;
var treff = false;

document.getElementById("btn").onclick = search;

document.getElementById("prev").onclick = prevPage;
document.getElementById("next").onclick = nextPage;
document.getElementById("output").onclick = createlink;


document.getElementById("alkFrom").oninput = displayalk;
document.getElementById("alkTo").oninput = displayalk;

document.getElementById("priceFrom").oninput = displayprice;
document.getElementById("priceTo").oninput = displayprice;

displayprice();
displayalk();
getData();

function createlink() {
    var link = "https://www.vinmonopolet.no/p/" + event.target.className;
    document.location = link;
}

function getData() {

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = statusforandring;
    xmlhttp.open("GET", "../scripts/getfile.php", true);
    xmlhttp.send();

    while (document.getElementById("output").firstChild) {
        document.getElementById("output").removeChild(document.getElementById("output").firstChild);
    }

}

function statusforandring() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = xmlhttp.responseText;
        var priceto = parseFloat(document.getElementById("priceTo").value);
        var pricefrom = parseFloat(document.getElementById("priceFrom").value);
        var alkto = parseFloat(document.getElementById("alkTo").value);
        var alkfrom = parseFloat(document.getElementById("alkFrom").value);
        var varetype = document.getElementById("varetype").value
        if (varetype == "Rødvin") {
            varetype = "R&#248dvin";
        }

        var counter = 0;

        Papa.parse(xmlhttp.responseText, {
            header: true,
            step: function(row, parser) {

                if (pricefrom <= parseFloat(row.data[0].Pris) && priceto >= parseFloat(row.data[0].Pris) && alkfrom <= parseFloat(row.data[0].Alkohol) && alkto >= parseFloat(row.data[0].Alkohol) && (varetype === row.data[0].Varetype || varetype === "alle")) {
                    treff = true;
                    if ((counter >= perPage * (page - 1) && counter < perPage * page)) {
                        produktDiv = document.createElement('div');
                        produktDiv.className = row.data[0].Varenummer;
                        produktDiv.id = row.data[0].Varenummer;
                        document.getElementById("output").appendChild(produktDiv);

                        var src = "https://bilder.vinmonopolet.no/cache/1200x1200-0/" + row.data[0].Varenummer + '-1.jpg',
                            img = document.createElement('img');
                        img.src = src;
                        img.className = row.data[0].Varenummer;
                        document.getElementById(row.data[0].Varenummer).appendChild(img);

                        produktH3 = document.createElement('h3');
                        produktH3.innerHTML = row.data[0].Varenavn;
                        produktH3.className = row.data[0].Varenavn;
                        document.getElementById(row.data[0].Varenummer).appendChild(produktH3);

                        produktP = document.createElement('p');
                        produktP.className = row.data[0].Varenavn;

                        produktP.innerHTML = "- Kr " + parseFloat(row.data[0].Pris) + ",- <br />- " + row.data[0].Alkohol + "% Vol. <br />- " + row.data[0].Volum + "l <br /> " + row.data[0].Smak.bold();
                        document.getElementById(row.data[0].Varenummer).appendChild(produktP);
                    } else if (counter >= perPage * (page - 1)) {
                        parser.abort();
                    }
                    counter++;
                }
            },
            complete: function() {
                console.log("All done!");
                document.getElementById("pagecounter").innerHTML = "Side " + page;
                if (treff == false) {
                    produktDiv = document.createElement('div');
                    produktDiv.innerHTML = "<h1> Ditt søk ga ingen treff</h1>";
                    document.getElementById("output").appendChild(produktDiv);

                }
            }
        });

    }
}

function displayalk() {
    var alkfrom = document.getElementById("alkFrom").value;
    var alkto = document.getElementById("alkTo").value;

    document.getElementById("alkFromNum").innerHTML = alkfrom + "%";
    document.getElementById("alkToNum").innerHTML = alkto + "%";
}

function displayprice() {
    var pricefrom = document.getElementById("priceFrom").value;
    var priceto = document.getElementById("priceTo").value;


    document.getElementById("priceFromNum").innerHTML = pricefrom + " kr";
    document.getElementById("priceToNum").innerHTML = priceto + " kr";
}

function prevPage() {
    if (page != 1) {
        page--;
        getData();
        document.getElementById("pagecounter").innerHTML = "Side " + page;
    }
}

function nextPage() {
    page++;
    getData();
    document.getElementById("pagecounter").innerHTML = "Side " + page;
}

function search() {
    treff = false;
    page = 1;
    getData();
    document.getElementById("pagecounter").innerHTML = "Side " + page;
}
