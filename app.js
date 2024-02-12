let user_seq=[];// seqeunce of colors pressed by user
let game_seq=[];// sequence required 
let start=false;
let colors=["red", "yellow", "green", "purple"];
let level=0;
let h2=document.querySelector('h2');
document.addEventListener("keypress", function(){
    if(start == false){
        console.log("game started");
        start=true;
        levelUp();
    }; 
});
function btn_flash(bb){
    bb.classList.add("flash");// adds flash class which changes the background color to white
    setTimeout(function(){
        bb.classList.remove("flash"); // removes flash class after 0.1 sec
    }, 100);
};
function check(ind){
    if(user_seq[ind]===game_seq[ind]){
        if(user_seq.length==game_seq.length){//if this was the last button of this level
            setTimeout(levelUp,1000)// therefore increase level after 1sec
        }
    }
    else{// if sequence don't match
        // change color of bg to red to show game over
        let h=document.querySelector("body");
        h.style.backgroundColor="red";
        setTimeout(function(){
            h.style.backgroundColor="white"
        }, 220);
        reset();
    }
    
}
function levelUp(){
    user_seq=[];// when level changes user sequence will be empty 
    level++;
    h2.innerHTML=`Level ${level}`;
    let random_i=Math.floor(Math.random()*4);// generating a random number from 0 to 3
    let random_c=colors[random_i];// selecting the color 
    let b=document.querySelector(`#${random_c}`)// selecting the button assosiated with the id
    game_seq.push(random_c);// pushing the color flashed by the game in the game sequence 
    console.log(random_c);
    btn_flash(b);
};
function btn_pressed(){
    let b=this;
    btn_flash(b);// flash the button which was clicked
    userC= b.getAttribute("id");
    user_seq.push(userC);
    check(user_seq.length-1);// check the button pressed by user is correct or not
};
let btns=document.querySelectorAll('.btn'); // all buttons
for(bt of btns){
    bt.addEventListener("click", btn_pressed);// btn_pressed function is called when the button is clicked
}
function reset(){
    h2.innerHTML=`Game over! You pressed the wrong key.<br>  Your score was ${level} <br> Press any key to restart.`;
    user_seq=[];
    game_seq=[];
    start=false;
    level=0;
    console.clear();
}



