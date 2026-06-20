# 📁 Struktur Folder - Standar Vue/Nuxt

## ✅ Sebelum vs Sesudah

### ❌ Struktur Lama (Tidak Terorganisir)
```
└── components/
    ├── README.md (tidak perlu)
    └── ...

└── plugins/
    ├── README.md (tidak perlu)
    └── axios.js

└── middleware/
    ├── README.md (tidak perlu)
    └── (kosong)

└── store/
    ├── README.md (tidak perlu)
    ├── index.js
    └── ...
```

### ✅ Struktur Baru (Terorganisir & Scalable)
```
├── assets/
├── components/
├── constants/          # ← NEW
│   ├── api.js
│   ├── app.js
│   └── index.js
├── helpers/           # ← NEW
│   └── index.js
├── layouts/
├── middleware/        # ← Sekarang ada auth.js, guest.js
├── pages/
├── plugins/
├── services/          # ← NEW
│   ├── auth.service.js
│   ├── campaign.service.js
│   ├── transaction.service.js
│   └── index.js
├── static/
├── store/
├── utils/             # ← NEW
│   ├── formatter.js
│   └── validators.js
├── nuxt.config.js
├── package.json
├── PROJECT_STRUCTURE.md
└── STRUCTURE_CLEANUP.md (ini file)
```

## 🆕 Folder Baru & Fungsinya

### 1. **`services/`** - API Service Layer
Abstraksi untuk semua API calls. Setiap service class punya methods untuk:
- Login/Register
- Get Campaigns
- Create Transaction
- dll

**File:**
- `auth.service.js` - Authentikasi
- `campaign.service.js` - Campaign management
- `transaction.service.js` - Transactions
- `index.js` - Export semua services

**Keuntungan:**
- Centralized API logic
- Easy to test
- Reusable across components

### 2. **`constants/`** - Application Constants
Semua konstanta dalam satu tempat. Tidak ada magic strings!

**File:**
- `api.js` - API endpoints, status enums
- `app.js` - App config, timeouts
- `index.js` - Re-export semua

**Contoh:**
```javascript
import { API_ENDPOINTS, TOAST_TYPES } from '@/constants'
```

### 3. **`utils/`** - Utility Functions
Helper functions yang pure (no side effects).

**File:**
- `formatter.js` - Format currency, date, text
- `validators.js` - Validate email, password, dll

**Contoh:**
```javascript
import { formatCurrency, isValidEmail } from '@/utils'
```

### 4. **`helpers/`** - Centralized Export
Re-export point untuk utils dan constants. Memudahkan imports!

**Contoh:**
```javascript
// ❌ Panjang
import { formatCurrency } from '@/utils/formatter'
import { isValidEmail } from '@/utils/validators'
import { API_ENDPOINTS } from '@/constants/api'

// ✅ Ringkas
import { formatCurrency, isValidEmail, API_ENDPOINTS } from '@/helpers'
```

### 5. **`middleware/`** - Middleware (Updated)
Nuxt middleware untuk route protection.

**File:**
- `auth.js` - Protect authenticated routes
- `guest.js` - Protect guest-only routes

**Usage:**
```javascript
export default {
  middleware: 'auth'  // atau ['auth', 'guest']
}
```

## 📊 Data Flow dengan Structure Baru

```
Component
    ↓
methods: async method() {
  await this.$store.dispatch('auth/login', creds)
}
    ↓
Store Action (store/auth.js)
    ↓
Service Class (services/auth.service.js)
  - await this.$axios.post(...)
    ↓
API Endpoint (constants/api.js)
    ↓
Backend API
    ↓
Response ← → Mutations update state
    ↓
Component reactive update
```

## 🚀 Cara Menggunakan

### Scenario 1: Tambah API Endpoint

**Step 1:** Update `constants/api.js`
```javascript
export const API_ENDPOINTS = {
  CAMPAIGN: {
    // ... existing
    DELETE: (id) => `/api/v1/campaigns/${id}`,  // ← Tambah
  }
}
```

**Step 2:** Update service
```javascript
// services/campaign.service.js
async deleteCampaign(id) {
  const response = await this.$axios.delete(`/api/v1/campaigns/${id}`)
  return response.data
}
```

**Step 3:** Update store action
```javascript
// store/campaign.js
async deleteCampaign({ commit }, id) {
  // ... existing logic
  const response = await service.deleteCampaign(id)
  // ...
}
```

**Step 4:** Use in component
```javascript
methods: {
  async deleteCampaign(id) {
    await this.$store.dispatch('campaign/deleteCampaign', id)
  }
}
```

### Scenario 2: Tambah Formatter

**Step 1:** Tambah di `utils/formatter.js`
```javascript
export function formatPercent(value) {
  return `${Math.round(value)}%`
}
```

**Step 2:** Re-export di `helpers/index.js`
```javascript
export * from '../utils/formatter'
```

**Step 3:** Use di component
```javascript
import { formatPercent } from '@/helpers'

// Di template
{{ formatPercent(progress) }}
```

### Scenario 3: Protect Route dengan Middleware

```javascript
// pages/dashboard/index.vue
export default {
  middleware: 'auth',  // ← Hanya logged-in users
  // ...
}

// pages/login.vue
export default {
  middleware: 'guest',  // ← Hanya non-authenticated users
  // ...
}
```

## 📦 Import Patterns

### ✅ Best Practices

```javascript
// Use centralized exports (helpers)
import { 
  formatCurrency, 
  isValidEmail, 
  API_ENDPOINTS 
} from '@/helpers'

// Use constants
import { TOAST_TYPES, CAMPAIGN_STATUS } from '@/constants'

// Use store actions
this.$store.dispatch('auth/login', credentials)
this.$store.commit('auth/SET_USER', user)

// Middleware in pages
export default {
  middleware: 'auth'
}
```

### ❌ Avoid

```javascript
// Don't use relative paths
import x from '../../../utils/formatter'

// Don't put API calls in components
const res = await this.$axios.post(...)

// Don't repeat constants
if (status === 'pending') { ... }  // ❌
if (status === TRANSACTION_STATUS.PENDING) { ... }  // ✅

// Don't add middleware to every page manually
// Use nuxt.config if all pages protected
```

## 📋 Migration Checklist

- [x] Created `services/` folder with API services
- [x] Created `constants/` folder with app constants
- [x] Created `utils/` folder with helper functions
- [x] Created `helpers/` as centralized export point
- [x] Added `middleware/auth.js` dan `middleware/guest.js`
- [x] Updated `nuxt.config.js` with aliases
- [x] Removed unnecessary README files
- [ ] Update components to use new structure
- [ ] Update store modules to use services
- [ ] Update pages to use middlewares

## 📚 Next Steps

1. **Update Component Imports**
   ```javascript
   // Old
   const res = await this.$axios.post('/api/v1/campaigns')
   
   // New
   await this.$store.dispatch('campaign/fetchCampaigns')
   ```

2. **Use Formatters**
   ```javascript
   // Template
   {{ formatCurrency(amount) }}
   {{ formatDate(createdAt) }}
   ```

3. **Use Validators**
   ```javascript
   // Script
   if (!isValidEmail(email)) {
     // show error
   }
   ```

4. **Use Constants**
   ```javascript
   if (status === TRANSACTION_STATUS.SUCCESS) {
     // ...
   }
   ```

## 🎯 Benefits

✅ **Better Organization** - Clear separation of concerns
✅ **Easier Testing** - Services can be tested independently
✅ **Scalability** - Easy to add new features
✅ **Reusability** - Formatters, validators used everywhere
✅ **Maintainability** - Changes in one place, affects everywhere
✅ **Type Safety** - Constants prevent typos
✅ **Performance** - Lazy loading optimizations possible

## 📖 Reference Files

- `PROJECT_STRUCTURE.md` - Detailed structure guide
- `QUICK_START.md` - Getting started guide
- `SETUP.md` - Detailed setup instructions
- `.env` - Environment configuration
- `nuxt.config.js` - Nuxt configuration
