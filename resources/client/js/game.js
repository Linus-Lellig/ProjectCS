function startGame() {
    myGameArea.start();
}

velx = 2;
vely = 2;

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 50);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};

function updateGameArea() {
    myGameArea.clear();
}

function component(x, y, velx, vely) {
    this.x = x;
    this.y = y;

    function newPos() {
        this.x += velx;
        this.y += vely;
    }
}

