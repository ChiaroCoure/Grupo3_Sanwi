window.addEventListener('load', function(){
  
  const $h2 = document.querySelector('.product-detail__title')
  const $image = document.querySelector('.product-detail__default-image')
  const $price = document.querySelector('.product-detail__price')
  const $addToCartMainBtn = document.querySelector('#add-to-cart-main-btn')
  
  const url = window.location.href
  const id = url.split('/').pop()
  
  const imagePath = $image.src
  const name = $h2.textContent.trim()
  const price = $price.textContent.trim().slice(2)
  
  const product = {
    id,
    name,
    imagePath,
    price
  }

  $addToCartMainBtn.addEventListener('click', function(){    
    const storedCart = window.localStorage.getItem('cart')
  
    if(storedCart){
      const parsedCart = JSON.parse(storedCart)
      const productInCart = parsedCart.find(product => product.id === id)
      if(!productInCart){
        window.localStorage.setItem('cart', JSON.stringify([...parsedCart, product]))
        console.log('update cart');
      }
    }else{
      window.localStorage.setItem('cart', JSON.stringify([product]))
      console.log('add cart');
    }
  })
  

})