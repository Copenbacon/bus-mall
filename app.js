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
var imgsDisplayingNow = [];
var mostRecentGame = [];
var imgIdEl;
var labelsArray = [];
var votesArray = [];
var chartResults;


if(localStorage.getItem('savedImages')){
  var loadImages = localStorage.getItem('savedImages');
  var newImageSources = JSON.parse(loadImages);
  console.log('newImageSources: ', newImageSources);
  for (var i = 0; i < newImageSources.length; i++) {
    var currentImage = newImageSources[i];
    new ImgDisplay(currentImage.imgName, currentImage.path, currentImage.displayCount, currentImage.totalClicks);
  }
} else {
  console.log('nothing found in localStorage');
  var bagImg = new ImgDisplay('Bag', 'imgs/bag.jpg');
  var bananaImg = new ImgDisplay('Banana', 'imgs/banana.jpg');
  var bathroomImg = new ImgDisplay('Bathroom', 'imgs/bathroom.jpg');
  var bootsImg = new ImgDisplay('Boots', 'imgs/boots.jpg');
  var breakfastImg = new ImgDisplay('Breakfast', 'imgs/breakfast.jpg');
  var bubblegumImg = new ImgDisplay('Bubblegum', 'imgs/bubblegum.jpg');
  var chairImg = new ImgDisplay('Chair', 'imgs/chair.jpg');
  var cthuluImg = new ImgDisplay('Cthulu', 'imgs/cthulhu.jpg');
  var dogDuckImg = new ImgDisplay('Dog Duck', 'imgs/dog-duck.jpg');
  var dragonImg = new ImgDisplay('Dragon', 'imgs/dragon.jpg');
  var penImg = new ImgDisplay('Pen', 'imgs/pen.jpg');
  var petSweepImg = new ImgDisplay('Pet Sweep', 'imgs/pet-sweep.jpg');
  var scissorsImg = new ImgDisplay('Scissors', 'imgs/scissors.jpg');
  var sharkImg = new ImgDisplay('Shark', 'imgs/shark.jpg');
  var sweepImg = new ImgDisplay('Sweep', 'imgs/sweep.png');
  var tauntaunImg = new ImgDisplay('Tauntaun', 'imgs/tauntaun.jpg');
  var unicornImg = new ImgDisplay('Unicorn', 'imgs/unicorn.jpg');
  var usbImg = new ImgDisplay('USB', 'imgs/usb.gif');
  var waterCanImg = new ImgDisplay('Watercan', 'imgs/water-can.jpg');
  var wineGlassImg = new ImgDisplay('Wine Glass', 'imgs/wine-glass.jpg');
}
console.log('imagesArray: \n', imagesArray);

function hideChart(){
  console.log(document.getElementById('resultsChart'));
  document.getElementById('resultsChart').hidden = true;
}


function ImgDisplay(imgName, path, displayCount, totalClicks){
  //Properties
  this.imgName = imgName;
  this.path = path;
  this.imgID = imgName.replace('','');
  this.displayCount = displayCount || 0;
  this.totalClicks = totalClicks || 0;


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

var numOne = 0;
var numTwo = 0;
var percentageOfClicks = 0;

function handleResultsButton(event){
  event.preventDefault();
  saveGame();
  console.log('button clicked');
  var ulIDEl = document.createElement('ol');
  ulIDEl.textContent = 'Results';
  sectionIdEl.appendChild(ulIDEl);
  for (var i = 0; i < imagesArray.length; i++) {
    var liIDEl = document.createElement('li');
    numOne = imagesArray[i].totalClicks;
    numTwo = imagesArray[i].displayCount;
    percentageOfClicks = parseFloat(numOne / numTwo) * 100;
    var p = percentageOfClicks.toFixed(2);
    console.log(percentageOfClicks, 'percentage of clicks');
    console.log(imagesArray[i].totalClicks);
    console.log(imagesArray[i].displayCount);
    console.log(numOne);
    console.log(numTwo);
    liIDEl.textContent = imagesArray[i].totalClicks + ' votes for the ' + imagesArray[i].imgName + ' and it was displayed ' + imagesArray[i].displayCount + ' total times, resulting in a ' + p + '% efficiency.';
    ulIDEl.appendChild(liIDEl);
  };
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
    console.log('events removed and button listed');
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

Chart.defaults.global.defaultFontColor = '#FFF';

function drawResultsChart (){
  var canvas = document.getElementById('resultsChart').getContext('2d');
  chartResults = new Chart (canvas,{

    type: 'bar',
    data: data,
    options: {
      responsive: true
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


//
// } else {
//   saveGame();
// };

function saveGame(){
  var imagesStringified = JSON.stringify(imagesArray);
  localStorage.setItem('savedImages', imagesStringified);
};
