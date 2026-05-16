## 📊 Comprehensive Engineering Report: Development & Optimization of the "Seme or Uke" Web Application

```bash
1. Executive Summary
This document serves as a comprehensive technical summary of the development, refactoring, and security hardening phases for the "Seme or Uke" interactive web quiz application. The project is built utilizing a modern React framework (Next.js with the App Router) and deployed via Vercel.

Throughout the development lifecycle, the engineering focus shifted from initial functional prototyping to robust architectural design. Key optimizations included migrating state management from URL query parameters to secure browser storage, resolving Next.js Server-Side Rendering (SSR) and Client Component boundary conflicts, and implementing a multi-layered middleware security architecture to prevent abuse.

2. Phase 1: State Management & Architecture Redesign
2.1. Initial Approach: URL Query Parameters
Implementation: Initially, user quiz scores were accumulated and passed sequentially between question routes (e.g., /q1 to /q2) using URL query parameters (?score=X) via Next.js useSearchParams.

Challenges Encountered: * Vulnerability to Manipulation: Users could easily alter their scores by manually editing the URL.

Aesthetic Degradation: The URLs became cluttered, reducing the professional feel of the application.

Hydration Issues: Fetching URL parameters directly in component bodies caused mismatches between the server-rendered HTML and the client-side DOM.

2.2. Optimized Solution: DOM Session Storage Integration
Implementation Decision: The architecture was refactored to utilize the browser's sessionStorage API.

Logic Flow:

Initialization: Upon starting the quiz, a user_score key is initialized to "0".

Progression (q1-q7): Each question component retrieves the current score, parses it to an integer, adds the new question's points, and overwrites the session storage. Navigation is then handled cleanly via router.push('/quiz/qX') without appending queries.

Resolution (q8): The final results page (q8/page.tsx) reads the final score from storage.

Edge Case Handling (null vs. "0"): A critical logic implementation was distinguishing between a user who skipped straight to the final page (yielding null from storage) versus a user who legitimately played but scored zero points (yielding the string "0"). If null is detected, the application forcefully redirects the user back to the home page, effectively securing the results route.

3. Phase 2: Next.js Component Optimization & Debugging
3.1. Resolving the "Import Traces" & Hydration Errors
The Problem: The application encountered a severe Next.js build and runtime error labeled Import traces: Client Component Browser vs Server Component. This was accompanied by hydration mismatches.

Troubleshooting Steps & Root Causes:

Direct DOM API Access: sessionStorage was being accessed directly in the global scope of the component. Since Next.js pre-renders components on the server (where window and sessionStorage do not exist), this caused an immediate crash.

Conflicting Directives: Client components (marked with "use client") inadvertently contained server-only exports like metadata.

Redundant Suspense Boundaries: After removing useSearchParams, the Suspense wrappers around the quiz components became obsolete and added unnecessary complexity to the render tree.

The Fix:

Lifecycle Hooks: All sessionStorage access was moved strictly inside useEffect hooks, ensuring execution only occurs on the client side post-hydration.

Component Cleanup: Removed Suspense and consolidated the nested component structure (e.g., merging Question1 and QuizContent1 into a single, clean export default function).

Cache Clearing: Executed a "nuclear option" by deleting the Next.js build cache (rm -rf .next) to clear sticky, outdated dependency graphs causing false-positive trace errors.

4. Phase 3: Security Hardening & Middleware Implementation
To prepare the application for a public production environment on Vercel, significant backend protections were introduced to prevent spam, database pollution, and unauthorized API access.

4.1. Edge Middleware for Rate Limiting
The Threat: Malicious users could rapidly refresh the page or script automated requests to spam the database, driving up hosting costs and corrupting analytics.

The Solution: A middleware.ts file was implemented at the project root to intercept all requests to /quiz/* and /api/*.

Logic Implementation: * Utilized an in-memory Map to track request counts and timestamps based on the user's IP address.

IP Extraction: Resolved TypeScript strictness errors around request.ip by safely extracting the IP from Vercel's proxy headers: request.headers.get('x-forwarded-for').

Thresholds: If a user makes more than 15 requests within a 10-second window, they are placed on a 1-minute timeout (bannedUntil), receiving a 403 Forbidden response.

4.2. CORS & Origin Protection
The Threat: External applications (like Postman or unauthorized websites) could directly POST payload data to the /api/status endpoint.

The Solution: Implemented Domain Checking within the middleware.

Configured an allowedDomains array containing same-or-uke.vercel.app and localhost:3000.

Used the Origin and Referer headers validated via the Array.prototype.some() method to ensure incoming POST requests originated strictly from authorized sources.

Debugging Note: Resolved a TypeScript type mismatch error where .includes() was improperly evaluating an entire array instead of individual string elements.

4.3. Payload Sanitization (Profanity Filter)
The Threat: Users manipulating client-side state to submit profanity ("ควย", etc.) into the database.

The Solution: Discussed and outlined an API-level sanitization step inside /api/status/route.ts. Before executing database writes, the request body is cross-referenced against a blocklist of forbidden words. If a match is found, the server rejects the request with a 400 Bad Request status.

5. Deployment & Version Control Strategy
Vercel Preparedness: By moving DOM API calls inside useEffect and securing the API routes via Edge Middleware, the application was made fully compliant with Vercel's serverless and edge computing requirements.

Git Workflow: Established best practices for version control. Prior to committing the new middleware.ts file, the team ensured all TypeScript linting errors (such as redeclared block-scoped variables and malformed template literals) were completely resolved to prevent CI/CD build failures on the Vercel pipeline.

6. The Role of AI Assistance in the Development Cycle
AI acts as a pair-programmer and technical consultant throughout this project, facilitating rapid development across several vectors:

Debugging Support: Instantly diagnosed complex Next.js SSR/Client boundary errors ("Import traces") and provided precise solutions (e.g., using useEffect for sessionStorage).

Workflow Guidance & Architectural Recommendations: Advised the transition from URL-parameter state management to Session Storage, significantly improving both security and UX.

Code Explanations & Mentorship: Broke down the differences between null and "0", explained the semantic differences between standard functions and export default, and demystified TypeScript strictness errors.

Security Engineering: Generated the entire boilerplate and custom logic for the Next.js Middleware, encompassing IP tracking, rate limiting, and CORS validation, transforming a basic frontend app into a secure full-stack application.

Productivity Improvement: Provided ready-to-copy, refactored code blocks that combined multiple fragmented fixes into clean, production-ready components.

7. Lessons Learned & Engineering Best Practices
Separation of Concerns: Writing multiple useEffect hooks in a single component (e.g., one for reading session state, another for triggering API analytics based on that state) is a best practice that yields cleaner, more maintainable code than monolithic lifecycle blocks.

Strict TypeScript Adherence: Early detection of TypeScript errors (like redeclaring const isAllowed or using incorrect string interpolation quotes) prevents cascading deployment failures.

Trust No Client: Client-side routing and state (sessionStorage) are great for UX, but all critical validations (Rate Limiting, Origin Checks, Profanity Filtering) must occur on the Server/Edge.

Graceful Degradation: Implementing loading states (conditional returns while score === null) prevents UI flickering and hydration errors during the brief moment before client-side scripts execute.

8. Conclusion
The development of the "Seme or Uke" application successfully transitioned from a functional prototype to a robust, secure, and production-ready web application. By addressing critical Next.js rendering lifecycle rules, upgrading the state management architecture, and implementing enterprise-grade middleware security, the codebase is now highly maintainable, scalable, and resilient against malicious interactions. The project stands as a testament to effective modern web development practices and the power of AI-assisted engineering.
```

## 📊 รายงานวิศวกรรมฉบับสมบูรณ์: การพัฒนาและปรับปรุงประสิทธิภาพเว็บแอปพลิเคชัน "เมะ หรือ เคะ"

```bash
1. บทสรุปผู้บริหาร (Executive Summary)
เอกสารฉบับนี้คือสรุปภาพรวมทางเทคนิคเชิงลึกของขั้นตอนการพัฒนา, การ Refactor โค้ด, และการยกระดับความปลอดภัย (Security Hardening) สำหรับเว็บแอปพลิเคชันควิซถามตอบ "เมะ หรือ เคะ" โปรเจกต์นี้สร้างขึ้นโดยใช้ React Framework สมัยใหม่ (Next.js ร่วมกับ App Router) และให้บริการผ่าน Vercel

ตลอดวงจรการพัฒนา โฟกัสของทีมวิศวกรรมได้เปลี่ยนจากการสร้างตัวต้นแบบที่ใช้งานได้ (Functional Prototyping) ไปสู่การออกแบบสถาปัตยกรรมที่แข็งแกร่ง การปรับปรุงที่สำคัญได้แก่ การย้ายการจัดการ State จาก URL Query Parameters ไปใช้ Browser Storage ที่ปลอดภัยกว่า, การแก้ปัญหาความขัดแย้งระหว่าง Server-Side Rendering (SSR) และ Client Component ของ Next.js, และการวางสถาปัตยกรรม Middleware แบบหลายชั้นเพื่อป้องกันการโจมตีและการสแปม

2. ระยะที่ 1: การจัดการ State และการปรับโครงสร้างสถาปัตยกรรมใหม่
2.1. วิธีการแรกเริ่ม: ใช้ URL Query Parameters
การนำไปใช้งาน: ในตอนแรก คะแนนควิซของผู้ใช้จะถูกสะสมและส่งต่อระหว่างหน้าคำถาม (เช่น จาก /q1 ไป /q2) โดยใช้ URL Query Parameters (?score=X) ผ่าน useSearchParams ของ Next.js

ปัญหาที่พบ:

ช่องโหว่ต่อการแก้ไข: ผู้เล่นสามารถโกงหรือเปลี่ยนคะแนนตัวเองได้ง่ายๆ แค่แก้ตัวเลขบน URL

ลดทอนความสวยงาม (Aesthetic Degradation): URL ดูรกและยาว ทำให้เว็บดูไม่เป็นมืออาชีพ

ปัญหา Hydration: การดึงค่า URL Parameter มาใช้ตรงๆ ใน Component ทำให้เกิดความไม่ตรงกันระหว่าง HTML ที่ฝั่ง Server สร้างมา กับ DOM ที่ฝั่ง Client จัดการ

2.2. วิธีการที่ปรับปรุงแล้ว: การผสานรวม DOM Session Storage
การตัดสินใจ: ทีมงานตัดสินใจ Refactor สถาปัตยกรรมใหม่ โดยหันมาใช้ API sessionStorage ของเบราว์เซอร์แทน

Flow การทำงาน:

จุดเริ่มต้น: เมื่อเริ่มเล่นควิซ ระบบจะสร้างคีย์ user_score และตั้งค่าเริ่มต้นเป็น "0"

ระหว่างดำเนินเกม (q1-q7): Component ของแต่ละคำถามจะไปดึงคะแนนปัจจุบันออกมา แปลงเป็นตัวเลข (Integer) นำมาบวกกับคะแนนของข้อนั้น แล้วบันทึกทับลงไปใน Session Storage จากนั้นจัดการเปลี่ยนหน้าด้วย router.push('/quiz/qX') แบบคลีนๆ โดยไม่มี Query ห้อยท้าย

หน้าสรุปผล (q8): หน้าสุดท้าย (q8/page.tsx) จะทำหน้าที่อ่านคะแนนรวมจาก Storage

การจัดการ Edge Case (null vs "0"): ลอจิกสำคัญที่เพิ่มเข้ามาคือการแยกแยะระหว่าง "คนที่แอบพิมพ์ URL ข้ามมาหน้าสุดท้ายเลย" (ค่าใน Storage จะเป็น null) กับ "คนที่เล่นจริงแต่ได้ 0 คะแนน" (ค่าจะเป็น String "0") ถ้าระบบตรวจพบค่า null จะบังคับเตะผู้ใช้กลับไปหน้าโฮมเพจทันที เพื่อป้องกันหน้าผลลัพธ์

3. ระยะที่ 2: การปรับปรุง Component ของ Next.js และการแก้บั๊ก
3.1. การแก้ปัญหา "Import Traces" & Hydration Errors
ปัญหาที่เกิดขึ้น: แอปพลิเคชันติด Error ของ Next.js ทั้งตอน Build และตอนรัน โดยฟ้องว่า Import traces: Client Component Browser vs Server Component ซึ่งมาพร้อมกับอาการ Hydration Mismatch

สาเหตุหลักและการวิเคราะห์:

เข้าถึง DOM API โดยตรง: มีการเรียกใช้ sessionStorage นอก Hook ในระดับ Global ของ Component เนื่องจาก Next.js จะพยายาม Pre-render ฝั่ง Server ก่อน (ซึ่งฝั่ง Server ไม่มี window หรือ sessionStorage) จึงทำให้แอปพังทันที

คำสั่งที่ขัดแย้งกัน: มีการใส่คำสั่งของฝั่ง Server เช่น export const metadata ปะปนอยู่ใน Client Component ("use client")

ใช้ Suspense โดยไม่จำเป็น: หลังจากถอด useSearchParams ออก ตัวครอบ Suspense ในหน้าคำถามก็หมดความจำเป็นและรังแต่จะทำให้ Render Tree ซับซ้อนเกินไป

การแก้ไข:

Lifecycle Hooks: ย้ายคำสั่งที่เกี่ยวกับ sessionStorage ทั้งหมดเข้าไปอยู่ใน useEffect เพื่อบังคับให้มันทำงานเฉพาะฝั่ง Client หลังจาก Hydration เสร็จสิ้นแล้วเท่านั้น

Component Cleanup: ลบ Suspense ทิ้ง และยุบรวม Component ที่ซ้อนกันหลายชั้น (เช่น รวม Question1 กับ QuizContent1) ให้เหลือแค่ export default function เดียวแบบคลีนๆ

ล้างแคช: ใช้ท่าไม้ตายเคลียร์แคชที่ค้างในระบบ (rm -rf .next) เพื่อล้าง Dependency Graph เก่าๆ ที่ทำให้ Next.js สับสน

4. ระยะที่ 3: การยกระดับความปลอดภัยและการทำ Middleware
เพื่อเตรียมแอปพลิเคชันให้พร้อมสำหรับ Production บน Vercel ระบบป้องกันหลังบ้านจึงถูกเพิ่มเข้ามาเพื่อป้องกันการสแปม ขยะใน Database และการเข้าถึง API โดยไม่ได้รับอนุญาต

4.1. Edge Middleware สำหรับ Rate Limiting
ภัยคุกคาม (The Threat): ผู้ไม่หวังดีอาจกดรีเฟรชรัวๆ หรือใช้บอทยิง Request เข้ามารบกวน Database ทำให้เปลืองค่าโฮสต์และข้อมูลสถิติพัง

วิธีแก้ไข (The Solution): สร้างไฟล์ middleware.ts ไว้ที่ Root โปรเจกต์ เพื่อเป็นด่านหน้าตรวจจับทุก Request ที่พุ่งไปที่ /quiz/* และ /api/*

การเขียนลอจิก:

ใช้ Map ในหน่วยความจำเพื่อเก็บจำนวนครั้งและเวลาที่ Request เข้ามา โดยอ้างอิงจาก IP Address ของผู้ใช้

การดึง IP: แก้ปัญหา TypeScript Error โดยการดึง IP จริงผ่าน Proxy Header ของ Vercel: request.headers.get('x-forwarded-for')

เกณฑ์การบล็อก: หากผู้ใช้ยิง Request เกิน 15 ครั้งภายใน 10 วินาที จะถูกแบนชั่วคราว 1 นาที (bannedUntil) และได้รับ Response 403 Forbidden

4.2. การป้องกัน CORS & Origin
ภัยคุกคาม (The Threat): ระบบภายนอก (เช่น Postman หรือเว็บเถื่อน) สามารถยิง POST Request ส่งข้อมูลขยะเข้า /api/status ได้โดยตรง

วิธีแก้ไข (The Solution): ติดตั้งระบบ Domain Checking ใน Middleware

สร้าง Array allowedDomains ที่เก็บค่า same-or-uke.vercel.app และ localhost:3000

ตรวจสอบ Header Origin และ Referer โดยใช้เมธอด Array.prototype.some() เพื่อยืนยันว่า POST Request ส่งมาจากโดเมนที่อนุญาตเท่านั้น

Note จากการแก้บั๊ก: แก้ไข Type Mismatch ของ TypeScript ที่เกิดจากการใช้ .includes() เช็กกับ Array โดยตรง (ต้องเช็กแยกทีละ String)

4.3. การทำความสะอาดข้อมูล (Profanity Filter)
ภัยคุกคาม (The Threat): ผู้ใช้อาจแทรกแซง State ฝั่ง Client เพื่อส่งคำหยาบคายเข้า Database

วิธีแก้ไข (The Solution): ออกแบบระบบคัดกรองฝั่ง Server ภายในไฟล์ /api/status/route.ts ก่อนที่จะเขียนข้อมูลลง DB ตัว Request Body จะถูกนำไปเทียบกับลิสต์คำต้องห้าม (Blocklist) หากพบคำหยาบ เซิร์ฟเวอร์จะปฏิเสธคำขอนั้นพร้อมส่งสถานะ 400 Bad Request

5. กลยุทธ์การ Deploy และระบบควบคุมเวอร์ชัน (Version Control)
ความพร้อมสำหรับ Vercel: ด้วยการย้าย DOM API ไปไว้ใน useEffect และการปกป้อง API ด้วย Edge Middleware แอปพลิเคชันจึงสอดคล้องกับข้อกำหนดของ Serverless และ Edge Computing ของ Vercel อย่างสมบูรณ์

Git Workflow: วางแนวปฏิบัติที่ดีในการควบคุมเวอร์ชัน ก่อนทำการ Commit ไฟล์ middleware.ts ทีมได้ตรวจสอบและแก้ไข TypeScript Linting Errors ทั้งหมด (เช่น การประกาศตัวแปรซ้ำซ้อน หรือการใช้สัญลักษณ์ Template Literal ผิด) เพื่อป้องกันไม่ให้ CI/CD ของ Vercel Build ไม่ผ่าน

6. บทบาทของ AI ในวงจรการพัฒนา
AI ทำหน้าที่เสมือน Pair-Programmer และที่ปรึกษาทางเทคนิคตลอดทั้งโปรเจกต์ ช่วยเร่งกระบวนการพัฒนาในหลายด้าน:

Debugging Support: วินิจฉัยข้อผิดพลาดที่ซับซ้อนระหว่าง SSR/Client ของ Next.js ได้ทันที และให้วิธีแก้ที่ตรงจุด (เช่น การใช้ useEffect ครอบ sessionStorage)

แนะนำสถาปัตยกรรม: แนะนำให้เปลี่ยนจาก URL Parameters มาเป็น Session Storage ซึ่งช่วยยกระดับทั้ง Security และ UX อย่างก้าวกระโดด

อธิบายโค้ดและเป็นพี่เลี้ยง: อธิบายความแตกต่างระหว่าง null กับ "0", อธิบายความหมายเชิงลึกของการใช้ export default และเคลียร์ปัญหาความจู้จี้ของ TypeScript

Security Engineering: สร้างโค้ดโครงร่างและลอจิกทั้งหมดสำหรับ Next.js Middleware รวมถึงระบบตามรอย IP, Rate Limiting, และ CORS เปลี่ยนแอป Frontend ธรรมดาให้กลายเป็น Full-stack ที่ปลอดภัย

เพิ่ม Productivity: ให้โค้ดที่ผ่านการ Refactor แล้วแบบพร้อม Copy-Paste นำบั๊กที่กระจัดกระจายมารวมเป็น Component ที่คลีนและพร้อมใช้งานจริง

7. บทเรียนที่ได้รับและแนวปฏิบัติที่ดีที่สุด (Best Practices)
Separation of Concerns (การแยกหน้าที่ชัดเจน): การแยก useEffect หลายๆ ตัวใน Component เดียว (เช่น ตัวนึงใช้อ่านค่า Session, อีกตัวใช้ยิง API เก็บสถิติ) เป็นแนวทางที่ดี ทำให้โค้ดสะอาดและดูแลรักษาง่ายกว่าการเอาทุกอย่างไปยัดรวมกัน

Strict TypeScript Adherence (เชื่อฟัง TypeScript): การแก้ปัญหา TypeScript ตั้งแต่เนิ่นๆ (เช่น การไม่ประกาศตัวแปรซ้ำ หรือพิมพ์เครื่องหมายให้ถูก) ช่วยป้องกันไม่ให้ระบบไปพังตอน Deploy

Trust No Client (อย่าไว้ใจฝั่งผู้ใช้): การเปลี่ยนหน้าหรือเก็บค่าฝั่ง Client (sessionStorage) ดีต่อ UX แต่การตรวจสอบความปลอดภัยที่สำคัญทั้งหมด (เช่น Rate Limit, Origin Check, กรองคำหยาบ) ต้อง เกิดขึ้นที่ฝั่ง Server/Edge เท่านั้น

Graceful Degradation (การจัดการตอนโหลด): การทำหน้า Loading ดักไว้ (เช่น ตอนที่ score === null) ช่วยป้องกันไม่ให้ UI กระพริบ และลดปัญหา Hydration Error ในช่วงเสี้ยววินาทีก่อนที่สคริปต์ฝั่ง Client จะทำงาน

8. บทสรุป
การพัฒนาแอปพลิเคชัน "เมะ หรือ เคะ" ถือว่าประสบความสำเร็จในการเปลี่ยนผ่านจากตัวต้นแบบ (Prototype) ไปสู่เว็บแอปพลิเคชันที่แข็งแกร่ง ปลอดภัย และพร้อมใช้งานระดับ Production จากการเคารพกฎ Rendering ของ Next.js, การอัปเกรดสถาปัตยกรรมการจัดการ State, และการใส่ Middleware ป้องกันภัยระดับองค์กร ทำให้ตอนนี้ Codebase มีความดูแลรักษาง่าย ขยายตัวได้ดี และต้านทานต่อผู้ใช้งานที่ไม่ประสงค์ดีได้ โปรเจกต์นี้คือข้อพิสูจน์ถึงแนวปฏิบัติของการพัฒนาเว็บยุคใหม่ และพลังของการใช้ AI เข้ามาช่วยในงานวิศวกรรมซอฟต์แวร์ครับ
```
