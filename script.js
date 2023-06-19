let images = [];
let currentIndex = 0;
let slideshowInterval;
let random = false;

function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.type.startsWith('image/')){ continue }
        images.push(URL.createObjectURL(file));
    }
}

document.getElementById('start').addEventListener('click', function() {
    document.getElementById('status').innerText = 'Active: Start Slideshow';
    startSlideshow();
});

document.getElementById('stop').addEventListener('click', function() {
    document.getElementById('status').innerText = 'Active: Stop Slideshow';
    stopSlideshow();
});

document.getElementById('random').addEventListener('click', function() {
    document.getElementById('status').innerText = 'Active: Randomize Slideshow';
    random = !random;
    if (random) {
        shuffleImages();
    }
});

document.getElementById('fullscreen').addEventListener('click', function() {
    document.getElementById('status').innerText = 'Active: Full Screen';
    document.getElementById('fullscreen-container').requestFullscreen();
});

function startSlideshow() {
    stopSlideshow();
    slideshowInterval = setInterval(function() {
        if (currentIndex >= images.length) {
            document.getElementById('slideshow').innerText = 'Slideshow Ended';
            stopSlideshow();
            currentIndex = 0; // Reset index after slideshow ends
            return;
        }
        let img = document.createElement('img');
        img.src = images[currentIndex++];
        document.getElementById('slideshow').innerHTML = '';
        document.getElementById('slideshow').appendChild(img);
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
