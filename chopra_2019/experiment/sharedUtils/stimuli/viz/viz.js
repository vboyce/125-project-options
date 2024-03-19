function render_creatures(creatures, table_width, test) {
    var rows = Math.ceil(creatures.length / table_width);
    var cols = table_width;
  
    var table = "<table>";
    var ind = 0;
    for(var i=0; i <rows; i++) {
      table += "<tr>";
      for(var j=0; j<cols; j++) {
        table += "<td>";
        if (ind >= creatures.length) break;
          table += "<table class ='cell' id='cell_" + ind + "'\">";
          table += "<td class='cell_entry'>";
          table += "<svg id='creature_" + ind +
            "' style='max-width:150px;max-height:150px\'></svg></td>";       
        table += "<tr>";
        table += "</table>";
        table += "</td>";
        ind += 1;
      }
      table += "</tr>"
    }
    table += "</table>";

    $("#creatures").append(table);
  
    for (var i = 0; i < creatures.length; i++) {
        // Create critter svgs
        var scale = 0.8;
        var stim = creatures[i];

        createCreature(stim, i, scale, test);
        var cell_id = "#cell_" + i;
        if (stim.belongs_to_concept) {
            if (test == true) {
                // $('#cell_' + i).addClass('class-member');
            } else {
                $(cell_id).css({"border":'2px dashed black'});
            }
        }             
    }
  }
  
  function createCreature(stim, i, scale, test){
    // Draw Critter
    var id = "creature_" + i;
    Ecosystem.draw(
      stim.creature, stim.props,
      id, scale
    );
  
    if (test == false) {
        if (stim.belongs_to_concept) {  
            label = "<div class='species-label' id='cell_" + i + "_label'> Kwep </div>";
          } else {
            label = "<div class='species-label' id='cell_" + i + "_label'> </div>";
          }
        $(label).insertAfter("#creature_" + i);
    }
  }

$( document ).ready(function() {
    var birds = [{"creature":"bird","props":{"col1":"#ff8c00","col2":"#FFFFFF","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"white","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#dda0dd","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"purple","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#ff8c00","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"white","body_color":"orange","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#FFFFFF","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"white","body_color":"white","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#dda0dd","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"orange","body_color":"purple","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":true},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#ff8c00","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"white","body_color":"orange","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#FFFFFF","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"white","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#FFFFFF","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"white","body_color":"white","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#FFFFFF","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"white","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#ff8c00","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"orange","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#dda0dd","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"purple","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#FFFFFF","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"white","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#FFFFFF","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"white","body_color":"white","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#ff8c00","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"orange","body_color":"orange","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":true},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#ff8c00","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"orange","body_color":"orange","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":true},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#ff8c00","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"orange","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#dda0dd","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"orange","body_color":"purple","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#ff8c00","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"white","body_color":"orange","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#dda0dd","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"purple","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#ff8c00","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"orange","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#ff8c00","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"orange","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#FFFFFF","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"orange","body_color":"white","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#dda0dd","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"white","body_color":"purple","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#dda0dd","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"white","body_color":"purple","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#ff8c00","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"orange","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#FFFFFF","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"white","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#FFFFFF","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"white","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#ff8c00","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"white","body_color":"orange","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#FFFFFF","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"white","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#ff8c00","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"orange","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#dda0dd","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"purple","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#FFFFFF","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"white","body_color":"white","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#dda0dd","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"purple","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#ff8c00","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"white","body_color":"orange","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#dda0dd","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"white","body_color":"purple","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#ff8c00","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"purple","body_color":"orange","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#dda0dd","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"purple","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#ff8c00","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"orange","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#dda0dd","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"white","body_color":"purple","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#ff8c00","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"white","body_color":"orange","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#FFFFFF","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"white","body_color":"white","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#dda0dd","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"purple","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#ff8c00","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"orange","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#FFFFFF","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"white","body_color":"white","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#ff8c00","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":true,"tar2":true},"description":{"crest_tail_color":"white","body_color":"orange","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"true","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#dda0dd","col2":"#FFFFFF","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":true,"tar2":false},"description":{"crest_tail_color":"purple","body_color":"white","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"true","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#FFFFFF","col2":"#dda0dd","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"white","body_color":"purple","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#ff8c00","col3":"#dda0dd","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"orange","body_color":"orange","bird_wing_color":"purple","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":false},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#dda0dd","col3":"#FFFFFF","prop1":0,"prop2":0,"tar1":false,"tar2":true},"description":{"crest_tail_color":"orange","body_color":"purple","bird_wing_color":"white","height":"standard","fatness":"standard","tail_present":"false","crest_present":"true"},"belongs_to_concept":true},{"creature":"bird","props":{"col1":"#ff8c00","col2":"#FFFFFF","col3":"#ff8c00","prop1":0,"prop2":0,"tar1":false,"tar2":false},"description":{"crest_tail_color":"orange","body_color":"white","bird_wing_color":"orange","height":"standard","fatness":"standard","tail_present":"false","crest_present":"false"},"belongs_to_concept":false}];
    
    render_creatures(birds, 5, true);

});