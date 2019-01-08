// Get elements that will ultimately be populated with json data
var teamListElement = $("#team-list");
var teamElement = $("#team");
var playerListElement = $("#player-list");
var playerElement = $("#player");

// Creates a list of all team IDs that can be iterated through later
var teamIDList = [];
var playerIDList = [];

// Access the ALL TEAMS overview api
// =================================
var queryURL = "https://statsapi.web.nhl.com/api/v1/teams/"
console.log(queryURL);

// Get and return data
$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(data) {
    // For each team in the data, get thier name and id
    for (i = 0; i < data.teams.length; i++) {
        var teamName = data.teams[i].name;
        var teamID = data.teams[i].id;

        // Create and append li button to ul
        var team = $("<li><button id='btn-" + teamID + "'>" + teamName + "</button></li>");
        teamListElement.append(team);
        teamIDList.push(teamID);
    };
    
    // If button is clicked, pull up the coorisponding TEAM json
    // =========================================================
    for (i = 0; i < teamIDList.length; i++) {
        $("#btn-" + teamIDList[i]).on("click", function () {
            // Empty the team and player elements to get ready for the new ones
            teamElement.html("");
            playerListElement.html("");
            playerElement.html("");
            playerIDList = [];
            

            // Access the TARGET TEAM api
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
            
            // Access the ROSTER api
            // =====================
            var teamID = $(this).attr("id");
            teamID = teamID.replace("btn-", "");
            var queryURL = "https://statsapi.web.nhl.com/api/v1/teams/" + teamID + "/roster?hydrate=stats(splits=statsSingleSeason)/";
            console.log(queryURL);

            // Get and return data
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(data) {
                // For each player in the data, get thier name and id
                for (i = 0; i < data.roster.length; i++) {
                    var playerName = data.roster[i].person.fullName;
                    var playerID = data.roster[i].person.id;
                    var jerseyNumber = data.roster[i].jerseyNumber;

                    // Create and append li button to ul
                    var player = $("<li><button id='btn-" + playerID + "'>" + playerName + " (" + jerseyNumber + ")" + "</button></li>");
                    playerListElement.append(player);
                    playerIDList.push(playerID);
                };
                
                // If button is clicked, pull up the coorisponding PLAYER json
                // ===========================================================
                for (i = 0; i < playerIDList.length; i++) {
                    $("#btn-" + playerIDList[i]).on("click", function () {
                        // Empty the team and player elements to get ready for the new ones
                        playerElement.html("");

                        // Access the TARGET TEAM api
                        var playerID = $(this).attr("id");
                        playerID = playerID.replace("btn-", "");
                        var queryURL = "https://statsapi.web.nhl.com/api/v1/people/" + playerID + "?hydrate=stats(splits=statsSingleSeason)/";
                        console.log(queryURL);

                        // Get and return data
                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).done(function(data) {
                            // Set stat variables to be used in the element construction
                            var playerName = data.people[0].fullName;
                            var number = data.people[0].primaryNumber;
                            var age = data.people[0].currentAge;
                            var height = data.people[0].height;
                            var weight = data.people[0].weight;
                            var position = data.people[0].primaryPosition.name;

                            // Create stat elements
                            var playerNameElement = $("<li>" + playerName + "</li>");
                            var numberElement = $("<li>(" + number + ")</li>");
                            var ageElement = $("<li>Age: " + age + "</li>");
                            var heightElement = $("<li>Height: " + height + "</li>");
                            var weightElement = $("<li>Weight: " + weight + "</li>");
                            var positionElement = $("<li>Position: " + position + "</li>");
                            
                            // Append stat elements to the team element
                            playerElement.append(playerNameElement);
                            playerElement.append(numberElement);
                            playerElement.append(ageElement);
                            playerElement.append(heightElement);
                            playerElement.append(weightElement);
                            playerElement.append(positionElement);
                            console.log(playerElement);
                        }); // End assemble PLAYER html
                    }); // End PLAYER button click
                }; // End PLAYER json
            
            }); // End assemble TEAM html
        }); // End TEAM button click
    }; // End TEAM json
});