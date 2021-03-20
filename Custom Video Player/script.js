const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')
const volume = document.getElementById('volume')

// Play and pause video
function toggleVideoStatus() {
	// HTML5 video element API
	if (video.paused) {
		video.play()
	} else {
		video.pause()
	}
}

// Update play/pause icon
function updatePlayIcon() {
	if (video.paused) {
		play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
	} else {
		play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
	}
}

// Update progress and timestamp
function updateProgress() {
	progress.value = (video.currentTime / video.duration) * 100

	// Get minutes
	let mins = Math.floor(video.currentTime / 60)
	if (mins < 10) {
		mins = '0' + String(mins)
	}

	// Get seconds
	let secs = Math.floor(video.currentTime % 60)
	if (secs < 10) {
		secs = '0' + String(secs)
	}

	timestamp.innerText = `${mins}:${secs}`
}

// Set video time to progress
function setVideoProgress() {
	video.currentTime = (+progress.value * video.duration) / 100
}

// Set audio volume
function setVolume() {
	video.volume = this.value
}

// Stop video
function stopVideo() {
	// HTML5 video element API
	video.currentTime = 0
	video.pause()
}

// Event listeners
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus)

stop.addEventListener('click', stopVideo)

video.addEventListener('click', toggleVideoStatus)

progress.addEventListener('change', setVideoProgress)

volume.addEventListener('mousemove', setVolume)
