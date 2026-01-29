# Comments

Spent most of the time on the pagination logic - parsing the Link header to detect when we've hit the last page. The responsive breakpoints are rough estimates since I couldn't pull exact values from Figma.

Assumed the `id` field is unique across applications for React keys. Didn't add error UI beyond console logging - would definitely want that for production but prioritised the core functionality first.

If I had more time I'd add a proper loading skeleton for the initial fetch and move the API URL to an env variable.
