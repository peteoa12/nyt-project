
var SimpleJson = (function() {

  //-------GLOBAL VARS-----------------------//

  var $searchField = $("#searchField");
  var $searchButton = $("#searchButton");
  var $searchResults = $("#results");
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.jsonp";

//--------INIT-----------------------------//
  function init(){
    console.log("init");
    setUpListeners();
  }


//-------CLICK HANDLERS-------------------//
  function setUpListeners() {
      $(".results__title").on('click', function(event) {
        console.log("success on article title!");
      });
      
      $searchButton.on('click', function(event) {
        doSearchWithJsonP();
        return false;
      });
  }

//-----DISPLAY ARTICLES--------------//

  function displayArticles(data) {
    console.log("success", data);
    var articles = data.response.docs;
    for (var i = 0; i < articles.length; i++) {
      
      var article = articles[i]
      var title = article.headline.main;
      // var date = response.meta.time;
      // console.log(articles);
      
      $('#results').append(
          
        '<a href ="#" class="results__title">' + '<li>' + title + '</li>' + '</a>' 
      );
    }
  }

//-------SEARCH ARTICLES-----------------//
  function  doSearchWithJsonP() {
    var searchItem = $("#searchField").val();    
    url += '?' + $.param({
      'api-key': "c05c3c0024ff4f3a882a8e0411838fb4",
      'q': searchItem
    });
    
    $.ajax({
      url: url,
      dataType:'jsonp',
      jsonpCallback: 'svc_search_v2_articlesearch',
      method: 'GET',
    }).done(displayArticles).fail(function(err) {
      throw err;
    });
 };

  return {
    init:init
  };

})();

$(document).ready(function(){
  SimpleJson.init();
});






