


let santa = document.getElementById('santa');
let heroParallax = document.getElementById("hero-parallax");
let aboutGame = document.getElementById("aboutGame");
let descText = document.getElementById("descText");
let descImg = document.getElementById("descImg");
let thirdSection = document.getElementById("thirdSection");
let cta = document.getElementById('cta');
let bats = document.getElementById('bats');
let text = document.querySelector('.text-2')
let innerText = document.querySelector('.innerText')
let secondSectionHeight = aboutGame.offsetHeight;
let thirdSectionHeight = thirdSection.offsetHeight;
let buttun =  document.getElementById("button");
buttun.addEventListener("click", function(){
  window.location.href = "game.html";
}
),


window.addEventListener('scroll', () =>{
    let value = window.scrollY;
    santa.style.left = value <=1000 ? value * 1.8+ 'px' : 0;
    heroParallax.style.backgroundPositionY = value * +0.4 + 'px';
    descText.style.transform = value >=1000 ? `translateY(${value / (secondSectionHeight ) * 600 - 600}px)` : 0;
    descImg.style.transform = value >=1000 ? `translateY(${value / (secondSectionHeight ) * -300 + 300}px)` : 0;
    cta.style.clipPath = value >= thirdSectionHeight ? "circle("+ (value-2000) * 0.6 +"px at center center)" : "circle(0px at center center)";
    bats.style.transform = value >= thirdSectionHeight ? `translateX(750px) translateY(${value / (thirdSectionHeight) * -250 + 100}px)` : 0;
    
})



// Snow from https://codepen.io/radum/pen/xICAB
window.addEventListener("load", function () {

    var COUNT = 300;
    var masthead = document.querySelector('.hearo');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = masthead.clientWidth;
    var height = masthead.clientHeight;
    var i = 0;
    var active = false;
  
    function onResize() {
      width = masthead.clientWidth;
      height = masthead.clientHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = '#FFF';
  
      var wasActive = active;
      active = width > 600;
  
      if (!wasActive && active)
        requestAnimFrame(update);
    }
  
    var Snowflake = function () {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
      this.r = 0;
      this.reset();
    }
  
    Snowflake.prototype.reset = function() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.vy = 1 + Math.random() * 3;
      this.vx = 0.5 - Math.random();
      this.r = 1 + Math.random() * 2;
      this.o = 0.5 + Math.random() * 0.5;
    }
  
    canvas.style.position = 'absolute';
    canvas.style.left = canvas.style.top = '0';
  
    var snowflakes = [], snowflake;
    for (i = 0; i < COUNT; i++) {
      snowflake = new Snowflake();
      snowflake.reset();
      snowflakes.push(snowflake);
    }
  
    function update() {
  
      ctx.clearRect(0, 0, width, height);
  
      if (!active)
        return;
  
      for (i = 0; i < COUNT; i++) {
        snowflake = snowflakes[i];
        snowflake.y += snowflake.vy;
        snowflake.x += snowflake.vx;
  
        ctx.globalAlpha = snowflake.o;
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
  
        if (snowflake.y > height) {
          snowflake.reset();
        }
      }
  
      requestAnimFrame(update);
    }
  
    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  
    onResize();
  
  
    masthead.appendChild(canvas);
  });


let items = document.querySelectorAll('.content');
items.forEach (item => {
  item.addEventListener('mouseover', (e) => {
    // get ponter pointer height
    let positionPx = e.x - item.getBoundingClientRect().left;
    //convert to %
    let positionX = (positionPx / item.offsetWidth)*100;
    // get ponter pointer width
    let positionPy= e.y=item.getBoundingClientRect().top;
    // convert to &%
    let positionY = (positionPy / item.offsetHeight)*100;
    item.style.setProperty('--rX', (0.5)*(50 - positionY) + 'deg');
    item.style.setProperty('--rY', -(0.5)*(50 - positionX) + 'deg');
  })
  item.addEventListener('mouseout', ()=>{
    item.style.setProperty('--rX', '0deg')
    item.style.setProperty('--rY', '0deg')

  })

})