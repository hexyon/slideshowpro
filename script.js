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
    this.dataset.start = 'on';
    document.getElementById('stop').dataset.stop = 'off';
    startSlideshow();
});

document.getElementById('stop').addEventListener('click', function() {
    this.dataset.stop = 'on';
    document.getElementById('start').dataset.start = 'off';
    stopSlideshow();
});

document.getElementById('random').addEventListener('click', function() {
    random = !random;
    this.dataset.random = random ? 'on' : 'off';
    if (random) {
        shuffleImages();
    }
});

document.getElementById('fullscreen').addEventListener('click', function() {
    document.getElementById('fullscreen-container').requestFullscreen();
    document.getElementById('progress-bar-container').style.display = 'block'; /* Add this line */
});

document.getElementById('loop').addEventListener('click', function() {
    loop = !loop;
    this.dataset.loop = loop ? 'on' : 'off';
});

function startSlideshow() {
    if (images.length === 0) {
        return; // Don't start the slideshow if there are no images
    }
    stopSlideshow();
    document.getElementById('start').dataset.start = 'on'; // Set the start button to 'on' when the slideshow starts
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
    document.getElementById('start').dataset.start = 'off'; // Set the start button to 'off' when the slideshow ends
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft') {
        previousImage();
    }
    else if (event.code == 'ArrowRight') {
        nextImage();
    }
});

function previousImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else if (loop) {
        currentIndex = images.length - 1; // Loop back to the last image
    }
    updateSlideshow();
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else if (loop) {
        currentIndex = 0; // Loop back to the first image
    }
    updateSlideshow();
}

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
        document.getElementById('progress-bar-container').style.display = 'none';
    }
});

document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('touchstart', function() {
        this.classList.add('touched');
    });

    button.addEventListener('touchend', function() {
        this.classList.remove('touched');
    });
});
