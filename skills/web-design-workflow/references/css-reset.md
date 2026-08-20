# CSS Baseline Reset

Use this baseline reset when implementing a new interface or normalizing global styles only if the project has no design-system or framework reset. Do not apply it alongside an existing reset, UI library baseline, or CMS stylesheet. Check the cascade and affected scope before adding it.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

*:not(dialog) {
  margin: 0;
  padding: 0;
}

html,
body {
  min-height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

ol,
ul {
  list-style: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

This reset removes `ol` and `ul` markers globally. Restore markers explicitly within content scopes that contain meaningful lists, such as documentation or articles.

```css
.prose ul {
  list-style: disc;
  padding-inline-start: 1.5rem;
}

.prose ol {
  list-style: decimal;
  padding-inline-start: 1.5rem;
}

.prose li + li {
  margin-top: 0.5rem;
}
```

Treat `text-wrap` and `-webkit-font-smoothing` as progressive enhancement. Content must remain readable and the layout must remain intact in browsers that do not support them.
