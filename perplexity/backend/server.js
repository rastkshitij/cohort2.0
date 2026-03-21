import connectToDB from './src/config/database.js';
import app from './src/app.js';
import { testAI } from './src/services/ai.service.js';


connectToDB()
testAI()

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
 
