/* add-on script */

AJS.$(function(){
console.log("Addon.js Called!!!");
});

function POST(){
  var value = AJS.$('#repository');
  console.log(value[0].value)
 AJS.$.post( "https://putsreq.com/0v5hH0p3zrt6ojoN4XO6", { name: value[0].value})
//  AJS.$.post()
    .done(function(data) {
      console.log( data);
      AJS.$("#resp").append(data);
      console.log("Done!")
    });
}
