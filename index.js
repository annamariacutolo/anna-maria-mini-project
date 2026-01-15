document.querySelector("form.input-players").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("player1-score").innerText = document.getElementById("player1").value, document.getElementById("player2").value;
    document.getElementById("player2-score").innerText = document.getElementById("player2").value;
});
