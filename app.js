document.getElementById("resultsContainer").style.visibility = "hidden";

document.getElementById("askYoda").onclick = async () => {
    var song1 = document.getElementById('txt_song1').value;
    var song2 = document.getElementById('txt_song2').value;
    // http://localhost:3100/v1/recommendations?song1=https://spotify.com/under_pressure&song2=song2_url
    var response = await fetch(`http://localhost:3100/v1/recommendations?songs=${song1}&songs=${song2}`);
    var data = await response.json();
    console.log(data);
    document.getElementById("resultsContainer").style.visibility = "visible";
    document.getElementById("resultsContainer").getElementsByTagName('p')[0].innerText = data.name;
};