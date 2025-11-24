// Expose Alpine data as a factory so `x-data="appData()"` can use it
window.appData = function () {
    return {
        darkMode: false,
        currentPage: 'home',
        isAdmin: false,
        cart: [],
        wishlist: [],
        products: [
            { id: 1, name: 'قهوة عربية فاخرة', price: 25, time: '5 دقائق', orders: 150, category: 'مشروبات', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', description: 'قهوة عربية أصيلة محضرة بأجود أنواع البن مع الهيل والزعفران' },
            { id: 2, name: 'برجر لحم مشوي', price: 45, time: '15 دقيقة', orders: 230, category: 'وجبات', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', description: 'برجر لحم بقري طازج مشوي مع الخضار والصوصات الخاصة' },
            { id: 3, name: 'كابتشينو إيطالي', price: 20, time: '7 دقائق', orders: 180, category: 'مشروبات', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', description: 'كابتشينو كريمي بنكهة إيطالية أصيلة مع رغوة حليب كثيفة' },
            { id: 4, name: 'بيتزا مارجريتا', price: 55, time: '20 دقيقة', orders: 200, category: 'وجبات', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', description: 'بيتزا إيطالية كلاسيكية بصلصة الطماطم والجبن الطازج' },
            { id: 5, name: 'عصير برتقال طبيعي', price: 15, time: '3 دقائق', orders: 300, category: 'مشروبات', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', description: 'عصير برتقال طازج معصور يومياً بدون إضافات' },
            { id: 6, name: 'سلطة سيزر', price: 30, time: '10 دقائق', orders: 120, category: 'سلطات', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', description: 'سلطة سيزر كلاسيكية مع الدجاج المشوي والخبز المحمص' },
            { id: 7, name: 'شاي مغربي بالنعناع', price: 12, time: '5 دقائق', orders: 250, category: 'مشروبات', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', description: 'شاي أخضر مغربي أصيل مع أوراق النعناع الطازجة' },
            { id: 8, name: 'باستا ألفريدو', price: 50, time: '18 دقائق', orders: 160, category: 'وجبات', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', description: 'باستا فيتوتشيني بصلصة الكريمة البيضاء الغنية' }
        ],
        orders: [
            { id: 1001, customer: 'أحمد محمد', items: 3, total: 120, status: 'قيد التحضير', date: '2024-01-15' },
            { id: 1002, customer: 'فاطمة علي', items: 2, total: 85, status: 'جاهز للتسليم', date: '2024-01-15' },
            { id: 1003, customer: 'محمد خالد', items: 5, total: 200, status: 'تم التسليم', date: '2024-01-14' },
            { id: 1004, customer: 'سارة أحمد', items: 1, total: 45, status: 'قيد التحضير', date: '2024-01-15' }
        ],
        searchQuery: '',
        selectedCategory: 'الكل',
        selectedProduct: null,
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            if (this.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        addToCart(product) {
            const existing = this.cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(productId) {
            this.cart = this.cart.filter(item => item.id !== productId);
        },
        updateQuantity(productId, quantity) {
            const item = this.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = Math.max(1, quantity);
            }
        },
        toggleWishlist(product) {
            const index = this.wishlist.findIndex(item => item.id === product.id);
            if (index > -1) {
                this.wishlist.splice(index, 1);
            } else {
                this.wishlist.push(product);
            }
        },
        isInWishlist(productId) {
            return this.wishlist.some(item => item.id === productId);
        },
        get filteredProducts() {
            return this.products.filter(p => {
                const matchesSearch = p.name.includes(this.searchQuery);
                const matchesCategory = this.selectedCategory === 'الكل' || p.category === this.selectedCategory;
                return matchesSearch && matchesCategory;
            });
        },
        get cartTotal() {
            return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        get categories() {
            return ['الكل', ...new Set(this.products.map(p => p.category))];
        },
        deleteProduct(productId) {
            this.products = this.products.filter(p => p.id !== productId);
        },
        updateOrderStatus(orderId, newStatus) {
            const order = this.orders.find(o => o.id === orderId);
            if (order) order.status = newStatus;
        }
    };
};

// Initialize Swiper and Charts after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    try {
        new Swiper('.swiper', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
        });
    } catch (e) {
        // Swiper may not be present during some previews; ignore errors
        // console.warn('Swiper init failed', e);
    }

    const dailyCtx = document.getElementById('dailyOrdersChart');
    if (dailyCtx && typeof Chart !== 'undefined') {
        new Chart(dailyCtx, {
            type: 'line',
            data: {
                labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                datasets: [{
                    label: 'عدد الطلبات',
                    data: [35, 42, 38, 50, 45, 48, 55],
                    borderColor: '#D2691E',
                    backgroundColor: 'rgba(210, 105, 30, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx && typeof Chart !== 'undefined') {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['وجبات', 'مشروبات', 'سلطات', 'حلويات'],
                datasets: [{
                    data: [450, 380, 120, 200],
                    backgroundColor: ['#D2691E', '#FF8C42', '#8B4513', '#F5F5DC']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
});
