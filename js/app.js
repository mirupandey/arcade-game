// Draw the enemy and player objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/*
    Enemy Objects
*/

// Enemies the player must avoid
var Enemy = function(x,y) {

    // The image/sprite for enemies
    this.sprite = 'images/enemy-bug.png';

    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x <= 550){
        this.x += this.speed * dt;
    }else{
        this.x = -2;
    }

    if(player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            this.reset();
        }
    }
}

/*
    Player Object
*/

// Player class and initial x and y coordinates
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

//Update player position
Player.prototype.update = function(){
    if(this.controtlPosition === 'left' && this.x > 0){ 
        this.x = this.x - 101; 
    }else if(this.controtlPosition === 'right' && this.x != 400){
        this.x = this.x + 101;
    }else if(this.controtlPosition === 'up'){
        this.y = this.y - 83;
    }else if (this.controtlPosition === 'down' && this.y != 400){
        this.y = this.y + 83;
    }
    this.controtlPosition = null;
    
    if(this.y < 25){
        this.reset();
    }
}

//Reset player to beginning position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
}

//Input handler for player
Player.prototype.handleInput = function(e){
    this.controtlPosition = e;    
}


// Instantiate enemies and player objects
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
}());

var player = new Player(); 


// listens for key presses and sends the keys to 
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
