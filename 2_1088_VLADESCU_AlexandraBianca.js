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


let container = document.querySelector('#right-side');

let containerX;
let containerY;
let itemH = 100;
let itemW = container.getBoundingClientRect().width - containerX;
let marginBottom = 10;

let listItems = [];

function setupList() {
    containerX = container.getBoundingClientRect().x;
    containerY = container.getBoundingClientRect().y;

    for (let item=0; item < list.length; item++) {

        listItems[item] = document.createElement('div');
        listItems[item].className = "card";
        let title = document.createElement('h3');

        title.innerText= list[item].title;

        listItems[item].appendChild(title);

        container.appendChild(listItems[item]);

        list[item].x = listItems[item].getBoundingClientRect().x;
        list[item].y = listItems[item].getBoundingClientRect().y;
        
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
                            my <= list[i].y+itemH;
            
    
            if (itemArea) {
                playItem(i);               
            } else {
                finishItem(i);
            }
        }
    }

}

function playItem(i) {
    // setInterval(() => {
        text.innerText = list[i].title;
        listItems[i].style = 'background-color: rgb(45, 58, 58, 0.3);';
    // }, 1000);
}

function finishItem(i) {
    listItems[i].style = 'background-color: #040F0F;';

}


function mouseUp() {
    display.appendChild(text);
}

function startPlaylist() {
    setupList();


    for (let i=0; i<listItems.length; i++) {
        // setTimeout(() => {
        //     playItem(i);
    
        //     setTimeout(() => {
        //         finishItem(i);
               
        //     }, 5000);
        // }, 20);

        // if (i===listItems.length-1) {
        //     i=0;
        // }
    }

}


document.addEventListener('DOMContentLoaded', startPlaylist);
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
document.addEventListener('mousemove', mouseMove);


// Colors: https://coolors.co/040f0f-248232-2ba84a-2d3a3a-fcfffc