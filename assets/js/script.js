var topics = [
  "dog",
  "cat",
  "bird",
  "fish",
  "mouse",
  "whale",
  "shark",
  "elephant",
  "giraffe"
];
var colorArr = [
  "#53f953",
  "#53f9d3",
  "#53cbf9",
  "#5d53f9",
  "#e753f9",
  "#f95381",
  "#f99053",
  "#f9ec53",
  "#f95353",
  "#6ef937",
  "#37f9a1",
  "#FFFF00",
  "#00FF00",
  "#0062FF",
  "#6E0DD0"
];
var favoritesArr = [];

var animalVar = "";
var queryURL = "";
var resultNumber;

function makeButtons() {
  $("#buttonArea").empty();
  topics.forEach(function(item) {
    var button = $("<button>");
    var color = colorArr[Math.floor(Math.random() * colorArr.length)];
    var color1 = colorArr[Math.floor(Math.random() * colorArr.length)];
    var color2 = colorArr[Math.floor(Math.random() * colorArr.length)];
    button
      .text(item)
      .addClass("animalButton")
      .attr("data-animal-name", item)
      .css({
        background: color,
        border: "5px solid " + color1,
        outline: "5px solid " + color2
      });
    $("#buttonArea").append(button);
  });
}

function getGiphy() {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.data);
    for (var i = 0; i < response.data.length; i++) {
      var stillURL = response.data[i].images.fixed_height_still.url;
      var animateURL = response.data[i].images.fixed_height.url;
      var ratingText = "Rated " + response.data[i].rating;
      var rating = $("<div>")
        .text(ratingText.toUpperCase())
        .addClass("ratingClass");
      var favorites = $("<button>")
        .addClass("favoritesButton")
        .text("Add to Favorites");
      var giphyImage = $("<img>")
        .addClass("giphy")
        .attr("src", stillURL)
        .attr("data-still", stillURL)
        .attr("data-animate", animateURL)
        .attr("data-state", "still");
      var giphyContainer = $("<div>")
        .addClass("giphyContainer")
        .append(giphyImage)
        .append(rating)
        .append(favorites);
      $("#giphyArea").append(giphyContainer);
    }

    $(".giphy").on("click", function() {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    var addMore = $("<button>")
      .text("Add More!")
      .attr("id", "addMore");
    $("#giphyArea").append(addMore);

    $("#addMore").on("click", function() {
      $("#giphyArea").empty();
      resultNumber = resultNumber + 10;
      console.log(resultNumber);
      queryURL =
        "https://api.giphy.com/v1/gifs/search?api_key=LMdCOQVloXVO8lFRw6pKfYeYo0wt0pz7&q=" +
        animalVar +
        "&limit=" +
        resultNumber;
      getGiphy();
    });
  });
}

makeButtons();

$("#add-button").on("click", function(event) {
  event.preventDefault();
  var addAnimal = $("#buttonInput")
    .val()
    .trim();
  topics.push(addAnimal);
  makeButtons();
  $("#buttonInput").val("");
});

$(document).on("click", ".animalButton", function() {
  $("#giphyArea").empty();
  resultNumber = 10;
  animalVar = $(this).attr("data-animal-name");
  queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=LMdCOQVloXVO8lFRw6pKfYeYo0wt0pz7&q=" +
    animalVar +
    "&limit=" +
    resultNumber;
  console.log(queryURL);

  getGiphy();
});

$(document).on("click", ".favoritesButton", function() {
  favoritesArr.push($(this));
});
