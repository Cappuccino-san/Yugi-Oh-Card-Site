// Yu-Gi-Oh E-commerce Application
class YuGiOhStore {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.filteredCards = [...cardData];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderFeaturedCards();
        this.renderLatestCards();
        this.renderCatalog();
        this.updateCartCount();
        this.setupFAQ();
        this.checkAdminAccess();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Search
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // User actions
        document.getElementById('loginBtn').addEventListener('click', () => this.showModal('loginModal'));
        document.getElementById('cartBtn').addEventListener('click', () => this.showModal('cartModal'));

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Forms
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('contactForm').addEventListener('submit', (e) => this.handleContact(e));
        document.getElementById('checkoutForm').addEventListener('submit', (e) => this.handleCheckout(e));
        document.getElementById('addCardForm').addEventListener('submit', (e) => this.handleAddCard(e));

        // Modal navigation
        document.getElementById('showRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('loginModal');
            this.showModal('registerModal');
        });

        document.getElementById('showLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('registerModal');
            this.showModal('loginModal');
        });

        // Cart actions
        document.getElementById('clearCart').addEventListener('click', () => this.clearCart());
        document.getElementById('checkoutBtn').addEventListener('click', () => this.showModal('checkoutModal'));

        // Filters
        document.getElementById('rarityFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('typeFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('setFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('sortBy').addEventListener('change', () => this.applyFilters());

        // Admin
        document.getElementById('closeAdmin').addEventListener('click', () => this.hideAdminPanel());
    }

    // Modal Management
    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
        if (modalId === 'cartModal') {
            this.renderCart();
        }
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Search Functionality
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        if (searchTerm === '') {
            this.filteredCards = [...cardData];
        } else {
            this.filteredCards = cardData.filter(card => 
                card.name.toLowerCase().includes(searchTerm) ||
                card.set.toLowerCase().includes(searchTerm) ||
                card.type.toLowerCase().includes(searchTerm) ||
                card.description.toLowerCase().includes(searchTerm)
            );
        }
        this.renderCatalog();
        this.showMessage(`Search results for: "${searchTerm}"`, 'info');
    }

    // Filtering and Sorting
    applyFilters() {
        const rarityFilter = document.getElementById('rarityFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        const setFilter = document.getElementById('setFilter').value;
        const sortBy = document.getElementById('sortBy').value;

        this.filteredCards = cardData.filter(card => {
            const rarityMatch = !rarityFilter || card.rarity === rarityFilter;
            const typeMatch = !typeFilter || card.type === typeFilter;
            const setMatch = !setFilter || card.set === setFilter;
            return rarityMatch && typeMatch && setMatch;
        });

        // Apply sorting
        this.filteredCards.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rarity':
                    const rarityOrder = { 'Common': 1, 'Rare': 2, 'Ultra Rare': 3, 'Secret Rare': 4 };
                    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
                default:
                    return 0;
            }
        });

        this.renderCatalog();
    }

    // Rendering Functions
    renderFeaturedCards() {
        const featuredCards = cardData.filter(card => card.featured);
        const container = document.getElementById('featuredGrid');
        container.innerHTML = featuredCards.map(card => this.createCardHTML(card)).join('');
    }

    renderLatestCards() {
        const latestCards = cardData.filter(card => card.latest);
        const container = document.getElementById('latestGrid');
        container.innerHTML = latestCards.map(card => this.createCardHTML(card)).join('');
    }

    renderCatalog() {
        const container = document.getElementById('cardsGrid');
        if (this.filteredCards.length === 0) {
            container.innerHTML = '<div class="text-center"><p>No cards found matching your criteria.</p></div>';
            return;
        }
        container.innerHTML = this.filteredCards.map(card => this.createCardHTML(card)).join('');
    }

    createCardHTML(card) {
        const stockStatus = card.stock > 0 ? 
            `<span class="card-stock">In Stock: ${card.stock}</span>` : 
            '<span class="card-stock" style="color: var(--red);">Out of Stock</span>';

        const addToCartBtn = card.stock > 0 ? 
            `<button class="btn-add-cart" onclick="store.addToCart(${card.id})">Add to Cart</button>` :
            '<button class="btn-add-cart" disabled style="opacity: 0.5;">Out of Stock</button>';

        return `
            <div class="card fade-in">
                <div class="card-image">
                    <img src="${card.image}" alt="${card.name}" loading="lazy">
                    <div class="card-badge">${card.rarity}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${card.name}</h3>
                    <p class="card-set">${card.set}</p>
                    <span class="card-type">${card.type}</span>
                    <div class="card-price">$${card.price.toFixed(2)}</div>
                    ${stockStatus}
                    <div class="card-actions">
                        ${addToCartBtn}
                        <button class="btn-view" onclick="store.showProductDetail(${card.id})">View</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Cart Management
    addToCart(cardId) {
        const card = cardData.find(c => c.id === cardId);
        if (!card) return;

        const existingItem = this.cart.find(item => item.id === cardId);
        if (existingItem) {
            if (existingItem.quantity < card.stock) {
                existingItem.quantity++;
            } else {
                this.showMessage('Maximum stock limit reached for this card', 'error');
                return;
            }
        } else {
            this.cart.push({
                id: card.id,
                name: card.name,
                price: card.price,
                image: card.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showMessage(`${card.name} added to cart!`, 'success');
    }

    removeFromCart(cardId) {
        this.cart = this.cart.filter(item => item.id !== cardId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(cardId, newQuantity) {
        const item = this.cart.find(item => item.id === cardId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(cardId);
            } else {
                const card = cardData.find(c => c.id === cardId);
                if (newQuantity <= card.stock) {
                    item.quantity = newQuantity;
                    this.saveCart();
                    this.renderCart();
                } else {
                    this.showMessage('Quantity cannot exceed available stock', 'error');
                }
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showMessage('Cart cleared!', 'info');
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    renderCart() {
        const container = document.getElementById('cartItems');
        if (this.cart.length === 0) {
            container.innerHTML = '<p class="text-center">Your cart is empty</p>';
            this.updateCartTotals();
            return;
        }

        container.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="store.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="quantity-btn" onclick="store.removeFromCart(${item.id})" style="background: var(--red);">×</button>
            </div>
        `).join('');

        this.updateCartTotals();
    }

    updateCartTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
        const total = subtotal + tax + shipping;

        document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    }

    // Product Detail
    showProductDetail(cardId) {
        const card = cardData.find(c => c.id === cardId);
        if (!card) return;

        const reviews = reviews.filter(r => r.cardId === cardId);
        const reviewHTML = reviews.map(review => `
            <div class="review">
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                </div>
                <p class="review-text">${review.comment}</p>
            </div>
        `).join('');

        const monsterStats = card.type === 'Monster' ? `
            <div class="product-meta">
                <span>ATK: ${card.attack}</span>
                <span>DEF: ${card.defense}</span>
                <span>Level: ${card.level}</span>
                <span>Attribute: ${card.attribute}</span>
            </div>
        ` : '';

        document.getElementById('productDetail').innerHTML = `
            <div class="product-image">
                <img src="${card.image}" alt="${card.name}">
            </div>
            <div class="product-info">
                <h3>${card.name}</h3>
                <div class="product-meta">
                    <span>${card.set}</span>
                    <span>${card.type}</span>
                    <span>${card.rarity}</span>
                    <span>${card.condition}</span>
                </div>
                ${monsterStats}
                <p class="product-description">${card.description}</p>
                <div class="product-price">$${card.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="store.addToCart(${card.id})" ${card.stock > 0 ? '' : 'disabled'}>
                        ${card.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="btn btn-secondary" onclick="store.hideModal('productModal')">Close</button>
                </div>
                <div class="product-reviews">
                    <h4>Customer Reviews</h4>
                    ${reviews.length > 0 ? reviewHTML : '<p>No reviews yet. Be the first to review this card!</p>'}
                </div>
            </div>
        `);

        this.showModal('productModal');
    }

    // User Authentication
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.hideModal('loginModal');
            this.updateLoginButton();
            this.showMessage(`Welcome back, ${user.name}!`, 'success');
            
            if (user.role === 'admin') {
                this.showAdminPanel();
            }
        } else {
            this.showMessage('Invalid email or password', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        if (users.find(u => u.email === email)) {
            this.showMessage('Email already registered', 'error');
            return;
        }

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            role: 'user'
        };

        users.push(newUser);
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.hideModal('registerModal');
        this.updateLoginButton();
        this.showMessage('Registration successful! Welcome to Yu-Gi-Oh Store!', 'success');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateLoginButton();
        this.hideAdminPanel();
        this.showMessage('Logged out successfully', 'info');
    }

    updateLoginButton() {
        const loginBtn = document.getElementById('loginBtn');
        if (this.currentUser) {
            loginBtn.textContent = `Logout (${this.currentUser.name})`;
            loginBtn.onclick = () => this.logout();
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => this.showModal('loginModal');
        }
    }

    // Admin Functions
    checkAdminAccess() {
        if (this.currentUser && this.currentUser.role === 'admin') {
            // Add admin access key combination (Ctrl + Shift + A)
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                    this.showAdminPanel();
                }
            });
        }
    }

    showAdminPanel() {
        if (this.currentUser && this.currentUser.role === 'admin') {
            document.getElementById('adminPanel').style.display = 'block';
            this.renderOrders();
        }
    }

    hideAdminPanel() {
        document.getElementById('adminPanel').style.display = 'none';
    }

    renderOrders() {
        const container = document.getElementById('ordersList');
        container.innerHTML = orders.map(order => `
            <div class="order-item">
                <h4>Order #${order.id}</h4>
                <p>Date: ${order.date}</p>
                <p>Status: ${order.status}</p>
                <p>Total: $${order.total.toFixed(2)}</p>
                <p>Items: ${order.items.length}</p>
            </div>
        `).join('');
    }

    handleAddCard(e) {
        e.preventDefault();
        const newCard = {
            id: cardData.length + 1,
            name: document.getElementById('adminCardName').value,
            set: document.getElementById('adminCardSet').value,
            type: document.getElementById('adminCardType').value,
            rarity: document.getElementById('adminCardRarity').value,
            price: parseFloat(document.getElementById('adminCardPrice').value),
            stock: parseInt(document.getElementById('adminCardStock').value),
            description: document.getElementById('adminCardDescription').value,
            image: `https://via.placeholder.com/300x400/0066cc/ffffff?text=${encodeURIComponent(document.getElementById('adminCardName').value)}`,
            condition: 'Near Mint',
            featured: false,
            latest: true
        };

        cardData.push(newCard);
        this.renderLatestCards();
        this.renderCatalog();
        this.showMessage('New card added successfully!', 'success');
        e.target.reset();
    }

    // Form Handlers
    handleContact(e) {
        e.preventDefault();
        this.showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        e.target.reset();
    }

    handleCheckout(e) {
        e.preventDefault();
        if (this.cart.length === 0) {
            this.showMessage('Your cart is empty', 'error');
            return;
        }

        // Simulate payment processing
        this.showMessage('Processing payment...', 'info');
        setTimeout(() => {
            this.showMessage('Order placed successfully! Thank you for your purchase!', 'success');
            this.hideModal('checkoutModal');
            this.clearCart();
        }, 2000);
    }

    // FAQ Functionality
    setupFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');
                
                if (answer.classList.contains('active')) {
                    answer.classList.remove('active');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    answer.classList.add('active');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    // Utility Functions
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Smooth scrolling for navigation
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.store = new YuGiOhStore();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add card flip animation on hover
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.card')) {
            const card = e.target.closest('.card');
            card.style.transform = 'rotateY(10deg) scale(1.02)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.card')) {
            const card = e.target.closest('.card');
            card.style.transform = 'rotateY(0deg) scale(1)';
        }
    });
}); 