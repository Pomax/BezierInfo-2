var transpose = require('./matrix-transpose.js');

module.exports = function multiply(m1, m2) {
	var M = [];
	var m2t = transpose(m2);
	m1.forEach( (row, r) => {
		M[r] = [];
		m2t.forEach( (col, c) => {
			M[r][c] = row.map( (v,i) => col[i] * v).reduce( (a,v) => a+v, 0 );
		});
	});
	return M;
};
