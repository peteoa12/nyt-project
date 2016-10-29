
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
      $searchButton.on('click', function(event) {
        doSearchWithJsonP();
        getArticleTitle();
        return false;
      });


  }

//-----DISPLAY ARTICLES--------------//

  function displayArticles(data) {
    console.log("success", data);
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
    }).done(function(data) {
      console.log('got data', data);
    }).fail(function(err) {
      throw err;
    });

 };

  function  getArticleTitle() {
    $.ajax({
      url: url,
      dataType:'jsonp',
      jsonpCallback: 'svc_search_v2_articlesearch',
      method:'GET',
    })
    .done(displayArticleTitle) {
      console.log("article title", data);
    })
    .fail(function(err) {
      console.log("uh-oh!");
    })
    .always(function() {
      console.log("complete");
    });
    
  }

  return {
    init:init
  };

})();

$(document).ready(function(){
  SimpleJson.init();
});






