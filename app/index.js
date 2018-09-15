import clock from "clock";
import document from "document";
import { display } from "display";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today } from "user-activity";

console.log("App code started");

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const timeDsp = document.getElementById("time");
const stepDsp = document.getElementById("steps")

display.autoOff = false;
display.on = true;

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let steps = today.local.steps || 0;
  let todayDate = evt.date;
  console.log(today.local.steps || 0);
  let hours = todayDate.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;  
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(todayDate.getMinutes());
  timeDsp.text = `${hours}:${mins}`;
  stepDsp.text = (steps + "steps");
}
