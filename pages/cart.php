<div id="cart" class="d-flex align-items-center justify-content-center">
    <div class="shopping-cart-container row">
        <div class="col-8 row p-4 overflow-auto bg-light d-flex align-items-center flex-column justify-content-between">
            <div class="col-12">
                <div class="d-flex align-items-center justify-content-between border-bottom mb-4">
                    <h4 class="overflow-hidden">Shopping Cart</h4>
                    <h4 class="overflow-hidden" id="itemCount">0 items</h4>
                </div>
                <div>
                    <div class="row mb-2">
                        <div class="col-5">
                            PRODUCT DETAILS
                        </div>
                        <div class="col-3 text-center">
                            QUANTITY
                        </div>
                        <div class="col-2 text-center">
                            PRICE
                        </div>
                        <div class="col-2 text-center">
                            TOTAL
                        </div>
                    </div>
                </div>
                <div class="cart-items"></div>
            </div>
            <div>
                <a class="btn text-main mt-2" href="shop.php">Back to Shopping</a>
            </div>
        </div>
        <div class="col-4 p-4 bg-grey d-flex flex-column align-items-center justify-content-between">
            <div class="w-100">
                <div class="d-flex align-items-center justify-content-start mb-4 border-bottom">
                    <h4 class="overflow-hidden">Order Summary</h4>
                </div>
                <div id="orderSummary">
                    <div class="row mb-3">
                        <div class="col-6">
                            Items: <span id="itemSummaryCount">0</span>
                        </div>
                        <div class="col-6 text-end">
                            ₱<span id="itemsTotal">0.00</span>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <h6>Shipping</h6>
                    <select class="form-select" id="shippingSelector">
                        <option value="50">Standard - 50 Pesos</option>
                        <option value="100">Express - 100 Pesos</option>
                        <option value="150">Overnight - 150 Pesos</option>
                    </select>
                </div>
                <div class="mb-3">
                    <h6>Promo Code</h6>
                    <input type="text" class="d-block w-100 p-2 bg-light" id="promoCode" placeholder="Enter your code">
                    <button class="btn bg-c-main text-light mt-4" id="applyPromo">Apply</button>
                </div>
            </div>
            <div class="border-top py-4 mt-5 w-100">
                <div class="d-flex align-items-center justify-content-between">
                    <div>Total Cost</div>
                    <div>₱<span id="totalCost">0.00</span></div>
                </div>
                <button class="mt-2 btn w-100 bg-c-main text-light">Checkout</button>
            </div>
        </div>
    </div>
</div>
