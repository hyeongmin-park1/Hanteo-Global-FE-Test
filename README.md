# Hanteo-Global-FE-Test

본 프로젝트는 한터 글로벌 프론트엔드 코딩테스트로, 주어진 와이어프레임을 기반으로  
카테고리 기반 콘텐츠 리스트와 슬라이드형 배너, 무한스크롤 등을 포함한 모바일 UI를 구현하였습니다.

---

## 🔧 기술 스택

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Swiper** (카테고리/배너 슬라이드)
- **Vercel** (배포 플랫폼)

---

## 🌐 배포 URL

> 🔗 [[[https://hanteo-global-fe-test-58u10o87p-hyeongmins-projects.vercel.app/](https://v0-hanteo-global-fe-test-git-main-hyeongmins-projects.vercel.app/)]]

---

## 📦 프로젝트 실행 방법 및 주의사항

실제 차트를 사용하고자 RapidAPI를 사용하여 Spotify 차트 데이터를 불러옵니다.
 따라서 소스코드를 통해 시연 시 https://rapidapi.com 에 가입 후 해당 API 구독이 필요할 수 있습니다.(무료)
 RapidAPI에서 발급받은 X-RapidAPI-Key 값을 .env의 VITE_RAPID_API_KEY로 입력하면 됩니다.

 **프로젝트 실행 방법**

```bash
git clone https://github.com/hyeongmin-park1/Hanteo-Global-FE-Test.git
cd hanteo-fe-test
npm install
npm run dev
