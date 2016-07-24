
var bgToggleElements = document.getElementsByClassName('bg-toggle');
var bgToggler = document.getElementById('bg-toggler');

bgToggler.addEventListener('click', function(e) {
	var bgToggleElementsLen = bgToggleElements.length;
	console.log('lll')
	for (var i = 0; i < bgToggleElementsLen; i++) {
		var el = bgToggleElements[i];
		console.log(el)
		if (el.classList.contains('bg-light-gray')) {
			el.classList.toggle('bg-white');
		} else {
			el.style.backgroundColor = 'rgba(255, 255, 255, 1)';
		}
	}
});