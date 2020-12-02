function startGame() {
    myGameArea.start();
    myGamePiece = new component(25, 25, "green", 0, 0, 25, 25);//x:50 y:570
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        console.log("Invoked myGameArea.start()");
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 50);
        window.addEventListener('keydown', function(e) {
            myGameArea.key = e.key;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};

var myGamePiece;

function updateGameArea() {
    myGameArea.clear();
    if (myGameArea.key && myGameArea.key === "w") {
        moveUp()
    }
    if (myGameArea.key && myGameArea.key === "a") {
        moveLeft()
    }
    if (myGameArea.key && myGameArea.key === "s") {
        moveDown()
    }
    if (myGameArea.key && myGameArea.key === "d") {
        moveRight()
    }


    myGamePiece.update();
}


function component(width, height, colour, velx, vely, x, y) {
    this.x = x;
    this.y = y;
    this.colour =  colour;
    this.width = width;
    this.height = height;
    this.newPos = function () {
        this.x += this.velx;
        this.y += this.vely;
    },
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height,);
    };
}

function moveUp() {
    myGamePiece.vely = -10;
    myGamePiece.velx = 0
    myGamePiece.newPos();
}

function moveDown() {
    myGamePiece.vely = +10;
    myGamePiece.velx = 0
    myGamePiece.newPos();
}

function moveRight() {
    myGamePiece.velx = +10;
    myGamePiece.vely = 0
    myGamePiece.newPos();
}

function moveLeft() {
    myGamePiece.velx = -10;
    myGamePiece.vely = 0
    myGamePiece.newPos();
}
