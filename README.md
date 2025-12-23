# 📝 Notes App – React + Appwrite

A modern **note-taking web application** built with **React, TypeScript, Vite**, and **Appwrite**.
The project focuses on **rich text editing**, **smooth UX**, and **scalable architecture**, inspired by apps like **Notion** and **Apple Notes**.

---

## ✨ Key Features

- 📒 Notebook & Note management
- ✍️ Powerful **Rich Text Editor** (Lexical-based)
- ⚡ Per-item loading (no global UI flicker)
- 🗑 Smart delete behavior (auto-select nearest note)
- 🔗 Active note synced via URL (`searchParams`)
- 📱 Fully responsive (Mobile / Desktop)
- 🌙 Dark mode support
- 🔐 Authentication & protected routes
- ☁️ Appwrite backend (Database, Auth, Storage)

---

## 🧱 Tech Stack

### Frontend

- **React 18**
- **TypeScript**
- **Vite**
- **React Router**
- **TanStack React Query**
- **TailwindCSS**
- **ShadCN UI**
- **Lucide Icons**
- **Lexical Editor**

### Backend (BaaS)

- **Appwrite**
  - Authentication
  - Database (Notes, Notebooks, Tags)
  - Storage (Images)

---

## 📁 Project Structure

# Appwrite

VITE_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id

# Collections

VITE_APPWRITE_COLLECTION_NOTES=notes
VITE_APPWRITE_COLLECTION_NOTEBOOKS=notebooks
VITE_APPWRITE_COLLECTION_TAGS=tags

# Storage

VITE_APPWRITE_BUCKET_IMAGES=images

```txt
src/
├─ assets/                 # Static assets
│
├─ components/
│  ├─ core/                # Route guards, splash screen
│  ├─ editor/              # Rich text editor (Lexical)
│  ├─ layout/              # App layouts
│  ├─ shared/              # Shared UI (404, loader, toaster…)
│  └─ ui/                  # ShadCN UI components
│
├─ features/
│  ├─ auth/                # Authentication feature
│  ├─ editor/              # Editor header & content
│  ├─ note/                # Notes feature (list, item, sidebar)
│  ├─ notebook/            # Notebooks feature
│  └─ tag/                 # Tags feature
│
├─ hooks/                  # Custom hooks (responsive, mobile)
│
├─ lib/
│  ├─ appwrite.ts          # Appwrite client
│  ├─ appwrite-config.ts   # Appwrite env config
│  └─ utils.ts             # Utilities
│
├─ provider/               # App providers (Theme, React Query)
│
├─ store/                  # Global state (Auth store)
│
├─ App.tsx
├─ main.tsx
└─ index.css




```
