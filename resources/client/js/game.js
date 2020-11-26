function startGame() {

}

velx = 2;
vely = 2;

function component(x, y, velx, vely) {
    this.x = x;
    this.y = y;

    function newPos() {
        this.x += velx;
        this.y += vely;
    }
}

