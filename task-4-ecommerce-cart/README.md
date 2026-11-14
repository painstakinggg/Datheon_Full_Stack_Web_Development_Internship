# Forma — Datheon Internship Task 4

A responsive e-commerce product catalog and interactive shopping cart built with React, TypeScript, and Vite.

## Features

- Fetches product catalog and categories from FakeStoreAPI
- Search products by title and description
- Filter products by category
- Sort by featured order, price, or customer rating
- Add products to a shopping bag
- Increase and decrease item quantities or remove items
- Persist shopping bag contents in browser localStorage
- Shopping bag drawer with subtotal, estimated tax, shipping, and total
- Simulated checkout form with no real payment collection
- Favorite toggle for products during the current session
- Loading, empty, and API error states
- Responsive desktop, tablet, and mobile layouts
- Accessible names and visible keyboard focus styles

## Technology

- React 19
- TypeScript
- Vite
- CSS
- Lucide React
- FakeStoreAPI
- Browser localStorage

## Run locally

Requirements: Node.js compatible with Vite 8 and npm.

```bash
cd task-4-ecommerce-cart
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## API

Product and category data are requested from https://fakestoreapi.com. An internet connection is required to load the catalog. The application displays an error state if the API is unavailable.

## Cart storage

The shopping bag is stored in the current browser using the localStorage key `datheon-ecommerce-cart-v1`. The bag remains available after refreshing the page in the same browser profile. Clearing browser site data or using another browser/device will not carry the bag across. If browser storage is unavailable or full, the application displays a warning.

## Pricing assumptions

- Currency: USD, as returned by FakeStoreAPI
- Estimated tax: 7.5% of the subtotal
- Shipping: $8 for orders below $100; free for orders of $100 or more
- Empty carts have no shipping charge

These are demonstration calculations for the internship task, not a real merchant tax or shipping policy.

## Checkout scope

Checkout is simulated. The form collects a name and email for the demo confirmation, clears the current cart, and does not process payments, create a real order, or transmit customer details to a backend.

## Scope

This is a frontend demonstration with no user accounts, remote database, payment gateway, or order-management backend.