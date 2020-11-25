const url0 = 'media/movie.mp4';
const url1 = 'media/video1.mp4';
const url2 = 'media/video2.mp4';
const url3 = 'media/video3.mp4';
const url4 = 'media/video4.mp4';

let list = [url0, url1, url2, url3, url4];;

let canvas, context, video, source, container;
let mx = 0, my = 0;
let W, H;
let containerW;
let containerH;
let containerX;
let containerY;
let itemH;
let itemW;
let marginBottom = 10;
let display;
let listItems;

let index = 0;


function setupList() {
    container.innerHTML = ""

    containerW = container.getBoundingClientRect().width;
    containerH = container.getBoundingClientRect().height;
    containerX = container.getBoundingClientRect().x;
    containerY = container.getBoundingClientRect().y;

    // itemH = containerH/list.length;


    for (let item=0; item < list.length; item++) {

        listItems[item] = document.createElement('div');
        listItems[item].className = "card";
     
        let vidDim = containerW / 3;

        listItems[item].innerHTML = `<video width="${vidDim}" 
                        alt="video-preview"
                        style="margin-top: 10px; 
                        margin-bottom: 10px;">
                        <source src=${list[item]} type="video/mp4">
                        </video>`;
        listItems[item].innerHTML += `<img class="delete"
        onclick="deleteVideo(${item})" src="media/delete.png"
        alt="delete"> 
        </img>`;
        listItems[item].innerHTML += `<img class="move"
        onclick="moveVideo(${item})" src="media/move.png"
        alt="move"> 
        </img>`;

        container.append(listItems[item]);

        itemH = listItems[item].getBoundingClientRect().height;
    }
}


function mouseMove(e) {

    mx = e.x;
    my = e.y;

}



function mouseDown() {

    if (mx >= containerX) {
        for (let i=0;  i < list.length; i++) {

            let itemArea =  mx >= listItems[i].getBoundingClientRect().x && 
                            my >= listItems[i].getBoundingClientRect().y && 
                            my <= listItems[i].getBoundingClientRect().y + itemH;

            if (itemArea) {
                playItem(i);
            } else {
                finishItem(i);
            }
        }        
    }

}

function playItem(i) {
    // Stergere scena.
    context.fillStyle = 'black';
    context.fillRect(0, 0, W, H);
    listItems[i].style = 'background-color: rgb(45, 58, 58, 0.3);';
    video.src = list[i];
    video.load();
    video.play();
    drawVideo();
    index = i;

}

function finishItem(i) {
    listItems[i].style = 'background-color: #040F0F;';
}



function drawVideo() {
    context.drawImage(video, 0, 0, W, H);
    requestAnimationFrame(drawVideo);
}


function mouseUp() {
}



function startPlaylist() {


    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    video = document.querySelector('video');
    source = document.querySelector('#videoSource');
    container = document.querySelector('#container');
    itemW = container.getBoundingClientRect().width - containerX;
    W = canvas.width;
    H = canvas.height;
    display = document.querySelector('#left-side');
    listItems = [];    

    setupList();
    playItem(0);    
    
    video.addEventListener("ended", () => {
        console.log("Video " + index + " ended.");
        index++;
        if (index >= list.length) {
            index = 0;
        };
        playItem(index);
        console.log("Playing video " + index + " now.");
    });
 
}


function addNewVideo() {
    list.push("media/movie.mp4");
    setupList();
}

function deleteVideo(id) {
    list.splice(id, 1);
    console.log("Deleted item " + id)
    setupList();
}

function moveVideo(id) {
   for (let i=0; i<listItems.length; i++) {
       if (i !== id) {
            listItems[i].style = 'background-color: rgb(32,153,80, 0.3)';
            let move = listItems[i].querySelector('.move');
            move.setAttribute('src', 'media/move_here.png');

            move.addEventListener('click', () => {
                let aux = list[i]; 
                // i = locul in care va fi mutat
                list[i] = list[id] // elementul cu care va fi inlocuit 
                list[id] = aux; // interschimbare
                setupList();
                console.log("Moved from " + id + " to " + i);
            });  
        }
    }
}




document.addEventListener('DOMContentLoaded', startPlaylist);
document.addEventListener('onresize', setupList);
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
document.addEventListener('mousemove', mouseMove);


// Colors: https://coolors.co/040f0f-248232-2ba84a-2d3a3a-fcfffc