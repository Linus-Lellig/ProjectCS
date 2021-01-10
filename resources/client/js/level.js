var platforms = [];
var num = 3;


function StartLevel() {
    createPlat();
    renderPlat();
}


function createPlat() {
    for (let i = 0; i < num; i++) {
        platforms.push({x: (200 + (i*300)), y: (640 - (50*i)), width: 110, height: 15})
    }
}


function PlatCollision() {
    for (let i = 0; i < num; i++) {
        if(platforms[i].x < myGamePiece.x && myGamePiece.x < platforms[i].x + platforms[i].width &&
            platforms[i].y > myGamePiece.y && myGamePiece.y > platforms[i].y + platforms[i].height)
        {
            myGamePiece.y = platforms[i].y;

        }
    }
}

function betterPlatCollision() {
    for (let i = 0; i < num; i++) {
        //if (platforms[i].y > myGamePiece.y) {
            let myLeft = myGamePiece.x;
            let myRight = myGamePiece.x + myGamePiece.width;
            let myTop = myGamePiece.y;
            let myBottom = myGamePiece.y + myGamePiece.height;
            let PlatTop = platforms[i].y;
            let PlatBottom = platforms[i].y + platforms[i].height;
            let crash = false;

            if (myBottom >= PlatTop && myBottom < PlatBottom && myGamePiece.x > platforms[i].x && myGamePiece.x < platforms[i].x + platforms[i].width) {
                if (myBottom > PlatTop && myBottom < PlatBottom && myGamePiece.x > platforms[i].x && myGamePiece.x < platforms[i].x + platforms[i].width) {
                    myGamePiece.y = PlatTop - myGamePiece.height;
                    if (i < num -1) {
                        myGamePiece.y -= 5;
                    }
                    else {
                        myGamePiece.y = PlatTop - myGamePiece.height;
                    }


                }

                myGamePiece.vely = 0;

                if (prevy === myGamePiece.y) {//then allow it to jump


                }
                prevy = myGamePiece.y
                disableJump = false;
                disableGravity = true;
                console.log("y set to PlatTop")
                //console.log("myBottom: " + myBottom);
                //console.log("myTop: " + myTop);
                //console.log("PlatTop: " + PlatTop);
                //console.log("myLeft: " + myLeft);
                //console.log("myRight: " + myRight);
            }
            else {
                disableGravity = false;
                myGamePiece.vely = vely;
            } /*else if (myBottom > PlatBottom && myTop <= PlatBottom &&
                myGamePiece.x > platforms[i].x && myGamePiece.x < platforms[i].x + platforms[i].width) {//checks for collision between myTop and PlatBottom to remove teleporting
                myGamePiece.y = PlatBottom;
                console.log("second if")
            }*/
/*            let i = -1;
            if(platforms[0].x < myGamePiece.x && myGamePiece.x < platforms[0].x + platforms[0].width &&
                platforms[0].y < myGamePiece.y && myGamePiece.y < platforms[0].y + platforms[0].height) {
                i = 0;
            }
            if (i > -1) {
                myGamePiece.y = platforms[0].y;
            }
*/
        }
    //}
}


function renderPlat() {
    ctx = myGameArea.context;
    ctx.fillStyle = "#45597E";
    for (let i = 0; i < num; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

