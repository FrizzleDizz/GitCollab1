const form = document.querySelector("form");
const slider = document.getElementById("slider");
const spinBox = document.getElementById("spin");
const moveBox = document.getElementById("move");
const fastBox = document.getElementById("fast");
const fastLbl = document.getElementById("fastLabel");
let fast = false;
let spin = false;
let move = false;
let newMove = false;
let newSpin = false;
let newSpeed = 0;
let transY = 0;
let transX = 0;
let rotAmt = 0;
let speed = 0;
slider.value = 0;
spinBox.checked = false;
fastBox.checked = false;

spinBox.addEventListener("change", function(event){
    spin = spinBox.checked;
});

moveBox.addEventListener("change", function(event){
    move = moveBox.checked;
});

fastBox.addEventListener("change", function(event){
    fast = fastBox.checked;
});

// Update speed based on slider
slider.addEventListener("change", function(event){
    newSpeed = slider.value;
});

form.addEventListener("submit", function(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const myObj = Object.fromEntries(formData);
    
    // Set stuff
    fast = fastBox.checked;
    move = moveBox.checked;
    spin = spinBox.checked;

    fastLbl.hidden = false;
    fastBox.hidden = false;
    speed = newSpeed;
});

window.requestAnimationFrame(function update(){
    if(spin){
        if(!fast){
            rotAmt += (speed*speed) / 500;
        }
        else{
            rotAmt += (speed*speed) / 50;
        }
        if(rotAmt>360){
            rotAmt = 0;
        }
    }
    if(move){
        if(!fast){
            transX = Math.cos(Date.now()/500) * (speed*speed) / 25;
            transY = Math.sin(Date.now()/500) * (speed*speed) / 25;
        }
        else{
            transX = Math.cos(Date.now()/500) * (speed*speed) / 10;
            transY = Math.sin(Date.now()/500) * (speed*speed) / 10;
        }
    }
    form.style.transform = `rotate(${rotAmt}deg)`;
    form.style.transform += `translateX(${transX}px)`;
    form.style.transform += `translateY(${transY}px)`;
    window.requestAnimationFrame(update);
});