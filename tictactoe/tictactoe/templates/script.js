function fix_size(){
  
  var grid_size = Math.min($(window).height(), $(window).width());
  $(".container").css("width", 0.9*grid_size);
  $(".container").css("height", 0.9*grid_size);
}

function get_field_state(field) {
  var state
  state = 0
  if (field.is("[state]")) {
    state = Number(field.attr("state"))
  }
  return state
}
function get_field_states() {
  var field_states = {}
  $(".box").each( function(index) {
    state = get_field_state($(this))
    if (state !== 0) {
        field_states["f_"+index] = state
    }
  })
  return field_states
}


function add_mark(field) {
  var state = get_field_state(field)

  state = (state + 1) % 3
  field.attr("state", state)
  if (state === 0) {
    field.html("")
  } else if (state === 1) {
    field.html('<div class="mark_o"></div>')
  } else if (state === 2) {
    field.html('<div class="mark_x"></div><div class="mark_xx"></div>')
  }

  var field_states = get_field_states();

  $.getJSON("/next_move",
            field_states,
            function(ret) { console.log(ret)}
            )


}

$( document ).ready(function() {
  fix_size()
  $(".box").each( function(index) {
    $(this).click(function() {
      add_mark( $(this))
    })
  })
 
  
});

$( window ).resize(fix_size)