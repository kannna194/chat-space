$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="Message-posts" data-message-id=${message.id}>
        <div class="Contributor">
          <div class="Contributor__name">
            ${message.user_name}
          </div>
          <div class="Contributor__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <div class="Message-comment">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else{
      let html =
      `<div class="Message-posts" data-message-id=${message.id}>
        <div class="Contributor">
          <div class="Contributor__name">
            ${message.user_name}
          </div>
        <div class="Contributor__date">
          ${message.created_at}
        </div>
      </div>
      <div class="Message">
        <div class="Message-comment">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }


  $('.form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url =$(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.Submit-btn').prop('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Submit-btn').prop('disabled',false);
    });
  });

  let reloadMessages = function() {
    let last_message_id = $('.Message-posts:last').data("message-id") || 0;
    $.ajax({
      url: "/groups/:group_id/api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.MessageField').append(insertHTML);
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  setInterval(reloadMessages, 7000);

});