'use strict';
console.log('app.js is connected');

var imageElements = document.getElementsByTagName('img');

var bussMallIndex1 = 0;
var bussMallIndex2 = 1;
var bussMallIndex3 = 2;
var rounds = 25;
var allBussMallItems = [];

function MallItems(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.timesShown = 0;
  allBussMallItems.push(this);
}

function getBussMallArray(nameOfThePropertyIWant){
  var answer = [];
  for(var j = 0; j < allBussMallItems.length; j++){
    answer[j] = allBussMallItems[j][nameOfThePropertyIWant];
  }
  console.log(answer);
  return answer;
}

// BussMall objects
new MallItems('Bag', 'images/bag.jpg');
new MallItems('Banana', 'images/banana.jpg');
new MallItems('Bathroom', 'images/bathroom.jpg');
new MallItems('Boots', 'images/boots.jpg');
new MallItems('Breakfast', 'images/breakfast.jpg');
new MallItems('Bubblegum', 'images/bubblegum.jpg');
new MallItems('Chair', 'images/chair.jpg');
new MallItems('Cthulhu', 'images/cthulhu.jpg');
new MallItems('Dog Duck', 'images/dog-duck.jpg');
new MallItems('Dragon', 'images/dragon.jpg');
new MallItems('Pen', 'images/pen.jpg');
new MallItems('Pet sweep', 'images/pet-sweep.jpg');
new MallItems('Scissors', 'images/scissors.jpg');
new MallItems('Shark', 'images/shark.jpg');
new MallItems('Sweep', 'images/sweep.png');
new MallItems('Tauntaun', 'images/tauntaun.jpg');
new MallItems('Unicorn', 'images/unicorn.jpg');
new MallItems('USB', 'images/usb.gif');
new MallItems('Water can', 'images/water-can.jpg');
new MallItems('Wine glass', 'images/wine-glass.jpg');

var totalClicks = 0;
function imageWasClicked(event){
  totalClicks++;
  console.log(totalClicks);
  if(event.srcElement.id === '1'){
    allBussMallItems[bussMallIndex1].timesClicked++;
  }else if(event.srcElement.id === '2'){
    allBussMallItems[bussMallIndex2].timesClicked++;
  }else if(event.srcElement.id === '3'){
    allBussMallItems[bussMallIndex3].timesClicked++;
  }


  var nextBussMallIndex1 = Math.floor(Math.random() * allBussMallItems.length);
  while((nextBussMallIndex1 === bussMallIndex1) || (nextBussMallIndex2 === nextBussMallIndex1)){
    nextBussMallIndex1 = Math.floor(Math.random() * allBussMallItems.length);
  }

  var nextBussMallIndex2 = Math.floor(Math.random() * allBussMallItems.length);
  while ((nextBussMallIndex2 === bussMallIndex2) || (nextBussMallIndex3 === nextBussMallIndex2)){
    nextBussMallIndex2 = Math.floor(Math.random() * allBussMallItems.length);
  }

  var nextBussMallIndex3 = Math.floor(Math.random() * allBussMallItems.length);
  while((nextBussMallIndex3 === bussMallIndex3) || (nextBussMallIndex3 === nextBussMallIndex1)){
    nextBussMallIndex3 = Math.floor(Math.random() * allBussMallItems.length);
  }

  bussMallIndex1 = nextBussMallIndex1;
  bussMallIndex2 = nextBussMallIndex2;
  bussMallIndex3 = nextBussMallIndex3;

  imageElements[0].src = allBussMallItems[bussMallIndex1].imageUrl;
  allBussMallItems[bussMallIndex1].timesShown++;
  imageElements[1].src = allBussMallItems[bussMallIndex2].imageUrl;
  allBussMallItems[bussMallIndex2].timesShown++;
  imageElements[2].src = allBussMallItems[bussMallIndex3].imageUrl;
  allBussMallItems[bussMallIndex3].timesShown++;

  if(totalClicks >= rounds){
    console.log('im running now');
    var resultsList = document.getElementById('bussMall-results');
    for(var i =0; i < allBussMallItems.length; i++){
      var bMallItem = document.createElement('li');
      bMallItem.textContent = `${allBussMallItems[i].name} was clicked on ${allBussMallItems[i].timesClicked} times and was shown ${allBussMallItems[i].timesShown} times.`;
      resultsList.appendChild(bMallItem);

      var percentageListItem = document.createElement('li');
      if(allBussMallItems[i].timesClicked === 0){
        // var math = `ZERO clicks and shown ${allBussMallItems[i].timesShown} times.`;
        percentageListItem.textContent = `ZERO clicks and shown ${allBussMallItems[i].timesShown} times.`;
      } else {
        console.log(allBussMallItems[i].timesShown);
        var math = Math.round(((allBussMallItems[i].timesClicked / allBussMallItems[i].timesShown).toFixed(2) * 100)) + '%';
        percentageListItem.textContent = `${allBussMallItems[i].name} percentage of clicked on VS times shown is ` + math;
      }

      resultsList.appendChild(percentageListItem);
    }
    for(i = 0; i < imageElements.length; i++){
      imageElements[i].removeEventListener('click', imageWasClicked);
    }
    runMyChartNow();
  }
}
function runMyChartNow() {

  var ctx = document.getElementById('myResultsChart').getContext('2d');


  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getBussMallArray('name'),
      datasets: [{
        label: 'Voting results',
        data: getBussMallArray('timesClicked'),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(0, 2, 97,  0.2)',
          'rgba(232, 220, 89, 0.2)',
          'rgba(89, 218, 232, 0.2)',
          'rgba(89, 232, 161, 0.2)',
          'rgba(255, 66, 66, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(65, 0, 97, 0.2)',
          'rgba(45, 97, 0, 0.2)',
          'rgba(0, 97, 82, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(97, 0, 0, 0.2)',
          'rgba(255, 101, 5, 0.2)',
          'rgba(255, 5, 193, 0.2)',
          'rgba(97, 76, 0, 0.2)',
          'rgba(5, 255, 93 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the clicked item');
  imageElements[i].addEventListener('click', imageWasClicked);
}






