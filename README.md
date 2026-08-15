# Skillpath Landing Page

A responsive, high-performance landing page built for the Skillpath junior developer assignment.

## Next Steps & Future Enhancements

If given more time to extend this project, the next primary enhancement would be **Course Pagination**. While the current API returns a small catalog of 5–10 courses, a production catalog would contain dozens or hundreds. Loading all cards simultaneously hurts performance, increasing Largest Contentful Paint (LCP) and page weight. Implementing pagination—displaying a grid of 6 courses per page with clean "Next" and "Previous" page navigation—would optimize render speeds and prevent UI clutter.

Other key improvements would include:
- **Client-Side Caching**: Storing successfully resolved course lists and country codes in `sessionStorage` to bypass network flakiness on subpage loads.
- **Unit Tests**: Writing Vitest/React Testing Library suites to assert sorting logic, search filtering, and state degradation.

---

## AI Pair-Programming Collaboration

This repository was developed in collaboration with **Antigravity**, an agentic AI coding assistant designed by Google DeepMind, powered by the **Gemini 3.5 Flash** model. 

For a complete record of our design discussions, implementation plans, and architecture choices (such as parallel fetches, retry policies, and mounting cleanup hooks), please refer to [ai_convo.md](./ai_convo.md) in this repository.
