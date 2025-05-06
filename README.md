# Sumfry

Sumfry is a modern web app designed to help users save, organize, and revisit their favorite bookmarks with ease. The goal is to provide a seamless, distraction-free bookmarking experience, making it simple to store and retrieve useful links anytime.

## Motivation

The motivation behind Sumfry is to solve the problem of scattered or forgotten bookmarks. Many existing solutions are either too complex or lack a clean, user-friendly interface. Sumfry aims to offer a focused, minimal, and efficient bookmarking tool that just works.

## Tech Stack

Sumfry is built with the following technologies:

- **SvelteKit**: Application framework for building fast, modern web apps
- **Svelte**: UI framework for highly reactive user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn-svelte**: UI component library for Svelte
- **Drizzle ORM**: Type-safe database ORM for effortless data management
- **PostgreSQL**: Robust, open-source relational database
- **TanStack Table**: Powerful headless table library for building tables.


## Development Journey

The development of Sumfry followed a step-by-step approach:

- **Login Page**: Implemented secure authentication to ensure user privacy and personalized experiences.
- **Landing Page**: Designed a welcoming introduction to the app, highlighting its core features.
- **Bookmark Save Page**: Created an intuitive interface for users to quickly add and categorize bookmarks.
- **Bookmarks Page**: Developed a clean, organized view for users to browse, search, and manage their saved bookmarks.
- **Advanced Table Features**: Integrated TanStack Table for powerful filtering and sorting, making it easy to manage and find bookmarks.


## Features

- Save any URL with automatic title and favicon extraction
- AI-generated summaries for each bookmark (powered by Jina AI)
- Responsive grid view for bookmarks
- Easy deletion, filtering, and sorting of bookmarks
- Secure authentication with email and password


## Getting Started

To run Sumfry locally:

1. Clone the repository.
2. Install dependencies with `bun install`.
3. Set up your PostgreSQL database and configure environment variables.
4. Run the development server with `bun dev`.

## Live Demo

Check out the app: [sumfry.vercel.app](https://sumfry.vercel.app/)
