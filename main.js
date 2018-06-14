$(document).ready(function () {
    //START =========================================================================================================
    let arrBtns = ["cats", "turtle", "space"];
    let button;
    let i;
    let j;
    let userInput = false;
    let apiKey = "RQ6y5oHsodLnKojawIMbBJaxPKgcQfw0";
    let queryURL;
    let search;
    let still;
    //Above: variables used
    //=====================
    $("#btnArea").empty();
    $("#gifArea").empty();
    for (i = 0; i < arrBtns.length; i++) {
        button = $("<button>")
        button.attr("data-search", arrBtns[i]);
        button.addClass("btn");
        button.addClass("btn-outline-primary");
        button.addClass("targetBtns");
        button.text(arrBtns[i]);
        $("#btnArea").append(button);
    };
    //Above: dynamically creates the first three buttons on load
    //==========================================================
    $(".createBtn").click(function () {
        event.preventDefault();
        // console.log("Create New Button Clicked");
        button = $("<button>");
        userInput = $("#userInput").val().trim();
        // console.log(userInput);
        button.attr("data-search", userInput);
        button.text(userInput);
        button.addClass("btn");
        button.addClass("btn-outline-primary");
        button.addClass("targetBtns");
        $("#btnArea").append(button);
        $("#userInput").val("");
    });
    //Above: click event that creates a new button with the text and search value of the users text input
    //===================================================================================================
    $("body").on("click", ".targetBtns", function () {
        event.preventDefault();
        // console.log("test button clicked!!!");
        search = ($(this).attr("data-search"));
        queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=20"
        call();
        $("#gifArea").scrollTop(0);
    });
    //Above: click event that grabs the search data assinged to the button clicked & runs the "call()" function below
    //===============================================================================================================
    function call() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (j = 0; j < response.data.length; j++) {
                let image = $('<img>')
                let div = $("<div>")
                div.addClass("col-xs-1");
                div.attr("id", "gifDiv");
                let p = $("<p>");
                p.text("Rating: " + response.data[j].rating.toUpperCase());
                p.attr("id", "rating");
                image.attr("data-state", "still");
                image.attr("data-active", response.data[j].images.downsized.url);
                image.attr("data-still", response.data[j].images.downsized_still.url);
                image.attr("src", response.data[j].images.downsized_still.url);
                image.attr("alt", "UH OH! :(");
                image.addClass("gif");
                image.css("height", "180px");
                image.css("width", "230px");
                image.text("Rating: " + response.data[j].rating);
                image.css("color", "white");
                div.append(p);
                div.append(image);
                $("#gifArea").prepend(div);
            };
        });
    };
    //
    //
    $("body").on("click", ".gif", function () {
        event.preventDefault();
        still = $(this).attr("data-state");
        console.log(still);
        if (still === "still") {
            $(this).attr("src", $(this).attr("data-active"));
            still = $(this).attr("data-state", "active");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            still = $(this).attr("data-state", "still");
        };
    });
    //
    //
    //END ===========================================================================================================
});

