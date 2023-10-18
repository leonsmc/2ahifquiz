document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:5000/get_top_5')
        .then(response => response.json())
        .then(data => {
            populateLeaderboard(data);
        });
});

function populateLeaderboard(data) {
    const leaderboardList = document.getElementById("leaderboard-list");

    data.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry[0]}: ${entry[1]} points`;
        leaderboardList.appendChild(listItem);
    });
}
