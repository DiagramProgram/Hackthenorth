import document from "document";
import clock from "clock";
import { HeartRateSensor } from "heart-rate";
import { me } from "appbit";

let dateDsp = document.getElementById("dateDsp");
let clockDsp = document.getElementById("clockDsp");
let stepDsp = document.getElementById("stepDsp");
let bpmDsp = document.getElementById("heartRateDsp");
let heart = document.getElementById("heart");

var hrm = new HeartRateSensor();
hrm.start()

let mainScreen = document.getElementById("screen1");
let statScreen = document.getElementById("screen2");
let splashScreen = document.getElementById("screen3");
let catchScreen = document.getElementById("screen4");
let aStatScreen = document.getElementById("screen5");
let collectionScreen = document.getElementById("screen6");

let screens = [mainScreen, statScreen, splashScreen, catchScreen, aStatScreen, collectionScreen];
let currentScreen = 0;

var d = new Date();
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let click2Release = false
let click2ReleaseB = false

screens[0].onmousedown = function(evt) {
  console.log("a");
}
screens[1].onmousedown = function(evt) {
  console.log("b");
}
screens[2].onmousedown = function(evt) {
  click2Release = true
  screens[currentScreen].style.display = "none";
  currentScreen = 0;
  screens[currentScreen].style.display = "inline";
}
screens[3].onmousedown = function(evt) {
  click2ReleaseB = true;
  screens[currentScreen].style.display = "none";
  currentScreen = 4;
  screens[currentScreen].style.display = "inline";
}
screens[4].onmousedown = function(evt) {
  click2ReleaseB = false
  console.log("a");
  screens[currentScreen].style.display = "none";
  currentScreen = 0;
  screens[currentScreen].style.display = "inline"
}



let speciesName = document.getElementById("speciesName"); // for name of species
let speciesPoints = document.getElementById("speciesPoints"); //label for name of species 
let speciesWeight = document.getElementById("speciesWeight");
let speciesNumber = document.getElementById("speciesNumber");
let speciesFact = document.getElementById("speciesFact");
let rarityMultiplier = 1.5; // should change on type of fish
//if () do 1x for clowfish 1.5 for jelly and 2 for turtle
let fishName = "Turtle";
let fishWeight = Math.floor((Math.random() * 250) + 150);
let fishPoints = Math.round(fishWeight * rarityMultiplier * 1.467898);
let animalCaptions = ["Clown Fish", "Jelly Fish", "Sword Fish", "Enjoys free food"];

speciesName.text = "Species Name: " + fishName;
speciesPoints.text = "Rarity Points: " + fishPoints;
speciesWeight.text = "Species Weight (lb): " + fishWeight;
speciesNumber.text = "Species Number: " + speciesNumber;
speciesFact.text = animalCaptions[3];


let rarityPoints = document.getElementById("rarityPoints"); // for name of species
let numCaught = document.getElementById("numCaught"); //label for name of species 
let numSpecies = document.getElementById("numSpecies");
let newestF = document.getElementById("newestF");
let rarityPointsF = fishPoints * 1.85;
let numCaughtF = 3;
let numSpeciesF = 3;
rarityPoints.text = "Rarity Points: " + rarityPointsF;
numCaught.text = "# of Friends made: " + numCaughtF;
numSpecies.text = "Species Caught: " + numSpeciesF + "/4";


document.onkeypress = function(e)
{
  e.preventDefault();
  switch(e.key)
  {
    case "up":
    console.log("upbtnhit")
    screens[currentScreen].style.display = "none";
    console.log(currentScreen);
    if(currentScreen > 0)
    {
      currentScreen = 0;
      screens[currentScreen].style.display = "inline";
    } else {
      currentScreen = 5;
      screens[currentScreen].style.display = "inline"
    }
    break;
    case "down":
    console.log("downbtnhit")
    screens[currentScreen].style.display = "none";
    if(currentScreen == 5){
      currentScreen = 0;
      screens[currentScreen].style.display = "inline";
    } else if (currentScreen == 0) {
      currentScreen = 1;
      screens[currentScreen].style.display = "inline";
    }
    break;
    case "back":
      if(currentScreen = 0)
        me.exit();
      if(currentScreen = 1)
        screens[currentScreen].style.display = "none";
        currentScreen = 0;
        screens[currentScreen].style.display = "inline";
      if(currentScreen = 2)
        screens[currentScreen].style.display = "none";
        currentScreen = 0;
        screens[currentScreen].style.display = "inline";
      if(currentScreen = 3)
        exit();
    break;
  }
}

let steps = 0;
let vsteps = 0;

let stepsTillNextFish = randInt(300)+1200;
let fishIteration = 0;
let iteration = 0;

dateDsp.text = months[d.getMonth()] + ", " + d.getDate();

function update()
{
  
  if (iteration % 2 == 0)
  {
    heart.text = "♥";
  } else {
    heart.text = "❤";
  }
  
  if (iteration % 3 == 0)
  {
	  //steps+=randInt(120); //CHANGE BEFORE PRESENTATION 50
    
    // Dev Cheat
    
    steps += hrm.heartRate
    vsteps = steps % (stepsTillNextFish + 100)
    stepDsp.text = (steps + " Steps");
  }
  
  if (iteration % 2 == 0 && currentScreen == 2 || click2Release == true)
  {
    screens[currentScreen].style.display = "none";
    currentScreen = 0;
    screens[currentScreen].style.display = "inline";
  }
  
  iteration++;
  
  bpmDsp.text = hrm.heartRate + " Bpm";
  
  if (stepsTillNextFish-100 < vsteps && vsteps < stepsTillNextFish+100 && click2ReleaseB == false)
  {
    
    screens[currentScreen].style.display = "none";
    currentScreen = 3;
    screens[currentScreen].style.display = "inline";
    
    click2Release = false;
    stepsTillNextFish =  randInt(300)+1200;
  }
  else
  {
      if (vsteps > (stepsTillNextFish-600) && vsteps < (stepsTillNextFish-500) && click2Release == false)
      {
        screens[currentScreen].style.display = "none";
        currentScreen = 2;
        screens[currentScreen].style.display = "inline";
    }
  }
}

setInterval(update, 1000)

clock.granularity = 'minutes'; // seconds, minutes, hours

clock.ontick = function(evt) {
  clockDsp.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
                      ("0" + evt.date.getMinutes()).slice(-2)
};
