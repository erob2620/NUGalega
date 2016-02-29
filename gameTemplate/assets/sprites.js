(function(window) {
blocks = function() {
	this.initialize();
}
blocks._SpriteSheet = new createjs.SpriteSheet({images: ["sprites.png"], frames: [[0,0,32,32,0,16,16],[32,0,32,32,0,16,16],[64,0,32,32,0,16,16],[96,0,32,32,0,16,16],[128,0,32,32,0,16,16]]});
var blocks_p = blocks.prototype = new createjs.Sprite();
blocks_p.Sprite_initialize = blocks_p.initialize;
blocks_p.initialize = function() {
	this.Sprite_initialize(blocks._SpriteSheet);
	this.paused = false;
}
window.blocks = blocks;
fullWalk = function() {
	this.initialize();
}
fullWalk._SpriteSheet = new createjs.SpriteSheet({images: ["sprites.png"], frames: [[160,0,19,49,0,10.05,48.6],[179,0,34,44,0,17.05,43.6],[213,0,22,46,0,9.05,45.6],[235,0,17,49,0,8.05,48.6],[0,49,25,49,0,10.05,48.6],[25,49,31,46,0,14.05,45.6],[56,49,33,44,0,16.05,43.6],[89,49,30,44,0,17.05,43.6],[119,49,28,46,0,17.05,45.6],[147,49,19,49,0,10.05,48.6],[166,49,23,49,0,14.05,48.6],[189,49,31,46,0,16.05,45.6],[220,49,34,44,0,17.05,43.6],[0,98,19,49,0,9.05,48.6],[19,98,34,44,0,17.05,43.6],[53,98,22,46,0,13.05,45.6],[75,98,17,49,0,9.05,48.6],[92,98,25,49,0,15.05,48.6],[117,98,31,46,0,17.05,45.6],[148,98,33,44,0,17.05,43.6],[181,98,30,44,0,13.05,43.6],[211,98,28,46,0,11.05,45.6],[0,147,19,49,0,9.05,48.6],[19,147,23,49,0,9.05,48.6],[42,147,31,46,0,15.05,45.6],[73,147,34,44,0,17.05,43.6]]});
var fullWalk_p = fullWalk.prototype = new createjs.Sprite();
fullWalk_p.Sprite_initialize = fullWalk_p.initialize;
fullWalk_p.initialize = function() {
	this.Sprite_initialize(fullWalk._SpriteSheet);
	this.paused = false;
}
window.fullWalk = fullWalk;
}(window));

