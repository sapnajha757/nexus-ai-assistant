# ⚡ NEXUS — AI-Powered Assistant

> Your intelligent co-pilot for research, writing, and thinking.  
> Built with React + Tailwind CSS, powered by OpenRouter AI.

![NEXUS Banner](https://img.shields.io/badge/NEXUS-AI%20Assistant-7C3AED?style=for-the-badge&logo=lightning&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-7C3AED?style=for-the-badge)

---

## 🚀 Live Demo

🔗 **[nexus-ai-assistant-rho.vercel.app](https://nexus-ai-assistant-rho.vercel.app)**

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🤖 **AI Chat** | Conversational assistant for research, coding & writing |
| 📄 **Smart Summarizer** | Summarize any text in 4 different styles |
| 🎨 **Beautiful Dark UI** | Space-themed neon design with smooth animations |
| ⚡ **Context-Aware** | Remembers your conversation history |
| 📱 **Responsive** | Works on all screen sizes |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Tailwind CSS 3
- **AI:** OpenRouter API (Google Gemini via openrouter/auto)
- **Icons:** Lucide React
- **Markdown:** React Markdown
- **Deployment:** Vercel

---

## 📁 Project Structure

src/

├── components/

│   └── Sidebar.jsx        # Collapsible navigation sidebar

├── hooks/

│   └── useClaudeAPI.js    # OpenRouter API integration

├── pages/

│   ├── LandingPage.jsx    # Hero landing screen

│   ├── ChatPage.jsx       # AI chat interface

│   └── SummarizerPage.jsx # 4-mode text summarizer

├── App.jsx

├── index.js

└── index.css

---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/sapnajha757/nexus-ai-assistant.git
cd nexus-ai-assistant/ai-assistant-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Open `.env` and add your OpenRouter API key:
REACT_APP_OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxx

> 🔑 Get your free API key at [openrouter.ai](https://openrouter.ai)

### 4. Run locally
```bash
npm start
```
Opens at [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
```

---

## 🌐 Deploy on Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Set **Root Directory** → `ai-assistant-app`
4. Add Environment Variable:
   - `REACT_APP_OPENROUTER_API_KEY` = your key
5. Click **Deploy** 🚀

---

## 🎯 Hackathon Submission

**Theme:** AI & Future Technologies  
**Category:** Frontend Development  
**Event:** Build The Next Big UI — 2026

### Problem Statement
Information overload is a growing challenge. People spend hours researching, reading, and synthesizing data — with no intelligent assistant to help them think faster.

### Solution
NEXUS is an AI-powered productivity assistant that lets users chat with an intelligent AI, summarize long documents instantly, and accelerate their thinking — all in a beautiful, distraction-free interface.

### Impact
- ⏱️ Saves hours of research time
- 🧠 Enhances decision-making with AI assistance
- 🌍 Accessible to anyone with a browser — no setup required

---

## 🔐 Security

- API key stored in `.env` (never committed to Git)
- `.gitignore` excludes all `.env` files
- No sensitive data stored in the browser

---

## 👩‍💻 Author

**Sapna Jha**  
GitHub: [@sapnajha757](https://github.com/sapnajha757)

---

Made with ❤️ for the hackathon