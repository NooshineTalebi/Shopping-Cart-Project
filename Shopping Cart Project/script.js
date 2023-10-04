
const products = [
    {
        id: 1,
        name: 'iphone 12',
        price: 99,
        image: './images/iphone-12.png',
    },
    {
        id: 2,
        name: 'AirPods',
        price: 89,
        image: './images/airpods.png',
    }
]

let cart = {
    items: [],
    total: 0,
}



const renderProducts = () => {
    const productsDiv = document.querySelector('.products')
    productsDiv.innerHTML = ''

    products.forEach((item, index) => {
        // ایجاد محصول در ساختار سه ستونه
        const productDiv = document.createElement('div')
        productDiv.classList.add('col-md-4', 'product')
        productDiv.innerHTML = `
      <div class="product__image">
        <img src="${item.image}">
      </div>
      <h2 class="product__title">${item.name}</h2>
      <h3 class="product__price">${item.price} تومان</h3>
      <button class="add-to-cart" onclick="addToCart(${index})">افزودن به سبد خرید</button>
    `

        productsDiv.appendChild(productDiv)
    })
}



const renderCartItems = () => {
    const cartDiv = document.querySelector('.cart__items')
    cartDiv.innerHTML = ''

    if (cart.items.length === 0) {
        cartDiv.innerHTML = 'محصولی در سبد خرید وجود ندارد'
    }

    let totalPrice = 0
    const totalPriceEl = document.querySelector('.cart__total-price')

    cart.items.map((item) => {
        totalPrice += item.total

        // ایجاد ردیف سه ستونه با استفاده از کلاس CSS جدید
        const cartItemDiv = document.createElement('div')
        cartItemDiv.classList.add('row', 'cart__item-grid')

        const titleDiv = document.createElement('div')
        titleDiv.innerHTML = `
  <h3 class="cart__item-title">${item.name}</h3>
`
        cartItemDiv.appendChild(titleDiv)

        const qtyDiv = document.createElement('div')
        qtyDiv.innerHTML = `
  <h3 class="cart__item-qty">تعداد: ${item.qty}</h3>
`
        cartItemDiv.appendChild(qtyDiv)

        const removeDiv = document.createElement('div')
        removeDiv.innerHTML = `
  <button class="cart__item-remove" onclick= "removeFromCart('${item.name}')">حذف</button>
`
        cartItemDiv.appendChild(removeDiv)


        cartDiv.appendChild(cartItemDiv)
    })

    totalPriceEl.innerHTML = `مجموع : ${totalPrice} تومان `
}





const addToCart = (productIndex) => {
    const product = products[productIndex]

    let existingProduct = false

    let newCartItems = cart.items.map((item) => {
        if (item.name === product.name) {
            existingProduct = true

            const newItem = {
                ...item,
                qty: item.qty + 1,
                total: (item.qty + 1) * item.price,
            }
            return newItem
        }
        return item
    })

    if (!existingProduct) {
        newCartItems.push({
            ...product,
            qty: 1,
            total: product.price,
        })
    }

    cart = {
        ...cart,
        items: newCartItems,
    }

    renderCartItems()
}

const removeFromCart = (productName) => {
    let newCartItems = cart.items.reduce((state , item) => {
        if(item.name == productName){
            const newItem = {
                ...item,
                qty: item.qty - 1,
                total:  (item.qty - 1) * (item.price),
            }

            if(newItem.qty > 0){
                return [...state , newItem];
            } else {
                return state;
            }
        }

        return[...state , item]

    } , [])

    cart = {
        ...cart,
        items: newCartItems,
    }

    renderCartItems(); 
}


renderProducts();
renderCartItems();