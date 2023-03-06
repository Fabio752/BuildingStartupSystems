async function changeProduct(e){
    const response = await fetch('./data/products.json')
    const products = await response.json();
    const increment  = parseInt(e)

    productIndex += increment
    productIndex = productIndex < 0 ? products.length - 1 : productIndex % products.length  
    while(!products[productIndex]["active"]){
        productIndex += increment
        productIndex = productIndex < 0 ? length(products - 1) : productIndex % products.length 
    }

    const product = products[productIndex]
    const figureElement = document.getElementsByClassName("product-image")[0];

    console.log(figureElement)
    figureElement.innerHTML = `<img src="${product.imageUrl}" alt="" />`

    const productDescriptionElement = document.getElementsByClassName("product-text-box")[0];
    productDescriptionElement.innerHTML = `
    <div class="product-title">${product.title}</div>
    <div class="subtitle small-subtitle product-description">${product.description}</div>
    <ul class="features-list"></ul>
    `
    const featuresListElement = document.getElementsByClassName("features-list")[0];
    product["highlighted_features"].forEach(feature => {
        const newLiElement = document.createElement("li");
        newLiElement.innerText = feature
        featuresListElement.appendChild(newLiElement)
    });

    const buyNowButton = document.getElementsByClassName("buy-now-button")[0];
    buyNowButton.setAttribute('onclick', `window.location.href="${product["paymentLink"]}"`);
    console.log(buyNowButton)

}

let productIndex = 0;
changeProduct("0");

