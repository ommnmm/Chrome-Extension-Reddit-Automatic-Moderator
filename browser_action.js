function load() {

  var comment_list1 = document.getElementById("comment_list1");
  var comment_list2 = document.getElementById("comment_list2");
  var comment_list3 = document.getElementById("comment_list3");

  chrome.storage.local.get("comments", function(data) {

    if(typeof(data.comments) !== "undefined") {
		
	    chrome.browserAction.setIcon({path : "../../icons/Logo.png"});
        comment_list1.innerHTML = "";
        comment_list2.innerHTML = "";
        comment_list3.innerHTML = "";

    	data.comments.forEach(function(comment, idx, array) {

        //if (idx === (array.length - 1)) {
          var elmnt1 = document.createElement("ul")
          var elmnt2 = document.createElement("li")
          var elmnt3 = document.createElement("a1")
			
			//} else {
          //var elmnt1 = document.createElement("li")
			//}
		
  		var comment_id = "id: " + comment.id;
        var comment_link = comment.link;		
        var comment_author = "author: " + comment.author;

        var div = document.createElement("div");
        div.innerHTML = comment_author;
        div.setAttribute("class", "author");

        var a = document.createElement("a");

        a.innerHTML = comment_id;
        a.setAttribute("target", "_blank");
        a.setAttribute("href", comment_link);

		if (comment.label === "red"){
		
        elmnt1.appendChild(div);
        elmnt1.appendChild(a);
        console.log(elmnt1);
		
        comment_list1.appendChild(elmnt1);
		}
		

		if (comment.label === "yellow"){
		
        elmnt2.appendChild(div);
        elmnt2.appendChild(a);
        //console.log(elmnt1);
		
        comment_list2.appendChild(elmnt2);
		}
		
		
		if (comment.label === "green"){
		
        elmnt3.appendChild(div);
        elmnt3.appendChild(a);
        //console.log(elmnt1);
		
        comment_list3.appendChild(elmnt3);
		}
		
		  });       //    	data.comments.forEach(function(comment, idx, array) {

    }     //if(typeof(data.comments) !== "undefined") {


  }) //  chrome.storage.local.get("comments", function(data) {
}//function load() 

document.addEventListener('DOMContentLoaded', function() {

  load();

}); //document.addEventListener
