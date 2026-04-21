# 🚀 AutoDrop: AI-Powered Dropshipping Automation

AutoDrop is a state-of-the-art, end-to-end dropshipping automation engine. It combines a high-performance **FastAPI** backend with a premium **Next.js 14** dashboard, all orchestrated by a **Groq-powered AI Agent** capable of executing complex business workflows through natural language.

---

## 🧭 Key Features

### 🧠 AI Command Center
- **Natural Language Control**: Tell the AI to scrape, list, or analyze data.
- **Function Calling**: The agent translates commands into system actions (e.g., *"Scrape 20 tech gadgets"*).
- **Automated Copywriting**: AI rewrites product titles and descriptions for maximum SEO.

### 🔍 Smart Product Research
- **AliExpress Scraper**: Automated data extraction using Playwright.
- **Intelligent Filters**: Skip low-rated products or low-volume sellers automatically.
- **Image Optimization**: Local processing and optimization for marketplace standards.

### 📦 Order & Inventory Management
- **Automated Checkout**: One-click or automated supplier ordering.
- **Tracking Sync**: Real-time synchronization of tracking numbers to marketplaces.
- **Stock Monitor**: 24/7 monitoring of supplier availability to prevent overselling.

### 📈 Financial Analytics
- **Profit Tracking**: Real-time margin and revenue calculations.
- **Performance Metrics**: Visual dashboard for system health.

---

## 🏗 System Architecture

- **Frontend**: Next.js 14 (App Router, TailwindCSS, Framer Motion).
- **Backend API**: FastAPI (Python 3.11).
- **Task Engine**: Celery + Redis for heavy background automation.
- **Database**: PostgreSQL with SQLAlchemy ORM.
- **AI Engine**: Groq (Llama 3) for intelligence and tool calling.
- **Scraping**: Playwright (Headless Chromium).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL & Redis
- Groq API Key

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/AsithaLKonara/Dropshipping-automation.git
    cd Dropshipping-automation
    ```

2.  **Setup Backend**:
    ```bash
    pip install -r requirements.txt
    # Install browsers for Playwright
    playwright install chromium
    ```

3.  **Setup Frontend**:
    ```bash
    npm install
    ```

4.  **Environment Variables**:
    Create a `.env` file in the root:
    ```env
    DATABASE_URL=postgresql://user:pass@localhost:5432/autodrop
    REDIS_URL=redis://localhost:6379/0
    GROQ_API_KEY=your_key_here
    ```

5.  **Run Development Stack**:
    - **API**: `uvicorn api.main:app --reload`
    - **Frontend**: `npm run dev`
    - **Worker**: `celery -A api.worker.celery_app worker --loglevel=info`

---

## 🌍 Deployment

AutoDrop is optimized for **Vercel**. 
1. Push your code to GitHub.
2. Import to Vercel (it will detect `vercel.json`).
3. Set your Environment Variables in the Vercel Dashboard.

---

## ⚖️ License
Personal and Educational use. Comply with the Terms of Service of all integrated platforms.

*Built with ❤️ by Antigravity AI.*
