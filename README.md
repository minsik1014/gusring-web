# 🕊 Gusring Web (구스링 웹)
> **거주 외국인을 위한 대한민국 행정 서식 번역 및 안내 서비스**

거주 외국인들이 한국의 복잡한 행정 절차를 모국어로 쉽게 이해하고 진행할 수 있도록 돕습니다. 단순 번역을 넘어 실제 서식 작성 가이드와 민원실 창구 안내까지 통합적으로 제공하는 프론트엔드 저장소입니다.

<br/>

## 🏆 Project Achievement
* **금천구 RISE 사업단 리빙랩(Living Lab) 프로젝트 선정** 🏛️
    * 지자체-대학 협력기반 지역혁신체계(RISE) 사업의 일환으로, 지역 사회의 현안을 대학의 기술력으로 해결하기 위해 기획되었습니다.
* 기획부터 디자인 시스템 구축, 다국어 데이터베이스 수립 및 배포까지 전 과정을 유기적인 협업으로 완수한 프로젝트입니다.

<br/>

## 💡 What is a Living Lab?
**리빙랩(Living Lab)**은 '우리 집 앞 실험실' 또는 '생활 실험실'이라는 뜻으로, 시민들이 생활하는 공간에서 민(User)·관(Government)·학(University)이 협력하여 사회 문제를 해결하는 사용자 참여형 혁신 모델입니다.

*   **사용자 중심(User-Centric):** 서비스의 수혜자인 거주 외국인이 직접 기획과 검증 과정에 참여합니다.
*   **실제 현장 기반(Real-World Context):** 실험실 안의 기술이 아닌, 실제 금천구청 민원실 등 행정 현장에서 발생하는 페인 포인트(Pain Point)를 해결합니다.
*   **지속 가능한 혁신:** 일회성 개발에 그치지 않고, 피드백 루프를 통해 지역 사회에 실질적인 변화를 가져오는 것을 목표로 합니다.

**Gusring**은 리빙랩의 가치를 실현하기 위해 실제 외국인 주민들의 인터뷰를 바탕으로 필요 서식을 선정하고, 사용자 테스트를 거쳐 인터랙티브한 안내 지도를 구현했습니다.

<br/>

## ✨ Implementation Highlights
사용자 편의성을 최우선으로 고려한 **인터랙티브 UI 설계**와 **확장 가능한 다국어 구조**에 집중했습니다.

*   **SVG-Based Interactive Map:** 복잡한 민원실 구조를 정밀한 SVG 패스로 직접 구현했습니다. 이미지 대비 압도적인 해상도를 제공하며, 각 구역 클릭 시 실시간 상태 관리를 통해 창구 번호와 세부 업무를 직관적으로 안내합니다.
*   **Scalable I18n Architecture:** `useTranslate` 커스텀 훅과 중앙 집중식 데이터 구조를 통해 5개 국어(KO, EN, ZH, JA, VI)를 실시간 지원합니다. 새로운 언어 확장이 용이하도록 설계되었습니다.
*   **State-Driven Interaction:** 
    *   **Real-time Filtering:** 41종의 서식을 카테고리 및 검색어에 따라 실시간으로 필터링하며, 유저 액션에 따른 디바운스 트래킹 로직이 포함되어 있습니다.
    *   **Contextual UI:** 선택한 언어와 서식의 특성에 따라 가이드 이미지 및 행정 정보(수수료, 준비물 등)를 동적으로 렌더링합니다.

<br/>

## 🛠 Tech Stack

| 분류 | 기술 | 비고 |
| :--- | :--- | :--- |
| **Core** | ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue) | 최신 UI 라이브러리 및 언어 |
| **Build** | **Create React App** | 빌드 도구 및 개발 서버 |
| **Infra** | ![Firebase](https://img.shields.io/badge/Firebase-12-orange) ![Netlify](https://img.shields.io/badge/Netlify-Latest-00C7B7) | 분석, 호스팅 및 CI/CD |
| **Style** | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC) | 유틸리티 우선 스타일링 |
| **Icons** | **lucide-react** | 인터랙티브 벡터 아이콘 |
| **Pkg Mgr** | **npm** | 패키지 매니저 |
| **Quality** | ESLint, Prettier | 코드 품질 및 포맷팅 |

<br/>

## 📂 Project Structure (폴더 구조)

우리는 **기능(Feature) 중심의 아키텍처**를 사용합니다. 도메인별로 로직과 UI를 모듈화하여 관리합니다.

```text
src/
├── components/          # 전역 공용 UI (Header, Lightbox 등)
│
├── shared/              # 전역 공통 유틸리티 및 설정
│   ├── types.ts         # 전역 타입 정의 (I18n, FormItem 등)
│   ├── analytics.ts     # Firebase 트래킹 로직
│   └── firebase.ts      # SDK 설정
│
├── features/            # 핵심 도메인별 기능 모음
│   ├── forms/           # 서식 목록 및 상세 안내 기능
│   │   ├── components/  # ListView, DetailView, FormViewer
│   │   └── data/        # forms.ts (서식 DB), categories.ts
│   ├── office-map/      # 민원실 안내 지도 기능
│   │   └── components/  # OfficeMap.tsx (SVG Map)
│   ├── i18n/            # 언어 선택 및 온보딩
│   │   └── components/  # LandingView.tsx
│   └── feedback/        # 피드백 수집 기능
│       └── components/  # FeedbackThread.tsx
│
├── hooks/               # 전역 공통 훅 (useTranslate 등)
├── data/                # 전역 정적 데이터 (languages, UI strings)
├── App.tsx              # 메인 라우팅 및 전역 상태 관리
└── index.tsx            # 엔트리 포인트
```

<br/>

## 📦 Getting Started (설치 및 실행)

### 1. 프로젝트 클론
```bash
git clone https://github.com/gusring/gusring-web.git
cd gusring-web
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정 (.env)
루트 디렉토리에 `.env` 파일을 생성하고 필요한 Firebase 설정값을 입력하세요.

### 4. 개발 서버 실행
```bash
npm start
```

### 5. 프로덕션 빌드
```bash
npm run build
```

<br/>

## 🤝 Contribution Guide

### 📌 브랜치 전략
* `main`: 배포 가능한 안정 버전
* `develop`: 개발 및 기능 통합 브랜치

### 📌 커밋 컨벤션
* `feat`: 새로운 기능 추가
* `fix`: 버그 수정
* `design`: 스타일 수정
* `refactor`: 코드 리팩토링
* `docs`: 문서 수정

---
© 2026 Gusring Team. All rights reserved.
