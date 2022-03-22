/* Get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build our function */

function togglePlay() {
    if(video.paused) {
        video.play()
    } else (
        video.pause()
    )
}

function updateButton() {
    let icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip); // parseFloat to convert it from a string to a number
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

// progress bar of the video
function handleProgress() {
    let percent = (video.currentTime / video.duration) * 100 //This gives a percentage of 50% instead of .05%

    //updates the progress bar for the video by updating the style of the bar to update in real time based on the percentage played
    progressBar.style.flexBasis = `${percent}%`;
}

// progress bar scrubbing
function scrub(e) {
    // grab the position of the click on the progress bar relative to the total width and then multiply by the video duration to get the amount of time to adjust the video
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


/* Hook up the event listeners */
// when you click the video player then play the video
video.addEventListener('click', togglePlay);

// updates the btn on player
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//this updates the progress bar throught video playing
video.addEventListener('timeupdate', handleProgress);

//when you click the play btn then play or pause
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


// when someone isn't clicking their mouse it's false
let mousedown = false;
progress.addEventListener('click', scrub);
//if mousedown is true it moves onto the scrub function
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);