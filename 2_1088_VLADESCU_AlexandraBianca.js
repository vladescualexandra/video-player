
const url1 = 'media/video1.mp4';
const url2 = 'media/video2.mp4';
const url3 = 'media/video3.mp4';
const url4 = 'media/video4.mp4';
const url5 = 'media/video5.mp4';

let list = [
    {
        title: 'name-0',
    },
    {
        title: 'name-1',
    },
    {
        title: 'name-2',
    },
    {
        title: 'name-3',
    },
    {
        title: 'name-4',
    }
];



let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');


let container = document.querySelector('#container');

let containerW;
let containerH;
let containerX;
let containerY;
let itemH;
let itemW = container.getBoundingClientRect().width - containerX;
let marginBottom = 10;

let listItems = [];

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
        

        let title = document.createElement('h3');

        title.innerText= list[item].title;

        listItems[item].appendChild(title);
        listItems[item].innerHTML += `<img class="delete"
        onclick="deleteVideo(${item})" src="media/delete.png"> 
        </img>`;
        listItems[item].innerHTML += `<img class="move"
        onclick="moveVideo(${item})" src="media/move.png"> 
        </img>`;
        container.append(listItems[item]);

        list[item].x = listItems[item].getBoundingClientRect().x;
        list[item].y = listItems[item].getBoundingClientRect().y;
        itemH = listItems[item].getBoundingClientRect().height;

    }

}


let mx, my;
function mouseMove(e) {

    mx = e.x;
    my = e.y;

}


let W = canvas.width;
let H = canvas.height;


let display = document.querySelector('#left-side');
let text = document.createElement('h1');

function mouseDown() {

    if (mx >= containerX) {
        for (let i=0;  i< list.length; i++) {

            let itemArea =  mx >= list[i].x && 
                            my >= list[i].y && 
                            my <= list[i].y + itemH;
    
            if (itemArea) {
                playItem(i);               
            } else {
                finishItem(i);
            }
        }
    }

}

function playItem(i) {
        text.innerText = list[i].title;
        listItems[i].style = 'background-color: rgb(45, 58, 58, 0.3);';
}

function finishItem(i) {
    listItems[i].style = 'background-color: #040F0F;';

}


function mouseUp() {
    display.appendChild(text);
}



function startPlaylist() {
    setupList();

   

}

function addNewVideo() {
    list.push({
        title: "new video"
    });

    setupList();
}

function deleteVideo(id) {
    list.splice(id, 1);
    setupList();
}

function moveVideo(id) {
    console.log(id);
}




document.addEventListener('DOMContentLoaded', startPlaylist);
document.addEventListener('onresize', setupList);
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
document.addEventListener('mousemove', mouseMove);


// Colors: https://coolors.co/040f0f-248232-2ba84a-2d3a3a-fcfffc