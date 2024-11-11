//Group member contribution
//script.js -> Jack DeLeo

$(document).ready(function () {
    let cart = [];
    $('#productDetailsForm').on('submit', function (event) {
        event.preventDefault();
        const productData = {
            id: Date.now(),
            name: $('#productName').val(),
            description: $('#productDescription').val(),
            price: parseFloat($('#productPrice').val()).toFixed(2)
        };
        cart.push(productData);
        updateCartDisplay();
        $('#productDetailsForm')[0].reset();
    });

    function updateCartDisplay() {
        $('#cartItems').empty();

        cart.forEach(item => {
            $('#cartItems').append(`
                <li class="list-group-item">
                    <span><strong>${item.name}</strong>: ${item.description}</span>
                    <span>$${item.price}</span>
                </li>
            `);
        });

        $('#jsonDisplay').text(JSON.stringify(cart, null, 2));
    }
    $('#submitCart').on('click', function () {
        if (cart.length === 0) {
            alert("Cart is empty! Add products to submit.");
            return;
        }
        $.ajax({
            type: "POST",
            url: "https://your-api-endpoint.com/submitCart",
            contentType: "application/json",
            data: JSON.stringify(cart),
            success: function (response) {
                alert("Cart submitted successfully!");
                cart = [];
                updateCartDisplay();
            },
            error: function (xhr, status, error) {
                alert("Failed to submit cart.");
                console.error(xhr, status, error);
            }
        });
    });
});
