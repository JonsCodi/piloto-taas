/* add-on script */

var curl = require('curlrequest');

function POST(){
    var  json='{"parameter": [{"name":"GIT_URL", "value":"https://github.com/olucasfagundes/SvcParametrosRobotTests"}, '+
    '{"name":"JIRA_ISSUE", "value":"tas-1"}, {"name":"BASE_URL", "value":"https://taasdev.atlassia.net"},'+
    // '{"name":"token", "value""GoRobot"},'+
    '{"name":"TEST_SUITE", "value":"SvcParametrosRobotTests/tests/EndPointCheck.robot"}]}';
    var urlJenkins = 'https://admin:11d302e42fd690b4698de815fc53e317c8@gorobot.q4sure.co/job/RobotStart/build';
    var options = {
        method: 'POST',
        url: urlJenkins,
        encoding: json
    };
    curl.request(options, function (err, parts) {
        console.log(err);
        console.log(parts);
    });
    // AP.request({
    //   url: urlJenkins,
    //   type: 'POST',
    //   contentType: 'application/json',
    //   data: json,
    //   headers: {
    //       "Authorization": "Basic " + btoa("admin:jenkins")
    //   },
    //   success: function(responseText){
    //     alert(responseText);
    //   }
    // });
}

function getIssuesFromProject(){
  var keys = [];
  var urlProject = '/rest/api/3/search?jql=project=TAS+order+by+key';
  function onLoadSuccess(responseBody){
    var json = JSON.parse(responseBody);
    for(var i = 0;i<json.issues.length;i++){
      keys.push(json.issues[i].key);
    }
  }

  AP.require(['request'], function(request){
    request({
      url:urlProject,
      success:onLoadSuccess
    });
  });
  return keys;
}

function getIssues(keys){
  var urlRestIssue = '/rest/api/3/issue/';
  for(var i = 0;i<keys.length;i++){
    AP.require(['request'], function(request){
        request({
          url:urlRestIssue+keys[i],
          success:function(responseText){
            var json = JSON.parse(responseText);
            const link = json.fields.attachment[0].content;
            const table = '<tr>'+
                              '<td id="issue-key"><a href=https://taasdev.atlassian.net/browse/'+json.key+' target="_blank">'+json.key+'</a></td>'+
                              '<td id="attach"><a href='+link+'>Resultado do Teste</a></td>'+
                          '</tr>';
            AJS.$('table').find('tbody').append(table);
          },
          error: function(xhr, statusText, errorThrown){
            console.log(errorThrown);
          }
        });
    });
  }
}

AJS.$(function(){
  var keys = getIssuesFromProject();
  setTimeout(function(){
      getIssues(keys);
  }, 3000);
  console.log("Addon.js Finished!!!");
});
