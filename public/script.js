$('.post-btn').click(function(){
  console.log('hello');

  if($('#input_text').val() === ''){}
  else{
    const url = 'localhost:3000/sendmessage'
    $.post(url, {'name': 'bhargava'});
  }
});
