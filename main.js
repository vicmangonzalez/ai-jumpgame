var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 70;
        this.ySpeed = 3;
        this.xSpeed = 0;
    }
    show() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {

        this.y += this.ySpeed;
        this.ySpeed += gravity;

        if (this.y >= 340 - 75) {
            this.ySpeed = 0;
            canJump = true;
        } else {
            canJump = false;
        }
    }
}

class Rock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 40;
        //this.h = (Math.random() * (190 - 40) + 40).toFixed(0);
    }
    show() {
        c.fillStyle = 'gray';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {        
        if (this.x < p.x + p.w && this.x + this.w > p.x && this.y < p.y + p.h && this.y + this.h > p.y) {
            //location.reload();
            alive = false;
            start();
        }
    }
}

let p;
let gravity = 0.1
let rocks = [];
let rockX = 800;
let score = 0;
let canJump = true;
let alive = false;

window.onload = function () {
    start();
    setInterval(update, 10);
}

function start() {
    // Crear jugador y ajustar variables
    p = new Player(100, 200);
    score = 0;
    alive = true;

    for (let i = 0; i < 100; i++) {
        var r = new Rock(rockX, 300);
        rocks.push(r);
        rockX += Math.floor(Math.random() * 500) + 300;
    }
    p.xSpeed = 5;
}

function update() {
    canvas.width = canvas.width;
    //ground
    c.fillStyle = 'green';
    c.fillRect(0, 340, 800, 160);
    //player
    p.show();
    p.update();
    //webcam controller
    saltar();
    //rocks
    for (let i = 0; i < rocks.length; i++) {
        rocks[i].show();
        rocks[i].update();
        rocks[i].x -= p.xSpeed;
    }
    //show score
    document.getElementById("showScore").innerHTML = "Punteo: " + score;
}

function changeSpeed() {
    p.xSpeed += 0.05;
}

function increaseScore() {
    score++;
}

setInterval(changeSpeed, 500);
setInterval(increaseScore, 500);

const saltar = () => {
    if (haciaArriba && alive && p.y > 80) {
        p.ySpeed = -4;
        haciaArriba = false;
    }
}

function keyDown(e) {
    // if (e.keyCode === 38 && canJump && alive) {
    //     p.ySpeed = -4;
    // }
}

document.onkeydown = keyDown;