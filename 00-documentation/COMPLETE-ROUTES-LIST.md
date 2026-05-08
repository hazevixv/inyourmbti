# 📋 INYOURMBTI - COMPLETE ROUTES LIST

Daftar lengkap semua slug/routes yang ada di website INYOURMBTI, terklasifikasi berdasarkan kategori.

---

## 🏠 PUBLIC PAGES (User-Facing)

### **Main Pages**
| Route | Description | Status |
|-------|-------------|--------|
| `/` | Homepage - Animated background with character cards | ✅ Active |
| `/about` | About page - Informasi tentang INYOURMBTI | ✅ Active |
| `/onboarding` | Onboarding - Gender selection & intro | ✅ Active |

### **Test & Results**
| Route | Description | Status |
|-------|-------------|--------|
| `/test` | Test landing page - Start MBTI test | ✅ Active |
| `/test/[questionId]` | Test questions - Dynamic question pages (1-96) | ✅ Active |
| `/results/[type]` | Results page - Show MBTI result by type | ✅ Active |
| `/profile-complete` | Profile complete - After finishing test | ✅ Active |

**Examples**:
- `/test/1` - Question 1
- `/test/96` - Question 96
- `/results/INTJ` - INTJ result page
- `/results/ENFP` - ENFP result page

### **MBTI Types**
| Route | Description | Status |
|-------|-------------|--------|
| `/types` | All types overview - 16 personality types | ✅ Active |
| `/types/[code]` | Individual type detail - Specific MBTI type | ✅ Active |
| `/categories/[category]` | Category overview - Analyst, Diplomat, etc. | ✅ Active |

**Examples**:
- `/types/INTJ` - INTJ detail page
- `/types/ENFP` - ENFP detail page
- `/categories/analyst` - Analyst types (INTJ, INTP, ENTJ, ENTP)
- `/categories/diplomat` - Diplomat types (INFJ, INFP, ENFJ, ENFP)
- `/categories/sentinel` - Sentinel types (ISTJ, ISFJ, ESTJ, ESFJ)
- `/categories/explorer` - Explorer types (ISTP, ISFP, ESTP, ESFP)

### **Cognitive Functions**
| Route | Description | Status |
|-------|-------------|--------|
| `/functions` | All functions overview - 8 cognitive functions | ✅ Active |
| `/functions/[code]` | Individual function detail - Specific function | ✅ Active |

**Examples**:
- `/functions/Ne` - Extraverted Intuition
- `/functions/Ni` - Introverted Intuition
- `/functions/Se` - Extraverted Sensing
- `/functions/Si` - Introverted Sensing
- `/functions/Te` - Extraverted Thinking
- `/functions/Ti` - Introverted Thinking
- `/functions/Fe` - Extraverted Feeling
- `/functions/Fi` - Introverted Feeling

### **User Features**
| Route | Description | Status |
|-------|-------------|--------|
| `/profile` | User profile - View saved results & history | ✅ Active |
| `/compatibility` | Compatibility checker - Check type compatibility | ✅ Active |
| `/chat` | AI Chat - Chat with AI psychologist | ✅ Active |

---

## 🔐 ADMIN PAGES (Protected)

### **Admin Dashboard**
| Route | Description | Status |
|-------|-------------|--------|
| `/admin` | Admin login page | ✅ Active |
| `/admin/dashboard` | Admin dashboard - Overview & stats | ✅ Active |

### **Content Management**
| Route | Description | Status |
|-------|-------------|--------|
| `/admin/content/home` | Edit homepage content | ✅ Active |

### **Data Management**
| Route | Description | Status |
|-------|-------------|--------|
| `/admin/data/questions` | Manage test questions | ✅ Active |

### **Settings**
| Route | Description | Status |
|-------|-------------|--------|
| `/admin/settings/site` | Site settings - General config | ✅ Active |

---

## 🔌 API ROUTES (Backend)

### **Admin APIs**
| Route | Method | Description |
|-------|--------|-------------|
| `/api/admin/login` | POST | Admin authentication |

### **Analytics**
| Route | Method | Description |
|-------|--------|-------------|
| `/api/analytics` | GET | Get analytics data |

### **Chat**
| Route | Method | Description |
|-------|--------|-------------|
| `/api/chat` | POST | Send chat message to AI |
| `/api/chat/history` | GET | Get chat history |

### **Database**
| Route | Method | Description |
|-------|--------|-------------|
| `/api/db/init` | POST | Initialize database |

### **Health Check**
| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | API health check |

### **Results**
| Route | Method | Description |
|-------|--------|-------------|
| `/api/results` | POST | Save test results |

### **User**
| Route | Method | Description |
|-------|--------|-------------|
| `/api/user` | GET/POST | User data management |

---

## 🤖 SEO & Utilities

### **SEO Routes**
| Route | Description | Status |
|-------|-------------|--------|
| `/robots.txt` | Robots.txt for search engines | ✅ Active |
| `/sitemap.xml` | XML sitemap for SEO | ✅ Active |

---

## 📊 ROUTE STATISTICS

### **Total Routes**: 54 pages

### **Breakdown by Category**:
```
Public Pages:        15 routes
  - Main:            3 routes
  - Test & Results:  4 routes
  - MBTI Types:      3 routes (+ dynamic)
  - Functions:       2 routes (+ dynamic)
  - User Features:   3 routes

Admin Pages:         5 routes
  - Dashboard:       2 routes
  - Content:         1 route
  - Data:            1 route
  - Settings:        1 route

API Routes:          10 routes
  - Admin:           1 route
  - Analytics:       1 route
  - Chat:            2 routes
  - Database:        1 route
  - Health:          1 route
  - Results:         1 route
  - User:            1 route

SEO & Utilities:     2 routes
```

### **Dynamic Routes**:
```
/test/[questionId]        → 96 possible pages (1-96)
/results/[type]           → 16 possible pages (INTJ, INTP, etc.)
/types/[code]             → 16 possible pages (INTJ, INTP, etc.)
/categories/[category]    → 4 possible pages (analyst, diplomat, sentinel, explorer)
/functions/[code]         → 8 possible pages (Ne, Ni, Se, Si, Te, Ti, Fe, Fi)
```

**Total Dynamic Pages**: 140 possible pages

---

## 🎯 ROUTE CLASSIFICATION

### **By User Type**:

#### **Anonymous Users** (No login required):
- `/` - Homepage
- `/about` - About page
- `/onboarding` - Start journey
- `/test` - Test pages
- `/results/[type]` - View results
- `/types` - Browse types
- `/functions` - Browse functions
- `/categories/[category]` - Browse categories
- `/compatibility` - Check compatibility

#### **Registered Users** (With saved data):
- All anonymous routes +
- `/profile` - View profile & history
- `/chat` - AI chat (requires user context)

#### **Admin Users** (Protected):
- `/admin/*` - All admin routes

### **By Purpose**:

#### **Discovery & Learning**:
- `/types/*` - Learn about types
- `/functions/*` - Learn about functions
- `/categories/*` - Browse by category
- `/about` - Learn about platform

#### **Testing & Results**:
- `/onboarding` - Start test
- `/test/*` - Take test
- `/results/*` - View results
- `/profile-complete` - Completion page

#### **User Interaction**:
- `/profile` - User dashboard
- `/chat` - AI interaction
- `/compatibility` - Relationship checker

#### **Management**:
- `/admin/*` - Admin panel

---

## 🔗 NAVIGATION STRUCTURE

### **Main Navigation** (Desktop Sidebar / Mobile Bottom Nav):
```
Home (/)
Test (/test)
Types (/types)
Chat (/chat)
Profile (/profile)
```

### **Secondary Navigation**:
```
About (/about)
Functions (/functions)
Compatibility (/compatibility)
Categories (/categories/[category])
```

### **Hidden/Direct Access**:
```
Onboarding (/onboarding) - First-time users
Profile Complete (/profile-complete) - After test
Admin (/admin) - Admin only
```

---

## 📱 MOBILE PWA ROUTES

All routes are **PWA-compatible** and work offline (with service worker):
- Homepage
- Test pages (cached)
- Results (cached)
- Types & Functions (cached)
- Profile (requires online for sync)
- Chat (requires online for AI)

---

## 🚀 FUTURE ROUTES (Potential)

Possible future additions:
- `/blog` - Blog/articles
- `/community` - User community
- `/premium` - Premium features
- `/settings` - User settings
- `/notifications` - User notifications
- `/achievements` - Gamification
- `/compare` - Compare types
- `/relationships` - Relationship guides
- `/careers` - Career recommendations
- `/teams` - Team dynamics

---

## 📝 NOTES

### **Route Naming Convention**:
- Lowercase with hyphens: `/profile-complete`
- Dynamic params in brackets: `/types/[code]`
- Nested routes with folders: `/admin/content/home`

### **Protected Routes**:
- Admin routes require authentication
- Chat requires user context
- Profile requires saved data

### **SEO Optimized**:
- All public pages have metadata
- Dynamic routes have generateMetadata
- Sitemap includes all static + dynamic routes

---

**Last Updated**: May 7, 2026
**Total Routes**: 54 static + 140 dynamic = **194 total pages**
