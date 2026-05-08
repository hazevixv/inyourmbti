# 🧠 Haze MBTI - AI-Powered Personality Test Platform

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black.svg)
![React](https://img.shields.io/badge/React-19.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Platform tes MBTI yang akurat dan modern dengan AI psychologist**

[Demo](http://localhost:2002) • [Documentation](./QUICK-START.md) • [Features](./UI-FEATURES.md) • [Performance](./PERFORMANCE.md)

</div>

---

## ✨ Features

### 🎯 **Accurate MBTI Testing**
- 96 pertanyaan mendalam
- Berdasarkan teori Grant/Brownsword
- Analisis 8 fungsi kognitif
- Hasil yang akurat dan komprehensif

### 🎨 **Interactive UI/UX**
- **Emoji-driven answers**: 😟 😐 😊 😄 🤩
- **Smooth animations**: GPU-accelerated
- **Haptic feedback**: Vibration on mobile
- **Progress tracking**: Real-time stats
- **Motivational messages**: Keep users engaged

### 🤖 **AI Psychologist**
- Powered by **Groq AI** (openai/gpt-oss-20b)
- Context-aware responses
- Personality-specific insights
- Chat history support

### 📊 **Comprehensive Results**
- Detailed personality analysis
- Function stack visualization
- Strengths & weaknesses
- Career recommendations
- Relationship insights
- Interactive charts & infographics

### 👨‍💼 **Admin Dashboard**
- Content management system
- Question editor (CRUD)
- Site settings
- Export/Import data
- Analytics (coming soon)

### 📱 **PWA Ready**
- Installable on mobile
- Offline support
- Push notifications ready
- App-like experience

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API Key ([Get it here](https://console.groq.com))

### Installation

```bash
# 1. Clone repository
git clone https://github.com/yourusername/haze-mbti.git
cd haze-mbti

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# 4. Run development server
npm run dev

# 5. Open browser
# http://localhost:2002
```

### Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
haze-mbti/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── test/                # Test pages
│   │   ├── page.tsx         # Test start
│   │   └── [questionId]/    # Question pages
│   ├── results/             # Results pages
│   ├── chat/                # AI chat
│   ├── profile/             # User profile
│   ├── about/               # About MBTI
│   ├── admin/               # Admin dashboard
│   └── api/                 # API routes
├── lib/                     # Utilities & logic
│   ├── questions.ts         # Question data
│   ├── mbti-calculator.ts   # MBTI calculation
│   ├── groq-client.ts       # Groq AI client
│   └── admin-*.ts           # Admin utilities
├── public/                  # Static assets
├── 00-documentation/        # Project docs
├── QUICK-START.md          # Quick start guide
├── UI-FEATURES.md          # UI/UX documentation
├── PERFORMANCE.md          # Performance guide
└── README.md               # This file
```

---

## 🎨 Tech Stack

### Frontend
- **Next.js 15.5** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Groq AI** - AI psychologist
- **LocalStorage** - Client-side storage

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbo** - Fast refresh

---

## 🎯 Key Features Explained

### 1. Interactive Question UI

```typescript
// Emoji-driven answers with color psychology
const ANSWER_OPTIONS = [
  { value: 1, emoji: '😟', color: 'red' },      // Sangat Tidak
  { value: 2, emoji: '😐', color: 'orange' },   // Tidak
  { value: 3, emoji: '😊', color: 'sky/teal' }, // Netral
  { value: 4, emoji: '😄', color: 'teal' },     // Setuju
  { value: 5, emoji: '🤩', color: 'green' },    // Sangat Setuju
];
```

**Features:**
- Smooth scale animations (hover: 105%, selected: 110%)
- Haptic feedback on mobile devices
- Auto-navigation after selection (400ms delay)
- Progress tracking with motivational messages

### 2. MBTI Calculation

```typescript
// Grant/Brownsword cognitive functions model
const calculateMBTI = (answers: Record<number, number>) => {
  // Calculate 8 cognitive functions
  const scores = {
    Ne, Ni, Se, Si,  // Perception functions
    Te, Ti, Fe, Fi   // Judging functions
  };
  
  // Determine function stack
  const stack = [dominant, auxiliary, tertiary, inferior];
  
  // Return comprehensive result
  return {
    type,        // e.g., "INTJ"
    variant,     // e.g., "INTJ-A"
    percentages, // Function scores
    strengths,   // Personality strengths
    weaknesses,  // Growth areas
    careers,     // Career recommendations
  };
};
```

### 3. AI Psychologist

```typescript
// Context-aware AI responses
const generateResponse = async (
  message: string,
  mbtiType: string,
  functionScores: Record<string, number>
) => {
  // Build context with personality data
  const context = buildPersonalityContext(mbtiType, functionScores);
  
  // Call Groq AI
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [systemPrompt, ...history, userMessage],
  });
  
  return response.choices[0].message.content;
};
```

---

## 🎨 Color Palette

```css
/* Light & Calming Theme */
--navy: #334E68;      /* Primary dark */
--teal: #17B897;      /* Primary accent */
--sky: #38BDF8;       /* Secondary accent */
--beige: #CFC5B0;     /* Tertiary accent */
--white: #FFFFFF;     /* Background */

/* Answer Options */
--red: #F87171;       /* Sangat Tidak */
--orange: #FB923C;    /* Tidak */
--sky-teal: #38BDF8;  /* Netral */
--teal: #14B8A6;      /* Setuju */
--green: #4ADE80;     /* Sangat Setuju */
```

---

## 📊 Performance

### Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| First Load JS | < 150KB | 102KB ✅ |
| Build Time | < 20s | 13.7s ✅ |
| Fast Refresh | < 500ms | ~300ms ✅ |
| Lighthouse Score | > 90 | 95+ ✅ |

### Optimizations

- ✅ React Strict Mode disabled in dev
- ✅ Turbo mode enabled
- ✅ GPU-accelerated animations
- ✅ Optimized package imports
- ✅ Code splitting
- ✅ Image optimization
- ✅ CSS optimization

---

## 🔐 Environment Variables

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:2002
NODE_ENV=development
```

---

## 👨‍💼 Admin Dashboard

### Access

```
URL: http://localhost:2002/admin
Username: admin
Password: HazeMBTI2026!
```

### Features

- **Content Management**: Edit homepage, about page
- **Question Editor**: Add, edit, delete questions
- **Site Settings**: SEO, social media, features
- **Data Management**: Export/import questions
- **Analytics**: View test statistics (coming soon)

---

## 🧪 Testing

### Manual Testing

```bash
# Start dev server
npm run dev

# Test checklist
✅ Homepage loads
✅ Test flow works
✅ Questions display correctly
✅ Answers save properly
✅ Results calculate accurately
✅ AI chat responds
✅ Admin dashboard accessible
```

### Performance Testing

```bash
# Lighthouse audit
npm run build
npm start
# Open Chrome DevTools → Lighthouse

# Bundle analysis
npm run build:analyze
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Environment Variables on Vercel

1. Go to Project Settings
2. Add Environment Variables:
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
3. Redeploy

---

## 📱 PWA Installation

### iOS
1. Open Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Enjoy app-like experience!

### Android
1. Open Chrome
2. Tap Menu (⋮)
3. Tap "Add to Home Screen"
4. Enjoy app-like experience!

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Grant/Brownsword** - MBTI cognitive functions model
- **Groq** - AI infrastructure
- **Next.js Team** - Amazing framework
- **Tailwind CSS** - Utility-first CSS
- **Lucide** - Beautiful icons

---

## 📞 Support

- **Documentation**: [QUICK-START.md](./QUICK-START.md)
- **UI Guide**: [UI-FEATURES.md](./UI-FEATURES.md)
- **Performance**: [PERFORMANCE.md](./PERFORMANCE.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/haze-mbti/issues)

---

## 🗺️ Roadmap

### v2.1 (Coming Soon)
- [ ] User authentication
- [ ] Database integration (PostgreSQL)
- [ ] Advanced analytics
- [ ] Social sharing improvements
- [ ] Multi-language support

### v2.2 (Future)
- [ ] Swipe gestures
- [ ] Voice input
- [ ] Gamification
- [ ] Achievement system
- [ ] Friend comparison

---

<div align="center">

**Made with ❤️ by Haze MBTI Team**

[⭐ Star us on GitHub](https://github.com/yourusername/haze-mbti) • [🐛 Report Bug](https://github.com/yourusername/haze-mbti/issues) • [💡 Request Feature](https://github.com/yourusername/haze-mbti/issues)

</div>
