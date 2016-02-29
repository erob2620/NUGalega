
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;
var FPS = 30;

var canvas, stage, queue;

//opens a canvas and tells CreateJS to use it as a Stage. Remember, CreateJS does everything on it's stage similar to the way ActionScript works.
function openCanvas() {
    
    canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
	var div = document.getElementById("spritetest");
    div.appendChild(canvas);
    
    stage = new createjs.Stage(canvas);
}

var walk, blocks, blockArray;

blockArray = [];

//This displays the sprites on the screen. Notice that I am putting clones of the blocks into an array. This is a really efficient way to duplicate sprite content and the preferred method.
function displaySprites() {
    walk.x=100;
    walk.y=200;
    walk.gotoAndPlay("walkRight");
    stage.addChild(walk);
	
	for(i = 0; i < 5; i++){
		blocks.x=i*31+20;
		blocks.y=215;
		blocks.gotoAndStop(i);
		blockArray.push(blocks.clone());
	}
	for(j = 0; j < 5; j++){
		stage.addChild(blockArray[j]);	
	}
	
	//This draws the objects the first time. It isn't really needed because we have a loop that redraws every frame.
	stage.update();
}

function loadComplete(evt) {
	//This takes the images loaded from the sprite sheet and breaks it into the individual frames. I cut and pasted the 'frames' parameter from the .js file created by Flash when I exported in easelJS format. I didn't cut and paste anything except 'frames' because I am using preloadJS to load all the images completely before running the game. That's what the queue.getResult is all about.
	var blockSheet = new createjs.SpriteSheet({
        images: [queue.getResult("mySprites")],
        frames: [[0,0,32,32,0,16,16],[32,0,32,32,0,16,16],[64,0,32,32,0,16,16],[96,0,32,32,0,16,16],[128,0,32,32,0,16,16]]
        });
    //here I throw the frames into a sprite called 'blocks'
    blocks = new createjs.Sprite(blockSheet);
	
	//I'm doing the same thing here. Notice I am reading this from the same sprite sheet. It is not reloading the sprite sheet though. It just copies it from memory since we already preloaded this image file. The 'animations' parameter is optional but it allows you to label a series of frames in order to play looping sprites. You can even control the playback speed in relation to the FPS. In the walk cycle, I used '.5' which means at 30 FPS, it plays at 15.
    var walkSheet = new createjs.SpriteSheet({
        images: [queue.getResult("mySprites")],
        frames: [[160,0,19,49,0,10.05,48.6],[179,0,34,44,0,17.05,43.6],[213,0,22,46,0,9.05,45.6],[235,0,17,49,0,8.05,48.6],[0,49,25,49,0,10.05,48.6],[25,49,31,46,0,14.05,45.6],[56,49,33,44,0,16.05,43.6],[89,49,30,44,0,17.05,43.6],[119,49,28,46,0,17.05,45.6],[147,49,19,49,0,10.05,48.6],[166,49,23,49,0,14.05,48.6],[189,49,31,46,0,16.05,45.6],[220,49,34,44,0,17.05,43.6],[0,98,19,49,0,9.05,48.6],[19,98,34,44,0,17.05,43.6],[53,98,22,46,0,13.05,45.6],[75,98,17,49,0,9.05,48.6],[92,98,25,49,0,15.05,48.6],[117,98,31,46,0,17.05,45.6],[148,98,33,44,0,17.05,43.6],[181,98,30,44,0,13.05,43.6],[211,98,28,46,0,11.05,45.6],[0,147,19,49,0,9.05,48.6],[19,147,23,49,0,9.05,48.6],[42,147,31,46,0,15.05,45.6],[73,147,34,44,0,17.05,43.6]],
        animations: {
            standRight: [0, 0, "standRight"],
            walkRight: [1, 12, "walkRight", .5],
            standLeft: [13, 13, "standLeft"],
            walkLeft: [14, 25, "walkLeft", .5]
            }     
        });
    
    walk = new createjs.Sprite(walkSheet);
	
	
	displaySprites();
	startLoop();
}

//This is the preload manifest used by preloadJS. I am currently only loading one image. I can use a commas and add more files if needed. I commented out an example of what that would look like.
fileManifest = [
                {src:"sprites.png", id:"mySprites"}
				//,{src:"anotherFile.jpg", id:"anotherFile"}
            ];
			
//This function loadeds all the files in fileManifest and will rught loadComplete when it is finished. You can also get progress information. There are examples how to do this in preloadJS.
function loadFiles() {
    queue = new createjs.LoadQueue(true, "assets/");
    queue.on("complete", loadComplete, this);
    queue.loadManifest(fileManifest);
}

//This is the loop that updates the stage every frame. Remember, any changes you make to the stage don't show up until update is called.
function loop() {
	stage.update();
}

//This creates the loop that workes like setInterval
function startLoop() {
	createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);
}

function init() {
    openCanvas();
    loadFiles();
	 
}

function main() {
    init();
}

//Checks to make sure the DOM is loaded and ready and then runs main()
if( !!(window.addEventListener)) {
    window.addEventListener ("DOMContentLoaded", main);
}else{ //MSIE
    window.attachEvent("onload", main);
}