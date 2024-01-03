let images = [];
let currentIndex = 0;
let slideshowInterval;
let random = false;
let loop = false;

function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.type.startsWith('image/')){ continue }
        images.push(URL.createObjectURL(file));
    }
}

document.getElementById('start').addEventListener('click', function() {
    document.getElementById('status').innerText = 'On: Start Slideshow';
    startSlideshow();
});

document.getElementById('stop').addEventListener('click', function() {
    document.getElementById('status').innerText = 'On: Stop Slideshow';
    stopSlideshow();
});

document.getElementById('random').addEventListener('click', function() {
    document.getElementById('status').innerText = 'On: Randomize Slideshow';
    random = !random;
    if (random) {
        shuffleImages();
    }
});

document.getElementById('fullscreen').addEventListener('click', function() {
    document.getElementById('status').innerText = 'On: Full Screen';
    document.getElementById('fullscreen-container').requestFullscreen();
});

document.getElementById('loop').addEventListener('click', function() {
    loop = !loop;
    document.getElementById('loopstatus').innerText = loop ? 'Loop: On' : 'Loop: Off';
    if (loop && !slideshowInterval) {
        startSlideshow();
    }
});

function startSlideshow() {
    stopSlideshow();
    slideshowInterval = setInterval(function() {
        if (currentIndex >= images.length) {
            if (loop) {
                currentIndex = 0; // Reset index for looping
            } else {
                fadeOutSlideshow();
                stopSlideshow();
                currentIndex = 0; // Reset index after slideshow ends
                return;
            }
        }
        let img = document.createElement('img');
        img.src = images[currentIndex++];
        document.getElementById('slideshow').innerHTML = '';
        document.getElementById('slideshow').appendChild(img);
        updateProgressBar();
    }, document.getElementById('delay').value * 1000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
}

function shuffleImages() {
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
}

function updateProgressBar() {
    let progressBar = document.getElementById('progress-bar');
    let progress = (currentIndex / images.length) * 100;
    progressBar.style.width = progress + '%';
}

function fadeOutSlideshow() {
    document.getElementById('slideshow').style.transition = "opacity 1s ease-in-out";
    document.getElementById('slideshow').style.opacity = 0;
}
