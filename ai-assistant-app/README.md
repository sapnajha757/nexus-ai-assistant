# NEXUS — AI-Powered Assistant

> A frontend AI productivity app built with React + Tailwind CSS + Claude API  
> Submitted for AI & Future Technologies hackathon theme

---

## Features

- **AI Chat** — Conversational assistant powered by Claude Sonnet
- **Smart Summarizer** — Summarize any text in 4 different styles
- **Beautiful Dark UI** — Space-themed design with neon accents

## Tech Stack

- React 18
- Tailwind CSS 3
- Anthropic Claude API (claude-sonnet-4-6)
- Lucide React (icons)
- React Markdown

## Setup

1. **Clone / download this project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and replace `your_anthropic_api_key_here` with your actual key from [console.anthropic.com](https://console.anthropic.com).

4. **Run the app**
   ```bash
   npm start
   ```
   Opens at [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   ```

## Deploy to Vercel

1. Push to GitHub (make sure `.env` is in `.gitignore`)
2. Import repo on [vercel.com](https://vercel.com)
3. Add `REACT_APP_ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables
4. Deploy!

## Project Structure

```
src/
├── components/
│   └── Sidebar.jsx        # Navigation sidebar
├── hooks/
│   └── useClaudeAPI.js    # Anthropic API hook
├── pages/
│   ├── LandingPage.jsx    # Hero landing screen
│   ├── ChatPage.jsx       # AI chat interface
│   └── SummarizerPage.jsx # Text summarizer
├── App.jsx
├── index.js
└── index.css
```

## Security Note

- Never commit your `.env` file with a real API key
- The `.gitignore` already excludes `.env`
- For production, add your key as an environment variable in Vercel/Netlify
