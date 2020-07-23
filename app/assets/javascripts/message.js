$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="Message-posts">
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
      `<div class="Message-posts">
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
      $('.MessageField').append(html);
      $('form')[0].reset();
    })
  });
});