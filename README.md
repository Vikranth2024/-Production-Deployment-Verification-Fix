# StockAPI — Solution Reference
## Challenge 8.14: Monitor Your Deploy

## Silent Failure Found
**Endpoint:** `GET /api/products`  
**Symptom:** 200 response with empty array `[]`  
**Root cause:** `Product.find({ category: undefined })` returns 0 results  
**Morgan clue:** Response size was 2 bytes (= `[]`)

## Files Changed
- `src/server.js` (Morgan added)
- `src/controllers/productController.js` (bug fixed + `console.error` added)
- `MONITOR_LOG.md` (completed)

## Evaluator Notes
The evaluator should verify the following 4 PR criteria for a successful submission:
1. **Morgan Configuration:** `src/server.js` must implement `morgan` using the environment-aware format condition `process.env.NODE_ENV === 'production' ? 'combined' : 'dev'`.
2. **Controller Logic Fix:** `src/controllers/productController.js` must conditionally apply the `category` filter (e.g., `const filter = req.query.category ? { category: req.query.category } : {}`) rather than passing `undefined` directly to Mongoose.
3. **Error Logging:** `src/controllers/productController.js` must include a substantial `console.error` in the `catch` block that records the error details alongside useful context (e.g. `req.query`).
4. **Monitoring Log Accuracy:** `MONITOR_LOG.md` must accurately identify the missing output before logging, specifically highlight the 2-byte Morgan log payload (`200 2`) indicating `[]` for the broken state, correctly identify the root cause as the database returning 0 results for `undefined`, and document the subsequent successful log (`200 847`) returning real data.
