$(document).on('turbolinks:load', function() {
  function mapFunc(index, elem){
    return $(elem).text();
  }

  //userを検索結果に加える
  function appendSearchUserResult(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    var names = $('.chat-group-user__name').map(mapFunc).get(); //チャットメンバーの名前

    // チャットメンバーに既に登録されているか
    if ($.inArray(user.name, names) == -1) {
      $('.user-search-result').append(html);
    }
  }

  //チャットメンバーに加える
  function addToMember(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;

    $('#chat-group-users').append(html);
  }

  $('#user-search-field').on('keyup', function(event) {
    event.preventDefault();
    var input = $(this).val();
    $.ajax({
      url: '/users',
      type: 'GET',
      dataType: 'json',
      data: {keyword: input},
    })
    .done(function(users) {
      $('.user-search-result').empty();
      if (input.length !== 0 && users.length !== 0) {
        users.forEach(function(user) {
          appendSearchUserResult(user);
        });
      }
    })
    .fail(function() {
      alert("ユーザ検索に失敗しました");
    })
    .always(function() {
    });
  });

  $(document).on('click', '.user-search-add', function() {
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    $(this).parent().remove();
    addToMember(name, id);
  });

  $(document).on('click', '.js-remove-btn', function() {
    $(this).parent().remove();
  });
});
