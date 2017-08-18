function receive_hello(data){
    $("#mytarget").html(data.result)
}

function send_hello(jqevent) {
    $.getJSON("/hello", {}, receive_hello)
}

$( document ).ready(function() {
  $( window ).click(send_hello);
});

