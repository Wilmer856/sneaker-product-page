

// DOM variables
const navList = document.querySelector('.nav-list');
const menuBtn = document.querySelector('.menu-toggle');
const modalLayer = document.querySelector('.modal-layer');
const previewLayer = document.querySelector('.preview-layer');
const cartAdd = document.querySelector('.cart-add');
const cartRemove = document.querySelector('.cart-remove');
const cartQuantity = document.querySelector('.cart-quantity');
const addCartBtn = document.querySelector('.product-cart-btn');
const itemsAddedCon = document.querySelector('.cart-items')
const itemsAddedLbl = document.querySelector('.cart-items-num');
const cartBtn = document.querySelector('.cart-btn');
const cartCon = document.querySelector('.shopping-cart');
const checkoutBtnCon = document.querySelector('.checkout-con');
const imageDisplayed = document.querySelector('.displayed-product');
const closePreviewModal = document.querySelector('.close-preview-modal');

let cartItemsDict = {};


// Hamburger menu logic
menuBtn.addEventListener('click', _ => {
    window.scrollTo(0, 0);
    navList.classList.toggle('open-menu');
    menuBtn.classList.toggle('active');
    modalLayer.classList.toggle('display');
    document.querySelector('body').classList.toggle('lock-screen-small');
});

modalLayer.addEventListener('click', _ => {
    navList.classList.toggle('open-menu');
    menuBtn.classList.toggle('active');
    modalLayer.classList.toggle('display');
    document.querySelector('body').classList.toggle('lock-screen-small');

});

// -----------------Cart logic-------------------

// Adding item quantity
cartAdd.addEventListener('click', _ => {

    let cartNum = Number(cartQuantity.innerText)
    cartQuantity.innerText = cartNum + 1;
});

// Subtracting item quantity
cartRemove.addEventListener('click', _ => {

    let cartNum = Number(cartQuantity.innerText)
    if(cartNum == 0) {
        return;
    }
    cartQuantity.innerText = cartNum - 1;
});

// 


addCartBtn.addEventListener('click', _ => {
    let numOfItems = Number(itemsAddedLbl.innerText);
    let cartNum = Number(cartQuantity.innerText);

    if(cartNum == 0) {
        return;
    }
    if(!itemsAddedCon.classList.contains('item-added')) {
        itemsAddedCon.classList.toggle('item-added');
        document.querySelector('.empty-cart-sub').classList.toggle('not-empty');
        document.querySelector('.cart-content').classList.toggle('cart-filled')
        checkoutBtnCon.classList.toggle('display-checkout')
    }

    itemsAddedLbl.innerText = numOfItems + cartNum
    let itemName = document.querySelector('.product-name').innerText;
    let itemPrice = parseFloat(document.querySelector('.product-price').innerText.slice(1)).toFixed(2);
    
    if(!(itemName in cartItemsDict)) {
        document.querySelector('.cart-content').insertAdjacentHTML('afterbegin',
        `<div class="cart-product"> \
            <div class="cart-product-img"> \
                <img src="images/image-product-1-thumbnail.jpg" alt="" /> \
            </div> \
            <div class="cart-product-info"> \
                <span class="cart-product-main">${itemName}</span> \
                <span class="cart-product-sub">$${itemPrice} x <span class="cart-product-num">${cartNum} </span><span class="cart-product-total">$${(cartNum * itemPrice).toFixed(2)}</span></span>
            </div> \
            <div class="cart-trash"> \
                <img src="images/icon-delete.svg" alt="trash button" /> \
            </div> \
        </div>`);
        cartItemsDict[itemName] = cartNum
        document.querySelector('.cart-trash').addEventListener('click', _ => {
            delete cartItemsDict[itemName];
            document.querySelector('.cart-product').remove()
            if(!(document.querySelectorAll('.cart-content .cart-product').length > 0)){
                document.querySelector('.empty-cart-sub').classList.toggle('not-empty');
                document.querySelector('.cart-content').classList.toggle('cart-filled');
                checkoutBtnCon.classList.toggle('display-checkout');
                itemsAddedCon.classList.toggle('item-added');
                itemsAddedLbl.innerText = 0;
            }
        })
    }
    else {
        cartItemsDict[itemName] += cartNum
        document.querySelector('.cart-product-num').innerText = cartItemsDict[itemName]
        document.querySelector('.cart-product-total').innerText = ' $' + (cartItemsDict[itemName] * itemPrice).toFixed(2)
    }
})

cartBtn.addEventListener('click', _ => {
    cartCon.classList.toggle('display-cart');
})

previewLayer.addEventListener('click', _ => {
    document.querySelector('.image-modal').classList.toggle('preview-modal-active')
    previewLayer.classList.toggle('display');
    document.querySelector('body').classList.toggle('lock-screen-large');
})

imageDisplayed.addEventListener('click', _ => {
    window.scrollTo(0, 0);
    document.querySelector('.image-modal').classList.toggle('preview-modal-active')
    previewLayer.classList.toggle('display');
    document.querySelector('body').classList.toggle('lock-screen-large');
})

closePreviewModal.addEventListener('click', _ => {
    document.querySelector('.image-modal').classList.toggle('preview-modal-active')
    previewLayer.classList.toggle('display');
    document.querySelector('body').classList.toggle('lock-screen-large');
})

let currentImage = 1
document.querySelectorAll('.product-card .thumbnail-item').forEach((item,i) => item.addEventListener('click', e => {
    document.querySelectorAll('.main-image-displayed').forEach(image => image.src = `images/image-product-${i+1}.jpg`);
    document.querySelectorAll('.product-card .thumbnail-item').forEach((otherItem,i) => {
        if(otherItem !== item) {
            otherItem.classList.remove('clicked')
        }
    })
    item.classList.toggle('clicked');
    currentImage=i+1
    selectImage('image-modal', 'thumbnail-item')
}))

document.querySelectorAll('.image-modal .thumbnail-item').forEach((item,i) => item.addEventListener('click', e => {
    document.querySelectorAll('.main-image-displayed').forEach(image => image.src = `images/image-product-${i+1}.jpg`);
    document.querySelectorAll('.image-modal .thumbnail-item').forEach((otherItem,i) => {
        if(otherItem !== item) {
            otherItem.classList.remove('clicked')
        }
    })
    item.classList.toggle('clicked');
    currentImage=i+1
    selectImage('product-card', 'thumbnail-item')
}))

document.querySelectorAll('.arrow-next').forEach(arrow => arrow.addEventListener('click', e => {
    if(currentImage === 4){
        return;
    }
    currentImage+=1
    document.querySelectorAll('.main-image-displayed').forEach(image => image.src = `images/image-product-${currentImage}.jpg`);
    selectImage('product-card', 'thumbnail-item')
    selectImage('image-modal', 'thumbnail-item')
}))

document.querySelectorAll('.arrow-prev').forEach(arrow => arrow.addEventListener('click', e => {
    if(currentImage === 1){
        return;
    }
    currentImage-=1
    document.querySelectorAll('.main-image-displayed').forEach(image => image.src = `images/image-product-${currentImage}.jpg`);

    selectImage('product-card', 'thumbnail-item')
    selectImage('image-modal', 'thumbnail-item')
}))

function selectImage(selector1, selector2) {
    let img = document.querySelectorAll(`.${selector1} .${selector2}`)[currentImage-1]
    document.querySelectorAll(`.${selector1} .${selector2}`).forEach(item => {
        if(img !== item) {
            item.classList.remove('clicked')
        }
    })
    img.classList.toggle('clicked')
}


