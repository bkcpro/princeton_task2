$('.post-btn').click(function(){
  console.log('hello');

  if($('#input_text').val() === ''){}
  else{
    const url = 'https://princeton-assgn-task2.herokuapp.com/sendmessage'
    $.post(url, JSON.stringify({'name': 'bhargava'}), function(data){
      $('.display_messages .message_output p').text(JSON.stringify(data));
    });
  }
});
