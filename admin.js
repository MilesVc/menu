document.addEventListener('DOMContentLoaded', function() {
    const storedUsername = 'admin';  // Admin username (change as needed)
    const storedPassword = '123';  // Admin password (change as needed)

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === storedUsername && password === storedPassword) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('admin').style.display = 'block';
            loadCategories();
        } else {
            alert('Invalid credentials');
        }
    });

    document.getElementById('categoryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const categoryName = document.getElementById('categoryName').value;
        addCategory(categoryName);
        document.getElementById('categoryName').value = '';
    });

    document.getElementById('dishForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const categorySelect = document.getElementById('categorySelect').value;
        const dishName = document.getElementById('dishName').value;
        addDish(categorySelect, dishName);
        document.getElementById('dishName').value = '';
    });

    document.getElementById('adminCategories').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-category')) {
            const categoryName = event.target.dataset.category;
            deleteCategory(categoryName);
        } else if (event.target.classList.contains('delete-dish')) {
            const categoryName = event.target.dataset.category;
            const dishName = event.target.dataset.dish;
            deleteDish(categoryName, dishName);
        }
    });
});

function loadCategories() {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const categorySelect = document.getElementById('categorySelect');
    const adminCategoriesDiv = document.getElementById('adminCategories');
    
    categorySelect.innerHTML = `<option value="" disabled selected>Select Category</option>`;
    adminCategoriesDiv.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        categorySelect.appendChild(option);

        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category ant-card ant-card-bordered';
        categoryDiv.innerHTML = `<span>${category.name}</span><i class="fas fa-trash delete-category" data-category="${category.name}"></i>`;
        category.dishes.forEach(dish => {
            const dishDiv = document.createElement('div');
            dishDiv.className = 'dish ant-card ant-card-bordered';
            dishDiv.innerHTML = `${dish} <i class="fas fa-trash delete-dish" data-category="${category.name}" data-dish="${dish}"></i>`;
            categoryDiv.appendChild(dishDiv);
        });
        
        adminCategoriesDiv.appendChild(categoryDiv);
    });
}

function addCategory(categoryName) {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories.push({ name: categoryName, dishes: [] });
    localStorage.setItem('categories', JSON.stringify(categories));
    loadCategories();
}

function addDish(categoryName, dishName) {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
        category.dishes.push(dishName);
    }
    localStorage.setItem('categories', JSON.stringify(categories));
    loadCategories();
}

function deleteCategory(categoryName) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    categories = categories.filter(cat => cat.name !== categoryName);
    localStorage.setItem('categories', JSON.stringify(categories));
    loadCategories();
}

function deleteDish(categoryName, dishName) {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
        category.dishes = category.dishes.filter(dish => dish !== dishName);
    }
    localStorage.setItem('categories', JSON.stringify(categories));
    loadCategories();
}
