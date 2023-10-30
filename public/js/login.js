const d = document
const $popup = d.getElementById('popup')
const $closeBtn = d.getElementById('close-btn')

$closeBtn.addEventListener('click', () => {
  $popup.style.display = 'none'
})