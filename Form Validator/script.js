const form = document.getElementById('form')
const email = document.getElementById('email')
const username = document.getElementById('username')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')

// Show input error message
function showError(input, message) {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = message
}

function showSuccess(input) {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
}

function checkEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (re.test(email.value)) {
		showSuccess(email)
	} else {
		showError(email, 'Email is not valid')
	}
}

// Check required fields
function checkRequired(inputArray) {
	inputArray.forEach((input) => {
		if (!input.value) {
			showError(input, `${getFieldName(input)} is required`)
		} else {
			showSuccess(input)
		}
	})
}

// Check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters long`
		)
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters long`
		)
	} else {
		showSuccess(input)
	}
}

// Check if passwords match
function checkPasswordsMatch() {
	if (password.value !== confirmPassword.value) {
		showError(confirmPassword, 'Passwords do not match')
	}
}

// Get field name
function getFieldName(input) {
	const field = input.id
	return field[0].toUpperCase() + field.substr(1)
}

// Event listeners
form.addEventListener('submit', function (e) {
	e.preventDefault()

	checkRequired([username, email, password, confirmPassword])
	checkLength(username, 3, 15)
	checkLength(password, 6, 25)
	checkEmail(email)
	checkPasswordsMatch()
})
