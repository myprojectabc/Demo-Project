$(document).ready(function() {
	//check active when first use
	chrome.storage.sync.get(["active"], function(active) {
		if (!active['active']) {
			urls = {"urls" : [],
					"elements": []};
			chrome.storage.sync.set({
		    "list_urls": urls
			}, function() {
				console.log("active finish!");
			});
			chrome.storage.sync.set({
		    "active": true
			});
		}
	});
	//event button. Go to Setting
	$('#go-to-options').click(function() {
	  if (chrome.runtime.openOptionsPage) {
	    chrome.runtime.openOptionsPage();
	  } else {
	    window.open(chrome.runtime.getURL('options.html'));
	  }
	});
	//save location of page
	chrome.storage.sync.get(["location-href"], function(url) {
		$("#production-urls").val(url["location-href"]);
	});

	$("#saveUrl").click(function() {
		var url = $("#production-urls").val();
		chrome.storage.sync.get(["list_urls"], function(items) {
			var urls = items["list_urls"]["urls"] || "";
			var elements = items["list_urls"]["elements"] || "";
			urls.push(url);
			temp_urls = {"urls" : urls, "elements": elements};
			chrome.storage.sync.set({
		    "list_urls": temp_urls
			}, function() {
				alert("Đã lưu!");
			});
		});
	});

	$("#save").click(function() {
		var element = $("#select-type").val() + $("#elements").val();
		chrome.storage.sync.get(["list_urls"], function(items) {
			var urls = items["list_urls"]["urls"] || "";
			var elements = items["list_urls"]["elements"] || "";
			elements.push(element);
			temp_element = {"urls" : urls, "elements": elements};
			chrome.storage.sync.set({
		    "list_urls": temp_element
			}, function() {
				alert("Đã lưu!");
			});
		});
	});

	chrome.storage.sync.get(["border-color", "color", "text-color"], function(colors) {
		$("body").css("background", colors["border-color"]);
		$(".container").css("background", colors["color"]);
		$("footer>div").css("color", colors["text-color"]);
		$("h3").css("color", colors["text-color"]);
	});

	$("#delete-list-element").attr('checked', true);
	$("#delete-list-element").click(function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var activeTab = tabs[0];
		    chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
		});
	});

	chrome.storage.sync.get(["auto-delete"], function(checkbox) {
		if (checkbox["auto-delete"]) {
			$('.custom-control-input').attr('checked', true);
			$('#delete-list-element').attr('disabled', true);
		    chrome.storage.sync.set({
			    "auto-delete": true
			});
		}
		else{
			$('.custom-control-input').attr('checked', false);
			$('#delete-list-element').attr('disabled', false);
		    chrome.storage.sync.set({
			    "auto-delete": false
			});
		}
	});

	

	$('#cbx-auto-delete').click(function() {
	    if ($(this).is(':checked')) {
	    	$('#delete-list-element').attr('disabled', true);
	    	chrome.storage.sync.set({
			    "auto-delete": true
				}, function() {
					console.log("saved");
			});
	    } else{
	    	$('#delete-list-element').attr('disabled', false);
	    	chrome.storage.sync.set({
			    "auto-delete": false
				}, function() {
					console.log("saved");
			});
	    }
  	});

});

