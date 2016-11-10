//https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv

document.getElementById("btn").onclick = getData;
document.getElementById("alkFrom").oninput = displayalk;
document.getElementById("alkTo").oninput = displayalk;

document.getElementById("priceFrom").oninput = displayprice;
document.getElementById("priceTo").oninput = displayprice;

displayprice();
displayalk();

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

        Papa.parse(data, {
            worker: true,
            header: true,
            step: function(row) {
                console.log("Row:", row.data[0].Varetype);

                if (pricefrom <= parseFloat(row.data[0].Pris) && priceto >= parseFloat(row.data[0].Pris) && alkfrom <= parseFloat(row.data[0].Alkohol) && alkto >=parseFloat(row.data[0].Alkohol) && (varetype === row.data[0].Varetype || varetype === "alle")) {
                        produktDiv = document.createElement('div');
                        produktDiv.className = "produktDiv";
                        produktDiv.id = row.data[0].Varenummer + "div";
                        document.getElementById("output").appendChild(produktDiv);

                        var src = "https://bilder.vinmonopolet.no/cache/1200x1200-0/" + row.data[0].Varenummer + '-1.jpg',
                            img = document.createElement('img');
                        img.src = src;
                        document.getElementById(row.data[0].Varenummer + "div").appendChild(img);

                        produktH3 = document.createElement('h3');
                        produktH3.innerHTML = row.data[0].Varenavn;
                        document.getElementById(row.data[0].Varenummer + "div").appendChild(produktH3);

                        produktP = document.createElement('p');
                        produktP.innerHTML = row.data[0].Alkohol + "% Vol. <br />" + "Kr " + parseFloat(row.data[0].Pris) + ",-";
                        document.getElementById(row.data[0].Varenummer + "div").appendChild(produktP);
                }
            },
            complete: function() {
                console.log("All done!");
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
