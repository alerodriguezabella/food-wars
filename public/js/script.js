document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("food-wars JS imported successfully!");
  },
  false
);


  let rank =document.getElementById('admin').textContent;
  console.log(rank)
  if(rank=='true'){
    document.getElementById('admin').textContent='Super User';
  }else if(rank==='false'){
    document.getElementById('admin').textContent='Peasant';
  }


