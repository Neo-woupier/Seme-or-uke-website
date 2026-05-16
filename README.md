<h1 align="center">
  🛸 ✨ Seme Or Uke ✨ 🎮
</h1>

<p align="center">
  <b>SEME</b> &nbsp;&middot;&nbsp; <i>Or</i> &nbsp;&middot;&nbsp; <b>UKE</b>
</p>

## 📸 App Screenshots

### 🏠 Home Page

<p align="center">
  <img src="./public/home.png" alt="Home Page" width="800" style="border-radius: 8px;" />
</p>

### 🧠 2. Quiz & Question Page

<p align="center">
  <img src="./public/quiz.png" alt="Quiz Page" width="800" style="border-radius: 8px;" />
</p>

## 🎮 How to Play

Follow these simple steps to experience the quiz:

1. **Start the Quiz**: Click the start button on the landing page to initialize your session.
2. **Answer Honestly**: Progress through the interactive questions. Select the choices that best describe your personality or behavioral reactions.
3. **Reveal Your Identity**: Upon completion, the system instantly calculates your score and renders your final role profile using a dynamic typewriter animation effect.
4. **View Live Statistics**: Check how your result matches up against the entire community via the global real-time scoreboard.

## ⚙️ Game Rules & System Conditions

To ensure system integrity and accurate scoring, the application operates under the following architectural rules:

### 1. Score Capping Rule

- The total calculated score is strictly capped at a maximum of **40 points** (`MAX_SCORE = 40`).
- Any evaluated calculation exceeding this limit will automatically scale down to 40 using a safe mathematical boundaries function (`Math.min`).

### 2. Live Aggregation & Role Classification

The system queries the backend database and groups the community counts based on specific keywords found in the user results:

- **Seme (เมะ)**: Accumulated whenever the result identity string includes the keyword "เมะ".
- **Uke (เคะ)**: Accumulated whenever the result identity string includes the keyword "เคะ".
- **Neutral**: Fallback category assigned to any unexpected data entries or neutral role variations.

### 3. Session Guard & Route Protection (Security)

- Users are strictly forbidden from bypassing the quiz to access the results screen directly.
- The application implements a client-side route guard using `sessionStorage`. If `user_score` is completely missing (`null`) or contains corrupted/malicious payloads (`NaN`), the system initiates an immediate hard-reset and pushes the client back to the root entry path (`router.replace("/")`).

---

## 🛠️ Tech Stack & Badges

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TypeScript-v5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Version" />
</p>
