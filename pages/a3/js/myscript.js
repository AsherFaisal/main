$(document).on("pagebeforeshow", "#planet", function() {

	$.ajax({
    type: "POST", url: "json/a3_torontoWeather.json", dataType: "json", 
		success: loadCollapsible,
		error: function (request,error) {
            alert('Network error has occurred'); }
  });
});	


function loadCollapsible(data) {
    
    start = data.query.results;
    
    $("#header").append(
        "<img src= 'images/weather.png' width='30'>" +
        "Updated: "+ start.lastBuildDate     
    );
    
    $("#location").append(
        start.location.city + ", " + 
        start.location.country + ", " +
        start.location.region + "</br> "
    );
    
    $("#windCollapse").append(
        "Chill: " + start.wind.chill + ", </br>" + 
        "Direction: " + start.wind.direction  + ", </br>" + 
        "Speed: " + start.wind.speed + "</br> "
    );
    
    $("#atmosCollapse").append(
        "Humidity: " + start.atmosphere.humidity + ", </br>" + 
        "Pressure: " + start.atmosphere.pressure + ", </br>" + 
        "Rising: " + start.atmosphere.rising + ", </br>" + 
        "Visibility: " + start.atmosphere.visibility + "</br> "
    );
    
    $("#astroCollapse").append(
        "Sunrise: " + start.astronomy.sunrise + ", </br>" + 
        "Sunset: " + start.astronomy.sunset + "</br> "
    );
    
    //Map and drop point
    $("#mapSection").click(function(){
        var map=data.query.results.item;
        var lat=map.lat;
        var long=map.long;

        var mapTor=new google.maps.LatLng(lat,long);
        //set map options
        mapOptions={
            center:mapTor,
            zoom:18,
            mapTypeId:google.maps.MapTypeId.HYBRID,
            title:map.title
        }

        //draw map
        map = new google.maps.Map(document.getElementById("map"),mapOptions);
        //marker
        myLoc=new google.maps.Marker({
            map:map,
            icon:"pushpin.gif",
            animation:google.maps.Animation.DROP,
            position:mapTor,
            title:map.title
        });

    });

    //Forcast
    startFor = data.query.results.item.forecast;
    for (x=0; x < startFor.length; x++) {
        $("#forcast").append(
                "<dev data-role='collapsible'>" +
                    "<h3 class='ui-btn ui-icon-" +
                            startFor[x].date.toLowerCase() +
                            " ui-btn-icon-left'>" + 
                            "<span id='n" + x + "'>" +
                            startFor[x].date + "</span></h3>" +
                            "<h3> Day: " + startFor[x].day + "</h3>" +
                            "<h3> High: " + startFor[x].high + "</h3>" +
                            "<h3> Low: " + startFor[x].low + "</h3>" +
                            "<h3> Text: " + startFor[x].text + "</h3>" +
                "</section>"
        );

    }
    
}

$(document).on("pagebeforeshow", "#mainp", function() {
    
     $.getJSON("student.json", function(data) {
		$("#popupInfo #name").html(data.info.student);
        $("#popupInfo #number").html(data.info.program);
        $("#popupInfo #program").html(data.info.studentNumber);
        $("#popupInfo #img").attr("src", data.info.studentPicture);
        $("#popupInfo #quote").html(data.info.quote);	

	});


    $("#register").click(function() {
		console.log("click");
		//if an id is available
		remail = $("#email").val();
		//if no id ... only name
		// rname "$("input[name='username']").val();
		
		localStorage.setItem("email", remail);
		
		rprog = $("input[name='program']:checked").attr("value");
	
		localStorage.setItem("prog", rprog);
        
        rcomment = $("#comment").val();
        
        localStorage.setItem("comment", rcomment);
		
		alert("Data saved");
	});


	$("#retrieve").click(function() {
		// pulling items individually

		$("#popupEmail .ui-content").html("<p>" + localStorage.getItem("email") + "</p><br>" +
                                          "<p>" + localStorage.getItem("prog")+ "</p><br>" + 
                                          "<p>" + localStorage.getItem("comment")+ "</p><br>");

	});  // end of retrieve
    
});

