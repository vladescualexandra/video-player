/* Media */
const url0 = 'media/video0.mp4';
const url1 = 'media/video1.mp4';
const url2 = 'media/video2.mp4';
const url3 = 'media/video3.mp4';
const url4 = 'media/video4.mp4';

let json0 = 'media/video0.json';

let list = [{
        title: 'Caption settings on YouTube',
        url: url0, 
        subtitles: json0
    },
    {
        title: 'video1',
        url: url1, 
        subtitles: json0
    },
    {
        title: 'video2',
        url: url2, 
        subtitles: json0
    },
    {
        title: 'video3',
        url: url3, 
        subtitles: json0
    },
    {
        title: 'video4',
        url: url4, 
        subtitles: json0
    }];


/* DOM Elements */
let canvas, context, video, source, container;
let display;
let addVideoBtn;
let listItems;
let fxForm;

/* Mouse coordinates in canvas */
let mx = 0, my = 0;

/* Canvas dimensios */
let W, H;

/* Container (playlist) dimensions */
let containerW;
let containerH;
let containerX;
let containerY;

/* Playlist item height */
let itemH;

/* Size of: prev, play/pause, next */
let buttonSize;

/* Volume Bar */
let volumeBarWidth;

let index = 0; // The video that is currently playing.

    
let frameW;
let frameH;
let auxVideo;

/* Starting points */
let volumeX;
let subtitlesX;

let pb; // progress Bar - how much progress of the video is done

/* Controls bar */
let controlsBarY ;
let progressBarH; 
let controlsBarUnderPBy;


/* Effects switches*/
let bw = false;
let redTint, greenTint, blueTint;
let speedRateBar;
let subtitlesSwitch = false;
let volumeLevel;


/* Captions/Subtitles */
let captions;
let captionsArray;


/* Function that starts the playlist */
function startPlaylist() {
    setup();
    next(0);    
    
    video.addEventListener("ended", () => {
        next(1);
    });

    canvas.addEventListener('click', canvasClick);
}

/* Functions for the setup */
function setup() {
    initComponents();
    initDimensions();
    initPlaylist();

    if (window.sessionStorage) {
        getStorage();
    }
}

/* Mouse functions */
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

async function mouseMove(e) {
    mx = e.x;
    my = e.y;

    if (my >= canvas.getBoundingClientRect().y + H-0.05*H) {
        if (my <= canvas.getBoundingClientRect().y + H-0.05*H + 0.02*H) {
            mx = e.x - canvas.getBoundingClientRect().x;

            await auxVideo.play();
            auxVideo.currentTime = mx * video.duration / W;
            await auxVideo.pause();
            drawFrame();
        } 
    }   
}

function canvasClick(e) {
    mx = e.x - canvas.getBoundingClientRect().x;

    if (my >= canvas.getBoundingClientRect().y + controlsBarY) {
        if (my <= canvas.getBoundingClientRect().y + controlsBarY + progressBarH) {
            video.currentTime = mx * video.duration / W;
        } else {
            let buttonIndex = Math.floor(mx / buttonSize);
            switch (buttonIndex) {
                case 0: // prev
                    next(-1);
                    break;
                case 1: // play/pause
                    video.paused ? video.play() : video.pause();
                    break;
                case 2: // next
                    next(1);
                    break;
            }

            if (mx >= volumeX && mx <= volumeX + volumeBarWidth) {
                let vol = mx - volumeX;
                video.volume = vol / volumeBarWidth;
                volumeLevel = vol / 100;
                window.sessionStorage.setItem('volume', volumeLevel);
            } 

            if (mx >= subtitlesX - canvas.getBoundingClientRect().x
                && mx <= subtitlesX - canvas.getBoundingClientRect().x + volumeBarWidth) {
                setSubtitles();
            }

        }
    }  
}

/* Auxiliar functions */
    /* DOM Elements */
    function initComponents() {
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        video = document.querySelector('video');
        source = document.querySelector('#videoSource');
        container = document.querySelector('#container');
        display = document.querySelector('#left-side');
        auxVideo = document.createElement('video');
        addVideoBtn = document.querySelector('#btnAdd');
        addVideoBtn.addEventListener('change', addNewVideo, false);
        fxForm = document.querySelector('#fxForm');
        fxForm.getBoundingClientRect().x  = 200;
        //= canvas.getBoundingClientRect().x;
    
        speedRateBar = document.querySelector('#speedRate');
    }
    
    /* Dimensions */
    function initDimensions() {
        W = canvas.width = 0.9 * display.getBoundingClientRect().width;
        H = canvas.height = 0.6 * display.getBoundingClientRect().height;
    
        let marginLR = (display.getBoundingClientRect().width - W) / 2;
        let marginTB = (display.getBoundingClientRect().height - H) / 2;
        
        containerW = container.getBoundingClientRect().width;
        containerH = container.getBoundingClientRect().height;
        containerX = container.getBoundingClientRect().x;
        containerY = container.getBoundingClientRect().y;
    
        canvas.style = `margin-left: ${marginLR}px; 
                        margin-top: ${marginTB}px;`;
    
        buttonSize = 0.05 * W;
        volumeBarWidth = 0.2 * W;
        volumeX = buttonSize * 5;
        subtitlesX = buttonSize * 13;
    }
    
    /* Playlist */
    function initPlaylist() {
        listItems = [];  
    
        container.innerHTML = ""
    
        for (let item=0; item < list.length; item++) {
    
            listItems[item] = document.createElement('div');
            listItems[item].className = "card";
         
            let vidDim = containerW / 3;
    
            listItems[item].innerHTML = `<video width="${vidDim}" 
                            alt="video-preview"
                            style="margin-top: 10px; 
                            margin-bottom: 10px;">
                            <source src=${list[item].url} type="video/mp4">
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

/* Storage */
function getStorage() {

    index = parseInt(window.sessionStorage.getItem('index'));
    volumeLevel = parseFloat(window.sessionStorage.getItem('volume'));
    subtitlesSwitch =  window.sessionStorage.getItem('subtitles') == 'true';
    redTint =  window.sessionStorage.getItem('redTint') == 'true';
    document.querySelector('#red').checked = redTint;
    greenTint =  window.sessionStorage.getItem('greenTint') == 'true';
    document.querySelector('#green').checked = greenTint;
    blueTint =  window.sessionStorage.getItem('blueTint') == 'true';
    document.querySelector('#blue').checked = blueTint;
    bw =  window.sessionStorage.getItem('bw') == 'true';
    document.querySelector('#bw').checked = bw;
    speedRateBar.value = parseFloat(window.sessionStorage.getItem('speedRate')); 
}

/* Actions on playlist */
function addNewVideo() {

    let file = this.files[0];
    let fileURL = URL.createObjectURL(file);
    list.push({
        url: fileURL
    });    
    setup();
}

function deleteVideo(id) {
    list.splice(id, 1);
    console.log("Deleted item " + id)
    setup();
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
                setup();
                console.log("Moved from " + id + " to " + i);
            });  
        }
    }
}

/* Playing and finishing video */
async function playItem(i) {
    listItems[i].style = 'background-color: rgb(45, 58, 58, 0.3);';
    video.src = list[i].url;
    auxVideo.src = video.src;
    auxVideo.muted = 'true';
    await auxVideo.load();
    await video.load();
    await video.play();
    video.muted = false;
    readFromJson(list[i].subtitles);
    drawVideo();
    index = i;
    window.sessionStorage.setItem('index', index);

}

function finishItem(i) {
listItems[i].style = 'background-color: #040F0F;';
}

function next(delta) {
    finishItem(index);
    index = index + delta;
    if (index >= list.length) {
        index = 0;
    }

    if (index < 0) {
        index = list.length - 1;
    }
    window.sessionStorage.setItem('index', index);
    playItem(index);

}


/* Drawing the video */
function drawVideo() {
    context.drawImage(video, 0, 0, W, H);
    let imageData = context.getImageData(0, 0, W, H);
    let v = imageData.data;

    if (bw) {
        for (let i=0; i<v.length; i+= 4) {
            let avg = (v[i] + v[i+1] + v[i+2]) / 3;
            v[i] = avg;
            v[i+1] = avg;
            v[i+2] = avg;
        }
    } 

    for (let i=0; i<v.length; i+= 4) {
        let avg = (v[i] + v[i+1] + v[i+2]) / 3;
        if (redTint) v[i] = avg;
        if (greenTint) v[i+1] = avg;
        if (blueTint) v[i+1] = avg;
    }

    context.putImageData(imageData, 0, 0);

    if (subtitlesSwitch) {
        drawCaptions();
    }

    drawControls();
    requestAnimationFrame(drawVideo);
}

/* Drawing the frames */
async function drawFrame() {
    frameW = 0.2 * W;
    frameH = 0.2 * H;

    context.beginPath();        
    context.moveTo(0, 0);
    context.rect(mx - frameW/2, controlsBarY - 0.1*frameH, frameW, -frameH);
    context.fill();

    context.drawImage(auxVideo, mx - frameW/2, controlsBarY - 0.1*frameH, frameW, -frameH);

    requestAnimationFrame(drawFrame);
}

/* Drawing the controls */
function drawControls() {

    controlsBarY = H - 0.07 * H;
    progressBarH = 0.02 * H; 
    controlsBarUnderPBy = controlsBarY + progressBarH;
    // desenare bara controale
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, controlsBarY, W, H);


    // desenare progress bar
    context.fillStyle = 'rgba(255, 0, 0, 0.7)';
    pb = (video.currentTime * W) / video.duration;
    context.fillRect(0, controlsBarY, pb, progressBarH);
   
    // desenare butoane 
    context.fillStyle = 'rgb(255, 255, 255, 0.7)';
    context.strokeStyle = 'rgb(255, 255, 255, 0.7)';
    context.lineWidth = 2;

    let paddingLR = 5;
    let paddingTB = 2;
    
    // button back
    context.beginPath();
    context.moveTo(buttonSize - paddingLR, controlsBarUnderPBy + paddingTB);
    context.lineTo(paddingLR, controlsBarUnderPBy + (H - controlsBarUnderPBy)/2);
    context.lineTo(buttonSize - paddingLR, H - paddingTB);
    context.stroke();

    // button play/pause 
    if (video.paused) {
        context.beginPath();
        context.moveTo(buttonSize  + paddingLR, controlsBarUnderPBy + paddingTB);
        context.lineTo(buttonSize * 2, controlsBarUnderPBy + (H - controlsBarUnderPBy)/2);
        context.lineTo(buttonSize  + paddingLR, H - paddingTB);
        context.fill();
    } else {
        context.beginPath();
        context.moveTo(buttonSize * 1.33 + paddingLR, controlsBarUnderPBy + paddingTB);
        context.lineTo(buttonSize * 1.33 + paddingLR, H - paddingTB);
        context.moveTo(buttonSize * 1.67 - paddingLR, controlsBarUnderPBy + paddingTB);
        context.lineTo(buttonSize * 1.67 - paddingLR, H - paddingTB);
        context.stroke();
    }

    // button next
    context.beginPath();
    context.moveTo(buttonSize * 2 + paddingLR, controlsBarUnderPBy + paddingTB);
    context.lineTo(buttonSize * 3 - paddingLR, controlsBarUnderPBy + (H - controlsBarUnderPBy)/2);
    context.lineTo(buttonSize * 2 + paddingLR, H - paddingTB);
    context.stroke();

    // desenare buton volum
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    context.font = '5pt Tahoma';
    context.fillText('Volume', buttonSize * 4.5, controlsBarUnderPBy + (H-controlsBarUnderPBy)/2); 

    context.strokeStyle = 'gray';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(buttonSize * 5, controlsBarUnderPBy + (H-controlsBarUnderPBy)/2);
    context.lineTo(buttonSize * 5 + volumeBarWidth, controlsBarUnderPBy + (H-controlsBarUnderPBy)/2);
    context.stroke();

    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(buttonSize * 5, controlsBarUnderPBy + (H-controlsBarUnderPBy)/2);
    context.lineTo(buttonSize * 5 + volumeLevel * 100, controlsBarUnderPBy + (H-controlsBarUnderPBy)/2);
    context.stroke();

    // desenare control subtitrari
    context.fillStyle = 'rgb(255, 255, 255, 0.7)';
    context.strokeStyle = 'rgb(255, 255, 255, 0.7)';
    let sub = 'Subtitles: ' + (subtitlesSwitch ? 'On' : 'Off');  
    context.fillText(sub, subtitlesX, controlsBarUnderPBy + (H-controlsBarUnderPBy)/2);

    requestAnimationFrame(drawControls);
}

/* Drawing the captions */
let i = 0;
function drawCaptions() {

    if (captionsArray[i]) {
        if (video.currentTime < parseFloat(captionsArray[i+1].timestamp)) {
            context.beginPath();
            context.fillStyle = 'black';
            context.moveTo(0, controlsBarY - 0.1 * H);
            context.rect(0, controlsBarY - 0.1 * H, W, 20);
            context.fill();

            context.beginPath();
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.textBaseline = 'left';
            context.font = '7pt Tahoma';
            context.fillText(captionsArray[i].caption, W/2, controlsBarY - 0.1 * H + 10);
        } else {
            if (i < captionsArray.length - 1) {
                i++;
            }
        
        }
    }   
}

/* Switching the effects */
function setSubtitles() {
    subtitlesSwitch = !subtitlesSwitch;
    window.sessionStorage.setItem('subtitles', subtitlesSwitch);
}

function setTint(id) {
    switch(id) {
        case 0:
            redTint = !redTint;
            window.sessionStorage.setItem('redTint', redTint);
            break;
        case 1:
            greenTint = !greenTint;
            window.sessionStorage.setItem('greenTint', greenTint);
            break;
        case 2:
            blueTint = !blueTint;
            window.sessionStorage.setItem('blueTint', blueTint);
            break;
    }
}


function setBW() {
    bw = !bw;
    window.sessionStorage.setItem('bw', bw);
}

function changeSpeedRate() {
    video.playbackRate = speedRateBar.value / 100;
    window.sessionStorage.setItem('speedRate', speedRateBar.value);
}


/* Reading the subtitles from url and putting them in an array */ 
async function readFromJson(json) {

    captionsArray = [];

    let raspuns = await fetch(json);
    captions = await raspuns.json();

    let i=0;
    for (let item in captions) {
        let c = {};
        c.timestamp = item;
        c.caption = captions[item];
        captionsArray.push(c);
    }
    captionsArray.sort();
}

document.addEventListener('DOMContentLoaded', startPlaylist);
document.addEventListener('onresize', setup);
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mousemove', mouseMove);
