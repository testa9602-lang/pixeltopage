# Level 2: connect a real AI model (optional)

The chat widget in the parent folder uses a small keyword knowledge base, so it works with no setup.
To use a real AI model, never put your API key in front-end code. Use a server function instead.

- `frontend-askAI.js`: replaces `askAI()` in `script.js`. It calls YOUR endpoint, not the AI provider.
- `netlify/functions/chat.js`: runs on the server, reads the key from an environment variable and calls the AI API.

Steps (Netlify example):
1. Put the `netlify` folder at the root of your site repo.
2. In Netlify: Site settings > Environment variables > add `ANTHROPIC_API_KEY` (or the key for your provider).
3. Deploy. Your front end calls `/.netlify/functions/chat`.

Check your provider's current docs for model names and pricing. Add rate limiting before making a site public.
