// initial stage
document.getElementById("resultsContainer").style.display = "none";
document.getElementById("footer").style.display = "none";

let song1, song2, data; 

document.getElementById("lukeSongs").onclick = async () => {
    song1 = document.getElementById("song1").value;
    song2 = document.getElementById("song2").value;
    
    let response = await fetch(
        `http://localhost:3100/v1/recommendations?songs=${song1}&songs=${song2}`
    );

    document.getElementById("song1").style.display = "none";
    document.getElementById("song2").style.display = "none";
    document.getElementById("lukeSongs").style.display = "none";

    document.getElementById("lukeBubble").innerHTML = `I like ${song1} and ${song2}.`; /* `I like ${song1} and ${song2}` */
    data = await response.json();
};

document.getElementById("askYodaBtn").onclick = async () => {
    // dark theme
    document.getElementById("header").classList.add("darkHeader");
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("resultsContainer").style.display = "block"; /* flex */

    data.tracks.forEach( tableRow => {
        row = document.createElement("tr");
        cell = document.createElement("td");
        
        // artist
        textNode = document.createTextNode(tableRow.artists[0].name);
        cell.appendChild(textNode);
        row.appendChild(cell);
        
        // name
        cell = document.createElement("td");
        textNode = document.createTextNode(tableRow.name);
        cell.appendChild(textNode);
        row.appendChild(cell);

        document.getElementById("resultsTable").appendChild(row);
    });
};

document.getElementById("yodaIcon").style.transform = "translateY(-20px)";

document.getElementById("askYodaBtn").addEventListener("mouseover", () =>
    // document.getElementById("yodaIcon")
    document.getElementById("yodaIcon").style.transform = "translateY(-20px)"
);