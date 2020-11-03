const url1 = 'media/video1.mp4';
const url2 = 'media/video2.mp4';
const url3 = 'media/video3.mp4';
const url4 = 'media/video4.mp4';
const url5 = 'media/video5.mp4';

let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
console.log(canvas)
let W = canvas.clientWidth;
let H = canvas.clientHeight;

let video = document.createElement('img');
video.src = 'media/placeholder.jpg';

function videoSetup() {

    // video.addEventListener('load', e => {
    //     let vW = video.naturalWidth; // TODO
    // let vH = video.naturalHeight; // TODO

    // let f = Math.min(H/vH, W/vW);

    // context.drawImage(video,
    //     0, 0, vW, vH,
    //     (W-f*vW)/2, (H-f*vH)/2, 
    //     f * vW, f * vH);
    // });
    
    
}

document.addEventListener('DOMContentLoaded', videoSetup);   