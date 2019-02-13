$(document).on('turbolinks:load', function() {
  function buildSendMessageHTML(message) {
    var html = `<div class="message">
                  <div class="message__top">
                    <p class="message__top__name">${message.user_name}</p>
                    <p class="message__top__date">${message.date}</p>
                  </div>
                  <p class="message__text">${message.text}</p>
                  <img src="${message.image}" />
                </div>`;
    return html;
  }

  //最初から下までスクロール
  if($('.messages').length){
    $('.messages').scrollTop($('.messages')[0].scrollHeight);
  }


  $('#message-form').on('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildSendMessageHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('メッセージを入力してください');
    })
    .always(function() {
      $('#message-form')[0].reset();
      $('#send_message').prop('disabled', false);
    });
  });
});
