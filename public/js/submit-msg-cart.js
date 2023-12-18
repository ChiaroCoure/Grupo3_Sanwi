window.addEventListener('load', function(){
  const btnSubmit = document.querySelector('#products-cart__submit')
  const $popupTemplate = document.querySelector('#product_popup_template').content
  const $fragment = document.createDocumentFragment()
  const $main = document.querySelector('main')

  btnSubmit.addEventListener('click', function(e){
    e.preventDefault()
    $popupTemplate.querySelector('h3').textContent = 'Mensaje enviado correctamente'
    $popupTemplate.querySelector('div').classList.add('product__popup-success')
    $popupTemplate.querySelector('img').src = '/img/icons/checklist.png'
    $popupTemplate.querySelector('img').alt = 'Mensaje enviado'

    let $clone = document.importNode($popupTemplate, true)
    $fragment.appendChild($clone)
    $main.appendChild($fragment)
    setTimeout(() => {
      $main.removeChild(document.querySelector('.product__popup'))
    }, 15 * 1000);

    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
    
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
    
      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  })
})