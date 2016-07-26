module.exports = function(res) {
	if (typeof this.isFresh == 'undefined') {
		console.log('Refreshing browser.');
		this.isFresh = false;
		return res.send('true');
	}	else { return res.send('false') };
};