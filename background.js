// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });


function reset (){

	chrome.browserAction.setIcon({path : "../../icons/Logo_greyscale.png"});

	chrome.storage.local.clear(function () {
		console.log("reset");
	});
}

reset();
var api_server = "http://127.0.0.1:8000/";

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {

	var url = details.url;
	reset();

	if (url.includes("https://www.reddit.com/r/IAmA/")) {

		// var topic = url.replace("https://en.wikipedia.org/wiki/", "");
		//
		// // try to remove the #... anchoring labels but not sure this is working
		// if (topic.includes('#')) {
		// 	topic = topic.split('#')[0];
		// }
		// 
		var today = new Date();
		var yesterday = new Date();
		var tmr = new Date();
		
		yesterday.setDate(today.getDate()-1);
		tmr.setDate(today.getDate()+1);

		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + mm + dd;	

		
		var dd = String(tmr.getDate()).padStart(2, '0');
		var mm = String(tmr.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = tmr.getFullYear();

		tmr = yyyy + mm + dd;	
		
		var dd = String(yesterday.getDate()).padStart(2, '0');
		var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = yesterday.getFullYear();

		yesterday = yyyy + mm + dd;	
		
		period = yesterday + today;
		var req_url = api_server + "comments/?period=" + period;
		//var req_url = "http://127.0.0.1:8000/comments/?period=2019020320190204";
        //var req_url = "http://127.0.0.1:8000/submission/?wiki_topic=rock"
		fetch(req_url, {
          headers : { 
          'Content-Type': 'application/json',
			  'Accept': 'application/json'}
        })    
		.then(r => r.text())
		.then(function(result) {
			result_json = JSON.parse(result);
			if (result_json.found) {
				chrome.storage.local.set({comments: result_json.comments}, function() {
					console.log("Found comments");
					//chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
        		});
			}
		});
	}
});
