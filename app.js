'use strict';
// Vars to track total clicks (var imgClicksTotal = 0), total number of times images have been displayed)(var imgDisplayCount = 0),
// Create object to assign to imgs with properties (this.name, this.path, this.clickTrack, this.displayCount, setAttribute(id, this.name);  )
// create local vars within object for click tracking (this.clickTrack), display count (this.displayCount), total clicks (this.totalClicks)
// Event handler for clicking on the image that increments each of the above (if totalClicks === 25, removeEventHandler)


var randomNum;
var imgClicksTotal = 0;
var imgDisplayCount = 0;
var sectionIdEl = document.getElementById('images');
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
var previousGames = [];
var imgIdEl;

function ImgDisplay(imgName, path){
  //Properties
  this.imgName = imgName;
  this.path = 'imgs/' + path;
  this.imgID = path.replace('.','');
  this.displayCount = 0;
  this.totalClicks = 0;

  //Methods
  this.render = function() {
    imgIdEl = document.createElement('img');
    imgIdEl.setAttribute('src', this.path);
    imgIdEl.setAttribute('width', '300px');
    imgIdEl.setAttribute('id', this.imgID);
    sectionIdEl.appendChild(imgIdEl);
    this.displayCount += 1;
    this.imgClickTrack = document.getElementById(this.imgID);
    this.imgClickTrack.addEventListener('click', handleImgClickTrack);
  };
  imagesArray.push(this);

  function handleImgClickTrack (event){
    event.preventDefault();
    this.totalClicks = this.totalClicks + 1;
  }
};

var randomNumGen = function(){
  randomNum = Math.floor(Math.random() * (imagesArray.length));
  console.log(randomNum);
};


function handleResultsButton(event){
  event.preventDefault();
  //List pictures clicked with total clicks, x votes for the imgName
}

// Button Appears with this ****NEEDS WORK****
var checkClickTotal = function(){
  if (imgClicksTotal == 25){
    imgClickOne.removeEventListener('click', handleImageClick);
    imgClickTwo.removeEventListener('click', handleImageClick);
    imgClickThree.removeEventListener('click', handleImageClick);
    sectionIdEl.textContent = null;
    var resultsButton = document.createElement('button');
    resultsButton.textContent = 'View My Results';
    resultsButton.setAttribute('id','results-button');
    sectionIdEl.appendChild(resultsButton);
    console.log('events removed and button listed')
    resultsButton.addEventListener('click', handleResultsButton);
  };
};

var gameRender = function(){
  sectionIdEl.textContent = null;
  imgsDisplayingNow = [];
  for(var i = 0; imgsDisplayingNow.length <= 3; i++){
    randomNumGen();
    console.log('randomNumGen lines 73');
    for(var j = 0; j < 3; j++){
      while(imgsDisplayingNow[j] === imagesArray[randomNum]){
        console.log('imgsDisplayingNow = imagesArray lines 76');
        randomNumGen();
        imgsDisplayingNow.splice(j,1);
        console.log(imagesArray[randomNum] + 'lines 78-9');
      };
    };

    if (previousGames.length >= 1){
      console.log('if loop ran');
      console.log('previousGamesLength >= 1 lines 84');
      for (var k = 0; k < 3; k++){
        while (imagesArray[randomNum] === previousGames[(previousGames.length - 1)][k]){
          console.log('checking against previous game');
          randomNumGen();
          imgsDisplayingNow.splice(k,1);
          console.log('randomNumGen line 90');
        };
      };
    };

    imgsDisplayingNow.push(imagesArray[randomNum]);

    console.log('Pic rendered');
  };

  for(var i = 0; i < 3; i++){
    imgsDisplayingNow[i].render();
  }

  previousGames.push(imgsDisplayingNow);
  console.log('END OF LOOPS');
  imgDisplayCount += 1;
  imgClickOne = document.getElementById(imgsDisplayingNow[0].imgID);
  imgClickTwo = document.getElementById(imgsDisplayingNow[1].imgID);
  imgClickThree = document.getElementById(imgsDisplayingNow[2].imgID);
};

function handleImageClick(event){
  event.preventDefault();
  gameRender();
  // var imgClickOne = document.getElementById(imgsDisplayingNow[0].imgID);
  // var imgClickTwo = document.getElementById(imgsDisplayingNow[1].imgID);
  // var imgClickThree = document.getElementById(imgsDisplayingNow[2].imgID);
  imgClickOne.addEventListener('click', handleImageClick);
  imgClickTwo.addEventListener('click', handleImageClick);
  imgClickThree.addEventListener('click', handleImageClick);
  imgClicksTotal += 1;
  console.log("working");
  checkClickTotal();
}


// Event listener for Images
gameRender();
var imgClickOne = document.getElementById(imgsDisplayingNow[0].imgID);
var imgClickTwo = document.getElementById(imgsDisplayingNow[1].imgID);
var imgClickThree = document.getElementById(imgsDisplayingNow[2].imgID);
imgClickOne.addEventListener('click', handleImageClick);
imgClickTwo.addEventListener('click', handleImageClick);
imgClickThree.addEventListener('click', handleImageClick);
