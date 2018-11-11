
var topics = ["the office", "friends", "snl", "gilmore girls", "the good place", "parks and recreation"];


function renderButtons() {

    // Deleting the buttons prior to adding new buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#gif-view").empty();

    // Looping through the array of tv shows
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each tv show in the array.

      var tvShow = $("<button>");
      // Adding a class
      tvShow.addClass("tv-show");
      // Adding a data-attribute with a value of the topic at index i
      tvShow.attr("data-name", topics[i]);
      // Providing the button's text with a value of the topic at index i
      tvShow.text(topics[i]);
      // Adding the button to the HTML
      $("#gif-view").append(tvShow);
    }
  }

  // This function handles events where one button is clicked
  $("#add-tv").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var newShow = $("#tv-input").val().trim();
    // The tv shpw from the textbox is then added to our array
    topics.push(newShow);
    $("#tv-input").val(" ");

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
   
  });

  // Calling the renderButtons function at least once to display the initial list of tv shows
  renderButtons();

  $(document).on("click", ".tv-show", function () {
    
    var title = $(this).attr("data-name");
    var apiKey = "8Z1xQ98qFOxRSHCiFR3zqjo7IxC3NwYh"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      title + "&api_key=" + apiKey + "&limit=10";

      console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          function checkRating(results){
            return (results[i].rating !== "r")
          }
          var ratingFilter = results.filter(function(item) {
                return item.rating !== "r"
          })
          console.log(results);
          console.log(ratingFilter);
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var tvImage = $("<img>");
          tvImage.addClass("tv-image");
          tvImage.attr("src", results[i].images.fixed_height_still.url);
          tvImage.attr("data-still", results[i].images.fixed_height_still.url);
          tvImage.attr("data-animate", results[i].images.fixed_height.url);
          tvImage.attr("data-state", "still")

          gifDiv.prepend(p);
          gifDiv.prepend(tvImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  
  });

  function updateState(state, ele) {
    $(ele).attr("src", $(ele).attr("data-" + state));
    $(ele).attr("data-state", state);
  }
  $(document).on("click", ".tv-image", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    var dAnimate = $(this).attr("data-animate")
    console.log(state);
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      updateState("animate", this);
    } else {
      updateState("still", this);
    }
  });
