window.addEventListener('load', function() {

  const $popupTemplate = document.querySelector('#product_popup_template').content
  const $fragment = document.createDocumentFragment()
  const $main = document.querySelector('main')
  
  const $h2 = document.querySelector('.product-detail__title')
  const $image = document.querySelector('.product-detail__default-image')
  const $price = document.querySelector('.product-detail__price')
  const $addToCartMainBtn = document.querySelector('#add-to-cart-main-btn')

  const $products = document.querySelectorAll('.product')
  
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

  const addProductToCart = (productToAdd) => {
    const storedCart = window.localStorage.getItem('cart')
  
    if(storedCart) {
      const parsedCart = JSON.parse(storedCart)
      const productInCart = parsedCart.find(product => product.id === productToAdd.id)

      if(!productInCart){
        window.localStorage.setItem('cart', JSON.stringify([...parsedCart, productToAdd]))
        $popupTemplate.querySelector('h3').textContent = 'Agregado al carrito'
        $popupTemplate.querySelector('div').classList.remove('product__popup-info')
        $popupTemplate.querySelector('div').classList.add('product__popup-success')
        $popupTemplate.querySelector('img').src = '/img/icons/checklist.png'
        $popupTemplate.querySelector('img').alt = 'Agregado al carrito'

        let $clone = document.importNode($popupTemplate, true)
        $fragment.appendChild($clone)
        $main.appendChild($fragment)
        setTimeout(() => {
          $main.removeChild(document.querySelector('.product__popup'))
        }, 3000);

      } else {
        $popupTemplate.querySelector('h3').textContent = 'Ya existe en el carrito'
        $popupTemplate.querySelector('div').classList.remove('product__popup-success')
        $popupTemplate.querySelector('div').classList.add('product__popup-info')
        $popupTemplate.querySelector('img').src = '/img/icons/info.png'
        $popupTemplate.querySelector('img').alt = 'Ya existe en el carrito'

        let $clone = document.importNode($popupTemplate, true)
        $fragment.appendChild($clone)
        $main.appendChild($fragment)
        setTimeout(() => {
          $main.removeChild(document.querySelector('.product__popup'))
        }, 3000);
      }

    } else {
      window.localStorage.setItem('cart', JSON.stringify([productToAdd]))
      $popupTemplate.querySelector('h3').textContent = 'Agregado al carrito'
      $popupTemplate.querySelector('div').classList.remove('product__popup-info')
      $popupTemplate.querySelector('div').classList.add('product__popup-success')
      $popupTemplate.querySelector('img').src = '/img/icons/checklist.png'
      $popupTemplate.querySelector('img').alt = 'Agregado al carrito'

      let $clone = document.importNode($popupTemplate, true)
      $fragment.appendChild($clone)
      $main.appendChild($fragment)
      setTimeout(() => {
        $main.removeChild(document.querySelector('.product__popup'))
      }, 3000);
    }
  }

  $products.forEach($product => {

    const currentProduct = {
      id: $product.querySelector('.product__id').textContent.trim(),
      name: $product.querySelector('.product__name').textContent.trim(),
      imagePath: $product.querySelector('.product_image').src,
      price: $product.querySelector('.product__price').textContent.trim().slice(1)
    }

    $product
    .querySelector('.product-detail__add-to-cart')
    .addEventListener('click', function() {
      addProductToCart(currentProduct)
    })
  })

  $addToCartMainBtn.addEventListener('click', function() {
    addProductToCart(product)
  })
  
})