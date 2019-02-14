$(function() {
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
    var html = `<div class='chat-group-user clearfix js-chat-member' id="chat-group-user-${id}">
                  <input name='group[user_ids][]' type='hidden' value="${id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
                console.log('append');
    $('#chat-group-users').append(html);
  }

  $(document).on('click', '.chat-group-user__btn--add', function() {
    var name = $(this).data('user-name');
    var id = $(this).data('user-id');
    $(this).parent().remove();
    addToMember(name, id);
  });

  $(document).on('click', '.js-remove-btn', function() {
    $(this).parent().remove();
  });

  $(document).on('turbolinks:load', function(){
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
  });
});




