/* add-on script */

function POST(){
  var value = AJS.$('#repository');
  console.log(value[0].value)
 AJS.$.post( "https://putsreq.com/R8rzjAgq25i7uhYBYGbt", { name: value[0].value})
//  AJS.$.post()
    .done(function(data) {
      console.log( data);
      AJS.$("#resp").append(data);
      console.log("Done!")
    });
}

AJS.$(function(){

    var key = [];
      // AJS.$.ajax({
      //       type: "GET",
      //       url: "https://taasdev.atlassian.net/rest/api/3/search?jql=project=TAS+order+by+key",
      //       async: false,
      //       headers: {
      //         'Accept': 'application/json',
      //         "Authorization": "Basic " + btoa("username" + ":" + "password")
      //       }
      //   }).done(function (data) {
      //      console.log(data);
      //      for(var i = 0;i<data.issues.length;i++){
      //        key.push(data.issues[i].key);
      //      }
      //   }).error(function (err) {
      //      console.log(err);
      //   });
setTimeout(function(){
  var urlGetIssuesByProject = "https://taasdev.atlassian.net/rest/api/3/search?jql=project=TAS+order+by+key";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr)
    }
  }
  xhr.open('GET', urlGetIssuesByProject, false);
  xhr.withCredentials = true
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Basic " + btoa("username" + ":" + "password"))
  xhr.send(null);
}, 4000);
console.log(key)
  for(var i = 0;i<key.length;i++){
    AJS.$.ajax({
          type: "GET",
          url: "https://taasdev.atlassian.net/rest/api/3/issue/"+key[i],
          async: false,
          headers: {
            'Accept': 'application/json',
            "Authorization": "Basic " + btoa("username" + ":" + "password")
          }
      }).done(function (data) {
         console.log(data);
         if(data.fields.attachment.length > 0){
           const link = data.fields.attachment[0].content;
           const table = '<tr>'+
                            '<td id="issue-key"><a href=https://taasdev.atlassian.net/browse/'+key[i]+' target="_blank">'+key[i]+'</a></td>'+
                            '<td id="attach"><a href='+link+'>Resultado do Teste</a></td>'+
                          '</tr>';
           AJS.$('table').find('tbody').append(table);
         }
      }).error(function (err) {
         console.log(err);
      });
  }


    console.log("Addon.js Finished!!!");
});
