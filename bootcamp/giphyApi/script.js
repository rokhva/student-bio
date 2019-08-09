// ____________________________________PSUEDO CODE____________________________________// 
//on screen load
//The prepopulated buttons will show on the page
//once a button is clicked 10 Giphs correlating to the button name will show on the screen
//button should have an active state, indicating that it's been selected

//The user can either select another option from the buttons, or add thier own button

//selecting a different button will show a new set of 10 giphs

//adding a new button
//the user will type into the box
//when they hit add the new button will appear next to the prepopulated buttons
//the button will dissapear on refresh
//Once hitting the new button the Giph's should repopulate according to the button name
//____________________________________________________________________________________//

var charArray = ["Jessica Day", "Nick Miller", "Schmidt", "Coach", "Cece", "Winston Bishop"];

function createButtons() {
    $("#giphyButtons").empty();
    for (var i = 0; i < charArray.length; i++) {
        var newButton = $("<button>" + charArray[i] + "</button>");
        //var newButton = $("<button>").text(charArray[i]);
        //newButton.append("#giphyButtons");

        newButton.addClass("options");
        newButton.attr("data-name", charArray[i])

        $("#giphyButtons").append(newButton);
        console.log(newButton);

    }

}

$(document).on("click", ".options", function () {
    $("#giphyContainer").empty();
    var searchTerm = $(this).attr("data-name");
    console.log(searchTerm);

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        //   console.log(response.data[0].images.fixed_width_still);
        //   var still = response.data[0].images.fixed_width_still;

        console.log(response.data[0].images.fixed_width_still.url);
        //   var stillUrl = response.data[0].images.fixed_width_still.url;

        //   console.log(response.data[0].images.fixed_width);
        //   var moving = response.data[0].images.fixed_width;

        console.log(response.data[0].images.fixed_width.url);

        //   var newGiph = $("<img>").attr("src", stillUrl);
        //   newGiph.append(stillUrl);

        //   $("#giphyContainer").append(newGiph);

        console.log(response.data);
        for (var j = 0; j < response.data.length; j++) {
            var movingUrl = response.data[j].images.fixed_width.url;
            var stillUrl = response.data[j].images.fixed_width_still.url;
            var newGiph = $("<img>");
            newGiph.attr("src", stillUrl);
            newGiph.attr("data-state", "still");
            newGiph.attr("data-animate", movingUrl);
            newGiph.attr("data-still", stillUrl);
            newGiph.attr("class", "giph");
            $("#giphyContainer").append(newGiph);
        }
    })
})

createButtons();

$(document).on("click", ".giph", function (){

    console.log("click is working");
    var state = $(this).attr("data-state");
    var animated = $(this).attr("data-animate");

    if( state === "still"){
        $(this).attr("src", animated);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

$("#add").on("click", function (){
    console.log("this is working");
    var newItem = $("#textFeild").val();
    $("#textFeild").val("");
    charArray.push(newItem);
    console.log(charArray);

    createButtons();
})