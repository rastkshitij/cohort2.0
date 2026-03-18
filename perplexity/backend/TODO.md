# Backend Server + DB Setup TODO

✅ **Backend Server + MongoDB Setup COMPLETE!**

## Structure Created
- `.env` (MONGO_URI)
- `src/config/database.js`
- `src/model/User.js`
- `src/controller/userController.js`
- `src/routes/userRoutes.js`
- `src/app.js` (Express app, middleware, routes)
- `server.js` (DB connect + listen)

## Next Steps
1. Start MongoDB: `mongod` (local) or set Atlas URI in `.env`.
2. `cd backend && npm install`
3. `cd backend && npm run dev`

**Test**:
- GET http://localhost:3000/ → Welcome message
- GET http://localhost:3000/api/users
- POST http://localhost:3000/api/users → `{ "name": "Test", "email": "test@example.com", "password": "123456" }`

Server ready with DB connection and basic User API!
