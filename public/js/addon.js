/* add-on script */

AJS.$(function(){
console.log("Addon.js Called!!!");
});

function POST(){
  var value = AJS.$('#repository');
  console.log(value[0].value)
 AJS.$.post( "https://putsreq.com/Jk8VZujWrnNtKr48KUpQ", { name: value[0].value})
//  AJS.$.post()
    .done(function(status) {
      console.log( status);
      console.log("Done!")
    });
}
