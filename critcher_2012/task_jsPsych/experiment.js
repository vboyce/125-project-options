function showSlide(id) {
    $(".slide").hide();
    $("#"+id).show();
}

showSlide("instructions");

// Randomly return an element from an array. Useful for condition randomization.
Array.prototype.random = function() {
  return this[random(this.length)];
}

// ## The main event
var experiment = {
task: function(){
  showSlide("task");
  }
};