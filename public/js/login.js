const d = document

window.addEventListener('load', function(){
  const $popup = d.getElementById('popup')
  const $closeBtn = d.getElementById('close-btn')

  if($closeBtn){
    $closeBtn.addEventListener('click', () => {
      $popup.style.display = 'none'
    })
  }
  
})