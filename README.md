# Fix Karachi: Pothole Tracker

A web app where citizens report potholes with a photo and their location, and city admins see them on a map, prioritise them and track repairs. Available in English and Urdu.

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, React Router, Leaflet / React-Leaflet, i18next
- **Backend:** Node.js, Express, MongoDB with Mongoose
- **Auth and uploads:** JWT, bcrypt, Multer

## Features

**For citizens**
- Report a pothole with up to 5 photos, a severity rating and GPS location
- Browse all reports on an interactive map
- See nearby reports
- Switch between English and Urdu

**For admins**
- Secure login
- Dashboard with stats and a heatmap
- Update a report's status: Reported, In Progress, Resolved or Flagged
- Superadmin-only delete

## How prioritisation works

Every report gets a priority score:

```
score = (severity x 10) + (reports within 50 m x 5)
```

Reports close to each other are grouped using MongoDB's `2dsphere` index and `$geoWithin`, so a street with many reports rises to the top of the admin queue.

| Score  | Priority |
|--------|----------|
| 10-20  | Low      |
| 21-40  | Medium   |
| 41-100 | High     |

## Project structure

```
backend/src/
  features/potholes/   model, routes, controller, prioritisation service
  features/admin/      auth, stats, heatmap, status updates
  middleware/          auth, i18n, error handling
frontend/src/
  pages/public/        home, report, map
  pages/admin/         login, dashboard
  components/map/      map and heatmap layers
  i18n/                English and Urdu translations
```

## Run it locally

Needs Node.js, pnpm and a local MongoDB.

```bash
# Backend
cd backend
pnpm install
cp .env.example .env      # then set your own JWT_SECRET
pnpm seed                 # creates the default admin account
pnpm dev                  # http://localhost:5000

# Frontend (new terminal)
cd frontend
pnpm install
cp .env.example .env
pnpm dev                  # http://localhost:5173
```

The seed script prints the default admin login. Change that password after your first login.
