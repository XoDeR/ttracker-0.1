import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { getTags, getTagById, createTag, updateTag, deleteTag } from './routes';
import { getTimeSpans, getTimeSpanById, createTimeSpan, updateTimeSpan, deleteTimeSpan } from './routes';

const app = new Hono();
const port = 3001;

// Enable CORS middleware
app.use('*', cors());

// Tag endpoints
app.get('/tags', getTags);
app.get('/tags/:id', getTagById);
app.post('/tags', createTag);
app.put('/tags/:id', updateTag);
app.delete('/tags/:id', deleteTag);

// TimeSpan endpoints
app.get('/timespans', getTimeSpans);
app.get('/timespans/:id', getTimeSpanById);
app.post('/timespans', createTimeSpan);
app.put('/timespans/:id', updateTimeSpan);
app.delete('/timespans/:id', deleteTimeSpan);

// Start the server
// Use the Node.js adapter to start the server
serve({
  fetch: app.fetch,
  port,
});
console.log(`Server running on http://localhost:${port}`);

