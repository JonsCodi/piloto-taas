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
      AJS.$.ajax({
            type: "GET",
            url: "https://taasdev.atlassian.net/rest/api/3/search?jql=project=TAS",
            async: false,
            headers: {
              'Accept': 'application/json',
              "Authorization": "Basic " + btoa("username" + ":" + "password")
            }
        }).done(function (data) {
           console.log(data);
           for(var i = 0;i<data.issues.length;i++){
             key.push(data.issues[i].key);
           }
        }).error(function (err) {
           console.log(err);
        });
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
         const link = data.fields.attachment[0].content;
         const table = '<tr>'+
                          '<td id="issue-key"><a href="'+key[i]+'">'+key[i]+'</a></td>'+
                          '<td id="attach"><a href="'+link+'">Resultado do Teste</a></td>'+
                        '</tr>';
         AJS.$('table').find('tbody').append(table);
      }).error(function (err) {
         console.log(err);
      });
  }


    console.log("Addon.js Finished!!!");
});
