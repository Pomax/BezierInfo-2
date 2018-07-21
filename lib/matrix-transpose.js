module.exports = function transpose(M) {
	return M[0].map((col, i) => M.map(row => row[i]));
};
