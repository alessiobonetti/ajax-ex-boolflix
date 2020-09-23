function callMovie (movie) {
  $.ajax(
    {
      "url":"https://api.themoviedb.org/3/search/movie" ,
      "data": {
        "api_key": "84b45287c2b5227485225f02593b833f",
        "query": movie ,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        movieRender (data.results);
      },
      "error": function(err) {
        alert("Errore");
      }
    }
  );
}

function movieRender (ele){
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);
  var movieVote = takeVote (ele)
  for(var i =0; i<ele.length; i++){
    var context = {
      "title": ele[i].title,
      "original_title": ele[i].original_title,
      "language": ele[i].original_language,
      "vote": movieVote
    };
    var html = template(context);
    $("#movie_box").append(html);
  }
}

function cleanSearch (){
  $("#movie_box").html("");
  $("#search").val("");
}

function takeVote (ele) {
  for(var i =0; i<ele.length; i++){
    var getElement = ele[i].vote_average;
    conversionNumber (getElement);
  }
}

function conversionNumber (num) {
  num = Math.ceil(num /2);
}

$(document).ready(
  function(){
    $(".search_button").click(
      function(){
        var searchedMovie = $("#search").val();
        callMovie (searchedMovie);
        cleanSearch ();
      }
    );

    $("#search").keyup(
      function(event){
        if(event.which == 13){
          var searchedMovie = $("#search").val();
          callMovie (searchedMovie);
          cleanSearch ();
        }
      }
    );
  }
);
