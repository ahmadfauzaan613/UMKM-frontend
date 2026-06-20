
# UMKM Frontend - Struktur Folder Final

## 📁 Tree View

```
UMKM-frontend/
│
├── 📂 assets/                          # Static assets (images, fonts, styles)
│   └── css/
│       └── tailwind.css
│
├── 📂 components/                      # Reusable Vue components
│   ├── CallToAction.vue
│   ├── Footer.vue
│   ├── Navbar.vue
│   └── ToastContainer.vue
│
├── 📂 constants/                       # ✨ NEW - App constants
│   ├── api.js                          # API endpoints & enums
│   ├── app.js                          # App configuration
│   └── index.js                        # Re-export
│
├── 📂 helpers/                         # ✨ NEW - Centralized exports
│   └── index.js                        # Re-export utils & constants
│
├── 📂 layouts/                         # Layout components for pages
│   ├── auth.vue                        # Auth pages layout
│   ├── default.vue                     # Default layout
│   ├── error.vue                       # Error layout
│   └── success.vue                     # Success layout
│
├── 📂 middleware/                      # 🔄 UPDATED - Nuxt middleware
│   ├── auth.js                         # ✨ NEW - Route protection
│   └── guest.js                        # ✨ NEW - Guest-only routes
│
├── 📂 pages/                           # Auto-routed pages
│   ├── index.vue                       # Homepage
│   ├── login.vue                       # Login page
│   ├── register.vue                    # Register page
│   ├── dashboard/
│   │   ├── index.vue
│   │   ├── transactions.vue
│   │   └── projects/
│   │       └── _id.vue
│   ├── projects/
│   │   └── _id.vue
│   └── transaction/
│       ├── error.vue
│       ├── finish.vue
│       └── unfinish.vue
│
├── 📂 plugins/                         # Nuxt plugins
│   └── axios.js                        # Axios configuration & interceptors
│
├── 📂 services/                        # ✨ NEW - API service layer
│   ├── auth.service.js                 # Auth API calls
│   ├── campaign.service.js             # Campaign API calls
│   ├── transaction.service.js          # Transaction API calls
│   └── index.js                        # Re-export services
│
├── 📂 static/                          # Public static files
│   └── (images, favicons, etc)
│
├── 📂 store/                           # Vuex store modules
│   ├── index.js                        # Root store (toasts)
│   ├── auth.js                         # Auth state & actions
│   ├── campaign.js                     # Campaign state & actions
│   └── transaction.js                  # Transaction state & actions
│
├── 📂 utils/                           # ✨ NEW - Utility functions
│   ├── formatter.js                    # Format currency, date, text
│   └── validators.js                   # Validate email, password, etc
│
├── 📄 .env                             # Environment variables (local)
├── 📄 .env.example                     # Environment template
├── 📄 .editorconfig                    # Editor configuration
├── 📄 .gitignore                       # Git ignore rules
├── 📄 .prettierrc                      # Prettier configuration
├── 📄 jsconfig.json                    # JS configuration with path aliases
├── 📄 nuxt.config.js                   # Nuxt configuration
├── 📄 package.json                     # Dependencies
├── 📄 package-lock.json                # Lock file
├── 📄 tailwind.config.js               # Tailwind configuration
│
├── 📄 README.md                        # Main README
├── 📄 QUICK_START.md                   # Quick start guide
├── 📄 SETUP.md                         # Detailed setup guide
├── 📄 PROJECT_STRUCTURE.md             # Structure documentation
└── 📄 STRUCTURE_CLEANUP.md             # This file
```

## 📊 Folder Organization Summary

| Folder | Purpose | Content |
|--------|---------|---------|
| `assets/` | Static assets | Images, fonts, CSS files |
| `components/` | UI Components | Reusable Vue components |
| `constants/` | ✨ NEW | API endpoints, enums, config |
| `helpers/` | ✨ NEW | Centralized export point |
| `layouts/` | Layouts | Page wrappers |
| `middleware/` | 🔄 UPDATED | Route protection, auth checks |
| `pages/` | Routes | File-based routing |
| `plugins/` | Plugins | Axios, third-party setup |
| `services/` | ✨ NEW | API service classes |
| `static/` | Public files | Directly served files |
| `store/` | State | Vuex store modules |
| `utils/` | ✨ NEW | Formatters, validators |

## 🔄 Data Flow Diagram

```
┌─────────────┐
│  Component  │
│   (.vue)    │
└──────┬──────┘
       │
       │ imports from
       ↓
┌─────────────────────────────────────────┐
│  @/helpers  (centralized imports)       │
├─────────────────────────────────────────┤
│ - formatCurrency()                      │
│ - isValidEmail()                        │
│ - API_ENDPOINTS                         │
│ - TOAST_TYPES                           │
└──────────┬──────────────────────────────┘
           │
     ┌─────┴──────────────────────┐
     ↓                            ↓
┌──────────────┐          ┌──────────────┐
│  @/utils     │          │ @/constants  │
├──────────────┤          ├──────────────┤
│ formatter.js │          │ api.js       │
│ validators.js│          │ app.js       │
└──────────────┘          └──────────────┘
     │
     │ When async action needed
     ↓
┌──────────────────────┐
│  this.$store.commit/ │
│  this.$store.dispatch│
└──────────┬───────────┘
           │
           ↓
   ┌───────────────┐
   │  @/store      │
   │  (Vuex module)│
   └───────┬───────┘
           │
           │ creates service instance
           ↓
   ┌────────────────┐
   │  @/services    │
   │ (API calls)    │
   └────────┬────────┘
            │
            ↓
    ┌────────────────┐
    │  Backend API   │
    │   /api/v1/*    │
    └────────────────┘
```

## 🎯 Usage Examples

### Import Pattern 1: Simple Formatting
```javascript
// ❌ Old way
<div>{{ amount }}</div>

// ✅ New way
<script>
import { formatCurrency } from '@/helpers'
export default {
  methods: {
    formatCurrency
  }
}
</script>
<template>
  <div>{{ formatCurrency(amount) }}</div>
</template>
```

### Import Pattern 2: Validation
```javascript
// ✅ New way
<script>
import { isValidEmail, getErrorMessage } from '@/helpers'

export default {
  methods: {
    validate() {
      if (!isValidEmail(this.email)) {
        this.error = 'Email tidak valid'
      }
    }
  }
}
</script>
```

### Import Pattern 3: API Calls
```javascript
// ✅ New way - Using Store
<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('campaign', ['fetchCampaigns']),
    async loadData() {
      await this.fetchCampaigns()  // ← Clean!
    }
  }
}
</script>
```

### Import Pattern 4: Middleware
```javascript
// ✅ New way - Protect route
<script>
export default {
  middleware: 'auth',  // ← Simple!
  // ...
}
</script>
```

## ✨ New Features

### 1. Services (API Layer)
- `AuthService` - Login, register, fetch user
- `CampaignService` - Get campaigns, create, update
- `TransactionService` - Create transactions, get history

```javascript
// Inside store action
const service = new AuthService(this.$axios)
const response = await service.login(credentials)
```

### 2. Constants (No Magic Strings)
```javascript
// ❌ Old
if (status === 'pending') { ... }

// ✅ New
import { TRANSACTION_STATUS } from '@/constants'
if (status === TRANSACTION_STATUS.PENDING) { ... }
```

### 3. Middleware (Route Protection)
```javascript
// ✅ Protect authenticated routes
middleware: 'auth'

// ✅ Protect guest-only routes  
middleware: 'guest'
```

### 4. Utils (Pure Functions)
```javascript
// Formatters
formatCurrency(1000000)    // "Rp 1.000.000"
formatDate(timestamp)      // "20 Juni 2026"

// Validators
isValidEmail('test@test.com')
isValidPassword('pass123')
```

## 🚀 How to Use

1. **For simple utilities:** Use via `@/helpers`
   ```javascript
   import { formatCurrency } from '@/helpers'
   ```

2. **For API calls:** Use via store
   ```javascript
   this.$store.dispatch('campaign/fetchCampaigns')
   ```

3. **For route protection:** Use middleware
   ```javascript
   middleware: 'auth'
   ```

4. **For constants:** Import from constants
   ```javascript
   import { API_ENDPOINTS } from '@/constants'
   ```

## 📖 Documentation Files

- **README.md** - Project overview
- **QUICK_START.md** - Get started in 5 minutes
- **SETUP.md** - Detailed setup instructions
- **PROJECT_STRUCTURE.md** - In-depth folder guide
- **STRUCTURE_CLEANUP.md** - Before & after + migration guide
- **STRUCTURE_TREE.md** - This file

## ✅ Standards Applied

✅ Vue.js conventions
✅ Nuxt.js best practices
✅ Scalable folder structure
✅ Clear separation of concerns
✅ Centralized configuration
✅ DRY (Don't Repeat Yourself)
✅ SOLID principles
✅ Consistent naming conventions

## 🎯 Result

```
┌─────────────────────────────────────────┐
│    Well-Organized Project Structure     │
├─────────────────────────────────────────┤
│ ✅ Easy to navigate                     │
│ ✅ Easy to maintain                     │
│ ✅ Easy to scale                        │
│ ✅ Easy to test                         │
│ ✅ Team-friendly                        │
│ ✅ Industry standard                    │
└─────────────────────────────────────────┘
```

---

**Created:** 2026-06-20
**Updated:** Folder structure cleanup & reorganization
**Standard:** Vue/Nuxt conventions
