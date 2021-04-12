/* Drop */

function sortable(section, onUpdate){
    var dragEl, nextEl, newPos, dragGhost;
 
    let oldPos = [...section.children].map(item => {
      item.draggable = true
      let pos = document.getElementById(item.id).getBoundingClientRect();
      return pos;
    });
   
    function _onDragOver(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        var target = e.target;
        if( target && target !== dragEl && target.nodeName == 'DIV' ){
          if(target.classList.contains('inside')) {
            e.stopPropagation();
          } else {
          var targetPos = target.getBoundingClientRect();
          var next = (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > .5 || (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) > .5;    
            section.insertBefore(dragEl, next && target.nextSibling || target);
            console.log(oldPos);
            }
        }   
    }
    
    function _onDragEnd(evt){
        evt.preventDefault();
        newPos = [...section.children].map(child => {      
             let pos = document.getElementById(child.id).getBoundingClientRect();
             return pos;
           });
        console.log(newPos);
        dragEl.classList.remove('ghost');
        section.removeEventListener('dragover', _onDragOver, false);
        section.removeEventListener('dragend', _onDragEnd, false);
        nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
    }
       
      section.addEventListener('dragstart', function(e){     
        dragEl = e.target; 
        nextEl = dragEl.nextSibling;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', dragEl.textContent);
      
        section.addEventListener('dragover', _onDragOver, false);
        section.addEventListener('dragend', _onDragEnd, false);
         
        setTimeout(function (){
            dragEl.classList.add('ghost');
        }, 0)
       
    });
}
                                          
sortable( document.getElementById('list'), function (item){
});


/*Meteo*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  //ajax 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
  

  msg.textContent = "";
  form.reset();
  input.focus();
});

//Login 

$(document).ready(function(){
  $('#goRight').on('click', function(){
    $('#slideBox').animate({
      'marginLeft' : '0'
    });
    $('.topLayer').animate({
      'marginLeft' : '100%'
    });
  });
  $('#goLeft').on('click', function(){
    if (window.innerWidth > 769){
      $('#slideBox').animate({
        'marginLeft' : '50%'
      });
    }
    else {
      $('#slideBox').animate({
        'marginLeft' : '20%'
      });
    }
    $('.topLayer').animate({
      'marginLeft': '0'
    });
  });
});