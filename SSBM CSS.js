const characters = ['Dr. Mario', 'Mario', 'Luigi', 'Bowser', 'Peach', 'Yoshi', 'Donkey Kong', 'Captain Falcon', 'Ganondorf',
'Falco', 'Fox', 'Ness', 'Ice Climbers', 'Kirby', 'Samus', 'Zelda', 'Link', 'Young Link', 'Pichu', 'Pikachu',
'Jigglypuff', 'Mewtwo', 'Game and Watch','Marth', 'Roy']
const charValues = [31,28,27,23,24,30,19,27,26,26,32,25,40,37,16,25,23,23,28,29,23,31,21,33,31];
const keys = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80,
     65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77]


const buttons = document.querySelectorAll('.sbuttons');        // get all soundboard buttons
const audios = document.getElementsByClassName('audiofiles');       // get all audio elements
const CSSpngs = document.getElementsByClassName('CSSpng');          // get all CSS pngs
const portrait = document.querySelector('#portrait');
const soundboard = document.querySelector('#soundboard');
const vol = document.querySelector('#vol');
const selectedchar = document.querySelector('#selectedchar');
const keyboard = document.querySelector('#keyboard');

let visibility = () => {
    soundboard.classList.remove('hide');
    vol.classList.remove('hide');
    selectedchar.classList.remove('hide');
    keyboard.classList.remove('hide')
}
let volume = document.getElementById('volume');
let assignAudios = (value, character) => {
    for (let m = 0; m < 41; m++) {                                                                           // resets hide/show classes
        buttons[m].classList.remove('hide')
    }  
    for (let i = 0; i < value; i++) {
        audios[i].setAttribute("src",`Melee Character Sounds/${character}/${character}${i + 1}.wav`);       // for every audio element (up to the number of audio files), setAttribute src of audio
        buttons[i].addEventListener('click',() => 
        {
            audios[i].volume = volume.value;                                                                // on button click, play audio
            audios[i].currentTime = 0;
            audios[i].play()
            buttons[i].classList.add('playing');
        });                                                               // set div text, rework later
        buttons[i].classList.toggle('show');                                                                // show the divs
    }
    for (let j = value; j < 41; j++) {
        buttons[j].classList.toggle('hide');                                                                // hide the unused ones
    }
}

let assignKeys = (number) => {                              // assign data-key classes to audios/buttons
    for (let i = 0; i < number; i++) {
        audios[i].setAttribute('data-key', `${keys[i]}`);
        buttons[i].setAttribute('data-key', `${keys[i]}`);
    }
}
let removeKeys = (number) => {
    for (let i = 0; i < number; i++) {
        audios[i].removeAttribute('data-key');
        buttons[i].removeAttribute('data-key');
    }
}

window.addEventListener('keydown', e => {                                           // global keydown listeners
    const audiokey = document.querySelector(`audio[data-key='${e.keyCode}']`);      // select corresponding audio with key pressed
    if(!audiokey) return;
    audiokey.volume = volume.value;
    audiokey.currentTime = 0;
    audiokey.play();
    const keybutton = document.querySelector(`button[data-key='${e.keyCode}']`);
    keybutton.classList.add('playing');
});


let mainX = value => {
    CSSpngs[value].addEventListener('click', () => { 
        removeKeys(41);
        assignAudios(charValues[value], characters[value]);                                     
        assignKeys(charValues[value]);
        portrait.src = `Portraits/${value + 1}.png`;
        visibility();
        if(value == 15) {
            zsexception.forEach((e) => e.setAttribute('style','display: block'));
            zelda.style.color = '#00ff00'
        } else  zsbuttons();
    });
}


// zelda exception
const zsexception = document.querySelectorAll('.zsexception button');
const zelda = document.querySelector('.Zelda');
const sheik = document.querySelector('.Sheik');
let zsportrait = (ZS) => {
    portrait.src = `Portraits/${ZS}.png`;
}
let zsbuttons = () => zsexception.forEach((e) => e.setAttribute('style','display: none'));
let zs = () => {
    mainX(15);
    zelda.addEventListener('click',() => { 
        zsportrait('16');
        assignAudios(25, 'Zelda');
        assignKeys(25);
        sheik.style.color = '#ffffff'
        zelda.style.color = '#00ff00'
    });
    sheik.addEventListener('click', () => {
        zsportrait('16 Sheik');
        assignAudios(20, 'Sheik')
        assignKeys(20);
        sheik.style.color = '#00ff00';
        zelda.style.color = '#ffffff';
    });
}


let main = () => {
    for (let n = 0; n < 25; n++) {                              // on load, assign eventlisteners to all CSS pngs
        if (n != 15)
        mainX(n);            // main function: assigns audio, shows divs, assigns eventlisteners to buttons
    };
}

main();
zs();
function removeTransition(e) {
    if(e.propertyName == 'transform' || e.propertyName == 'outline-color')
    this.classList.remove('playing');
    else return;
}
buttons.forEach(key => key.addEventListener('transitionend', removeTransition))



