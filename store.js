async function fetchProducts() {
    try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const products = await response.json();

        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
            <img src="http://localhost:5000/uploads/${product.image_filename}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price} zł</p>
            <p>${product.description}</p>
            `;
            productsContainer.appendChild(productDiv);
        });
    } catch (error) {
        console.error('There was a problem fetching the products:', error);
    }
}

function showLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

function login() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if (login === 'admin' && password === 'admin') {
        window.location.href = 'admin.html';
    } else {
        alert('Nieprawidłowy login lub hasło!');
    }
}

fetchProducts();
