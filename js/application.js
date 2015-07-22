$(document).ready(function(){

var constructHtml = function(response,keys){
  console.log(response);
  var html = "";
  
  for (var i = response.length - 1; i >= 0 ; i--){
    console.log('posts');
    html += '<tr>';
    keys.forEach(function(key){
      html +=   '<td>' + response[i][key] + '</td>';
    })
    html += '</tr>';
  }
  return html;
};

var successGetAll = function(response){
  console.log('success!!');
  var keys = ['_id','user','title','text'];
  var html = constructHtml(response,keys);
  $('#posts').html(html);
}

var getAll = function(){
  $.ajax({
    type: 'GET',
      url: 'http://ga-wdi-api.meteor.com/api/posts/',
    dataType: 'json',
    success: successGetAll
  });
};

var newUsername;
var newTitle;
var newText;
var id;

var newPost = function(username,title,text){
  $.ajax({
    type: 'POST',
      url: 'http://ga-wdi-api.meteor.com/api/posts/',
    data: {
      user: username,
      title: title,
      text: text
    },
    dataType: 'json',
    success: function(response){
      $('#posts').text("");
      getAll();
      console.log(response)
      console.log('new post added');
    }
  });
};

var deletePost = function(id){
  $.ajax({
    type: 'DELETE',
    url: 'http://ga-wdi-api.meteor.com/api/posts/' + id,
    success: function(response){
      console.log(response)
      console.log('post ' + id + ' has been deleted');
      $('#posts').text("");
      getAll();
    }
  });
}

var putPost = function(id,username,title,text){
  var urlID = 'http://ga-wdi-api.meteor.com/api/posts/'+ id;
  $.ajax({
    type: 'PUT',
    url: urlID,
    data: {
      user: username,
      title: title,
      text: text
    },
    success: function(response){
      console.log("post modified!");
      $('#posts').text("");
      getAll();
    }
  });
}

$('#post_form').submit(function(){
  event.preventDefault();
})

$('#create').click(function(){
  newUsername = $('#username').val();
  newTitle = $('#title').val();
  newText = $('#text').val();
  newPost(newUsername,newTitle,newText);
})

$('#get').click(function(){
  $('#posts').text("");
  getAll();
})

$('#delete_form').submit(function(){
  event.preventDefault();
})

$('#delete').click(function(){
  id = $('#post_id').val();
  deletePost(id);
})

$('#put').click(function(){
  id = $('#post_id_put').val();
  newUsername = $('#username').val();
  newTitle = $('#title').val();
  newText = $('#text').val();
  putPost(id,newUsername,newTitle,newText);
})




})