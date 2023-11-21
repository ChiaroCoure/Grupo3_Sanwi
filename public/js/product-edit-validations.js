window.addEventListener('load', function(){
  const d = document
  const $form = d.querySelector('.load-form')

  console.log($form);

  $form.addEventListener('submit', function(e){
    const data = Object.fromEntries(new FormData(e.target));
    console.log({data})
    const valuesFromData = Object.values(data)
    
    if(valuesFromData.includes('')) {
      e.preventDefault()
    }
    
    for (const [key, value] of Object.entries(data)) {
      const $error = d.querySelector(`[data-error="${key}"]`)

      if((!value && $error === null)) {
        const $error = d.createElement('p')
        $error.style.color = '#CD3333'
        $error.style.marginTop = '10px'
        $error.setAttribute('data-error', key)
        const input = d.querySelector(`[name="${key}"]`)
        const $parent = input.parentElement
        $error.textContent = 'El campo es obligatorio'
        $parent.appendChild($error)        
      } else if(value) {
        const $error = d.querySelector(`[data-error="${key}"]`)
        if($error){
          $error.remove()
        }
      }
      
    }
  })

})