document.addEventListener("DOMContentLoaded", function() {
    fetch('http://192.168.1.2:5000/save_score')
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
