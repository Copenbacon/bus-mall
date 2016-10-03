'use strict';
// Vars to track total clicks (var imgClicksTotal = 0), total number of times images have been displayed)(var imgDisplayCount = 0),
// Create object to assign to imgs with properties (this.name, this.path, this.clickTrack, this.displayCount, setAttribute(id, this.name);  )
// create local vars within object for click tracking (this.clickTrack), display count (this.displayCount), total clicks (this.totalClicks)
// Event handler for clicking on the image that increments each of the above (if totalClicks === 25, removeEventHandler)

var randomNum;
var imgClicksTotal = 0;
var imgDisplayCount = 0;
var divIdEl = document.getElementById('images');
var imagesArray = [];
var bagImg = new ImgDisplay('Bag', 'bag.jpg');
var bananaImg = new ImgDisplay('Banana', 'banana.jpg');
var bathroomImg = new ImgDisplay('Bathroom', 'bathroom.jpg');
var bootsImg = new ImgDisplay('Boots', 'boots.jpg');
var breakfastImg = new ImgDisplay('Breakfast', 'breakfast.jpg');
var bubblegumImg = new ImgDisplay('Bubblegum', 'bubblegum.jpg');
var chairImg = new ImgDisplay('Chair', 'chair.jpg');
var cthuluImg = new ImgDisplay('Cthulu', 'cthulhu.jpg');
var dogDuckImg = new ImgDisplay('Dog Duck', 'dog-duck.jpg');
var dragonImg = new ImgDisplay('Dragon', 'dragon.jpg');
var penImg = new ImgDisplay('Pen', 'pen.jpg');
var petSweepImg = new ImgDisplay('Pet Sweep', 'pet-sweep.jpg');
var scissorsImg = new ImgDisplay('Scissors', 'scissors.jpg');
var sharkImg = new ImgDisplay('Shark', 'shark.jpg');
var sweepImg = new ImgDisplay('Sweep', 'sweep.png');
var tauntaunImg = new ImgDisplay('Tauntaun', 'tauntaun.jpg');
var unicornImg = new ImgDisplay('Unicorn', 'unicorn.jpg');
var usbImg = new ImgDisplay('USB', 'usb.gif');
var waterCanImg = new ImgDisplay('Watercan', 'water-can.jpg');
var wineGlassImg = new ImgDisplay('Wine Glass', 'wine-glass.jpg');
var imgsDisplayingNow = [];

function ImgDisplay(imgName, path){
  //Properties
  this.imgName = imgName;
  this.path = 'imgs/' + path;
  this.imgID = path.replace('.','');
  this.clickTrack = 0;
  this.displayCount = 0;
  this.totalClicks = 0;

  //Methods
  this.render = function() {
    var imgIdEl = document.createElement('img');
    imgIdEl.setAttribute('id', this.imgID);
    imgIdEl.setAttribute('src', this.path);
    imgIdEl.setAttribute('width', '300px');
    divIdEl.appendChild(imgIdEl);
  };
  imagesArray.push(this);
};

var randomNumGen = function(){
  randomNum = Math.floor(Math.random() * (imagesArray.length));
  console.log(randomNum);
};

for(var i = 0; i < 3; i++){
  randomNumGen();
  for(var j = 0; j < imgsDisplayingNow.length; j++){
    while(imagesArray[randomNum] === imgsDisplayingNow[j]){
      console.log(imagesArray[randomNum]);
      console.log(imgsDisplayingNow[i]);
      imgsDisplayingNow.pop();
      j = j - 1;
      randomNumGen();
    };
  };
  imgsDisplayingNow.push(imagesArray[randomNum]);
  imagesArray[randomNum].render();
};
