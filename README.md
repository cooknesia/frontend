**Cooknesia** adalah platform web untuk mengeksplorasi 
resep masakan tradisional Indonesia dari 38 provinsi. Platform ini 
menampilkan kekayaan kuliner nusantara dengan fitur-fitur modern dan 
interaktif.

## 🚀 Teknologi yang Digunakan

### Framework & Library Utama

- **Next.js 15.2.4** - Framework React untuk production 
- **React 18.3.1** - Library JavaScript untuk UI 
- **Tailwind CSS** - Framework CSS utility-first 

### UI Components & Styling

- **Radix UI** - Komponen UI yang accessible dan customizable 
- **Lucide React** - Icon library 
- **Class Variance Authority** - Utility untuk styling variants 

### State Management & Forms

- **Zustand** - State management yang ringan
- **React Hook Form** - Library untuk form handling
- **Zod** - Schema validation

### Authentication & API

- **Google OAuth** - Autentikasi dengan Google
- **Axios** - HTTP client untuk API calls
- **JWT Decode** - Untuk handling JWT tokens

## 📁 Struktur Project

### Direktori Utama

```
├── app/                    # App Router Next.js
├── components/             # Komponen React yang reusable
├── context/               # React Context providers
├── data/                  # Data statis dan konfigurasi
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── store/                 # Zustand stores
├── styles/                # CSS dan styling file
```

### Halaman Aplikasi

- **Homepage** (`/`) - Landing page dengan hero section dan fitur utama
- **Resep** (`/resep`) - Halaman daftar dan pencarian resep
- **Rekomendasi** (`/rekomendasi`) - Sistem rekomendasi resep
- **Favorites** (`/favorites`) - Koleksi resep favorit user
- **Profile** (`/profile`) - Halaman profil pengguna

### Komponen Utama components:1-25

- **Layout Components** - Header, Footer, Navigation
- **Recipe Components** - Card resep, detail resep, daftar bahan
- **Home Components** - Hero section, province scroll
- **UI Components** - Komponen design system berbasis Radix UI
- **Chatbot** - Fitur chatbot interaktif
- **Authentication** - Login button dan protected routes

## 🎨 Design System

### Warna Tema

- **Primary Red**: `#A31D1D` - Warna utama aplikasi
- **Custom Cream**: `#F8F2DE` - Warna background hangat
- **Custom Blue**: `#9CABC2` - Warna sekunder
- **Custom Beige**: `#E5D0AC` - Warna accent

### Responsive Design

- Menggunakan Tailwind CSS dengan breakpoint standar
- Container maksimal 1400px untuk layar besar

## 🌟 Fitur Utama

### 1. Eksplorasi Resep Provinsi

- Menampilkan resep dari 38 provinsi Indonesia
- Data provinsi dengan informasi ibukota

### 2. Fitur Interaktif

- **Resep Otentik** - Koleksi resep tradisional
- **Simpan Favorit** - Sistem bookmark resep
- **Rating & Review** - Sistem penilaian komunitas

### 3. Authentication

- Login dengan Google OAuth
- Protected routes untuk fitur premium
- Context provider untuk state management auth

### 4. Chatbot Intelligence

- Chatbot provider dengan context
- Fitur rekomendasi berbasis AI

## 🛠️ Pengembangan

### Prerequisites

- Node.js (versi terbaru)
- npm atau yarn package manager

### Instalasi

```
# Clone repository
git clone https://github.com/cooknesia/frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### Scripts Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run start` - Menjalankan production server
- `npm run lint` - Menjalankan ESLint
- `npm run format` - Format code dengan Prettier

### Development Tools

- **ESLint** - Code linting dengan konfigurasi Next.js
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📱 Fitur Responsif

Aplikasi dioptimalkan untuk berbagai ukuran layar:

- Mobile-first approach
- Responsive navigation
- Adaptive card layouts
- Touch-friendly interactions

## 🔒 Keamanan

- JWT token handling untuk autentikasi
- Protected routes untuk konten premium
- Validasi input dengan Zod schema
- Google OAuth integration yang aman

## 📈 Performance

- Next.js App Router untuk optimal loading
- Image optimization bawaan Next.js
- Component lazy loading
- CSS-in-JS dengan Tailwind untuk bundle optimization

## Notes

Repository ini merupakan frontend dari aplikasi Cooknesia yang fokus 
pada eksplorasi kuliner Indonesia. Aplikasi menggunakan teknologi modern
 dengan Next.js sebagai foundation, dilengkapi dengan UI components yang
 accessible dari Radix UI, dan state management yang efisien dengan 
Zustand. Design system menggunakan palet warna yang warm dan 
Indonesia-inspired, mencerminkan identitas kuliner nusantara.

Struktur aplikasi dirancang modular dengan pemisahan yang jelas 
antara pages, components, dan business logic. Fitur-fitur seperti 
authentication, favorites, dan chatbot terintegrasi dengan baik untuk 
memberikan pengalaman pengguna yang komprehensif dalam mengeksplorasi 
resep-resep tradisional Indonesia.
