var ball;
var database, position;

function preload () {
    airBalloon = loadImage("Hot Air Ballon-01.png");
    hotairballoon = loadImage("Hot Air Ballon-02.png");
}

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage(hotairballoon);
    ball.scale = 0.5;

    var locnode = database.ref("ball/position");
    locnode.on("value",readOp,showError);
}

function draw(){
    background(airBalloon);

    text("Use Arrow keys to move the air balloon",100,50);
    text("Use Up Arrow keys to decrease the size of the balloon", 100, 70)
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        ball.scale=ball.scale -0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x:ball.x+x,
        y:ball.y+y
    })
}

function readOp (data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError () {
    console.log("error");
}