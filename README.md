Place holder ReadME

Pooja Shop PWA

Turn your traditional pooja shop into a modern, organized, and efficient business.

A full-stack Progressive Web App (PWA) designed for small pooja shops to manage inventory, sales, purchases, payments, orders, and analytics, while offering a QR-based ordering interface for customers. This project demonstrates Next.js, tRPC, Supabase, IndexedDB, offline-first caching, and modern frontend & backend best practices.

Table of Contents

Features

Tech Stack

Architecture

Installation

Usage

Screenshots / Demo

Future Enhancements

License

Features
Customer Side

Scan a QR code to view the shop catalog

Browse items with images, prices, and multilingual names

Add items to cart and place orders

Orders above ₹500 prompt shopkeeper confirmation

Shopkeeper Side

Dashboard: Quick overview of stock, orders, and pending payments

Orders Management: Track orders, update status (Packed → Ready → Completed)

Inventory Management: Add/edit/delete items, track quantity & location, low-stock alerts

Sales Tracking: Automatic stock updates, sales history, customer tracking

Purchases & Supplier Management: Add purchases, upload bill photos (stored locally), track pending/partial payments

Analytics / Reports: Profit per item, top-selling items, monthly trends, charts

QR Code Management: Generate and scan QR codes for items or boxes

Offline-first Support:

Updates reflected instantly even without internet

IndexedDB stores bill images, offline changes, and a sync queue

Automatic sync to Supabase when online

Tech Stack
Layer	Technology
Frontend	Next.js, TailwindCSS, React, Recharts
Backend / API	tRPC (Type-safe API layer)
Database	Supabase (Postgres)
Offline Storage	IndexedDB (idb library)
PWA / Offline Caching	next-pwa
QR Codes	qrcode npm library
Hosting	Vercel (Frontend), Supabase (DB & Storage)
Architecture

Customer → Catalog / Orders → Supabase orders table

Shopkeeper → Dashboard → Inventory, Sales, Purchases, Suppliers

Offline-first Layer: IndexedDB for local storage of bill photos, offline CRUD, sync queue

Service Worker (next-pwa): Caches static assets and API responses

tRPC: Type-safe bridge between Next.js frontend and Supabase backend

Data Flow:

Customer places order → stored in Supabase

Shopkeeper updates inventory, records purchases/sales → UI reflects instantly

Offline changes saved to IndexedDB → synced automatically when online

Analytics generated from Supabase data

Installation
# 1. Clone repository
git clone https://github.com/your-username/pooja-shop-pwa.git
cd pooja-shop-pwa

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Run locally
npm run dev

Usage

Customer: Scan QR code → browse catalog → place order

Shopkeeper: Log in → manage inventory, track orders, record purchases & payments → view analytics

Offline Mode: Any updates while offline are stored in IndexedDB and synced automatically when online

Screenshots / Demo

(Add screenshots or GIFs demonstrating)

Customer catalog & ordering interface

Shopkeeper dashboard & order management

Inventory management & low-stock alerts

Purchase entry with bill photo upload

Analytics charts and top-selling items

Offline-first workflow (updates reflected without internet)

Live Demo: [Add Vercel link here]

Future Enhancements

Multi-language interface for customer & staff

Export reports as CSV/PDF

Notifications for low-stock items or pending payments

Multi-user shopkeeper/staff login roles

Cloud backup for bill images while keeping offline-first support

License

This project is MIT Licensed — free to use, modify, and showcase in your portfolio.