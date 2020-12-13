$('document').ready(function() {
	const links = document.getElementsByClassName("link");

	var l;
	for(l of links) {
		console.log(l);
		l.addEventListener("click", function(event) {
			jwtRequest(event.target.getAttribute("data-link"), window.sessionStorage.accessToken);
		})
	}

	function jwtRequest(url, token){
	    var req = new XMLHttpRequest();
	    req.open('get', url, true);
	    req.setRequestHeader('Authorization','Bearer '+token);
	    
	    req.onreadystatechange = function (aEvt) {
		    if (req.readyState == 4) {
    			if(req.status == 200) {
    				document.open();
    				document.write(req.responseText);
		    		document.close();
    			} else {
				    alert("Error loading page\n");
    			}
        	}
	    };
	    req.send();
	}
});

