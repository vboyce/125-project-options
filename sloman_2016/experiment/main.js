//import {initJsPsych} from 'jspsych';
let jsPsych = initJsPsych({
    override_safe_mode: true
});
//TODO add a stimuli checker for length

// add a thing that does counterbalancing w/o lists
/* given a list of grouped types -- determine item numbers for each set
then randomize 1/2 of the items to be each type 
then take the lists and shuffle all together

*/
function shuffle(arr) {
    var i = arr.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random()*(i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }

function counterbalance(item_types, items){
    let select_items=[]
    for (let i = 0; i < item_types.length; i++) { // for each grouping
        let relevant = items.filter(item => {return (item_types[i].includes(item.item_type))}) // items of this grouping

        let relevant_ids=[];
        shuffle(relevant_ids)
        relevant.forEach(item => {
            if (!relevant_ids.includes(item.id)){relevant_ids.push(item.id)}});
            for (let j=0; j<item_types[i].length; j++){
            let item_type=item_types[i][j];
            let frac=relevant_ids.length/item_types[i].length;
            let start=Math.floor(j*frac);
            let end=Math.floor((j+1)*frac);
            for(let k=start; k<end; k++){
                let id = relevant_ids[k];
                relevant.forEach(item=>{
                    if(item.id==id & item.item_type==item_type){
                        select_items.push(item)
                    }});
            }
        }    
    }
    shuffle(select_items)
    return(select_items)
}


let ITEM_TYPES = [["cok", "non-cok"]];
let items = counterbalance(ITEM_TYPES, STIMULI)
console.log(items)
const KEY_CODE_SPACE = ' ';

let welcome_screen = {
    type : jsPsychHtmlButtonResponse,
    stimulus : WELCOME_INSTRUCTION,
    choices : ["Continue"],
    response_ends_trial : true,
    on_finish: function (data) {
        data.rt = Math.round(data.rt);
    }
};


let instructions_screen = {
    type : jsPsychHtmlButtonResponse,
    stimulus : PRE_TEST_INSTRUCTION,
    choices : ["Continue"],
    response_ends_trial : true,
    on_finish: function (data) {
        data.rt = Math.round(data.rt);
    }
};

let end_experiment = {
    type : jsPsychHtmlButtonResponse,
    stimulus : POST_TEST_INSTRUCTION,
    choices : ["Continue"]
}

let display_scenario ={
    type : jsPsychHtmlButtonResponse,
    stimulus : jsPsych.timelineVariable('text'),
    data: {item_type: jsPsych.timelineVariable('item_type'),id: jsPsych.timelineVariable('id')},
    choices : ["Continue"],
    response_ends_trial : true,
    on_finish: function (data) {
        data.rt = Math.round(data.rt);
    }
};

let question = {
    type: jsPsychHtmlSliderResponse,
    stimulus: jsPsych.timelineVariable('question'),
    data: {item_type: jsPsych.timelineVariable('item_type'),id: jsPsych.timelineVariable('id')},
    min: 1,
    max: 7,
    slider_start: 4,
    labels: ["(1) <br> Little to no understanding", "(2)", "(3)", "(4) <br> Moderate understanding", "(5)", "(6)", "(7) <br> Detailed and deep understanding"],
    require_movement: true,
    slider_width: 800
}

let send_data ={
    type: jsPsychCallFunction,
    async: true,
    func: function(done){
            proliferate.submit({"trials": jsPsych.data.get().values()});
          }
    }

function getTimeline() {
    //////////////// timeline /////////////////////////////////
    let timeline = [];

    timeline.push(welcome_screen);

    timeline.push(instructions_screen);
    
    let mini_timeline={
            timeline: [display_scenario, question],
            timeline_variables: items
    }
     
    timeline.push(mini_timeline);
    

    timeline.push(end_experiment);
    timeline.push(send_data);

    return timeline;
}


function main() {
    // Make sure you have updated your key in globals.js

    let timeline=getTimeline()
    jsPsych.run(timeline);

}

window.addEventListener('load', main);

