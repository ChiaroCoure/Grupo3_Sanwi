const togglePassword = document.getElementById('toggle-password')
const inputPassword = document.getElementById('password')

const togglePasswordConfirm = document.getElementById('toggle-password-confirm')
const inputPasswordConfirm = document.getElementById('passwordRepeat')

if(togglePasswordConfirm && inputPasswordConfirm) {
  togglePasswordConfirm.addEventListener('click', function() {
    const type = inputPasswordConfirm.getAttribute('type') === 'password' ? 'text' : 'password'
    inputPasswordConfirm.setAttribute('type', type)
    this.setAttribute('src', type === 'text' ? '/img/icons/eye-slash.svg' : '/img/icons/eye.svg')  
  })
}

togglePassword.addEventListener('click', function() {
  const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password'
  inputPassword.setAttribute('type', type)
  this.setAttribute('src', type === 'text' ? '/img/icons/eye-slash.svg' : '/img/icons/eye.svg')  
})

