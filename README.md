# 🚀 Dropshipping Automation System

An end-to-end automated dropshipping platform designed to streamline product research, listing management, and order fulfillment.

## 🧭 Project Goal

This system automates the tedious parts of dropshipping:
*   **AliExpress Product Research**: Automatically find profitable products using custom filters.
*   **Smart Listing**: Use AI (Groq LLM) to rewrite product titles/descriptions and list them on eBay/Daraz with a 1.5x price markup.
*   **Order Fulfillment**: Synchronize marketplace orders and automate supplier ordering.
*   **Tracking Sync**: Automatically update tracking numbers once suppliers ship products.

---

## 🏗 System Architecture

The project is built with a modular, scalable architecture:
*   **Backend**: FastAPI (Python 3.11)
*   **Task Queue**: Celery + Redis for background processing.
*   **Database**: PostgreSQL 15.
*   **Automation**: Playwright (for scraping and order automation).
*   **AI Engine**: Groq (Llama 3) for copywriting and support.
*   **Containerization**: Docker & Docker Compose.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Language** | Python 3.11 |
| **Web Framework** | FastAPI |
| **Database** | PostgreSQL |
| **Caching/Queue** | Redis |
| **Async Tasks** | Celery |
| **Scraping** | Playwright, BeautifulSoup4 |
| **AI Rewrite** | Groq (Llama 3) |
| **Containerization**| Docker |

---

## 🚀 Getting Started

### Prerequisites
*   Docker & Docker Compose installed.
*   API keys for **Groq**, **eBay**, and **Daraz** (optional for core features).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AsithaLKonara/Dropshipping-automation.git
    cd Dropshipping-automation
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=dropshipping
    REDIS_URL=redis://redis:6379/0
    DATABASE_URL=postgresql://postgres:postgres@db:5432/dropshipping
    GROQ_API_KEY=your_groq_api_key
    ```

3.  **Start the system:**
    ```bash
    docker-compose up --build
    ```

---

## 📈 API Endpoints

Once running, you can access the interactive API docs at `http://localhost:8000/docs`.

### Product Research
*   `POST /api/v1/products/scrape`: Trigger a background scrape for a keyword.
*   `GET /api/v1/products/`: List all scraped products.

### Listing Management
*   `POST /api/v1/products/{product_id}/list`: Optimize and list a product on marketplaces.

### Order Processing
*   `POST /api/v1/orders/sync`: Fetch new orders from eBay/Daraz.
*   `POST /api/v1/orders/process`: Automate AliExpress orders for pending items.

---

## ⚖️ License
This project is for educational and personal use. Please ensure you comply with the Terms of Service of AliExpress, eBay, and Daraz.
