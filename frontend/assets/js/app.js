const API_BASE = "http://localhost:8000/api/v1";

class App {
    constructor() {
        this.currentView = "overview";
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScraper();
        this.refreshData();
        
        // Auto-refresh every 30 seconds
        setInterval(() => this.refreshData(), 30000);
    }

    setupNavigation() {
        document.querySelectorAll(".nav-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const view = item.getAttribute("data-view");
                this.switchView(view);
            });
        });
    }

    switchView(viewId) {
        // Update Nav
        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("data-view") === viewId) item.classList.add("active");
        });

        // Update View
        document.querySelectorAll(".view").forEach(view => {
            view.classList.remove("active");
        });
        document.getElementById(`${viewId}-view`).classList.add("active");
        
        this.currentView = viewId;
        if (viewId === "products") this.refreshProducts();
        if (viewId === "orders") this.refreshOrders();
    }

    async refreshData() {
        try {
            const products = await this.fetchProducts();
            const orders = await this.fetchOrders();

            document.getElementById("stat-products").innerText = products.length;
            document.getElementById("stat-orders").innerText = orders.length;

            this.renderRecentProducts(products.slice(0, 5));
        } catch (error) {
            console.error("Error refreshing dashboard data:", error);
        }
    }

    async fetchProducts() {
        const response = await fetch(`${API_BASE}/products/`);
        return await response.json();
    }

    async fetchOrders() {
        const response = await fetch(`${API_BASE}/orders/`);
        return await response.json();
    }

    renderRecentProducts(products) {
        const tbody = document.getElementById("recent-products-body");
        tbody.innerHTML = products.map(p => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="${p.image_url || 'https://via.placeholder.com/48'}" class="product-img">
                        <span style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.title}</span>
                    </div>
                </td>
                <td>$${p.supplier_price.toFixed(2)}</td>
                <td><span style="color: #fbbf24;">★</span> ${p.rating || 'N/A'}</td>
                <td><span class="badge ${p.sale_price ? 'success' : 'warning'}">${p.sale_price ? 'Listed' : 'Pending'}</span></td>
                <td><button class="btn-text" onclick="app.listProduct(${p.id})">List Now</button></td>
            </tr>
        `).join("");
    }

    async refreshProducts() {
        try {
            const products = await this.fetchProducts();
            const tbody = document.getElementById("all-products-body");
            tbody.innerHTML = products.length ? products.map(p => `
                <tr>
                    <td><img src="${p.image_url || 'https://via.placeholder.com/48'}" class="product-img"></td>
                    <td>${p.title}</td>
                    <td>$${p.supplier_price.toFixed(2)}</td>
                    <td>${p.orders}</td>
                    <td><button class="btn-primary" onclick="app.listProduct(${p.id})">Push to Market</button></td>
                </tr>
            `).join("") : '<tr><td colspan="5" style="text-align:center; padding: 40px;">No products found. Start scraping!</td></tr>';
        } catch (err) {
            this.notify("Error fetching products", "danger");
        }
    }

    async refreshOrders() {
        // Placeholder for order rendering
        this.notify("Syncing orders...");
    }

    async listProduct(id) {
        this.notify("Starting AI rewrite and listing...");
        try {
            const res = await fetch(`${API_BASE}/products/${id}/list`, { method: "POST" });
            const data = await res.json();
            this.notify("Listing process queued successfully!", "success");
        } catch (err) {
            this.notify("Failed to list product", "danger");
        }
    }

    setupScraper() {
        const btn = document.getElementById("btn-start-scrape");
        if (!btn) return;

        btn.addEventListener("click", async () => {
            const keyword = document.getElementById("scrape-keyword").value;
            const limit = document.getElementById("scrape-limit").value;

            if (!keyword) return this.notify("Please enter a keyword", "warning");

            document.getElementById("scrape-status").classList.remove("hidden");
            
            try {
                const res = await fetch(`${API_BASE}/products/scrape`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ keyword, limit: parseInt(limit) })
                });
                const data = await res.json();
                this.notify("Scraping task started in background", "success");
            } catch (err) {
                this.notify("Error starting scraper", "danger");
            }
        });
    }

    notify(msg, type = "info") {
        const container = document.getElementById("notifications");
        const el = document.createElement("div");
        el.className = `notification ${type}`;
        el.innerText = msg;
        container.appendChild(el);
        setTimeout(() => el.remove(), 4000);
    }
}

const app = new App();
window.app = app;
