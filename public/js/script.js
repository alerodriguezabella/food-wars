document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("food-wars JS imported successfully!");
  },
  false
);

const btn=document.getElementById('btn');


document.getElementById("level").onchange = function() {
  localStorage['level'] = document.getElementById("level").value;
 }
document.getElementById("title").onchange = function() {
  localStorage['title'] = document.getElementById("title").value;
 }
 document.getElementById("dishtype").onchange = function() {
  localStorage['dishtype'] = document.getElementById("dishtype").value;
 }

 btn.addEventListener('click',()=>{
  localStorage['title']='';
  document.getElementById("dishtype").value ='';
  document.getElementById("level").value ='';
  document.getElementById("title").value ='';
})

 window.onload= function(){
  if(localStorage['dishtype'])
  document.getElementById("dishtype").value = localStorage['dishtype'];
     if(localStorage['level'])
         document.getElementById("level").value = localStorage['level'];
    if(localStorage['title'])
         document.getElementById("title").value = localStorage['title'];

 }


