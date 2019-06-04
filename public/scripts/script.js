requirejs.config({
  baseUrl: 'scripts/lib'
});

requirejs(['jquery', 'moment'], function($, moment){

  function printLogMessage(messages){

    console.log(messages);

    $('.display_messages .message_output p').text('');

    for(let i=0; i<messages.length; i++){
      $('#output_window').append(`<p> Message: <i style='color: blue'>${messages[i].content}</i> from : <i style='color: blue'>${messages[i].source_ip}</i> at <i style='color: blue'>${messages[i].timeStamp}</i> </p>`);
    }
  }

  $('.post-btn').click(function(){

    let input = $('#input_text').val();
    if(input === ''){}
    else {


      let logArray = $('.request_log .level3 ul').children();

      for(let i=logArray.length-1; i>0; i--){
        $(logArray[i]).html($(logArray[i-1]).html());
      }

      $(logArray[0]).html(`<span> <b>- Request Method: </b><i style="color: blue">post/ </i> | <b>Message: </b><i style="color: blue"> ${input} </i> | <b>Time-Stamp: </b><i style="color: blue"> ${moment.utc().format()}</i> </span>`);



      // const url = 'http://localhost:3000/sendmessage'
      const url = 'https://princeton-assgn-task2.herokuapp.com/sendmessage'

      const data = {
        message: input
      };



      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        success: function(data){
          // printMessage(data);
          // console.log(typeof data, data);
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
      });
    }
      // const url = 'https://princeton-assgn-task2.herokuapp.com/sendmessage'
  });


  $('.get-btn').click(function(){

    // let url = 'http://localhost:3000/getmessages';
    let url = 'https://princeton-assgn-task2.herokuapp.com/getmessages';


    let logArray = $('.request_log .level3 ul').children();

    for(let i=logArray.length-1; i>0; i--){
      $(logArray[i]).html($(logArray[i-1]).html());
    }

    $(logArray[0]).html(`<span> <b>- Request Method: </b><i style="color: blue">get/ </i> | <b>Time-Stamp: </b><i style="color: blue"> ${moment.utc().format()}</i> </span>`);


    $.get({
      type: "GET",
      url: url,
      success: function(data){
        printLogMessage(data);
      },
      dataType: 'json'
    });
  });

  $('.delete-btn').click(function(){


    // let url = 'http://localhost:3000/deletemessages';
    let url = 'https://princeton-assgn-task2.herokuapp.com/deletemessages';

    $.post({
      type: "POST",
      url: url
    });

    $('.display_messages .message_output p').text('');
  });

});
