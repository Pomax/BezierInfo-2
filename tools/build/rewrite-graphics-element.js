module.exports = function rewriteGraphicsElement(code, width, height) {

    // const split = splitCodeSections(code);
    // const globalCode = split.quasiGlobal;
    // const classCode = performCodeSurgery(split.classCode);

    return `
        const { createCanvas, loadImage } = require('canvas');
        const canvas = createCanvas(${width}, ${height});
        const ctx = canvas.getContext('2d');
        module.exports = canvas;
    `;
};
