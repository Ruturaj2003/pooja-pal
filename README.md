# Pooja Shop PWA

A full‑stack Progressive Web App (PWA) that transforms a traditional pooja shop into a modern, organized, and efficient digital business. It provides inventory management, order tracking, purchases, payments, analytics, and a QR‑based customer ordering system — with full offline‑first functionality.

---

## Features

### Customer

- Scan a QR code to instantly view the shop catalog
- Browse items with images, prices, and multilingual names
- Add items to cart and place orders
- Orders above ₹500 require shopkeeper confirmation

### Shopkeeper

- **Dashboard** with key stats: stock levels, orders, pending payments
- **Orders Management**: update statuses (Packed → Ready → Completed)
- **Inventory Management**: add/edit/delete items, low‑stock alerts, storage locations
- **Sales Tracking**: automatic stock reduction, sales history, customer tracking
- **Purchases & Suppliers**: record purchases, upload bill photos, track partial payments
- **Analytics**: profit per item, top‑selling items, monthly trends
- **QR Code Tools**: generate and scan QR codes for items or boxes

### Offline‑First

- Works fully without internet
- IndexedDB stores bill images, offline CRUD operations, and sync queue
- Auto‑syncs to Supabase when back online

---

## Tech Stack

| Layer           | Technology                                 |
| --------------- | ------------------------------------------ |
| Frontend        | Next.js, React, TailwindCSS, Recharts      |
| Backend / API   | tRPC (type‑safe API layer)                 |
| Database        | Supabase (Postgres)                        |
| Offline Storage | IndexedDB (idb library)                    |
| PWA / Caching   | next‑pwa                                   |
| QR Codes        | qrcode npm library                         |
| Hosting         | Vercel (Frontend), Supabase (DB & Storage) |

---

## Architecture

### System Overview

```
Customer → Catalog / Orders → Supabase orders table
Shopkeeper → Dashboard → Inventory, Sales, Purchases, Suppliers
```

### Data Flow

```
flowchart LR
    Customer -->|Places Order| Supabase
    Shopkeeper -->|Updates Inventory| Supabase
    Supabase --> App
    App -->|Offline| IndexedDB
    IndexedDB -->|Sync| Supabase
```

### Key Concepts

- IndexedDB stores offline operations & bill images
- Sync queue processes pending changes once online
- Service worker caches static assets & API responses
- tRPC provides type‑safe communication between Next.js and Supabase

---

## Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/pooja-shop-pwa.git
cd pooja-shop-pwa

# 2. Install dependencies
npm install

# 3. Create environment variables file
cp .env.example .env.local

# Edit .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Run locally
npm run dev
```

Node 18+ recommended.

---

## Usage

### Customer

- Scan QR code
- Browse catalog
- Add to cart & place order

### Shopkeeper

- Log in to dashboard
- Manage inventory
- Update order statuses
- Add purchases & manage payments
- View analytics

### Offline Mode

- Perform actions normally — all changes are stored locally
- Automatic sync triggers when internet is restored

---

## Screenshots / Demo

(Place your screenshots in `/screenshots` and reference them here.)

- Customer catalog view
- Shopkeeper dashboard
- Order management flow
- Inventory editor
- Purchase entry with bill photo upload
- Analytics charts
- Offline workflow

Live Demo: _Add Vercel deployment link here_

---

## Future Enhancements

- Multi‑language UI for both customer & staff
- Export reports as CSV/PDF
- Notifications for low‑stock or pending payments
- Staff roles & permissions
- Cloud backup for bill images while preserving offline‑first behavior
- Improved caching strategies

---

## License

MIT License — free to use, modify, and integrate into your portfolio.
