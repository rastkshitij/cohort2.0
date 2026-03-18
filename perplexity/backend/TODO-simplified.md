# Simplified Backend Server + DB Setup TODO (No Routes)

✅ **Simplified Setup COMPLETE** (Basic Server + DB Only)

app.js: Basic Express instance + middleware + / health check
server.js: DB connect → app.listen(3000)

**Manual Cleanup**: Delete folders src/model, src/controller, src/routes (if exist)

**Windows Run** (cmd):
```
cd backend
npx nodemon server.js
```

**Expected**: "MongoDB Connected", "Server on port 3000", GET / OK

Ready!
