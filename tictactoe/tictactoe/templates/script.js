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
  //console.log(field_states)
  return field_states

}

function add_mark(field, state) {
  var cur_state = get_field_state(field)
  if (cur_state === 0) {
    field.attr("state", state)
    if (state === 1) {
        field.html('<div class="mark_o"></div>')
    }
    else if (state === 2){
        field.html('<div class="mark_x"></div><div class="mark_xx"></div>')
    }


  }
}




function check_win_and_mark(field_states, target) {
    var values_this_target = []
    for (field_name in field_states) {
        if (field_states[field_name] === target) {
            values_this_target.push(field_name)
        }
    }
    //012 U 036
    for (i = 0; i < 3; i++){
        var name_1 = "f_"+i*3
        var name_2 = "f_"+(i*3+1)
        var name_3 = "f_"+(i*3+2)
        if ($.inArray(name_1, values_this_target) !== -1 &&
            $.inArray(name_2, values_this_target) !== -1 &&
            $.inArray(name_3, values_this_target) !== -1)
        {
            console.log("win:"+name_1+name_2+name_3)
        }

        var name_1 = "f_"+i
        var name_2 = "f_"+(i+3)
        var name_3 = "f_"+(i+6)
        if ($.inArray(name_1, values_this_target) !== -1 &&
            $.inArray(name_2, values_this_target) !== -1 &&
            $.inArray(name_3, values_this_target) !== -1)
        {
            console.log("win:"+name_1+name_2+name_3)
        }


        if ($.inArray("f_0", values_this_target) !== -1 &&
            $.inArray("f_4", values_this_target) !== -1 &&
            $.inArray("f_8", values_this_target) !== -1)
        {
            console.log("win:\\")
        }


        if ($.inArray("f_2", values_this_target) !== -1 &&
            $.inArray("f_4", values_this_target) !== -1 &&
            $.inArray("f_6", values_this_target) !== -1)
        {
            console.log("win://")
        }

    }

    console.log(values_this_target)
}


function add_user_mark_and_send_to_server(field) {
  var state = get_field_state(field)
  if (state === 0) {
    add_mark(field, 2)
    var field_states = get_field_states();

    $.getJSON("/next_move",
            field_states,
            function(ret) {
                if (ret.result>=0) {
                    add_mark($(".box:eq("+ret.result+")"), 1)
                }
            })
  }


}

$( document ).ready(function() {
  fix_size()
  $(".box").each( function(index) {
    $(this).click(function() {
      add_user_mark_and_send_to_server( $(this))
    })
  })
 
  
});

$( window ).resize(fix_size)