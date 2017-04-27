var xmlData;		// hold the entire XML from AJAX call
var rowID;			// hold which campus is selected

$(document).on("pagecreate", "#home", function() {
	console.log("in doc create");
$.ajax({
		type:"POST", url:"a2.xml", dataType:"xml",
		success: function (xml) {
			buildmenu(xml, "Assign2");
		},
		error: function(e) {
			alert(e.status + " - " + e.statusText);
		}
	});
});

function buildmenu(info, title) {
	console.log(info);
	var n=0;
    var b=0;
	xmlData = info;
	
	$("h1").html(title);
	
	// start navhome

    

    
	$("#mainMenu").html("");
	$(info).find("item").each(function() {
		$("#mainMenu").append(
                "<li li-id='" + n + "'>" +
						"<a href='#individual' data-transition='pop'' >" +
							$(this).find("name").text() +
						"</a>" +
					"</li>");

		n++;
	});
    
	
	$("#mainMenu").listview("refresh");
	$("#navhome").navbar("destroy");
	$("#navhome").navbar();
}



$(document).on("click", "#mainMenu >li", function() {
	rowID = $(this).closest("li").attr("li-id");
	console.log(rowID);
});

$(document).on("pageshow", "#bottom", function() {
	parseXML(xmlData, rowID);
});


$(document).on("pageshow", "#individual", function() {
	parseXML(xmlData, rowID);
});

function parseXML(xml, choice) {
	$("#ind-data").html("<h3>Name: " +
        $(xml).find("name:nth(" + choice + ")").text() +
    "</h3>" // on your own pull image and other info
    );
	$("#ind-data").append("<h3>Price: " +
        $(xml).find("price:nth(" + choice + ")").text() +
    "</h3>" // on your own pull image and other info
    );
    $("#ind-data").append("<h3>Description: " +
        $(xml).find("desc:nth(" + choice + ")").text() +
    "</h3>" // on your own pull image and other info
    );
    $("#ind-data").append("<h3>Category: " +
        $(xml).find("category:nth(" + choice + ")").text() +
    "</h3>" // on your own pull image and other info
    );
    $("#ind-data").append("<h3>ID: " +
        $(xml).find("id:nth(" + choice + ")").text() +
    "</h3>" // on your own pull image and other info
    );

}

