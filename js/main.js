
var GoogleMapApi = (function(){

  var map;
  var searchField = document.getElementById("searchField");
  var searchButton = document.getElementById("searchButton");
  var placeResults = document.getElementById("place__results");
  var myLatLng = {lat: 33.742712, lng: -84.338520}; // initial center point of map
  var infowindow; 
    

  function initMap() {
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 17
    });

    // searchButton.addEventListener("click", search);

    searchButton.addEventListener("click", function(){
      search();

    });
    
    var marker = new google.maps.Marker({
      position:myLatLng,
      map: map,
      title: 'My House',
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('My House');
        infowindow.open(map, this);
    });
  };
  
  function createMarker(result) {
    var marker = new google.maps.Marker({
      position:result.geometry.location,
      map: map,
      title: result.name,
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        createInfoWindow(result,marker);
        infowindow.open(map, this);
    });
  };

  function createInfoWindow(result, marker) {
    var contentString = `<h3 class="marker-title">${result.name}<h3><div class="marker-address">${result.formatted_address}</div>`
    infowindow.setContent(contentString);
  };


  function processPlacesResults(results, status) {
    setSearchResult(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        createMarker(result);
      }
    }
  };


  function search() {
    var searchItem = document.getElementById("searchField").value;
    var request = {
      location: myLatLng,
      radius: '5',
      query: searchItem,
      openNow:true
    };

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, processPlacesResults);
  }


  function setSearchResult(result) {
    placeResults.innerHtml = "";
    result.forEach(function(item){
      var node = document.createElement("LI");
      var textnode = document.createTextNode(item.name); 
      node.innerHtml = result.name;
      node.appendChild(textnode);
      placeResults.appendChild(node);
      console.log(item);
    })
  };

  return {
    init: initMap
  };

}());
