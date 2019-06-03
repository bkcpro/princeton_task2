$('.post-btn').click(function(){
  console.log('hello');

  if($('#input_text').val() === ''){}
  else{
    const url = 'https://princeton-assgn-task2.herokuapp.com/sendmessage'
    $.post(url, {'name': 'bhargava'});
  }
});
