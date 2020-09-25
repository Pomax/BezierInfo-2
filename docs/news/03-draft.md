# HTML custom elements and reinventing Processing.js

- `&lt;graphics-element&gt;`
- BaseAPI + GraphicsAPI
- `&lt;fallback-image&gt;
    - generate snapshot of first frame
    - canvas in Node!
    - image filename hashed based on file-content
    - store in images/chapter/... or images/news/...
    - lazy loading for if there is no JS
- if JS, IntersectionObserver on the graphics element

- Styling: `:defined` to the rescue

- Why not `extends HTMLCanvasElement`?
    - node + browser
