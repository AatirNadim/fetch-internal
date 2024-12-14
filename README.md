## Why await twice?

### Why Do We `await` Twice in Fetching a Response?

When using `fetch` in JavaScript, two `await` calls are typically required to fully handle the response:

1. **First `await`:**  
   The first `await fetch(url)` is used to initiate the HTTP request and wait for the server to respond. This promise resolves when the headers of the response are received. At this point, you have access to metadata such as the HTTP status code and headers, but the response body hasn't been fully read yet.

2. **Second `await`:**  
   The second `await` is used to parse the response body using methods like `response.json()`, `response.text()`, or `response.blob()`. This step processes the stream of data received from the server into a usable format (e.g., JSON object).

### Why Is This Separation Necessary?  
The HTTP response body is streamed. Fetching headers and reading the body are distinct operations, allowing developers to inspect headers before deciding how to handle the body (e.g., checking for errors). This approach provides flexibility and better resource management by not automatically loading the entire body unnecessarily. 

Example:
```javascript
const response = await fetch(url);
if (response.ok) {
  const data = await response.json();
}
```