const togglePassword = document.getElementById('toggle-password')
const inputPassword = document.getElementById('password')

togglePassword.addEventListener('click', function() {
  const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password'
  inputPassword.setAttribute('type', type)
  this.setAttribute('src', type === 'text' ? '/img/icons/eye-slash.svg' : '/img/icons/eye.svg')  
})

