'use strict'


const documentClasses = {
  timerElement: document.querySelector(`.jsTimerDisplay`),
  ao5Element: document.querySelector(`.jsAO5Paragraph`),
  ao12Element: document.querySelector(`.jsAO12Paragraph`),
};

const timer = {
  timerStartValue: 0,
  inspectionInterval: null,
  startInterval: null,
  timerMode: `idle`,
  timerValue: 0,
  interval: null,
  newestTime: 0,
};

const solves = {
  history: [1, 5, 3, 7, 9],
  bestSingle: `N/A`,
  bestAO5: `N/A`,
  bestAO12: `N/A`,
  currentAO5: `N/A`,
  currentAO12: `N/A`,
  last5Solves: [],
  last12Solves: [1, ],
  calculateAverage: function(array) {
    console.log(`history: `, solves.history);

    if (array.length < 5) {
      return `undefined`;
    }

    let largest = array[0];
    let smallest = array[0];
    let largestIndex = 0;
    let smallestIndex = 0;
  
    for (let i = 1; i < array.length; i++) {
      if (array[i] > largest) {
        largest = array[i];
        largestIndex = i;
      }
      if (array[i] < smallest) {
        smallest = array[i];
        smallestIndex = i;
      }
    }

    console.log(array, largest, smallest);
    
    array.filter(item => {return (item !== smallest) && (item !== largest)})

    console.log(array);

    let average = 0
    array.forEach(element => {
      average += element
    });
    console.log(`history: `, solves.history);
    return average / array.length;
  },
  solvesOrder: function() {
    // this.last5Solves = this.history.reverse();
    // console.log(this.last5Solves);
    console.log(`history: `, solves.history);
    this.last12Solves = this.history.reverse();
    this.last5Solves = this.history.splice(0, 5);
    console.log(`history: `, solves.history);
    console.log(this.last5Solves);
    this.last12Solves = this.last12Solves.splice(0, 12);
    this.currentAO5 = this.calculateAverage(this.last5Solves);
    console.log(this.currentAO5);
    this.currentAO12 = this.calculateAverage(this.last12Solves);
    documentClasses.ao5Element.textContent = `Average of 5: ${this.currentAO5}`;
    documentClasses.ao12Element.textContent = `Average of 12: ${this.currentAO12}`;
    console.log(this.last5Solves, this.last12Solves, this.currentAO5, this.currentAO12);
  }
};


const inspectionCountdown = function() {
  timer.timerValue++
  documentClasses.timerElement.textContent = ((timer.timerValue - 150) * - 1) / 10;
  // console.log(`inspection ${timer.timerValue}`);
  if (timer.timerValue >= 150) {
    clearInterval(timer.inspectionInterval);
    timer.timerValue = 0
  }
}


const timerGoing = function() {
  timer.interval = setInterval(() => {
    timer.timerValue++
    documentClasses.timerElement.textContent = timer.timerValue / 100;
  }, 10)
  // console.log(`bruh`);
}


document.addEventListener(`keyup`, value => {
  if (value.key === ` `) {
    if (timer.timerMode === `timerStarting`) {
      if (timer.timerStartValue >= 5) {
        clearTimeout(timer.inspectionInterval)
        timer.timerMode = `timerStarted`
        documentClasses.timerElement.textContent = 0;
        timerGoing()
        timer.timerStartValue = 0;
        documentClasses.timerElement.style = `color: white;`
      }
      else {
        timer.timerMode = `inspectionCountdown`;
        timer.timerStartValue = 0;
        documentClasses.timerElement.style = `color: darkred;`
      }
    }
    clearTimeout(timer.startInterval)
  }
})


document.addEventListener('keydown', function (value) {
  if (value.key === ` `) {
    if (timer.timerMode === `idle`) {
      timer.timerValue = 0
      documentClasses.timerElement.textContent = 15;
      timer.inspectionInterval = setInterval(function () {
      inspectionCountdown();
      }, 100)
      timer.timerMode = `inspectionCountdown`;
      documentClasses.timerElement.style = `color: red;`
    }
    else if (timer.timerMode === `inspectionCountdown`) {
      timer.startInterval = setInterval(() => {
        timer.timerStartValue++ 
        timer.timerStartValue >= 5 ? documentClasses.timerElement.style = `color: green;` : null
      }, 100)
      timer.timerMode = `timerStarting`
      documentClasses.timerElement.style = `color: yellow;`
    }
    else if (timer.timerMode === `timerStarted`) {
      clearInterval(timer.interval);
      timer.newestTime = timer.timerValue / 100
      timer.timerMode = `idle`;
      solves.history.push(timer.newestTime)
      solves.solvesOrder()
      console.log(solves.history);
    }
    
  }

})


