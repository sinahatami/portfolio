---
title: "Understanding React Server Components"
date: "2025-01-20"
description: "A deep dive into how RSCs are changing the landscape of frontend development and reducing client-side JavaScript."
tags: ["React", "RSC", "Architecture"]
---

React Server Components (RSC) represent a paradigm shift in how we build React applications. By allowing components to render exclusively on the server, we can significantly reduce the amount of JavaScript sent to the client.

## The Problem with Client-Side Rendering

In a traditional SPA, we ship a massive JS bundle to the client, which then hydrates and fetches data. This leads to:

- Slower TTI (Time to Interactive)
- Waterfall requests
- Large bundles

## The RSC Solution

With RSC, we can fetch data directly in our components:

```tsx
async function ProductDetails({ id }) {
  const product = await db.products.findById(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

No `useEffect`, no loading states management on the client—just mostly static HTML stream sent to the browser.
