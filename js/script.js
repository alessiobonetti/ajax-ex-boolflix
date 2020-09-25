// funzione richiamo api film
function callMovie(movie) {
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
        // stampo i dati nel tamplate e appendo
        render ("movie",data.results);
      },
      "error": function(err) {
        alert("Errore");
      }
    }
  );
}

// funzione richiamo api serieTv
function callSeries(series) {
  $.ajax(
    {
      "url": "https://api.themoviedb.org/3/search/tv" ,
      "data": {
        "api_key": "84b45287c2b5227485225f02593b833f",
        "query": series ,
        "language": "it-IT"
      },
      "method": "GET",
      "success": function(data) {
        // stampo i dati nel tamplate e appendo
        render("series",data.results);
      },
      "error": function(err) {
        alert("Errore");
      }
    }
  );
}

// funzione tamplate e append risultato movie e serie tv
function render(type, ele) {

  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  for(var i =0; i<ele.length; i++){
    if(ele[i].poster_path == null) {
      var posterUrl = "img/no_poster.png";
    } else {
      var posterUrl = "https://image.tmdb.org/t/p/w342"+ele[i].poster_path;
    }

    var title;
    var original_title;
    var container;

    if(type == "movie"){
      title = ele[i].title;
      original_title = ele[i].original_title;
      container = $("#movie_box");
    } else if (type == "series"){
      title = ele[i].name;
      original_title = ele[i].original_name;
      container = $("#series_box");
    }

    var context = {
      "poster": posterUrl,
      "title": title,
      "original_title": original_title,
      "language": flagPrinter(ele[i].original_language),
      "vote": conversionInStar(ele[i].vote_average)
    };

    var html = template(context);

    container.append(html);
  }
}

// funzione tamplate e append risultato film
// function movieRender(ele) {
//
//   var source = $("#movie-template").html();
//   var template = Handlebars.compile(source);
//
//   for(var i =0; i<ele.length; i++){
//
//     var posterUrl = "https://image.tmdb.org/t/p/w185";
//
//     var context = {
//       "poster": posterUrl+ele[i].poster_path,
//       "title": ele[i].title,
//       "original_title": ele[i].original_title,
//       "language": conversionInStar(ele[i].vote_average),
//       "vote": flagPrinter(ele[i].original_language)
//     };
//
//     var html = template(context);
//
//     $("#movie_box").append(html);
//   }
// }

// funzione per svuotare i risultati della ricerca precedente
function cleanSearch() {
  $("#movie_box").html("");
  $("#series_box").html("");
  $("#search").val("");
}

// funzione conversione e stampa del numero voto in stelle da 1 a 5
function conversionInStar(num) {
  num = Math.ceil(num /2);
  var string = "";

  for( var i = 0; i<= 5; i++){
    if(i<=num){
      string = string + "<i class='fas fa-star'></i>";
    }else{
      string = string + "<i class='far fa-star'></i>";
    }
  }
  return string;
}

// funzione conversione e poi stampa della lingua in bandiera
function flagPrinter(lang) {
  var flag = [
    "it",
    "en",
    "ru"
  ];
  if(flag.includes(lang)){
    return lang
  }
  return lang;
}

// Documento principale
$(document).ready(
  function(){
    $(".search_button").click(
      function(){
        var searchedMovie = $("#search").val();
        callMovie (searchedMovie);
        callSeries(searchedMovie);
        cleanSearch ();
      }
    );

    $("#search").keyup(
      function(event){
        if(event.which == 13){
          var searchedMovie = $("#search").val();
          callMovie (searchedMovie);
          callSeries(searchedMovie);
          cleanSearch ();
        }
      }
    );
    $(".box_template").hover(
      function(){

        $(".list_details").removeClass(".hide");
        $(".list_details").addClass("show");
      }
    );
  }
);
