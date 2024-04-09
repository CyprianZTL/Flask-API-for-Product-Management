async function addProduct() {
    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    formData.append('file', imageFile);

    const uploadResponse = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
    });
    const uploadResult = await uploadResponse.json();

    const productData = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        image_filename: uploadResult.filename
    };

    await fetch('http://localhost:5000/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    fetchProducts();
}

async function fetchProducts() {
    const response = await fetch('http://localhost:5000/products');
    const products = await response.json();

    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <img src="http://localhost:5000/uploads/${product.image_filename}" alt="${product.name}" style="width: 100px; height: 100px;">
            <span>${product.name} - ${product.price} zł</span>
            <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
        `;
        productsList.appendChild(productDiv);
    });
}

async function editProduct(productId) {
    const response = await fetch(`http://localhost:5000/product/${productId}`);
    const product = await response.json();

    document.getElementById('edit-id').value = product.id;
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-description').value = product.description;

    document.getElementById('product-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';
}

async function submitEdit() {
    const productId = document.getElementById('edit-id').value;
    const updatedProduct = {
        name: document.getElementById('edit-name').value,
        price: document.getElementById('edit-price').value,
        description: document.getElementById('edit-description').value,
    };

    const newImageFile = document.getElementById('edit-image').files[0];
    if (newImageFile) {
        const formData = new FormData();
        formData.append('file', newImageFile);

        const uploadResponse = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });
        const uploadResult = await uploadResponse.json();
        updatedProduct.image_filename = uploadResult.filename;
    }

    await fetch(`http://localhost:5000/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
    });

    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('product-form').style.display = 'block';
    fetchProducts();
}

function cancelEdit() {
    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('product-form').style.display = 'block';
}

async function deleteProduct(productId) {
    if (confirm("Czy na pewno chcesz usunąć ten produkt?")) {
        await fetch(`http://localhost:5000/product/${productId}`, {
            method: 'DELETE'
        });
        fetchProducts();
    }
}

fetchProducts();
