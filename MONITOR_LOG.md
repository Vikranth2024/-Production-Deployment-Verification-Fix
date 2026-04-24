# Monitor Your Deploy: Diagnosis Log

## 1. Before Adding Obeservability
"Render logs showed no output — complete silence"

## 2. The Morgan Clue
After implementing Morgan in `combined` format, the logs finally produced the exact combined-format line indicating our failure:
`127.0.0.1 - - [31/Mar/2026:12:00:00 +0000] "GET /api/products HTTP/1.1" 200 2 "-" "PostmanRuntime/7.32.3"`

Notice the `200 2`. While the API is explicitly returning a 200 OK, the content length is exactly 2 bytes (`[]`), indicating an empty array.

## 3. The Root Cause
A review of the explicit response reveals the query logic: "Product.find({ category: undefined }) — undefined category returns 0 results". Since `undefined` attempts to explicitly match an unhandled field, the database queries successfully but finds no such results.

## 4. After Resolving
After correcting the `getProducts` controller to conditionally build the query object based on whether a `category` parameter is strictly provided, the log reflects the real data payload:
`127.0.0.1 - - [31/Mar/2026:12:05:00 +0000] "GET /api/products HTTP/1.1" 200 847 "-" "PostmanRuntime/7.32.3"`
