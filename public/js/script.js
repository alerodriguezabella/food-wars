document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("food-wars JS imported successfully!");
  },
  false
);

document.getElementById("level").onchange = function() {
  localStorage['level'] = document.getElementById("level").value;
 }
document.getElementById("title").onchange = function() {
  localStorage['title'] = document.getElementById("title").value;
 }
 document.getElementById("dishtype").onchange = function() {
  localStorage['dishtype'] = document.getElementById("dishtype").value;
 }
 window.onload= function(){
  if(localStorage['dishtype'])
  document.getElementById("dishtype").value = localStorage['dishtype'];
     if(localStorage['level'])
         document.getElementById("level").value = localStorage['level'];
    if(localStorage['title'])
         document.getElementById("title").value = localStorage['title'];

 }
