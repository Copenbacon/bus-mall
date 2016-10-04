'use strict';
// Vars to track total clicks (var imgClicksTotal = 0), total number of times images have been displayed)(var imgDisplayCount = 0),
// Create object to assign to imgs with properties (this.name, this.path, this.clickTrack, this.displayCount, setAttribute(id, this.name);  )
// create local vars within object for click tracking (this.clickTrack), display count (this.displayCount), total clicks (this.totalClicks)

var chartDrawn = false;
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
var mostRecentGame = [];
var imgIdEl;
var labelsArray = [];
var votesArray = [];
var chartResults;

function hideChart(){
  console.log(document.getElementById('resultsChart'));
  document.getElementById('resultsChart').hidden = true;
}


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
  };
  imagesArray.push(this);

};

var randomNumGen = function(){
  randomNum = Math.floor(Math.random() * (imagesArray.length));
  console.log(randomNum);
  return randomNum;
};

var makeThreeRandomNumbers = function() {
  imgsDisplayingNow.push(randomNumGen());
  imgsDisplayingNow.push(randomNumGen());

  while (imgsDisplayingNow[0] === imgsDisplayingNow[1]){
    imgsDisplayingNow[1] = randomNumGen();
  }

  imgsDisplayingNow.push(randomNumGen());

  while (imgsDisplayingNow[2] === imgsDisplayingNow[0]){
    imgsDisplayingNow[2] = randomNumGen();
  }

  while (imgsDisplayingNow[2] === imgsDisplayingNow[1]){
    imgsDisplayingNow[2] = randomNumGen();
  }
};

function handleResultsButton(event){
  event.preventDefault();
  console.log('button clicked');
  // var ulIDEl = document.createElement('ol');
  // ulIDEl.textContent = 'Results';
  // sectionIdEl.appendChild(ulIDEl);
  // for (var i = 0; i < imagesArray.length; i++) {
  //   var liIDEl = document.createElement('li');
  //   liIDEl.textContent = imagesArray[i].totalClicks + ' votes for the ' + imagesArray[i].imgName;
  //   ulIDEl.appendChild(liIDEl);
  // };
  drawResultsChart();
};

// Button Appears with this ****NEEDS WORK****
var checkClickTotal = function(){
  if (imgClicksTotal == 25){
    removeEventListener('click', handleImageClick);
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
  makeThreeRandomNumbers();
  console.log(mostRecentGame, 'is the prior array');
  console.log(imgsDisplayingNow, 'is the new array');


  while (imgsDisplayingNow[2] === mostRecentGame[2] || imgsDisplayingNow[0] === mostRecentGame[0] || imgsDisplayingNow [0] === mostRecentGame[1] || imgsDisplayingNow [0] === mostRecentGame[2] || imgsDisplayingNow [1] === mostRecentGame[0] || imgsDisplayingNow[2] === mostRecentGame[0] || imgsDisplayingNow[1] === mostRecentGame[1] || imgsDisplayingNow[1] === mostRecentGame[2] || imgsDisplayingNow [2] === mostRecentGame[1]) {
    console.log(mostRecentGame, 'Most Recent Game Duplicate Caught');
    console.log(imgsDisplayingNow, 'Images Dispalying Now Duplicate caught');
    imgsDisplayingNow = [];
    makeThreeRandomNumbers();
  }


  for(var i = 0; i < 3; i++){
    imagesArray[imgsDisplayingNow[i]].render();
    mostRecentGame = [];
  };

  mostRecentGame.push(imgsDisplayingNow[0]);
  mostRecentGame.push(imgsDisplayingNow[1]);
  mostRecentGame.push(imgsDisplayingNow[2]);
  console.log('Pic rendered');
  console.log('END OF LOOPS');
  imgDisplayCount += 1;
};

function handleImageClick(event){
  event.preventDefault();
  console.log(event);
  // sectionIdEl = event.target;
  if (!event.target.id || event.target.id === 'images'){
    console.log('Didn\'t click image');
    return;
  }

  console.log(event.target.id, 'is the new target');

  for (var i = 0; i < imagesArray.length; i++) {
    if(event.target.id === imagesArray[i].imgID){
      imagesArray[i].totalClicks += 1;
      break;
    }
  }

  imgClicksTotal += 1;
  console.log('gameRender');
  hideChart();
  gameRender();
  checkClickTotal();
  updateLabelsAndVotesArrays();
};

// Event listener for Images
gameRender();
addEventListener('click', handleImageClick);
hideChart();

function updateLabelsAndVotesArrays() {
  for (var i = 0; i < imagesArray.length; i++) {
    labelsArray[i] = imagesArray[i].imgName;
    votesArray[i] = imagesArray[i].totalClicks;
  }
}

var data = {
  labels: labelsArray,
  datasets: [
    {
      label: 'Results',
      data: votesArray,
      backgroundColor: 'rgb(244, 88, 1)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 1
    }
  ]
};

function drawResultsChart (){
  var canvas = document.getElementById('resultsChart').getContext('2d');
  chartResults = new Chart (canvas,{

    type: 'bar',
    data: data,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
);
  chartDrawn = true;
}
