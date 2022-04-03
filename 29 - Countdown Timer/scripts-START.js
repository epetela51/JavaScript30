let countdown
let timerDisplay = document.querySelector('.display__time-left')
let endTime = document.querySelector('.display__end-time')

//Grab buttons from HTMl
let buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timers at the start
    clearInterval(countdown)
    let now = Date.now()
    let then = now + seconds * 1000 // multiplaytion is to convert from miliseconds to seconds
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        let secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        //Display
        displayTimeLeft(secondsLeft)
    }, 1000);
}

function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    let display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    //updates the tab in the browser so it reflects the timer
    document.title = display;
}

function displayEndTime(timestamp) {
    let end = new Date(timestamp);
    let hour = end.getHours();
    //this is to convert the time from miltary to standard
    let adjustedHour = hour > 12 ? hour -12 : hour;
    let minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    let seconds = parseInt(this.dataset.time);
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))

// You can grab the name attribute from the HTML which 'customForm' is the value for the name attribute so we are listening for the submit on that 
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault() // prevents the default time being loaded
    let mins = this.minutes.value //grabs the value from the input
    timer(mins * 60) // timer runs in seconds so have to convert minutes to seconds
    this.reset() // resets the value in the text box
})