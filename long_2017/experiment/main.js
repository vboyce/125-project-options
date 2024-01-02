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

function make_stim_pairs(big, small, group){
    let stims=[]
    for (let i= 0; i < big.length; i++) {
        stims.push({type:"congruent", group: group, ask: "big", correct: "c",  left: "Big-visBig/"+big[i], right: "Small-visSmall/"+small[i]})
stims.push({type:"congruent", group: group, ask: "small", correct: "m",  left: "Big-visBig/"+big[i], right: "Small-visSmall/"+small[i]})
stims.push({type:"congruent", group: group, ask: "big", correct: "m",  left: "Small-visSmall/"+small[i], right: "Big-visBig/"+big[i]})
stims.push({type:"congruent", group: group, ask: "small", correct: "c", left: "Small-visSmall/"+small[i], right: "Big-visBig/"+big[i]})
stims.push({type:"incongruent", group: group, ask: "big", correct: "m",  left: "Big-visSmall/"+big[i], right: "Small-visBig/"+small[i]})
stims.push({type:"incongruent", group: group, ask: "small", correct: "c",  left: "Big-visSmall/"+big[i], right: "Small-visBig/"+small[i]})
stims.push({type:"incongruent", group: group, ask: "big", correct: "c",  left: "Small-visBig/"+small[i], right: "Big-visSmall/"+big[i]})
stims.push({type:"incongruent", group: group, ask: "small", correct: "m", left: "Small-visBig/"+small[i], right: "Big-visSmall/"+big[i]})
}
return (stims)
}

function get_images_to_preload(){
    let images=[]
    for (let i= 0; i < 30; i++) {
        images.push("Small-visSmall/"+SMALL_STIM[i])
        images.push("Small-visBig/"+SMALL_STIM[i])
        images.push("Big-visBig/"+BIG_STIM[i])
        images.push("Big-visSmall/"+BIG_STIM[i])
    }
    return(images)
}


let preset_stims = make_stim_pairs(BIG_STIM.slice(1,5), SMALL_STIM.slice(1,5), "preset")
shuffle(BIG_STIM)
shuffle(SMALL_STIM)
let random_stims=make_stim_pairs(BIG_STIM.slice(1,5),SMALL_STIM.slice(1,5), "random")

let all_stims =preset_stims.concat(random_stims)

let big_1_stim=all_stims.filter(item => {return (item.ask=="big"&&item.group=="preset")})
let big_2_stim=all_stims.filter(item => {return (item.ask=="big"&&item.group=="random")})
let small_1_stim=all_stims.filter(item => {return (item.ask=="small"&&item.group=="preset")})
let small_2_stim=all_stims.filter(item => {return (item.ask=="small"&&item.group=="random")})

shuffle(small_2_stim)
shuffle(big_2_stim)
let small_practice_stim=small_2_stim.slice(0,5)
let big_practice_stim=big_2_stim.slice(0,5)


console.log(all_stims)

let all_images=get_images_to_preload()

let orders=["small_first", "big_first"]
shuffle(orders)
let order=orders[1]


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
    type : jsPsychHtmlKeyboardResponse,
    stimulus : jsPsych.timelineVariable('text'),
    choices : [" "],
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


let send_data ={
    type: jsPsychCallFunction,
    async: true,
    func: function(done){
            proliferate.submit({"trials": jsPsych.data.get().values()});
          }
    }

let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 700
}

let trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        var html = `<div> <div style="width=50%, float:left, padding=10px">
            <img src="${jsPsych.timelineVariable('left')}"style="width:100%"></div>
            <div style="width=50%,float:left, padding=10px"><img src="${jsPsych.timelineVariable('right')}"style="width:100%">
            </div> </div>`
            var html2 = `
            <img src="${jsPsych.timelineVariable('left')}" style="margin-right: 50px"> 
            <img src="${jsPsych.timelineVariable('right')}" style="margin-left: 50px">
            `
        return html2;
    },
    choices: ["c", "m"],
    on_finish: function(data){
        if(jsPsych.pluginAPI.compareKeys(data.response, jsPsych.timelineVariable('correct'))){
            data.correct = true;
          } else {
            data.correct = false; 
          }
}
}

let feedback ={
    type: jsPsychHtmlKeyboardResponse,
    choices: [],
    stimulus: function(){
        var last_trial_correct= jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct){ return ("")}
        else {return (`<div style="font-size:60px; color:#FF0000"><p>Incorrect!</p></div>`)}
    },
    trial_duration: function(){
        var last_trial_correct= jsPsych.data.get().last(1).values()[0].correct;
        if (last_trial_correct){return(900)}
        else {return (5000)}
    }

}

let preload={
    type: jsPsychPreload,
    images: all_images,

}
function getTimeline() {
    //////////////// timeline /////////////////////////////////
    let timeline = [];

    timeline.push(welcome_screen);
    timeline.push(preload)

    let big_practice={
        timeline: [fixation, trial, feedback],
        timeline_variables: big_practice_stim,
        randomize_order: true

    }
    let small_practice={
        timeline: [fixation, trial, feedback],
        timeline_variables: small_practice_stim,
        randomize_order: true

    }

    let big_1={
        timeline: [fixation, trial, feedback],
        timeline_variables: big_1_stim,
        randomize_order:true

    }
    let big_2={
        timeline: [fixation, trial, feedback],
        timeline_variables: big_2_stim,
        randomize_order:true

    }
    let small_1={
        timeline: [fixation, trial, feedback],
        timeline_variables: small_1_stim,
        randomize_order:true

    }
    let small_2={
        timeline: [fixation, trial, feedback],
        timeline_variables: small_2_stim,
        randomize_order:true

    }
    let big_practice_instructions={timeline:[instructions_screen],timeline_variables:[{text:BIG_PRACTICE}]}
    let small_practice_instructions={timeline:[instructions_screen],timeline_variables:[{text:SMALL_PRACTICE}]}
    let pre_1_instructions={timeline:[instructions_screen],timeline_variables:[{text:pre_1}]}
    let pre_2_instructions={timeline:[instructions_screen],timeline_variables:[{text:pre_2}]}
    let pre_3_instructions={timeline:[instructions_screen],timeline_variables:[{text:pre_3}]}
    let pre_4_instructions={timeline:[instructions_screen],timeline_variables:[{text:pre_4}]}

    let small_1_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_1+SMALL_INSTRUCTION}]}
    let small_2_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_2+SMALL_INSTRUCTION}]}
    let small_3_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_3+SMALL_INSTRUCTION}]}
    let small_4_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_4+SMALL_INSTRUCTION}]}
    let big_1_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_1+BIG_INSTRUCTION}]}
    let big_2_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_2+BIG_INSTRUCTION}]}
    let big_3_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_3+BIG_INSTRUCTION}]}
    let big_4_instructions={timeline:[instructions_screen],timeline_variables:[{text:BLOCK_4+BIG_INSTRUCTION}]}



    if(order=="small_first"){
        timeline.push(small_practice_instructions)
        timeline.push(small_practice)
        timeline.push(big_practice_instructions)
        timeline.push(big_practice)
        timeline.push(pre_1_instructions)
        timeline.push(small_1_instructions)
        timeline.push(small_1)
        timeline.push(pre_2_instructions)
        timeline.push(big_2_instructions)
        timeline.push(big_1)
        timeline.push(pre_3_instructions)
        timeline.push(small_3_instructions)
        timeline.push(small_2)
        timeline.push(pre_4_instructions)
        timeline.push(big_4_instructions)
        timeline.push(big_2)
    }
    if(order=="big_first"){
        timeline.push(big_practice_instructions)
        timeline.push(big_practice)
        timeline.push(small_practice_instructions)
        timeline.push(small_practice)
        timeline.push(pre_1_instructions)
        timeline.push(big_1_instructions)
        timeline.push(big_1)
        timeline.push(pre_2_instructions)
        timeline.push(small_2_instructions)
        timeline.push(small_1)
        timeline.push(pre_3_instructions)
        timeline.push(big_3_instructions)
        timeline.push(big_2)
        timeline.push(pre_4_instructions)
        timeline.push(small_4_instructions)
        timeline.push(small_2)
    }
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

