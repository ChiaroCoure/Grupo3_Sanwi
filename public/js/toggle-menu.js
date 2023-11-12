window.addEventListener('load', function(){

  const $menuBtn = document.querySelector('.home-menu-hamburguesa-no-tan-hamburguesa')

  const $menu = document.querySelector('#menu')
  
  $menuBtn.addEventListener('click', () => {
    $menu.classList.toggle('menu-active')
  })
})
