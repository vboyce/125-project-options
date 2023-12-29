function add(a,b) {return a+b;}
function sum(arr) {return arr.reduce(add,0);}
function mean(arr) {return sum(arr)/arr.length;}
function sd(arr) {
  var mu = mean(arr);
  var squaredDiff = arr.map(function(x){return Math.pow((x-mu),2);});
  return Math.sqrt(sum(squaredDiff)/arr.length);
}



var personalFinanceQuestions = ["In general, how knowledgable would you say you are about personal finance?",
"How would you rate your general knowledge of personal finance compared to the average American?"];
var unshuffledFinanceTerms = ["pre-rated stocks", "fixed-rate deduction", "annualized credit", "tax bracket",
"fixed-rate mortgage", "home equity", "revolving credit", "vesting", "retirement", "stock options", 
"inflation", "private equity fund", "interest rate", "Roth IRA", "whole life insurance"];

var specials = ["pre-rated stocks", "fixed-rate deduction", "annualized credit"];

// var unshuffledFinanceTerms = ["cats"]

var nQs = unshuffledFinanceTerms.length + personalFinanceQuestions.length;
var personalFinanceFirst = Math.floor(Math.random()*2);


// For debugging
// nQs = 1;

var shuffledFinanceTerms = shuffle(unshuffledFinanceTerms);

var numTwoOrHigher = 0.0;
var numThreeOrHigher = 0.0;
var numFourOrHigher = 0.0;
var numFiveOrHigher = 0.0;
var numSixOrHigher = 0.0;
var numSevenOrHigher = 0.0;

var normalNumTwoOrHigher = 0.0;
var normalNumThreeOrHigher = 0.0;
var normalNumFourOrHigher = 0.0;
var normalNumFiveOrHigher = 0.0;
var normalNumSixOrHigher = 0.0;
var normalNumSevenOrHigher = 0.0;

var overclaimingScore = 0.0;
var financialKnowledgeClaimScore = 0.0;

var totalQs = 0;


function caps(a) {return a.substring(0,1).toUpperCase() + a.substring(1,a.length);}
function uniform(a, b) { return ( (Math.random()*(b-a))+a ); }
function showSlide(id) { $(".slide").hide(); $("#"+id).show(); }
function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
function be(singular) { if (singular) {return "is";} else {return "are";} }

$(document).ready(function() {
  $("#nQs").html(nQs);
  showSlide("consent");
  $("#mustaccept").hide();
});

var experiment = {
  data: {questions:[]},
  
  instructions: function() {
    if (turk.previewMode) {
      $("#instructions #mustaccept").show();
    } else {
      if (personalFinanceFirst) {
        experiment.pftrial(0);
      } else {
        showSlide("instructions");
        $("#begin").click(function() { experiment.termstrial(0); })
      }
    }
  },



  pftrial: function(qNumber) {
    $("#trialerror").hide();
    showSlide("trial");

    var startTime = Date.now();
    
    var personalFinanceQuestion = "N/A";

    personalFinanceQuestion = personalFinanceQuestions.shift();
    statement = personalFinanceQuestion;
    document.getElementById("miniInstructions").style.display = 'none';

    $("#statement").html(statement);
    $('.bar').css('width', ( 100*totalQs/(nQs+5) + "%"));
    $("#continue").click(function() {
      var responseRaw = $("#form").serialize();
      if (responseRaw.length < 8) {
        $("#trialerror").show();
      } else {
        $("#continue").unbind("click");
        $('input[name=rating]').attr('checked',false);
        var endTime = Date.now();
        var response = responseRaw.split("=")[1];

        intResponse = parseInt(response, 10);
        financialKnowledgeClaimScore += intResponse/2.0;

        var rt = endTime - startTime;
        experiment.data.questions.push({
          qNumber:totalQs,
          personalFinanceQuestion:personalFinanceQuestion,
          response:response,
          rt:rt});

        totalQs += 1;

        if (personalFinanceQuestions.length > 0) {
          experiment.pftrial(qNumber+1);
        } else {
          experiment.data["personalFinanceClaimScore"] = financialKnowledgeClaimScore;
          experiment.data["personalFinanceFirst"] = personalFinanceFirst;
          if(personalFinanceFirst) {
            showSlide("instructions");
            $("#begin").click(function() { experiment.termstrial(0); })
          } else {
            experiment.FLQuiz();
          }
        }
      }
    })
  },



  
  termstrial: function(qNumber) {
    var startTime = Date.now();
    $("#trialerror").hide();
    showSlide("trial");
    

    var financeTerm = "N/A";

    document.getElementById("miniInstructions").style.display = 'none';

    financeTerm = shuffledFinanceTerms.shift();
    statement = financeTerm;

    $("#statement").html(statement);
    $('.bar').css('width', ( 100*totalQs/(nQs+5) + "%"));
    $("#continue").click(function() {
      var responseRaw = $("#form").serialize();
      if (responseRaw.length < 8) {
        $("#trialerror").show();
      } else {
        $("#continue").unbind("click");
        $('input[name=rating]').attr('checked',false);
        var endTime = Date.now();
        var response = responseRaw.split("=")[1];

        if ($.inArray(financeTerm, specials) != -1) {
          // document.write(financeTerm);
          intResponse = parseInt(response, 10);
          if (intResponse > 1) {
            numTwoOrHigher += 1/3.0;
          }
          if (intResponse > 2) {
            numThreeOrHigher += 1/3.0;
          }
          if (intResponse > 3) {
            numFourOrHigher += 1/3.0;
          }
          if (intResponse > 4) {
            numFiveOrHigher += 1/3.0;
          }
          if (intResponse > 5) {
            numSixOrHigher += 1/3.0;
          }
          if (intResponse > 6) {
            numSevenOrHigher += 1/3.0;
          }
        } else if ($.inArray(financeTerm, unshuffledFinanceTerms) != -1) {
          intResponse = parseInt(response, 10);
          if (intResponse > 1) {
            normalNumTwoOrHigher += 1/12.0;
          }
          if (intResponse > 2) {
            normalNumThreeOrHigher += 1/12.0;
          }
          if (intResponse > 3) {
            normalNumFourOrHigher += 1/12.0;
          }
          if (intResponse > 4) {
            normalNumFiveOrHigher += 1/12.0;
          }
          if (intResponse > 5) {
            normalNumSixOrHigher += 1/12.0;
          }
          if (intResponse > 6) {
            normalNumSevenOrHigher += 1/12.0;
          }
        }

        var rt = endTime - startTime;
        experiment.data.questions.push({
          qNumber:totalQs,
          financeTerm:financeTerm,
          response:response,
          rt:rt});

        totalQs += 1;

        if (shuffledFinanceTerms.length > 0) {
          experiment.termstrial(qNumber+1);
        } else {
          overclaimingScore = numTwoOrHigher+numThreeOrHigher+numFourOrHigher+numFiveOrHigher+numSixOrHigher+numSevenOrHigher;
          overclaimingScore = overclaimingScore/6.0;
          normalItemScore = normalNumTwoOrHigher+normalNumThreeOrHigher+normalNumFourOrHigher+normalNumFiveOrHigher+normalNumSixOrHigher+normalNumSevenOrHigher;
          normalItemScore = normalItemScore/6.0;
          experiment.data["overclaimingScore"] = overclaimingScore;
          experiment.data["normalItemScore"] = normalItemScore;
          experiment.data["accuracy"] = normalItemScore - overclaimingScore;
          if(personalFinanceFirst) {
            experiment.FLQuiz();
            
          } else {
            experiment.pftrial(0);
          }
        }
      }
    })
  },

  FLQuiz: function() {
    //disable return key
    $(document).keypress( function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
    });
    //progress bar complete
    showSlide("FLQuiz");
    $("#FLQuizerror").hide();
    $("#FLformsubmit").click(function() {
      
      rawResponse = $("#FLform").serialize();
      if (rawResponse.length < 77) {
        $("#FLQuizerror").show();
      } else {
        // document.write(rawResponse);
        var score = 0;
        pieces = rawResponse.split("&");
        var q1 = pieces[0].split("=");
        var q1Question = q1[0];
        var q1Answer = q1[1];
        if (q1Answer == "More+than+102") {
          score = score + 1;
        }

        var q2 = pieces[1].split("=");
        var q2Question = q2[0];
        var q2Answer = q2[1];
        if (q2Answer == "Less") {
          score = score + 1;
        }

        var q3 = pieces[2].split("=");
        var q3Question = q3[0];
        var q3Answer = q3[1];
        if (q3Answer == "Fall") {
          score = score + 1;
        }

        var q4 = pieces[3].split("=");
        var q4Question = q4[0];
        var q4Answer = q4[1];
        if (q4Answer == "True") {
          score = score + 1;
        }

        var q5 = pieces[4].split("=");
        var q5Question = q5[0];
        var q5Answer = q5[1];
        if (q5Answer == "False") {
          score = score + 1;
        }

        experiment.data[q1Question] = q1Answer;
        experiment.data[q2Question] = q2Answer;
        experiment.data[q3Question] = q3Answer;
        experiment.data[q4Question] = q4Answer;
        experiment.data[q5Question] = q5Answer;
        experiment.data["FLQuizScore"] = score;

        experiment.questionaire();
        // setTimeout(function() { turk.submit(experiment.data) }, 1000);
      }
    });
  },
  
  questionaire: function() {
    //disable return key
    $(document).keypress( function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
    });
    //progress bar complete
    $('.bar').css('width', ( "100%"));
    showSlide("questionaire");
    $("#formsubmit").click(function() {
      rawResponse = $("#questionaireform").serialize();
      // document.write(rawResponse);
      pieces = rawResponse.split("&");
      var age = pieces[0].split("=")[1];
      var lang = pieces[1].split("=")[1];
      var gender = pieces[2].split("=")[1];
      var race = pieces[3].split("=")[1];
      var comments = pieces[4].split("=")[1];
      if (lang.length > 0) {
        experiment.data["language"] = lang;
        experiment.data["comments"] = comments;
        experiment.data["age"] = age;
        experiment.data["version"] = "feb6";
        experiment.data["gender"] = gender;
        experiment.data["race"] = race;
        showSlide("finished");
        setTimeout(function() { turk.submit(experiment.data) }, 8000);
      }
    });
  }
}
  
