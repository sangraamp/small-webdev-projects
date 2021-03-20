const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

// After populateUI because movieSelect gets updated
let ticketPrice = parseInt(movieSelect.value)

// Set initial seats count and total
updateSelectedCountAndTotal()

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex)
	localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateSelectedCountAndTotal() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected')

	/* Copy the selected seats into an array, Map through array,
	Return a new array of indexes of selected seats */
	const seatsArr = Array.from(seats) /* === [...seats] */
	const selectedSeatsIndices = [...selectedSeats].map((seat) =>
		seatsArr.indexOf(seat)
	)

	localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndices))

	const selectedSeatsCount = selectedSeats.length

	count.innerText = selectedSeatsCount
	total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from local storage and populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

	if (selectedSeats !== null && selectedSeats.length > 0) {
		selectedSeats.forEach((seat) => seats[seat].classList.add('selected'))
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex
	}
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
	ticketPrice = parseInt(e.target.value)

	setMovieData(e.target.selectedIndex, e.target.value)

	updateSelectedCountAndTotal()
})

// Seat click event
container.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected')

		updateSelectedCountAndTotal()
	}
})
