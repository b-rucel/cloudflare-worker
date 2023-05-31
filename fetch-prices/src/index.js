import { Router } from 'itty-router';
import { xenprices, dxnprices } from './routes';

// Create a new router
const router = Router();

router.get('/', () => {
  const body = JSON.stringify({ "hello": "world" });
  const headers = {
    "Content-type": "application/json"
  };

  return new Response(body, headers);
});

router.get('/xenprices/', xenprices);
router.get('/dxnprices/', dxnprices);

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
});
