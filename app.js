// initial stage
// document.getElementById("resultsContainer").style.display = "none";
document.getElementById("footer").style.display = "none";

let song1, song2, data;

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
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.getElementById("askYodaBtn").onclick = async () => {
    removeAllChildNodes(resultsLeft);
    removeAllChildNodes(resultsRight);
    document.getElementById("footer").style.display = "none";

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

    let counter = 0;
    data.tracks.forEach((tableRow) => {
        console.log(tableRow.album.images[0]);
        counter++;

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
        if (counter <= 5) document.getElementById("resultsLeft").appendChild(c);
        else if (counter <= 10)
            document.getElementById("resultsRight").appendChild(c);
        else return;
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
