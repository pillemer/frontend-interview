# Comments

## Approach

- Used the `Link` header to check if there are more pages to load. When there's no "next" link, the Load more button hides.
- Added basic responsive styles for tablet and mobile views.
- Made emails clickable and formatted the page according to the design.

## Assumptions

- Each application has a unique `id` field for React keys.
- The API will always return valid JSON (no defensive parsing).
- All the styling had to be done by eye without access to the Figma design details.

## What I'd improve

- Add a proper error state.
- Show a loading spinner instead of changing the button text.
- Add more test coverage for error handling.
- Move the API URL to an env variable.
