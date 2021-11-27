// initial stage
// document.getElementById("resultsContainer").style.display = "none";
document.getElementById("footer").style.display = "none";

let song1, song2, data;

/* document.getElementById("reset").onclick =  () => {
    document.getElementById("song1").value = "";
    document.getElementById("song2").value = "";
}
 */
/* document.getElementById("askYodaBtn").onclick = async () => {
    song1 = document.getElementById("song1").value;
    song2 = document.getElementById("song2").value;

    if (song1 === "" || song2 === "") {
        console.log("Oh nooo!");
        return;
    }
    
    document.getElementById("song1").style.display = "none";
    document.getElementById("song2").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("reset").style.display = "none";

    document.getElementById("lukeBubble").innerHTML = `I like ${song1} and ${song2}.`; /* `I like ${song1} and ${song2}` */

/* let response = await fetch(
    `http://localhost:3100/v1/recommendations?songs=${song1}&songs=${song2}`
);
data = await response.json();
};
*/

const loadMusic = async () => {
    song1 = document.getElementById("song1").value;
    song2 = document.getElementById("song2").value;
    if (song1 === "" || song2 === "") return;

    let response = await fetch(
        `http://localhost:3100/v1/recommendations?songs=${song1}&songs=${song2}`
    );
    data = await response.json();
};

// document.getElementById("askYodaBtn").addEventListener("mouseover", loadMusic);

document.getElementById("song1").addEventListener("keyup", async (e) => {
    // If the key is not defined, don't show any autocomplete
    if (!e.key) {
        return;
    }
    let song = document.getElementById("song1");
    let songList1 = document.getElementById("songList1");
    let response = await fetch(
        `http://localhost:3100/v1/autocomplete?trackName=${song.value}`
    );
    data = await response.json();
    songList1.innerHTML = "";
    for (let index = 0; index < 5; index++) {
        let songOption = document.createElement("option");
        songOption.setAttribute(
            "value",
            `${data.body.tracks.items[index].name} - ${data.body.tracks.items[index].artists[0].name}`
        );
        songList1.appendChild(songOption);
    }
});
document.getElementById("song2").addEventListener("keyup", async (e) => {
    // If the key is not defined, don't show any autocomplete
    if (!e.key) {
        return;
    }
    let song = document.getElementById("song2");
    let songList2 = document.getElementById("songList2");
    let response = await fetch(
        `http://localhost:3100/v1/autocomplete?trackName=${song.value}`
    );
    data = await response.json();
    songList2.innerHTML = "";
    for (let index = 0; index < 5; index++) {
        let songOption = document.createElement("option");
        songOption.setAttribute(
            "value",
            `${data.body.tracks.items[index].name} - ${data.body.tracks.items[index].artists[0].name}`
        );
        songList2.appendChild(songOption);
    }
});

document.getElementById("askYodaBtn").onclick = async () => {
    document.getElementById("resultsContainer").innerHTML = "";

    song1 = document.getElementById("song1").value;
    song2 = document.getElementById("song2").value;

    if (song1 === "" || song2 === "") {
        document.getElementById(
            "lukeBubble"
        ).innerHTML = `Please fill both songs!`;
        document.getElementById("lukeBubble").style.fontWeight = "bold";
        return;
    }

    let response = await fetch(
        `http://localhost:3100/v1/recommendations?songs=${song1}&songs=${song2}`
    );
    data = await response.json();

    document.getElementById("lukeBubble").innerHTML = `I like ${song1.replace(
        "-",
        "by"
    )} and ${song2.replace("-", "by")}.`;
    document.getElementById("lukeBubble").style.fontWeight = "normal";
    // dark theme
    // document.getElementById("header").classList.add("darkHeader");
    // document.getElementById("mainContainer").style.display = "none";
    // document.getElementById("resultsContainer").style.display = "block";
    document.getElementById("footer").style.display = "block";

    // console.log(data.tracks);

    data.tracks.forEach((tableRow) => {
        // console.log(tableRow.album.images[0]);

        /* <div class="card">
            <img src="./images/yodaIcon.png" alt="">
            <div class="text">
                <h1>Song name</h1>
                <h3>artist</h3>
            </div>
        </div> */

        let c = document.createElement("div");
        c.setAttribute("class", "card");
        // c.setAttribute('id', item.id);
        c.innerHTML = `
            <img src="${tableRow.album.images[0].url}" alt="task image">
            <div class="text">
                <div class="text">
                    <h1>${tableRow.name}</h1>
                    <h3>${tableRow.artists[0].name}<h3>
                </div>
            </div>
            `;

        document.getElementById("resultsContainer").appendChild(c);
    });
};

document.getElementById("yodaIcon").style.transform = "translateY(-20px)";

document.getElementById("askYodaBtn").addEventListener(
    "mouseover",
    () =>
        // document.getElementById("yodaIcon")
        (document.getElementById("yodaIcon").style.transform =
            "translateY(-20px)")
);
