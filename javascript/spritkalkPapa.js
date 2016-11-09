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

    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        var data = xmlhttp.responseText;

        Papa.parse(xmlhttp.responseText, {
            worker: true,
            header: true,
            step: function(row) {
                console.log("Row:", row.data);
                var src = "https://bilder.vinmonopolet.no/cache/1200x1200-0/" + row.data[0].Varenummer + '-1.jpg',
                    img = document.createElement('img');
                img.src = src;
                document.getElementById("output").appendChild(img);
            },
            complete: function() {
                console.log("All done!");
            }
        });



    }
}
