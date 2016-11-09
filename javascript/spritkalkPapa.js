//https://www.vinmonopolet.no/medias/sys_master/products/products/hbc/hb0/8834253127710/produkter.csv


//tastetrykk
document.getElementById("btn").onclick = getData;
var xmlhttp

function getData() {

    //Henter data
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = statusforandring;
    xmlhttp.open("GET", "../resources/produkter.csv", true);
    xmlhttp.send();

}


function statusforandring() {


    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        //bruker papa parse til å kjøre gjennom hver linje i csv fila uten at det går utover chrome
        Papa.parse(xmlhttp.responseText, {

            //Betyr at den jobber selvstendig og typ jobber på egen "thread" så man fortsatt kan bruke html knapper etc..
            worker: true,
            //Betyr at den gir objektet sine verdier navn utifra øverste raden i dokumentet i stedet for 1,2,3 så får den varenavn, aroma, etc..
            header: true,

            //funksjonen som skal kjøre på hver linje i csv fila
            step: function(row) {
                    //row.data[0] er objektet vi jobber med

                    //lager en ny div med id varenummer og legger den til i output div'en
                    produktDiv = document.createElement('div');
                    produktDiv.class = "produktDiv";
                    produktDiv.id = row.data[0].Varenummer + "div";
                    document.getElementById("output").appendChild(produktDiv);

                    //lager ett bildeelement utifra url'en til bildet hentet frem fra vinmonopolet sine sider
                    var src = "https://bilder.vinmonopolet.no/cache/1200x1200-0/" + row.data[0].Varenummer + '-1.jpg',
                        img = document.createElement('img');
                    img.src = src;
                    //legger det til i div'en output
                    document.getElementById(row.data[0].Varenummer + "div").appendChild(img);

                    //Legger til en header inne i diven som er varenavnet
                    produktH2 = document.createElement('h2');
                    produktH2.innerHTML = row.data[0].Varenavn;
                    document.getElementById(row.data[0].Varenummer + "div").appendChild(produktH2);
                },

                //funksjonen som skjører når hele fila har blitt kjørt igjennom
            complete: function() {
                console.log("All done!");
            }
        });



    }
}
