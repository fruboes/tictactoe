var move_possible = true;

function fix_size(){
  
  var grid_size = Math.min($(window).height()*0.8, $(window).width());
  $(".container").css("width", 0.9*grid_size);
  $(".container").css("height", 0.9*grid_size);
}

function get_field_state(field) {
  var state=0;
  if (field.is("[state]")) {
    state = Number(field.attr("state"));
  }
  return state;
}

function get_field_states() {
  var field_states = {};
  $(".box").each( function(index) {
    state = get_field_state($(this));
    if (state !== 0) {
        field_states["f_"+index] = state;
    }
  });
  return field_states;
}


function add_mark(field, state) {
  var cur_state = get_field_state(field);
  if (cur_state === 0) {
    field.attr("state", state);
    if (state === 1) {
        field.html('<div class="mark_o"></div>');
    }
    else if (state === 2){
        field.html('<div class="mark_x"></div><div class="mark_xx"></div>');
    }
    check_win_and_mark(get_field_states(), state);

  }
}


function check_fields(f1, f2, f3, values_this_target, target) {
    var name_1 = "f_"+f1;
    var name_2 = "f_"+f2;
    var name_3 = "f_"+f3;
    var css_target;

    if ($.inArray(name_1, values_this_target) !== -1 &&
        $.inArray(name_2, values_this_target) !== -1 &&
        $.inArray(name_3, values_this_target) !== -1)
    {
        if (target === 2) {
            css_target = "background-color";
        } else {
            css_target = "border-color";
        }
        $(".box:eq("+f1+")").children().css(css_target, "red");
        $(".box:eq("+f2+")").children().css(css_target, "red");
        $(".box:eq("+f3+")").children().css(css_target, "red");
        move_possible = false;
        return true;
    }
    return false;
}


function check_win_and_mark(field_states, target) {
    var values_this_target = [];
    for (var field_name in field_states) {
        if (field_states[field_name] === target) {
            values_this_target.push(field_name);
        }
    }
    for (i = 0; i < 3; i++){
        if (check_fields(i*3, i*3+1, i*3+2, values_this_target, target) ||
            check_fields(i, i+3, i+6, values_this_target, target))
        {
            return;
        }
    }
    if (check_fields(0, 4, 8, values_this_target, target) ||
       check_fields(2, 4, 6, values_this_target, target)) {
       return;
    }
}


function add_user_mark_and_send_to_server(jqevent) {
  var field = $(jqevent.target);

  if (move_possible !== true) {
    return;
  }

  var state = get_field_state(field);
  if (state === 0) {
    add_mark(field, 2);
    if (move_possible !== true) { // note: this needs to be done twice: here and above
        return;
    }
    var field_states = get_field_states();
    $.getJSON("/next_move",
            field_states,
            function(ret) {
                if (ret.result>=0) {
                    add_mark($(".box:eq("+ret.result+")"), 1);
                }
            });
  }
}

$( document ).ready(function() {
  fix_size();
  $(".box").click(add_user_mark_and_send_to_server);
  
});

$( window ).resize(fix_size);
