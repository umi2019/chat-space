$(function() {
  function buildMessageHTML(message) {
    var html = `<div class="message" data-id=${message.id}>
                  <div class="message__top">
                    <p class="message__top__name">${message.user_name}</p>
                    <p class="message__top__date">${message.date}</p>
                  </div>
                  <p class="message__text">${message.text}</p>
                  <img src="${message.image}" />
                </div>`;
    return html;
  }

  //未取得のメッセージを取得する
  function updateMessages(){
    var message_id = 0;

    //messageクラスのdata-id:にメッセージのidが格納されている
    if($('.message')[0]){
      message_id = $('.message:last').data('id') / 1;
    }

    $.ajax({
      url: location.href,
      type: 'GET',
      dataType: 'json',
      data: {message: {id: message_id}}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        messages.forEach(function(message) {
          var html = buildMessageHTML(message);
          $('.messages').append(html);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      }
    })
    .fail(function() {
    })
    .always(function() {
    });
  }

  //5000ミリ秒ごとにメッセージを更新
  setInterval(function(){
    updateMessages();
  }, 5000);

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
      updateMessages();
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

  $(document).on('turbolinks:load', function(){
  //最初から下までスクロール
  if($('.messages').length){
    $('.messages').scrollTop($('.messages')[0].scrollHeight);
  }
  });
});


