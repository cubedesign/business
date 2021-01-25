let script1Loaded = false;
function load(url, btn){
    //loading gray screen
    document.getElementsByTagName('content')[0].style.display = "none";
    //loadbar starting to load
    const loadBar = document.getElementById("loadBarloaded");
    loadBar.style.transform = "translateX(-87%)";
    //load site
    window.history.pushState("", "", url);
    $("content").load(`${url} content`, function(){
        if(btn == 2){
            if(!script1Loaded){
                $('<script>', {src: '/assets/js/wallet.js'}).appendTo('body');
                script1Loaded = true;
            }
            if(typeof updateWalletInfo === "function"){
                updateWalletInfo();
            }
        }
        setTimeout(() => {
            loadBar.style.transform = "translateX(0)";
            document.getElementsByTagName('content')[0].style.display = "block";
            setTimeout(() => {
                loadBar.style.transform = "";
            }, 350);
        }, 60);
    });
    swapButton(btn);
}
function swapButton(btn){
    btn++;
    const header = document.getElementsByTagName("header")[0];
    const buttons = header.querySelectorAll("li");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selectedButton');
    }
    buttons[btn].classList.add('selectedButton');
}

let notifBox;
let notifStatus;
let profileBox;
let profileStatus;

$(document).ready(function(){
    notifStatus = 0;
    notifBox = document.getElementById('notifBox');
    profileStatus = 0;
    profileBox = document.getElementById('profileBox');
});

function notif(){
    if(notifStatus == 0){
        $(notifBox).show(170);
        notifStatus = 1;
    }
    else{
        $(notifBox).hide(170);
        notifStatus = 0;
    }
}
window.addEventListener('mouseup', function(event){
	if (event.target != notifBox && event.target.parentNode != notifBox){
        $(notifBox).hide(170);
        notifStatus = 0;
    }
});


function profile(){
    if(profileStatus == 0){
        $(profileBox).show(170);
        profileStatus = 1;
    }
    else{
        $(profileBox).hide(170);
        profileStatus = 0;
    }
}
window.addEventListener('mouseup', function(event){
	if (event.target != profileBox && event.target.parentNode != profileBox){
        $(profileBox).hide(170);
        profileStatus = 0;
    }
});