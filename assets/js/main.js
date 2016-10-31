
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
        $('#results').empty();
        $('#logo').addClass('brand__container--animate');
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
      var url = article.web_url;

      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      var date = new Date(article.pub_date);
      var month = months[date.getMonth()];
      var day = date.getDate();
      var year = date.getFullYear();

      $('#results').append(
          
        '<a href ="'+ url +'" class="results__title" target="_blank">' + '<li>' + title + '</li>' + '<span>' + month + ' ' + day + ',' + ' ' + year + '</span>' + '</a>' + '<hr>'
      );
     
      console.log(date);
      console.log(url);
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






