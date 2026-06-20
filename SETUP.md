# UMKM Frontend Setup Guide

## Prerequisites
- Node.js >= 12
- npm atau yarn

## Installation

1. **Install dependencies**
   ```bash
   cd UMKM-frontend
   npm install
   ```

2. **Configure environment variables**
   Edit `.env` file:
   ```env
   API_BASE_URL=http://localhost:8080
   DEBUG=false
   ```

3. **Ensure backend is running**
   The backend should be running on `http://localhost:8080` by default.
   See UMKM-backend README for setup instructions.

## Development

### Start development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate` - Generate static site

## Project Structure

```
UMKM-frontend/
├── pages/              # Nuxt pages/routes
│   ├── index.vue       # Landing page with campaigns
│   ├── login.vue       # Login page
│   ├── register.vue    # Registration page
│   ├── dashboard/      # Dashboard pages (protected)
│   ├── projects/       # Project detail pages
│   └── transaction/    # Transaction pages
├── store/              # Vuex store modules
│   ├── index.js        # Main store (toasts)
│   ├── auth.js         # Authentication
│   ├── campaign.js     # Campaign management
│   └── transaction.js  # Transaction management
├── components/         # Reusable components
├── layouts/            # Layout templates
├── plugins/            # Nuxt plugins
└── .env                # Environment configuration
```

## Store Modules

### Auth Module (`store/auth.js`)
- State: user, token, loading, error
- Actions:
  - `login()` - Login with email and password
  - `register()` - Register new user
  - `fetchUser()` - Fetch current user data
  - `logout()` - Clear authentication

### Campaign Module (`store/campaign.js`)
- Actions:
  - `fetchCampaigns()` - Get all campaigns
  - `fetchCampaignDetail(id)` - Get campaign details
  - `createCampaign()` - Create new campaign (auth required)
  - `updateCampaign()` - Update campaign (auth required)
  - `uploadCampaignImage()` - Upload campaign image

### Transaction Module (`store/transaction.js`)
- Actions:
  - `fetchUserTransactions()` - Get user's transactions
  - `fetchCampaignTransactions()` - Get transactions for a campaign
  - `createTransaction()` - Create new transaction
  - `handlePaymentNotification()` - Handle Midtrans notification

## API Integration

The frontend connects to the UMKM-backend API at the base URL specified in `.env`.

### Key Endpoints
- **Auth**: POST `/api/v1/sessions`, POST `/api/v1/users`
- **Users**: GET `/api/v1/user/fetch`
- **Campaigns**: GET/POST `/api/v1/campaigns`, GET `/api/v1/campaigns/:id`
- **Transactions**: GET/POST `/api/v1/transactions`

## Features

### Authentication
- User registration
- User login
- Token-based authentication (JWT)
- Protected routes

### Campaigns
- Browse available campaigns
- View campaign details
- Create campaigns (for UMKM owners)
- Upload campaign images
- Update campaign information

### Transactions
- Create transactions/investments
- View transaction history
- Payment integration with Midtrans

### User Management
- User profiles
- Avatar uploads
- User information updates

## Troubleshooting

### "Cannot connect to backend"
- Ensure UMKM-backend is running on port 8080
- Check `.env` API_BASE_URL configuration
- Check browser console for CORS errors

### "Login fails but endpoint is working"
- Verify backend response format matches auth configuration
- Check token is being properly stored
- Verify auth header is being sent correctly

### "Campaigns not loading"
- Check if backend is returning data in correct format
- Verify API_BASE_URL in .env
- Check browser network tab for API errors

## Development Tips

1. **Enable Debug Mode**: Set `DEBUG=true` in `.env` to see API requests in console
2. **Use Vue DevTools**: Install Vue DevTools browser extension for store debugging
3. **API Testing**: Use Postman to test backend API endpoints directly
4. **Check Middleware**: Some routes are protected - ensure you're logged in

## Next Steps

1. ✅ Setup frontend with proper API integration
2. ⏳ Test authentication flow
3. ⏳ Test campaign features
4. ⏳ Integrate payment gateway (Midtrans)
5. ⏳ Setup admin dashboard
