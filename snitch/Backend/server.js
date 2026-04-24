import app from './src/app.js';
import { config } from './src/config/config.js';



const PORT = config.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
