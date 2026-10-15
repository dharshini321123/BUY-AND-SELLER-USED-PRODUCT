let products = JSON.parse(localStorage.getItem("products")) || [
    {
        id: 1,
        name: "iPhone 13",
        category: "Mobiles",
        price: 35000,
        condition: "Good Condition",
        location: "Erode",
        description: "iPhone 13 in good condition. Carefully used.",
        seller: "Rahul",
        phone: "9876543210",
        image: "https://images.unsplash.com/photo-1592286927505-1fed0e9b4a3d?w=600"
    },
    {
        id: 2,
        name: "HP Laptop",
        category: "Laptops",
        price: 25000,
        condition: "Good Condition",
        location: "Chennai",
        description: "HP laptop suitable for students and office work.",
        seller: "Priya",
        phone: "9876543211",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
    },
    {
        id: 3,
        name: "Study Table",
        category: "Furniture",
        price: 3000,
        condition: "Like New",
        location: "Coimbatore",
        description: "Wooden study table in very good condition.",
        seller: "Arun",
        phone: "9876543212",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600"
    },
    {
        id: 4,
        name: "Honda Bike",
        category: "Bikes",
        price: 55000,
        condition: "Good Condition",
        location: "Salem",
        description: "Well maintained Honda bike.",
        seller: "Karthik",
        phone: "9876543213",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600"
    }
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let currentProduct = null;


/* =====================================================
   PHONE NUMBER VALIDATION
   ===================================================== */

/*
   Only numbers are allowed.
   Maximum 10 digits.
*/

function allowOnlyNumbers(input) {

    if (!input) {
        return;
    }

    input.addEventListener("input", function () {

        // Remove anything except numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Maximum 10 digits
        if (this.value.length > 10) {
            this.value = this.value.substring(0, 10);
        }

    });

}


/* =====================================================
   VALIDATE PHONE NUMBER
   ===================================================== */

function validatePhoneNumber(phone, errorElement) {

    // Remove spaces
    phone = phone.trim();

    // Check exactly 10 digits
    if (!/^[0-9]{10}$/.test(phone)) {

        if (errorElement) {

            errorElement.style.display = "block";

            errorElement.innerText =
                "Phone number must be exactly 10 digits.";

        }

        return false;
    }


    // Valid phone number
    if (errorElement) {
        errorElement.style.display = "none";
    }

    return true;
}


/* =====================================================
   LOGIN
   ===================================================== */

function loginUser(event) {

    event.preventDefault();

    let email =
        document.getElementById("loginEmail").value.trim();

    let password =
        document.getElementById("loginPassword").value;

    let user =
        JSON.parse(localStorage.getItem("user"));


    if (!user) {

        alert("Please register first.");

        return;
    }


    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem("loggedIn", "true");


        document.getElementById("loginPage").style.display =
            "none";

        document.getElementById("registerPage").style.display =
            "none";

        document.getElementById("app").style.display =
            "block";


        showPage("homePage");

    } else {

        alert("Invalid email or password.");

    }
}


/* =====================================================
   REGISTER
   ===================================================== */

function registerUser(event) {

    event.preventDefault();


    let name =
        document.getElementById("registerName").value.trim();

    let email =
        document.getElementById("registerEmail").value.trim();

    let password =
        document.getElementById("registerPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    let user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    alert("Registration successful!");


    showLogin();

}


/* =====================================================
   SHOW LOGIN
   ===================================================== */

function showLogin() {

    document.getElementById("registerPage").style.display =
        "none";

    document.getElementById("loginPage").style.display =
        "flex";

}


/* =====================================================
   SHOW REGISTER
   ===================================================== */

function showRegister() {

    document.getElementById("loginPage").style.display =
        "none";

    document.getElementById("registerPage").style.display =
        "flex";

}


/* =====================================================
   LOGOUT
   ===================================================== */

function logoutUser() {

    localStorage.removeItem("loggedIn");


    document.getElementById("app").style.display =
        "none";

    document.getElementById("loginPage").style.display =
        "flex";

}


/* =====================================================
   PAGE CHANGE
   ===================================================== */

function showPage(pageId) {

    let pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.style.display = "none";

    });


    let selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.style.display = "block";

    }


    if (pageId === "productsPage") {

        displayProducts();

    }


    if (pageId === "cartPage") {

        displayCart();

    }


    if (pageId === "ordersPage") {

        displayOrders();

    }


    if (pageId === "wishlistPage") {

        displayWishlist();

    }

}


/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayProducts(list = products) {

    let container =
        document.getElementById("productContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML =
            '<p class="empty-message">No products found.</p>';

        return;
    }


    list.forEach(function(product) {

        container.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <div class="product-price">

                        ₹${product.price}

                    </div>


                    <p>
                        ${product.condition}
                    </p>


                    <p>
                        📍 ${product.location}
                    </p>


                    <p>
                        Seller: ${product.seller}
                    </p>


                    <div class="product-buttons">

                        <button
                            class="view-btn"
                            onclick="viewProduct(${product.id})"
                        >
                            View Details
                        </button>


                        <button
                            class="wishlist-btn"
                            onclick="addWishlist(${product.id})"
                        >
                            ♡
                        </button>

                    </div>


                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})"
                    >

                        🛒 Add to Cart

                    </button>

                </div>

            </div>

        `;

    });

}


/* =====================================================
   VIEW PRODUCT
   ===================================================== */

function viewProduct(id) {

    currentProduct =
        products.find(function(product) {

            return product.id === id;

        });


    if (!currentProduct) {

        return;

    }


    document.getElementById("detailsImage").src =
        currentProduct.image;


    document.getElementById("detailsName").innerText =
        currentProduct.name;


    document.getElementById("detailsPrice").innerText =
        "₹" + currentProduct.price;


    document.getElementById("detailsCondition").innerText =
        "Condition: " + currentProduct.condition;


    document.getElementById("detailsLocation").innerText =
        "📍 " + currentProduct.location;


    document.getElementById("detailsDescription").innerText =
        currentProduct.description;


    document.getElementById("detailsSeller").innerText =
        "Seller: " + currentProduct.seller;


    document.getElementById("detailsPhone").innerText =
        "📞 " + currentProduct.phone;


    showPage("productDetailsPage");

}


/* =====================================================
   ADD PRODUCT
   ===================================================== */

function addProduct(event) {

    event.preventDefault();


    let name =
        document.getElementById("productName").value.trim();


    let imageFile =
        document.getElementById("productImage").files[0];


    let category =
        document.getElementById("productCategory").value;


    let price =
        Number(
            document.getElementById("productPrice").value
        );


    let condition =
        document.getElementById("productCondition").value;


    let location =
        document.getElementById("productLocation").value.trim();


    let description =
        document.getElementById("productDescription").value.trim();


    let seller =
        document.getElementById("sellerName").value.trim();


    let phone =
        document.getElementById("sellerPhone").value.trim();


    /*
       Find error message element.
       If it doesn't exist, validation will still work.
    */

    let phoneError =
        document.getElementById("sellerPhoneError");


    /*
       PHONE VALIDATION
       Exactly 10 digits.
    */

    if (!validatePhoneNumber(phone, phoneError)) {

        alert("Please enter a valid 10 digit seller phone number.");

        document.getElementById("sellerPhone").focus();

        return;

    }


    if (!imageFile) {

        alert("Please select a product image.");

        return;

    }


    let reader =
        new FileReader();


    reader.onload = function() {

        let newProduct = {

            id: Date.now(),

            name: name,

            category: category,

            price: price,

            condition: condition,

            location: location,

            description: description,

            seller: seller,

            phone: phone,

            image: reader.result

        };


        products.push(newProduct);


        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        alert("Product posted successfully!");


        let sellForm =
            document.querySelector("#sellPage form");


        if (sellForm) {

            sellForm.reset();

        }


        if (phoneError) {

            phoneError.style.display = "none";

        }


        displayProducts();


        showPage("productsPage");

    };


    reader.readAsDataURL(imageFile);

}


/* =====================================================
   ADD CART
   ===================================================== */

function addToCart(id) {

    let product =
        products.find(function(item) {

            return item.id === id;

        });


    if (!product) {

        return;

    }


    let existing =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    alert(
        product.name + " added to cart!"
    );

}


/* =====================================================
   DETAILS CART
   ===================================================== */

function addDetailsToCart() {

    if (currentProduct) {

        addToCart(currentProduct.id);

    }

}


/* =====================================================
   BUY NOW
   ===================================================== */

function buyNow() {

    if (!currentProduct) {

        return;

    }


    cart = [{

        id: currentProduct.id,

        name: currentProduct.name,

        price: currentProduct.price,

        image: currentProduct.image,

        quantity: 1

    }];


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    goToCheckout();

}


/* =====================================================
   CART DISPLAY
   ===================================================== */

function displayCart() {

    let container =
        document.getElementById("cartContainer");


    let totalElement =
        document.getElementById("cartTotal");


    if (!container || !totalElement) {

        return;

    }


    if (cart.length === 0) {

        container.innerHTML =
            '<p class="empty-message">Your cart is empty.</p>';


        totalElement.innerText =
            "₹0";


        updateCartCount();


        return;

    }


    container.innerHTML = "";


    let total = 0;


    cart.forEach(function(item, index) {

        let itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        container.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>
                        ${item.name}
                    </h3>


                    <p>
                        Price: ₹${item.price}
                    </p>


                    <p>
                        Quantity: ${item.quantity}
                    </p>


                    <p>
                        Total: ₹${itemTotal}
                    </p>

                </div>


                <button
                    onclick="removeCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;

    });


    totalElement.innerText =
        "₹" + total;


    updateCartCount();

}


/* =====================================================
   REMOVE CART
   ===================================================== */

function removeCart(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


/* =====================================================
   CART COUNT
   ===================================================== */

function updateCartCount() {

    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;

    });


    let cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.innerText =
            count;

    }

}


/* =====================================================
   CHECKOUT
   ===================================================== */

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add a product to cart first."
        );

        return;

    }


    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price * item.quantity;

    });


    document.getElementById(
        "checkoutTotal"
    ).innerText =
        "₹" + total;


    showPage("checkoutPage");

}


/* =====================================================
   PLACE ORDER
   ===================================================== */

function placeOrder(event) {

    event.preventDefault();


    let name =
        document.getElementById("customerName").value.trim();


    let phone =
        document.getElementById("customerPhone").value.trim();


    let address =
        document.getElementById("customerAddress").value.trim();


    let city =
        document.getElementById("customerCity").value.trim();


    let pincode =
        document.getElementById("customerPincode").value;


    /*
       CUSTOMER PHONE VALIDATION
       Exactly 10 digits.
    */

    let phoneError =
        document.getElementById("customerPhoneError");


    if (!validatePhoneNumber(phone, phoneError)) {

        alert(
            "Please enter a valid 10 digit phone number."
        );


        document.getElementById(
            "customerPhone"
        ).focus();


        return;

    }


    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price * item.quantity;

    });


    let order = {

        id:
            "UM" +
            Math.floor(
                1000 + Math.random() * 9000
            ),

        name: name,

        phone: phone,

        address: address,

        city: city,

        pincode: pincode,

        products: cart,

        total: total,

        status: "Order Confirmed"

    };


    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    document.getElementById(
        "orderId"
    ).innerText =
        order.id;


    document.getElementById(
        "confirmedTotal"
    ).innerText =
        "₹" + total;


    cart = [];


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    let checkoutForm =
        document.querySelector(
            "#checkoutPage form"
        );


    if (checkoutForm) {

        checkoutForm.reset();

    }


    if (phoneError) {

        phoneError.style.display =
            "none";

    }


    showPage(
        "orderConfirmedPage"
    );

}


/* =====================================================
   MY ORDERS
   ===================================================== */

function displayOrders() {

    let container =
        document.getElementById(
            "ordersContainer"
        );


    if (!container) {

        return;

    }


    if (orders.length === 0) {

        container.innerHTML =
            '<p class="empty-message">No orders placed yet.</p>';

        return;

    }


    container.innerHTML = "";


    orders.forEach(function(order) {

        let names = "";


        order.products.forEach(function(product) {

            names +=
                product.name + ", ";

        });


        container.innerHTML += `

            <div class="order-item">

                <h3>
                    Order ID: ${order.id}
                </h3>


                <p>
                    Products: ${names}
                </p>


                <p>
                    Total: ₹${order.total}
                </p>


                <p>
                    Status:
                    <strong>
                        ${order.status}
                    </strong>
                </p>


                <p>
                    Delivery:
                    ${order.city}
                </p>

            </div>

        `;

    });

}


/* =====================================================
   WISHLIST
   ===================================================== */

function addWishlist(id) {

    let product =
        products.find(function(item) {

            return item.id === id;

        });


    if (!product) {

        return;

    }


    let exists =
        wishlist.find(function(item) {

            return item.id === id;

        });


    if (exists) {

        alert(
            "Product already in wishlist."
        );

        return;

    }


    wishlist.push(product);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    alert(
        product.name +
        " added to wishlist!"
    );

}


/* =====================================================
   DISPLAY WISHLIST
   ===================================================== */

function displayWishlist() {

    let container =
        document.getElementById(
            "wishlistContainer"
        );


    if (!container) {

        return;

    }


    if (wishlist.length === 0) {

        container.innerHTML =
            '<p class="empty-message">Your wishlist is empty.</p>';

        return;

    }


    container.innerHTML = "";


    wishlist.forEach(function(product, index) {

        container.innerHTML += `

            <div class="wishlist-item">

                <h3>
                    ♡ ${product.name}
                </h3>


                <p>
                    ₹${product.price}
                </p>


                <p>
                    ${product.condition}
                </p>


                <button
                    onclick="removeWishlist(${index})"
                >
                    Remove
                </button>

            </div>

        `;

    });

}


/* =====================================================
   REMOVE WISHLIST
   ===================================================== */

function removeWishlist(index) {

    wishlist.splice(index, 1);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    displayWishlist();

}


/* =====================================================
   SEARCH
   ===================================================== */

function searchProducts() {

    let search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase().trim();


    let result =
        products.filter(function(product) {

            return product.name
                .toLowerCase()
                .includes(search);

        });


    showPage("productsPage");


    displayProducts(result);

}


/* =====================================================
   FILTER
   ===================================================== */

function filterProducts() {

    let category =
        document.getElementById(
            "categoryFilter"
        ).value;


    let price =
        document.getElementById(
            "priceFilter"
        ).value;


    let result =
        products.filter(function(product) {

            let categoryMatch =
                category === "all" ||
                product.category === category;


            let priceMatch =
                price === "all" ||
                product.price <= Number(price);


            return categoryMatch &&
                priceMatch;

        });


    displayProducts(result);

}


/* =====================================================
   CATEGORY CLICK
   ===================================================== */

function selectCategory(category) {

    showPage("productsPage");


    document.getElementById(
        "categoryFilter"
    ).value =
        category;


    filterProducts();

}


/* =====================================================
   PAGE LOAD
   ===================================================== */

window.onload = function() {

    /*
       Phone inputs
    */

    let sellerPhone =
        document.getElementById(
            "sellerPhone"
        );


    let customerPhone =
        document.getElementById(
            "customerPhone"
        );


    /*
       Allow numbers only
    */

    allowOnlyNumbers(
        sellerPhone
    );


    allowOnlyNumbers(
        customerPhone
    );


    /*
       Logged in check
    */

    let loggedIn =
        localStorage.getItem(
            "loggedIn"
        );


    if (loggedIn === "true") {

        document.getElementById(
            "loginPage"
        ).style.display =
            "none";


        document.getElementById(
            "registerPage"
        ).style.display =
            "none";


        document.getElementById(
            "app"
        ).style.display =
            "block";


        showPage(
            "homePage"
        );

    }


    updateCartCount();


    displayProducts();

};