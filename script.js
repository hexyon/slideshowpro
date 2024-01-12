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
    document.getElementById('status').innerText = 'On: ';
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
    slideshowInterval = null; // Add this line
}

document.getElementById('delay').addEventListener('change', function() {
    if (slideshowInterval) {
        startSlideshow();
    }
});

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

// Add event listeners for arrow keys
document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft') {
        previousImage();
    }
    else if (event.code == 'ArrowRight') {
        nextImage();
    }
});

// Function to show the previous image
function previousImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else if (loop) {
        currentIndex = images.length - 1; // Loop back to the last image
    }
    updateSlideshow();
}

// Function to show the next image
function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else if (loop) {
        currentIndex = 0; // Loop back to the first image
    }
    updateSlideshow();
}

// Function to update the slideshow
function updateSlideshow() {
    let img = document.createElement('img');
    img.src = images[currentIndex];
    document.getElementById('slideshow').innerHTML = '';
    document.getElementById('slideshow').appendChild(img);
    updateProgressBar();
}

document.getElementById('arrow-left').addEventListener('click', function() {
    previousImage();
});

document.getElementById('arrow-right').addEventListener('click', function() {
    nextImage();
});


document.getElementById('arrow-left').addEventListener('mouseover', function() {
    if (document.fullscreenElement) {
        this.style.opacity = '1';
    }
});

document.getElementById('arrow-right').addEventListener('mouseover', function() {
    if (document.fullscreenElement) {
        this.style.opacity = '1';
    }
});

document.getElementById('arrow-left').addEventListener('mouseout', function() {
    this.style.opacity = '0';
});

document.getElementById('arrow-right').addEventListener('mouseout', function() {
    this.style.opacity = '0';
});

document.getElementById('fullscreen-container').addEventListener('mousemove', function() {
    if (document.fullscreenElement) {
        document.getElementById('arrow-left').style.display = 'block';
        document.getElementById('arrow-right').style.display = 'block';
    }
});

document.getElementById('fullscreen-container').addEventListener('mouseleave', function() {
    document.getElementById('arrow-left').style.display = 'none';
    document.getElementById('arrow-right').style.display = 'none';
});

document.getElementById('fullscreen-container').addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        document.getElementById('arrow-left').style.display = 'none';
        document.getElementById('arrow-right').style.display = 'none';
    }
});

