# gif-app

## URL:

https://miltoncoronado.github.io/gif-app/

## Overview

gif-app is a small React + TypeScript application that searches and displays GIFs from the GIPHY API. It is structured to separate presentational UI, domain logic, API clients, and tests to make the codebase easy to maintain, extend, and test.

## Design intent

Clear separation of concerns: UI vs business logic vs API layer.
Reusable shared components for generic UI elements.
Focused modules for GIF-related domain logic (search, state, API adapters).
Hooks encapsulate stateful logic and side effects so components stay presentational and easy to test.

## Component separation

# The Problem

In standard React setups, clicking on previous search tags triggers a state change that forces the app to make redundant HTTP requests to GIPHY for data it has already fetched. This wastes network bandwidth and slows down the user experience.

# The Solution

We use a useRef object (gifsCache) acting as a fast, synchronous key-value dictionary (Record<string, Gif[]>).

State Persistence: Since useRef values persist across renders without triggering a re-render when updated, we can write to the cache with zero UI overhead.

Cache Validation: When a user searches for a term or clicks a history tag, the app first sanitizes the string and checks the ref dictionary.

Cache Hit: The app instantly loads the GIFs from memory to the state. Zero API calls are made.

Cache Miss: The app fetches the GIFs from GIPHY, updates the UI, and saves the result to the cache for future clicks.

### Shared (src/shared)

Purpose: generic, UI-focused components that are not GIF-specific.
Examples: SearchBar, CustomHeader.
Location: src/shared/components
Why: promotes reuse across different parts of the app and keeps GIF logic isolated.

### Gifs (src/gifs)

Purpose: all logic and components directly related to searching, fetching and displaying GIFs.
Subfolders:
components — GifList, PreviousSearches (presentational components tied to GIFs)
hooks — useGifs (state management and side effects)
actions — orchestration functions like get-gif-by-query.action.ts
api — giphy.api.ts (HTTP client adapter)
interfaces — domain typings for GIFs and Giphy responses
Why: keeps domain-specific responsibilities colocated and easier to test or replace.

## API and environment

API client: src/gifs/api/giphy.api.ts
API key: read from environment variable VITE_GIPHY_API_KEY (see .env.template)
Example: add .env at project root with VITE_GIPHY_API_KEY=your_key

## Funtions and primary hooks

useGifs (src/gifs/hooks/useGifs.tsx)
Manages query, gifs list, previous searches and loading state.
Exposes functions to trigger searches and update local state.
getGifByQuery (src/gifs/actions/get-gif-by-query.action.ts)
Business orchestrator: calls giphy.api, maps responses into domain GIFs, handles pagination/limit.

## Internal functions and responsibilities

giphy.api.ts: HTTP wrapper for GIPHY endpoints, normalizes HTTP responses.
get-gif-by-query.action.ts: maps API responses to the app domain and handles small business rules.
useGifs.tsx:

## Testing strategy

Test runner: Vitest (configured in vite.config.ts). Tests run in a jsdom environment.
Unit tests:
Hooks: src/gifs/hooks/useGif.test.ts
Actions: src/gifs/actions/get-gif-by-query.action.test.ts
API client: src/gifs/api/giphy.api.test.ts
Shared components: src/shared/components/\*.test.tsx
Mocks: tests/mocks/giphy.response.data.ts used to stub GIPHY responses in unit tests.
Snapshots: located in src/shared/components/**snapshots** and other **snapshots** folders.
Coverage: vitest can generate coverage reports via --coverage.

## Important files and locations

src/gifs/actions/get-gif-by-query.action.ts
src/gifs/api/giphy.api.ts
src/gifs/components/GifList.tsx
src/gifs/components/PreviousSearches.tsx
src/gifs/hooks/useGifs.tsx
src/shared/components/SearchBar.tsx
src/shared/components/CustomHeader.tsx
tests/mocks/giphy.response.data.ts
package.json (all the dependencies live here)
vite.config.ts (Vitest config + base path)

## Project structure (short)

src/
counter/ (Sandbox/demo code)
gifs/
actions/
api/
components/
hooks/
interfaces/
shared/
components/
tests/mocks/
.env
.env.template
package.json
vite.config.ts

## How to run (development)

1. Install dependencies:
   npm install
2. Add environment variable:
   create .env with VITE_GIPHY_API_KEY=your_key
3. Start dev server:
   npm run dev
4. Open http://localhost:5173 (port may vary)

## How to build

the app is configured to be deploy with gh-pages an the scripts exist at package.json
npm run deploy
The app is configured with base: /GifApp/ in vite.config.ts — adjust if deploying under different base path.

## How to test

Run tests:
npm run test
Coverage:

- npm run test --coverage
  to see this at web use test:ui
  npm run test:ui

Notes:

Tests use mocks (tests/mocks/giphy.response.data.ts) to avoid real network calls.
Vitest environment is configured to jsdom in vite.config.ts.

## Contributing

Keep UI components in src/shared/components when they are generic.
Keep GIF domain logic inside src/gifs to preserve separation of concerns.
Write unit tests for hooks and actions; mock network calls at the API layer.

## Conclusion

gif-app demonstrates a pragmatic separation between generic UI and domain-specific features. Tests are organized to validate hooks, actions and the API client independently, improving reliability and making refactors safer.

## License

Use or adapt as needed.

Software design by Milton Coronado.
