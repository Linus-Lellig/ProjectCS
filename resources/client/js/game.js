var velx = 0;
var vely = 0;
var prevx;
var prevy;
var prev2y;
var disableJump = false;
var keys = {
    right: false,
    left: false,
    up: false
}
var disableGravity;
//requestAnimationFrame(updateGameArea);
function startGame() {
    myGameArea.start();
    myGamePiece = new component(25, 25, "green", 2, 0, 50, 570);//x:50 y:570
    StartLevel();
    requestAnimationFrame(updateGameArea);
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        console.log("Invoked myGameArea.start()");
        this.canvas.width = 1200;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //requestAnimationFrame(updateGameArea);
        //this.interval = setInterval(updateGameArea, 30);
        //window.addEventListener('keydown', function(e) {
            //myGameArea.key = e.key;
        //})
        window.addEventListener('keydown', keydown);
        window.addEventListener('keyup', keyup);
        //})
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        cancelAnimationFrame(updateGameArea);
        clearInterval(this.interval);
    }
};


function MoveEventListener() {
    if (myGameArea.key && myGameArea.key === "a") {
        moveLeft();
    }
    else if (myGameArea.key && myGameArea.key === "d") {
        moveRight();
    }
    else {
        myGamePiece.velx = velx;
        myGamePiece.vely = vely;
    }
}

function cantJump() {
    console.log("cantJump()")
    console.log("Prevy: " + prevy)
    console.log("myGamePiece.y: " + myGamePiece.y)
}

function JumpEventListener() {
    if (myGameArea.key && myGameArea.key === " ") {
        //if (prevy < myGamePiece.y) {
            console.log("falling");
            
            if (prev2y === 675 && prevy === 675) {
                console.log("prevy: " +prevy);
                console.log("prev2y: " +prev2y);
                jump();
            }
            //break JumpValidation;
//Turn disable jump off when hit the ground then instantly back on
        //} else {

        //}

    } else {
        MoveEventListener();
        //console.log("stopped jumping and called MoveEventListener()")
    }
}

function keydown(e) {
    myGameArea.key = e.key;
    if (e.key === " ") {
        //jump();
        keys.up = true;
        //console.log("space keydown");
    }
    if (e.key === "a") {
        //moveLeft();
        keys.left = true;
        //console.log("a keydown");
    }
    else if (e.key === "d") {
        //moveRight();
        keys.right = true;
        //console.log("d keydown");
    }
}

function keyup(e) {
    myGameArea.key = e.key;
    if (e.key === " ") {
        keys.up = false;
        //console.log("space keyup");
    }
    if (e.key === "a") {
        keys.left = false;
        //console.log("a keyup");
    }
    if (e.key === "d") {
        keys.right = false;
        //console.log("d keyup");
    }
}

function updateGameArea() {
    myGameArea.clear();

                                                                                    //if (disableJump === false) {
    //JumpEventListener();
                                                                //document.getElementById("colourbox").style.backgroundColor = "green";
                                                                //} //else {
                                                                //document.getElementById("colourbox").style.backgroundColor = "red";
                                                                //}

    //MoveEventListener();
    //keydown();
    //keyup();
    if (keys.left === true) {
        moveLeft();
    }
    else if (keys.right === true) {
        moveRight();
    }
    else {
        myGamePiece.velx = velx;
        myGamePiece.vely  = vely;
    }
    if (keys.up === true && disableJump === false) {
        jump();
    }

    betterPlatCollision();
    renderPlat();
    myGamePiece.newPos();
    myGamePiece.update();

    requestAnimationFrame(updateGameArea);
}



function component(width, height, colour, velx, vely, x, y) {
    this.x = x;
    this.y = y;
    this.colour =  colour;
    this.width = width;
    this.height = height;
    this.gravity = 0.2;
    this.gravitySpeed = 0;
    this.newPos = function () {
        if (this.gravitySpeed <= 7) {
            this.gravitySpeed += this.gravity;
        }
        if (disableJump === true || disableGravity === true) {
            this.gravitySpeed = 0;
        }
        prev2y = prevy;
        prevx = this.x;
        prevy = this.y;
        betterPlatCollision();
        this.x += this.velx;
        this.y += this.vely + this.gravitySpeed;
        //this.update();
        this.bordercrash();
    },
        this.bordercrash = function () {
            let bottom = myGameArea.canvas.height - this.height;
                if (this.y > bottom) {
                    this.y = bottom;
                }
        },
            this.update = function () {
                ctx = myGameArea.context;
                ctx.fillStyle = this.colour;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            };
}

function moveUp() {
    myGamePiece.vely = -10;
    myGamePiece.velx = 0;
    myGamePiece.newPos();
}

function moveDown() {
    myGamePiece.vely = 10;
    myGamePiece.velx = 0;
    myGamePiece.newPos();
}

function moveRight() {
        myGamePiece.velx = 1;
        velx = 1;
}

function moveLeft() {
        myGamePiece.velx = -1;
        velx = -1;
}


function jump() {
    function TurndisableJumpOFF() {
        disableJump = false;
    }

    function TurndisableJumpON() {
        disableJump = true;
    }

    let bottom = myGameArea.canvas.height - myGamePiece.height;
    for (let i = 0; i < num; i++) {
        //console.log("i: " + i);
        console.log("platforms.y: " + platforms[i].y);
        if (myGamePiece.y >= bottom || myGamePiece.y === platforms[i].y /*&& disableJump === false*/) {
            disableJump = true;
            disableGravity = false;
            //if (prevy < myGamePiece.y) {
            //console.log("falling");
            //cantJump()
            //break JumpValidation;
//Turn disable jump off when hit the ground then instantly back on
            //}
            setTimeout(TurndisableJumpOFF, 500)
            myGamePiece.vely = -2;
            vely = -2;
            betterPlatCollision();
            myGamePiece.newPos();
            //}
        }
    }
}

