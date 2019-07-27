$(document).ready(function() {
	chrome.storage.sync.set({
        "location_href": location.href
      });
	chrome.storage.sync.get(["production_urls", "elements"], function(items) {
	var urls = items["production_urls"] || "";
	var elements = items["elements"];
	var res = null;
	if (elements != null) {
    	res = elements.split(",");
    	for(var i = 0; i < res.length; i++){
	      if (res[i] != '') {
	      	$(res[i]).remove();
	      }
	    }
    }
  // alert(urls);
  // alert(elements);
});

// var matches = chrome.runtime.getManifest().content_scripts[0].matches;
// alert(matches);
});