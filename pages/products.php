<?php
    $jsonData = file_get_contents('data.json');
    $products = json_decode($jsonData, true)['products'];
?>
<h3 class="mt-4 overflow-hidden d-flex align-items-center justify-content-center py-5 text-main">
    <img src="images/bini-flower-logo.png" alt="" width="40">
    <span></span>Welcome to BINI Merchandise
    <img src="images/bini-flower-logo.png" alt="" width="40">
</h3>
<div class="row p-3">
    <?php foreach ($products as $product): ?>
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4 border-none">
            <div class="card">
                <img src="<?= htmlspecialchars($product['image']) ?>" class="card-img-top" alt="<?= htmlspecialchars($product['name']) ?>">
                <div class="card-body">
                    <h5 class="card-title m-0"><?= htmlspecialchars($product['name']) ?></h5>
                    <div class="d-flex align-items-center justify-content-between mt-1">
                        <p class="card-text mb-0">₱<?= htmlspecialchars($product['price']) ?></p>
                        <p class="card-text m-0">
                            <?php for ($i = 1; $i <= 5; $i++): ?>
                                <img src="images/star-img.png" alt="Star" class="star-img" <?= $i <= $product['rating'] ? '' : 'style="opacity: 0.3;"' ?> width="15">
                            <?php endfor; ?>
                        </p>                    
                    </div>
                    <p class="status card-text mb-0 overflow-hidden">
                        <?= $product['isAvailable'] ? 'Available' : 'Out of Stock' ?>
                    </p>
                    <button class="btn bg-c-main text-light inline-flex align-items-center justify-content-center w-100 ms-auto mt-2 add-to-cart" data-id="<?= $product['id'] ?>" <?= $product['isAvailable'] ? '' : 'disabled' ?>>
                        <img src="images/cart-shopping-icon.png" width=30>
                        <span class="ms-2">Add to Cart</span>
                    </button>
                </div>
            </div>  
        </div>
    <?php endforeach; ?>
</div>
