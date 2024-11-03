document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let productInCart = cart.find(item => item.id === productId);

            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.push({ id: productId, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: 'The product has been added to your cart.',
                showConfirmButton: false,
                timer: 1000
            });
        });
    });

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const cartItemsContainer = document.querySelector('.cart-items');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemCountElement = document.getElementById('itemCount');
            const itemSummaryCount = document.getElementById('itemSummaryCount');
            const itemsTotal = document.getElementById('itemsTotal');
            const shippingSelector = document.getElementById('shippingSelector');
            const totalCostElement = document.getElementById('totalCost');
            const applyPromoButton = document.getElementById('applyPromo');
            const promoCodeInput = document.getElementById('promoCode');

            // Function to render cart items
            function renderCartItems() {
                cartItemsContainer.innerHTML = ''; // Clear the container
                let totalItems = 0;
                let itemsTotalCost = 0;

                cart.forEach(item => {
                    const product = products.find(p => p.id == item.id);
                    if (product) {
                        const totalPrice = product.price * item.quantity;
                        totalItems += 1;
                        itemsTotalCost += totalPrice;
                        const cartItemHTML = `
                            <div class="row mb-2 border-bottom">
                                <div class="col-5 d-flex align-items-center">
                                    <img class="me-3" src="${product.image}" width="90">
                                    <div class="d-flex flex-column">
                                        <h6 class="overflow-hidden text-main">${product.name}</h6>
                                        <small class="p-0 m-0 text-danger remove-item" data-id="${product.id}" style="cursor: pointer;">Remove</small>
                                    </div>
                                </div>
                                <div class="col-3 d-flex align-items-center justify-content-center">
                                    <small class="fs-6 decrement" data-id="${product.id}" style="cursor: pointer;">-</small>
                                    <div class="fs-6 quantity" style="display: inline-block; width: 50px; text-align: center;">${item.quantity}</div>
                                    <small class="fs-6 increment" data-id="${product.id}" style="cursor: pointer;">+</small>
                                </div>
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <span class="price">₱${product.price}</span>
                                </div>
                                <div class="col-2 d-flex align-items-center justify-content-center">
                                    <span class="total">₱${totalPrice}</span>
                                </div>
                            </div>`;
                        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
                    }
                });

                itemCountElement.textContent = `${totalItems} items`;
                itemSummaryCount.textContent = totalItems;
                itemsTotal.textContent = itemsTotalCost.toFixed(2);

                // Add event listeners for remove, increment, and decrement buttons
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', removeItemFromCart);
                });

                document.querySelectorAll('.increment').forEach(button => {
                    button.addEventListener('click', incrementQuantity);
                });

                document.querySelectorAll('.decrement').forEach(button => {
                    button.addEventListener('click', decrementQuantity);
                });

                updateTotalCost();
            }

            // Function to remove item from cart
            function removeItemFromCart() {
                const productId = this.getAttribute('data-id');
                const cartIndex = cart.findIndex(item => item.id == productId);
                if (cartIndex > -1) {
                    cart.splice(cartIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                }
            }

            // Function to increment quantity
            function incrementQuantity() {
                const productId = this.getAttribute('data-id');
                const cartItem = cart.find(item => item.id == productId);
                if (cartItem) {
                    cartItem.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                }
            }

            // Function to decrement quantity
            function decrementQuantity() {
                const productId = this.getAttribute('data-id');
                const cartItem = cart.find(item => item.id == productId);
                if (cartItem && cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                }
            }

            // Function to update total cost
            function updateTotalCost() {
                const itemsTotalCost = parseFloat(itemsTotal.textContent);
                const shippingCost = parseFloat(shippingSelector.value);
                let totalCost = itemsTotalCost + shippingCost;

                // Apply promo code if valid
                const promoCode = promoCodeInput.value.trim();
                if (promoCode === 'PROMO10') { // Example promo code
                    totalCost *= 0.9; // Apply 10% discount
                }

                totalCostElement.textContent = totalCost.toFixed(2);
            }

            // Event listener for shipping selector
            shippingSelector.addEventListener('change', updateTotalCost);

            // Event listener for apply promo button
            applyPromoButton.addEventListener('click', updateTotalCost);

            // Initial render of cart items
            renderCartItems();
        })
        .catch(error => console.error('Error fetching product data:', error));
});

