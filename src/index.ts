'use strict';

import express from 'express';
import routes from './routes/index.js';

// Constants
const PORT = 8090;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/api', routes);

// start the Express Server
app.listen(PORT, HOST, (): void => {
console.log(`VS code console? Running on http://${HOST}:${PORT}`);
});

export default app;