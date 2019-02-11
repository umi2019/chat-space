$(function() {
  $('#send_message').on('submit', function(event) {
    event.preventDefault();

    message = $('#message_box').val();
    console.log('pushed');
  });
});
