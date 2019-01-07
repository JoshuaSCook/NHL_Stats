// Get elements that will ultimately be populated with json data
var teamListElement = $("#team-list");
var teamElement = $("#team");
var playerElement = $("#player");

// Creates a list of all team IDs that can be iterated through later
var teamIDList = [];

// Access the ALL teams overview api
var queryURL = "https://statsapi.web.nhl.com/api/v1/teams/"
console.log(queryURL);

// Get and return data
$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(data) {
    // For each team in the data, get thier name and id to create li element
    for (i = 0; i < data.teams.length; i++) {
        var teamName = data.teams[i].name;
        var teamID = data.teams[i].id;

        // Create and append button li to ul
        var team = $("<li><button id='btn-" + teamID + "'>" + teamName + "</button></li>");
        teamListElement.append(team);
        teamIDList.push(teamID);
    };

    // If button is clicked, pull up the coorisponding TEAM json
    for (i = 0; i < teamIDList.length; i++) {
        $("#btn-" + teamIDList[i]).on("click", function () {
            teamElement.html("");

            // Access the target team api
            var teamID = $(this).attr("id");
            teamID = teamID.replace("btn-", "");
            var queryURL = "https://statsapi.web.nhl.com/api/v1/teams/" + teamID + "?hydrate=stats(splits=statsSingleSeason)/";
            console.log(queryURL);

            // Get and return data
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(data) {
                // Set stat variables to be used in the element construction
                var abbrName = data.teams[0].abbreviation;
                var teamName = data.teams[0].name;
                var venue = data.teams[0].venue.name;
                var city = data.teams[0].venue.city;
                var site = data.teams[0].officialSiteUrl;
                var gamesPlayed = data.teams[0].teamStats[0].splits[0].stat.gamesPlayed;
                var wins = data.teams[0].teamStats[0].splits[0].stat.wins;
                var losses = data.teams[0].teamStats[0].splits[0].stat.losses;
                var points = data.teams[0].teamStats[0].splits[0].stat.pts;
                var rank = data.teams[0].teamStats[0].splits[1].stat.pts;
                console.log(rank)

                // Create stat elements
                var teamNameElement = $("<li>" + abbrName + " - " + teamName + "</li>");
                var venueElement = $("<li>" + venue + ", " + city + "</li>");
                var websiteElement = $("<a href='" + site + "'><li>" + site + "</li></a>");
                var gamesPlayedElement = $("<li>Games Played: " + gamesPlayed + "</li>");
                var winsElement = $("<li>Wins: " + wins + "</li>");
                var lossesElement = $("<li>Losses: " + losses + "</li>");
                var pointsElement = $("<li>Points: " + points + "</li>");
                var rankElement = $("<li>Rank: " + rank + "</li>");

                // Append stat elements to the team element
                teamElement.append(teamNameElement);
                teamElement.append(venueElement);
                teamElement.append(websiteElement);
                teamElement.append(gamesPlayedElement);
                teamElement.append(winsElement);
                teamElement.append(lossesElement);
                teamElement.append(pointsElement);
                teamElement.append(rankElement);
            });
        });
    };
});