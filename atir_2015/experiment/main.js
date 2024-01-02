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


let welcome_screen = {
    type : jsPsychHtmlButtonResponse,
    stimulus : WELCOME_INSTRUCTION,
    choices : ["Continue"],
    response_ends_trial : true,
    on_finish: function (data) {
        data.rt = Math.round(data.rt);
    }
};


let finance_instructions = {
    type : jsPsychHtmlButtonResponse,
    stimulus : FINANCE_TERM_INSTRUCTION,
    choices : ["Continue"],
    response_ends_trial : true,
    on_finish: function (data) {
        data.rt = Math.round(data.rt);
    }
};

let end_experiment = {
    type : jsPsychHtmlKeyboardResponse,
    stimulus : POST_TEST_INSTRUCTION,
    choices : []
}

let display_scenario ={
    type : jsPsychHtmlButtonResponse,
    stimulus : jsPsych.timelineVariable('text'),
    choices : ["Continue"],
    response_ends_trial : true,
    on_finish: function (data) {
        data.rt = Math.round(data.rt);
    }
};

let personal_finance = {
    type: jsPsychHtmlSliderResponse,
    stimulus: jsPsych.timelineVariable('text'),
    labels: jsPsych.timelineVariable('options'),
    min: 1,
    max: 7,
    slider_start: 4, 
    require_movement: true,
    slider_width: 400
}

let finance_terms = {
    type: jsPsychHtmlSliderResponse,
    stimulus: jsPsych.timelineVariable('text'),
    labels: ["1 <br> (never heard of it)", "2", "3", "4", "5", "6", "7 <br> (very knowledgeable)"],
    require_movement: true,
    min: 1,
    max: 7,
    slider_start: 4, 
    slider_width: 600
}

let FLquiz={
    type: jsPsychSurveyMultiChoice,
    preamble: FL_INSTRUCT,
    questions: [
        {prompt: "Suppose you have $100 in a savings account earning 2 percent interest a year. After five years, how much would you have?",
        name:"savingsAccount",
        options:["More than $102", "Exactly $102", "Less than $102", "Don't know"],
    required:true},
        {prompt: "Imagine that the interest rate on your savings account is 1 percent a year and inflation is 2 percent a year. After one year, would the money in the account buy more than it does today, exactly the same or less than today?",
        name:"inflation",
        options:["More", "Same", "Less", "Don't know"],
    required:true},
        {prompt: "If interest rates rise, what will typically happen to bond prices? Rise, fall, stay the same, or is there no relationship.",
        name:"interest",
        options:["Rise", "Fall", "Stay the same", "Don't know"],
    required:true},
        {prompt: "True or false: A 15-year mortgage typically requires higher monthly payments than a 30-year mortgage but the total interest over the life of the loan will be less.",
        name:"mortgage",
        options:["True", "False", "Don't know"],
    required:true},
        {prompt: "True or false: Buying a single company's stock usually provides a safer return than a stock mutual fund.",
        name:"stocks",
        options:["True", "False", "Don't know"],
    required:true}]
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
    let options=["terms_first", "terms_second"]
    shuffle(options)
    timeline.push(welcome_screen);

    let finance_terms_timeline={
        timeline: [finance_terms], 
        timeline_variables: FINANCE_TERMS}
    
    let personal_finance_timeline={
        timeline: [personal_finance],
        timeline_variables: PERSONAL_FINANCE}
    
    if (options[1]=="terms_first"){
        timeline.push(finance_instructions)
        timeline.push(finance_terms_timeline)
        timeline.push(personal_finance_timeline)
    } 
    else{
        timeline.push(personal_finance_timeline)
        timeline.push(finance_instructions)
        timeline.push(finance_terms_timeline)
    }
    timeline.push(FLquiz)

    timeline.push(send_data);
    timeline.push(end_experiment);
    return timeline;
}


function main() {
    // Make sure you have updated your key in globals.js

    let timeline=getTimeline()
    jsPsych.run(timeline);

}

window.addEventListener('load', main);

