# Project Structure Guide

Struktur folder UMKM Frontend mengikuti standar Nuxt.js dan Vue.js best practices.

## 📁 Folder Organization

```
UMKM-frontend/
├── assets/                 # Static assets (images, fonts, styles)
│   └── css/
│       └── tailwind.css
│
├── components/             # Reusable Vue components
│   ├── CallToAction.vue
│   ├── Footer.vue
│   ├── Navbar.vue
│   └── ToastContainer.vue
│
├── constants/              # Application constants
│   ├── api.js             # API endpoints
│   ├── app.js             # App configuration
│   └── index.js
│
├── helpers/                # Helper utilities (re-exports)
│   └── index.js
│
├── layouts/                # Nuxt layout components
│   ├── auth.vue           # Auth pages layout
│   ├── default.vue        # Default layout
│   ├── error.vue          # Error layout
│   └── success.vue        # Success layout
│
├── middleware/             # Nuxt middleware
│   ├── auth.js            # Protect authenticated routes
│   └── guest.js           # Redirect authenticated users
│
├── pages/                  # Nuxt pages (auto-routes)
│   ├── index.vue          # Homepage
│   ├── login.vue          # Login page
│   ├── register.vue       # Register page
│   ├── dashboard/
│   │   ├── index.vue      # Dashboard home
│   │   ├── transactions.vue
│   │   └── projects/
│   ├── projects/
│   │   └── _id.vue
│   └── transaction/
│
├── plugins/                # Nuxt plugins
│   └── axios.js           # Axios configuration
│
├── services/               # API services
│   ├── auth.service.js    # Auth API calls
│   ├── campaign.service.js # Campaign API calls
│   ├── transaction.service.js
│   └── index.js
│
├── static/                 # Static files (public folder)
│
├── store/                  # Vuex store modules
│   ├── index.js           # Root store (toast notifications)
│   ├── auth.js            # Auth module
│   ├── campaign.js        # Campaign module
│   └── transaction.js     # Transaction module
│
├── utils/                  # Utility functions
│   ├── formatter.js       # Formatters (currency, date, etc)
│   └── validators.js      # Validators (email, password, etc)
│
├── .env                    # Environment variables (local)
├── .env.example           # Environment template
├── nuxt.config.js         # Nuxt configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── jsconfig.json          # JavaScript configuration
├── package.json           # Dependencies
└── README.md
```

## 🎯 Folder Usage

### `assets/`
- Images, fonts, styles yang tidak di-import dalam code
- Hanya untuk aset statis yang tidak dimodifikasi

### `components/`
- Reusable Vue components
- Tidak termasuk page-level components (lihat `pages/`)
- Contoh: `Navbar.vue`, `Footer.vue`, `Card.vue`

### `constants/`
- API endpoints
- App configuration constants
- Status enums
- Role definitions

### `helpers/`
- Re-export point untuk utils dan constants
- Memudahkan import dari components

### `layouts/`
- Layout wrappers untuk pages
- Default layout untuk semua pages
- Auth layout untuk login/register
- Error layout untuk error pages

### `middleware/`
- Auth middleware untuk route protection
- Guest middleware untuk guest-only pages
- Custom middleware untuk specific routes

### `pages/`
- Nuxt auto-generates routes dari struktur ini
- File-based routing (next/nuxt style)
- Nested routes via folder structure
- `_id.vue` = dynamic segments

### `plugins/`
- Nuxt plugins yang load sebelum app mount
- Axios configuration
- Global components registration
- Third-party library setup

### `services/`
- API service classes
- Abstraction untuk HTTP calls
- Business logic untuk API interaction
- Dependency injection via plugins

### `static/`
- Public files (favicon, images, etc)
- Served directly dari root (`/`)
- Untuk files yang tidak perlu bundling

### `store/`
- Vuex store modules
- State management
- Actions untuk API calls
- Mutations untuk state updates

### `utils/`
- Formatter functions (currency, date, text)
- Validator functions (email, password, etc)
- Helper functions
- Pure functions without side effects

## 📝 Import Patterns

### ✅ Recommended

```javascript
// From constants
import { API_ENDPOINTS, TOAST_TYPES } from '@/constants'

// From utils directly
import { formatCurrency, calculateProgress } from '@/utils/formatter'

// From services
import { AuthService } from '@/services/auth.service'

// From helpers (re-export point)
import { formatDate, isValidEmail } from '@/helpers'

// From store
import { mapActions, mapGetters } from 'vuex'
this.$store.dispatch('auth/login', credentials)

// From middleware
middleware: 'auth'  // or middleware: ['auth', 'guest']
```

### ❌ Avoid

```javascript
// Don't import from service plugins directly
// import { AuthService } from '@/plugins/auth'

// Don't put API calls directly in components
// const response = await this.$axios.post(...)

// Don't use relative paths for long imports
// import formatter from '../../../utils/formatter'
```

## 🚀 Adding New Features

### New API Endpoint
1. Add to `constants/api.js` → `API_ENDPOINTS`
2. Create method in `services/xxx.service.js`
3. Create Vuex module in `store/xxx.js` (actions for API calls)
4. Use in component via `this.$store.dispatch()`

### New Utility Function
1. Add to `utils/xxx.js`
2. Re-export in `helpers/index.js`
3. Import and use in components

### New Page
1. Create file in `pages/` with route path
2. Add `middleware: 'auth'` if protected
3. Use layout: `layout: 'auth'`
4. Import store actions and components

### New Component
1. Create in `components/`
2. Auto-imported in Nuxt (configured)
3. Use directly in templates: `<MyComponent />`

## 🔄 Data Flow

```
Component
    ↓
dispatch() from store
    ↓
Store Actions (async)
    ↓
Service class methods
    ↓
API endpoints (/api/v1/...)
    ↓
Backend
    ↓
Response back through chain
    ↓
Mutations update state
    ↓
Component reactive update
```

## 📦 Dependencies

- `@nuxtjs/axios` - HTTP client
- `@nuxtjs/auth` - Authentication
- `@nuxtjs/tailwindcss` - Styling
- `@nuxtjs/pwa` - PWA support

## 🎨 Code Organization Tips

1. **Keep components small** - Use small, reusable components
2. **Move logic to services** - Services handle API, state handles UI
3. **Use constants** - No magic strings
4. **Use validators** - Validate early
5. **Format output** - Use formatters for display
6. **Middleware first** - Protect routes early
7. **Lazy load** - Use dynamic imports for large components

## 📚 Related Files

- `.env` - Environment configuration
- `nuxt.config.js` - Nuxt configuration
- `tailwind.config.js` - Tailwind configuration
- `jsconfig.json` - JavaScript path aliases
