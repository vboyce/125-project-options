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

let send_data ={
    type: jsPsychCallFunction,
    async: true,
    func: function(done){
            proliferate.submit({"trials": jsPsych.data.get().values()});
          }
    }


// Assign randomly generated 5-digit IDs to participants
var subj_ID = jsPsych.randomization.randomID(5)
      
jsPsych.data.addProperties({
  subject: subj_ID
}) 

// Preload images
// Key to the image naming format: 'folder/IAPS image number + h = high intensity OR l = low intensity (+ [optional] t = training trial OR p = practice trial)'. 
var images = ['iaps/9921hp.jpg', 'iaps/9145lp.jpg', 'iaps/8231lp.jpg', 'iaps/7521lp.jpg', 'iaps/6940ht.jpg', 'iaps/3181hp.jpg', 'iaps/3022lt.jpg','iaps/3030ht.jpg', 'iaps/3051hp.jpg', 'iaps/2703hp.jpg', 'iaps/2457lt.jpg', 'iaps/2455ht.jpg', 'iaps/2205ht.jpg', 'iaps/2120lp.jpg', 'iaps/3068h.jpg', 'iaps/2278l.jpg', 'iaps/6836l.jpg', 'iaps/9470l.jpg', 'iaps/9102l.JPG', 'iaps/9181h.jpg', 'iaps/9252h.jpg', 'iaps/9410h.JPG', 'iaps/9420h.JPG', 'iaps/9440l.JPG', 'iaps/9120l.JPG', 'iaps/9160l.JPG', 'iaps/7360l.JPG', 'iaps/6831h.jpg', 'iaps/6010l.JPG', 'iaps/6190l.JPG', 'iaps/3530h.JPG', 'iaps/3261h.jpg', 'iaps/2800h.JPG', 'iaps/3140h.JPG', 'iaps/3150h.JPG', 'iaps/3180h.JPG', 'iaps/3230h.JPG', 'iaps/3000h.JPG', 'iaps/2490l.JPG', 'iaps/2700l.JPG', 'iaps/2691l.jpg', 'iaps/2053h.JPG', 'iaps/1301l.jpg', 'iaps/2312l.jpg'];

// INTRO AND TRAINING TRIALS:
let welcome_screen = {
  type : jsPsychHtmlButtonResponse,
  stimulus : WELCOME_INSTRUCTION,
  choices : ["Continue"],
  response_ends_trial : true,
  on_finish: function (data) {
      data.rt = Math.round(data.rt);
  }
};

var instructions_general = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>In this study, you will be trained to use two emotion regulation strategies. You will then practice using these strategies while viewing a series of images.</p><p><b>Please be aware that the images used in this study contain content that may be unpleasant or disturbing.</b></p><p>Your participation will take approximately 10 minutes. You will receive $2.00 as payment for your participation. <b>You must use a desktop or a laptop computer to complete this study. </b> By answering the following questions, you are participating in a study being performed by cognitive scientists in the Stanford Department of Psychology. If you have questions about this research, please contact us at <u>stanfordpsych251@gmail.com</u>. You must be at least 18 years old to participate. Your participation in this research is voluntary. You may decline to answer any or all of the following questions. You may decline further participation, at any time, without adverse consequences. Your anonymity is assured; the researchers who have requested your participation will not receive any personal information about you. </p><p>Press the spacebar to begin.</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var instructions_training = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>In this part of the study, you will view a series of pictures and try to change how you feel about each picture by changing the way you think about it. Some pictures might make you feel very negative, while other pictures might make you feel slightly negative or not negative at all. You will be able to choose between two ways or strategies that will help you feel less negative. The next section will explain both strategies and give you the opportunity to practice implementing them. It is important that you try to remember what you are supposed to do in each strategy.</p><p>Press the spacebar to continue.</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var instructions_reappraisal = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>The first strategy is called REAPPRAISAL. This means that you attend to the picture and try to change the meaning of it. That means you think of something to tell yourself about the picture that helps you feel less negative about it. For example, you could tell yourself something about the outcome of the picture, that whatever is going on will soon be resolved, or that help is on the way. You could also focus on a specific detail of the situation that may not be as bad as it first seemed. But we want you to stay focused on the picture and not think of random things that will make you feel better, but rather to change something about the picture that helps you to feel less negative about it. It is very important that when you reappraise you do not think that the picture is fake or a scene from a movie. Think of it as a real situation, and then change the meaning of it. <b>Once again, as soon as the picture is on the screen, keep focusing on the picture, but tell yourself something about it that makes you feel less negative; keep repeating it to yourself while the screen is up.</b></p><p>Press the spacebar to continue</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var cue_reappraisal = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>Now you are going to practice using reappraisal. Once the picture comes up on the screen, please immediately start focusing your thoughts with the goal of feeling less negative, <b>Focus on the picture but think of the meaning of the picture in a way that will help you feel less negative about it.</b></p><p>Press the spacebar to continue</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var reappraisal_training = {
  timeline: [
    {
      type: jsPsychSurveyText,
      preamble: `<img src=iaps/6940ht.jpg style="width:500px;"></img>`,
      questions: [
        {prompt: '<p><b>Reappraise:</b> look at the picture and think about it in a way that reduces its negative meaning.</p><p>In the box below, please describe how you used this strategy</p>', rows: 3}
        ]
    },
    {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<center><p>Just to give you more ideas, other people thought that they are fighting for their families, they are protecting their country, they stand together for an important goal, their families will be proud of them.</p><p><b>Remember, as soon as the picture is on the screen, keep focusing on the picture but tell yourself something about it that makes you feel less negative, until it disappears from the screen.</b></p><p>Press the spacebar to continue</p></center>',
        choices: ' ',
        response_ends_trial: true
      },
    
              {
      type: jsPsychSurveyText,
      preamble: `<img src=iaps/2457lt.jpg style="width:500px;"></img>`,
      questions: [
        {prompt: '<p><b>Reappraise:</b> look at the image and think about it in a way that reduces its negative meaning.</p><p>In the box below, please describe how you used this strategy</p>', rows: 3}
        ]
    }
    ]
}

      var instructions_distraction = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<center><p>The second strategy is called DISTRACTION. This means that you try your best to feel less negative about the picture by thinking of something that is completely unrelated to the picture. There are a few ways you can do this. First, you can think about geometric shapes. For instance, if you see a bloody knife, you can think of a big yellow triangle. Second, you can imagine yourself doing everyday tasks, such as taking a shower or making coffee in the morning. Third, you can imagine your neighborhood or other familiar streets. You could use any one of these ways to distract yourself, which you think will work best in making you feel less negative. You do not have to use the same method to distract all the time. <b>However, it is important that you keep your eyes on the picture and not avert your gaze. As soon as the picture is on the screen, start focusing all of your thoughts on something that is completely unrelated to the picture. Once you have come up with a way to feel less negative, keep repeating it to yourself while the screen is up.</b></p><p>Press the spacebar to continue</p></center>',
        choices: ' ',
        response_ends_trial: true
      }
      
var cue_distraction = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>Now you are going to practice using distraction. Once the picture comes up on the screen, please immediately start focusing and implementing that strategy.</p><p>Press the spacebar to continue</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var distraction_training = {
          timeline: [
    {
      type: jsPsychSurveyText,
      preamble: `<img src=iaps/2455ht.jpg style="width:500px;"></img>`,
      questions: [
        {prompt: '<p><b>Distract:</b> look at the image and think about something that is emotionally neutral.</p><p>In the box below, please describe how you used this strategy</p>', rows: 3}
        ]
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<center><p>Just to give you more ideas, other people thought of cars passing on a street they know, or about all the steps of making coffee, or about a red triangle. <b>Remember, the moment you see the picture on the screen, start focusing all your thoughts on the distracting object you chose.</b></p><p>Press the spacebar to continue</p></center>',
      choices: ' ',
      response_ends_trial: true
      },
    
              {
      type: jsPsychSurveyText,
      preamble: `<img src=iaps/3022lt.jpg style="width:500px;"></img>`,
      questions: [
        {prompt: '<p><b>Distract:</b> look at the image and think about something that is emotionally neutral.</p><p>In the box below, please describe how you used this strategy</p>', rows: 3}
        ]
    }
    ]
}

// PRACTICE TRIALS: 

var instructions_practice_1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>We would now like you to practice using the two strategies you just learned. First, you will see a fixation cross. Please just attend to it. Then, a picture will flash on the screen for a very brief period of time. Follow the instructions on the screen. The same picture that you saw briefly will then appear for an extended time. As soon as you see it, start implementing the strategy that is written under the picture. <b>Please look at the image for the entire time that it appears on the screen. After the time is up, the next image will appear automatically.</b></p><p>Press the spacebar to continue.</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var practice_1_reappraisal = {
  timeline: [
    {
      type: jsPsychImageKeyboardResponse,
      prompt: '<p>Press the spacebar to continue</p>',
      stimulus: jsPsych.timelineVariable('practice_1_reappraisal'),
      choices: ' ',
      stimulus_duration: 500,
      stimulus_height: 500,
      maintain_aspect_ratio: true
    },
    {
     type: jsPsychImageKeyboardResponse,
     prompt: '<p>Reappraise</p>', 
     stimulus: jsPsych.timelineVariable('practice_1_reappraisal'),
     trial_duration: 5000,
     stimulus_height: 500,
     maintain_aspect_ratio: true,
     response_ends_trial: false
    },
    {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000
    }
],
  
  timeline_variables: [
  { practice_1_reappraisal: 'iaps/2703hp.jpg'},
  { practice_1_reappraisal: 'iaps/2120lp.jpg'}
  ],
    randomize_order: true
}

  var practice_1_distraction = {
  timeline: [
    {
      type: jsPsychImageKeyboardResponse,
      prompt: '<p>Press the spacebar to continue</p>',
      stimulus: jsPsych.timelineVariable('practice_1_distraction'),
      choices: ' ',
      stimulus_duration: 500,
     stimulus_height: 500,
     maintain_aspect_ratio: true
    },
    {
     type: jsPsychImageKeyboardResponse,
     prompt: '<p>Distract</p>', 
     stimulus: jsPsych.timelineVariable('practice_1_distraction'),
     trial_duration: 5000,
     stimulus_height: 500,
     maintain_aspect_ratio: true,
     response_ends_trial: false
    },
    {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000
    }
  ],
  
  timeline_variables: [
  { practice_1_distraction: 'iaps/7521lp.jpg' },
  { practice_1_distraction: 'iaps/3051hp.jpg'}
  ],
    randomize_order: true
}

var instructions_practice_2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>In this task, we want you to <b>choose</b> between the two strategies that you just learned for each picture that you see. Like in the previous part of the study, you will see a fixation cross. Please just attend to it. Then, a picture will flash on the screen for a very brief period of time. You will then <b>select which regulation strategy to use</b> using buttons at the bottom of the screen. As soon as you select the strategy, the same picture that you saw briefly will then appear for an extended time. As soon as you see it, start implementing the strategy that you selected.</p><p>There are no right or wrong answers, so do not be concerned about keeping a balance between your choices. You can choose whatever strategies you want during the task. This is completely your choice. Consider both strategies and pick the one that you think will make you feel less negative. Make your choice and start controlling your emotions when you see the image appear again. <b>It is important that you keep your eyes on the picture and not avert your gaze.</b></p><p>Press the spacebar to continue</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var practice_2 = {
  timeline: [
    {
      type: jsPsychImageButtonResponse,
      prompt: '<p>View the image above and select one of the two regulation strategies to implement.</p>',
      stimulus: jsPsych.timelineVariable('practice_2'),
      choices: ['Reappraise', 'Distract'],
      stimulus_duration: 500,
      response_ends_trial: true,
      margin_vertical: '20px',
     stimulus_height: 500,
     maintain_aspect_ratio: true
    },
    {
     type: jsPsychImageKeyboardResponse,
     prompt: '<p>Implement selected strategy.</p>', 
     stimulus: jsPsych.timelineVariable('practice_2'),
     trial_duration: 5000,
     stimulus_height: 500,
     maintain_aspect_ratio: true,
     response_ends_trial: false
    },
    {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000
    }
  ],
  
  timeline_variables: [
  { practice_2: 'iaps/9921hp.jpg' },
  { practice_2: 'iaps/9145lp.jpg' },
  { practice_2: 'iaps/8231lp.jpg' },
  { practice_2: 'iaps/3181hp.jpg' }
  ],
    randomize_order: true
}

// MAIN EXPERIMENT: 

var instructions_experiment = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<center><p>You will now see a series of pictures and choose between the two strategies, exactly as you did in the previous task. Again, you will first see a fixation cross. Please just attend to it. Then, a picture will flash on the screen for a very brief period of time. You will then <b>select which regulation strategy to use</b> using buttons at the bottom of the screen. As soon as you select the strategy, the same picture that you saw briefly will then appear for an extended time. As soon as you see it, start implementing the strategy that you selected.</p><p>There are no right or wrong answers, so do not be concerned about keeping a balance between your choices. You can choose whatever strategies you want during the task. This is completely your choice. Consider both strategies and pick the one that you think will make you feel less negative. Make your choice and start controlling your emotions when you see the image appear again. <b>It is important that you keep your eyes on the picture and not avert your gaze.</b></p><p>Press the spacebar to continue.</p></center>',
  choices: ' ',
  response_ends_trial: true
}

var experiment = {
  timeline: [
    {
      type: jsPsychImageButtonResponse,
      prompt: '<p>View the image above and select one of the two regulation strategies to implement.</p>',
      stimulus: jsPsych.timelineVariable('iaps'),
      choices: ['Reappraise', 'Distract'],
      stimulus_duration: 500,
      response_ends_trial: true,
      margin_vertical: '20px',
     stimulus_height: 500,
     maintain_aspect_ratio: true
    },
    {
     type: jsPsychImageKeyboardResponse,
     prompt: '<p>Implement selected strategy</p>', 
     stimulus: jsPsych.timelineVariable('iaps'),
     trial_duration: 5000,
     stimulus_height: 500,
     maintain_aspect_ratio: true,
     response_ends_trial: false
    },
    {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000
    }
  ],
  timeline_variables: [
    { iaps:  'iaps/1301l.jpg'	},
    { iaps: 	'iaps/2053h.JPG'	},
    { iaps: 	'iaps/2278l.jpg'	},
    { iaps: 	'iaps/2312l.jpg'	},
    { iaps: 	'iaps/2490l.JPG'	},
    { iaps: 	'iaps/2691l.jpg'	},
    { iaps: 	'iaps/2700l.JPG'	},
    { iaps: 	'iaps/2800h.JPG'	},
    { iaps: 	'iaps/3000h.JPG'	},
    { iaps: 	'iaps/3068h.jpg'	},
    { iaps: 	'iaps/3140h.JPG'	},
    { iaps: 	'iaps/3150h.JPG'	},
    { iaps: 	'iaps/3180h.JPG'	},
    { iaps: 	'iaps/3230h.JPG'	},
    { iaps: 	'iaps/3261h.jpg'	},
    { iaps: 	'iaps/3530h.JPG'	},
    { iaps: 	'iaps/6010l.JPG'	},
    { iaps: 	'iaps/6190l.JPG'	},
    { iaps: 	'iaps/6831h.jpg'	},
    { iaps: 	'iaps/6836l.jpg'	},
    { iaps: 	'iaps/7360l.JPG'	},
    { iaps: 	'iaps/9102l.JPG'	},
    { iaps: 	'iaps/9120l.JPG'	},
    { iaps: 	'iaps/9160l.JPG'	},
    { iaps: 	'iaps/9181h.jpg'	},
    { iaps: 	'iaps/9252h.jpg'	},
    { iaps: 	'iaps/9410h.JPG'	},
    { iaps: 	'iaps/9420h.JPG'	},
    { iaps: 	'iaps/9440l.JPG'	},
    { iaps: 	'iaps/9470l.jpg'	}
  ],
    randomize_order: true
}

// ADDITIONAL PARTICIPANT INFO

var demographics = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: 'How old are you', name: 'Age'},
    {prompt: 'What is your gender', name: 'Gender'}
    ]
}
let end_experiment = {
    type : jsPsychHtmlButtonResponse,
    stimulus : POST_TEST_INSTRUCTION,
    choices : ["Continue"]
}


var preload = {
    type: jsPsychPreload,
    auto_preload: true
}
function getTimeline() {
    //////////////// timeline /////////////////////////////////
    let timeline =  [
        preload,
        welcome_screen,
        instructions_general, 
        instructions_training, 
        instructions_reappraisal,
        cue_reappraisal,
        reappraisal_training, 
        instructions_distraction,
        cue_distraction,
        distraction_training, 
        instructions_practice_1,
        practice_1_reappraisal,
        practice_1_distraction,
        instructions_practice_2,
        practice_2,
        instructions_experiment, 
        experiment,
        demographics];
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

