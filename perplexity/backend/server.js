import connectToDB from './src/config/database.js';
import app from './src/app.js';
import { testAI } from './src/services/ai.service.js';
import  http from  "http"
import { initSocket } from './src/socket/server.socket.js';
connectToDB()
testAI()
const httpServer = http.createServer(app)
initSocket(httpServer);
httpServer.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
 
