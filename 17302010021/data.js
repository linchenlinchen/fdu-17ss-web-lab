const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];
let father=document.getElementsByClassName("flex-container")[0];

for(i=0;i<4;i++) {
    let element1 = document.createElement("div");
    element1.className = "item";

    let element2 = document.createElement("h2");
    let content2 = document.createTextNode(countries[i].name);
    element2.appendChild(content2);
    element1.appendChild(element2);

    let element3 = document.createElement("p");
    let content3 = document.createTextNode(countries[i].continent);
    element3.appendChild(content3);
    element1.appendChild(element3);

    let element4 = document.createElement("div");
    element4.className = "inner-box";
    let element5 = document.createElement("h3");
    let content5 = document.createTextNode("Cities");
    element5.appendChild(content5);
    let element6 = document.createElement("ul");
    for (j = 0; j <countries[i].cities.length;j++) {
        let element7 = document.createElement("li");
        let element7p = document.createElement("p");
        let content7 = document.createTextNode(countries[i].cities[j]);
        element7p.appendChild(content7);
        element7.appendChild(element7p);
        element6.appendChild(element7);
    }
    element4.appendChild(element5);
    element4.appendChild(element6);
    element1.appendChild(element4);

    let element8=document.createElement("div");
    element8.className="inner-box";
    let element9 = document.createElement("h3");
    let content9=document.createTextNode("Popular Photos");
    element9.appendChild(content9);
    element8.appendChild(element9);
    for(k=0;k<countries[i].photos.length;k++){
        let element10=document.createElement("img");
        element10.className="photo";
        element10.src=countries[i].photos[k];
        element8.appendChild(element10);
    }
    element1.appendChild(element8);

    let element11=document.createElement("button");
    let content11=document.createTextNode("Visit");
    element11.appendChild(content11);
    element1.appendChild(element11);

    father.appendChild(element1);
}





