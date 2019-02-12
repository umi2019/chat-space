$(function() {
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    $('.user-search-result').append(html);
  }

  $('#user-search-field').on('keyup', function(event) {
    event.preventDefault();
    console.log('input!');
    var input = $(this).val();
    $.ajax({
      url: '/users',
      type: 'GET',
      dataType: 'json',
      data: {keyword: input},
    })
    .done(function(users) {
      $('.user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      console.log("success");
    })
    .fail(function() {
      alert("ユーザ検索に失敗しました");
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  });
});
