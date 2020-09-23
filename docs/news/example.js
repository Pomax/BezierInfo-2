let bg = `pink`;

setup() {
    setGrid(30, `red`);
    setCursor(`none`);
    setTextStroke(`white`, 4);
    setFontSize(18);
}

draw() {
    clear(bg);
    setColor(`#30F0D0`);
    circle(this.cursor.x, this.cursor.y, 5);
    setColor(`black`);
    text(`Frame ${this.frame}`, this.width/2, this.height/2, CENTER);
}

onMouseDown() {
    bg = 'salmon';
    redraw();
}

onMouseMove() {
    if(this.cursor.down) {
        bg = 'orange';
    }
    redraw();
}

onMouseUp() {
    bg = 'pink';
    redraw();
}
