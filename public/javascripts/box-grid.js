var spans = document.querySelectorAll('[_span]');

for (var i = 0; i < spans.length; i++) {
	let _span = spans[i].getAttribute('_span').split(/\D/g).filter(Boolean);
	elem.className += ` xs-${_span[0]}`;
	elem.className += ` sm-${_span[1]}`;
	elem.className += ` md-${_span[2]}`;
	elem.className += ` lg-${_span[3]}`;
	elem.className += ` xl-${_span[4]}`;
}