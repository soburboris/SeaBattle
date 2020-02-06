
function init(){
	var view = {
	displayMessadge: function (msg) {
		var messageArea = document.querySelector('#messageArea');
		messageArea.innerHtml =msg;

	},
	displayHit: function (location) {
		var loc = document.getElementById(location);
		
		
		;
		loc.setAttribute('class', 'hit');

	},


	displayMiss: function(location){
		var miss = document.getElementById(location);
		miss.setAttribute('class', 'miss');

	}
};

fireButton.onclick = function(){
	var text =document.getElementsByTagName("input")[0];
	var num = text.value;

	view.displayHit(num);



}



	
}
window.onload =init;

