window.addEventListener('load', function(){
  const storedCart = this.localStorage.getItem('cart')
  const $tbody = document.querySelector('.products-cart__table tbody')
  const $form = document.querySelector('#products-cart__form')

  if(storedCart && storedCart !== '[]' ){
    const parsedCart = JSON.parse(storedCart)
    parsedCart.forEach(product => {
      const { id, name, imagePath, price } = product
      $tbody.innerHTML += `
      <tr>
        <td class="products-cart__product">
          <a href="/products/detail/${id}" class="products-cart__product-detail-image">
            <img class="products-cart__thumbnail-image" src="${imagePath}"
              alt="${name}">
          </a>
          <div class="products-cart__product-container">
            <a href="#" class="products-cart__product-detail-name">
              <p class="products-cart__product-name">
                ${name}
              </p>
            </a>                    
            <button class="products-cart__product-remove">Quitar</button>
          </div>
        </td>
        <td>
          <input type="number" name="quantity" max="20" min="1" value="1" id="quantity">
        </td>
        <td>
          <span>$${price}</span>
          <div>
            <label for="quantity">Cantidad</label>
            <input type="number" name="quantity" max="20" min="1" value="1" id="quantity">
          </div>
        </td>
        <td>$${price}
        </td>
      </tr>
      `
    })

    const $removeButtons = document.querySelectorAll('.products-cart__product-remove')

    $removeButtons.forEach($removeButton => {
      $removeButton.addEventListener('click', function() {        
        const $tr = this.closest('tr')
        const $a = $tr.querySelector('a')

        const id = $a.getAttribute('href').split('/').pop()
        const filteredCart = parsedCart.filter(product => product.id !== id)
        
        window.localStorage.setItem('cart', JSON.stringify(filteredCart))        
        $tr.remove()        
        location.reload()
      })
    })

    const $quantityInputs = document.querySelectorAll('input[name="quantity"]')

    $quantityInputs.forEach($quantityInput => {
      $quantityInput.addEventListener('change', function(e) {
        const $tr = this.closest('tr')
        
        const value = e.target.value < 1 ? 1 : e.target.value

        const $span = $tr.querySelector('td:nth-child(3) span')
        const price = +$span.textContent.slice(1)
        const $td = $tr.querySelector('td:nth-child(4)')
        $td.textContent = `$${value * price}`

      })

      $quantityInput.addEventListener('input', function(e) {
        const $tr = this.closest('tr')
        
        const value = e.target.value < 1 ? 1 : e.target.value

        const $span = $tr.querySelector('td:nth-child(3) span')
        const price = +$span.textContent.slice(1)
        const $td = $tr.querySelector('td:nth-child(4)')
        $td.textContent = `$${value * price}`

      })
    })
  } else if (!storedCart || storedCart === '[]') {
    $form.style.display = 'none'
    const $emptyCartTemplate = document.querySelector('#empty-cart').content
    const $fragment = document.createDocumentFragment()
    const $main= document.querySelector('main')

    const $clone = document.importNode($emptyCartTemplate, true)
    $fragment.appendChild($clone)
    $main.appendChild($fragment)

  }
  
})