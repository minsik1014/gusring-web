# 🕊 Gusring Web (구스링 웹)
> **거주 외국인을 위한 대한민국 행정 서식 번역 및 안내 서비스**
> 🔗 **배포 주소: [https://gusring-web.vercel.app/](https://gusring-web.vercel.app/)**

거주 외국인들이 한국의 복잡한 행정 절차를 모국어로 쉽게 이해하고 진행할 수 있도록 돕습니다. 단순 번역을 넘어 실제 서식 작성 가이드와 민원실 창구 안내까지 통합적으로 제공하는 프론트엔드 저장소입니다.

<br/>

## 🏆 Project Achievement
* **금천구 RISE 사업단 리빙랩(Living Lab) 프로젝트 선정** 🏛️
    * 지자체-대학 협력기반 지역혁신체계(RISE) 사업의 일환으로, 지역 사회의 현안을 대학의 기술력으로 해결하기 위해 기획되었습니다.
* 기획부터 디자인 시스템 구축, 다국어 데이터베이스 수립 및 배포까지 전 과정을 유기적인 협업으로 완수한 프로젝트입니다.

<br/>

## 💡 What is a Living Lab?

 리빙랩(Living Lab)은 '우리 집 앞 실험실' 또는 '생활 실험실'이라는 뜻으로, 시민들이 생활하는 공간에서 민(User)·관(Government)·학(University)이 협력하여 사회 문제를 해결하는 사용자 참여형 혁신 모델입니다.

*   **사용자 중심(User-Centric):** 서비스의 수혜자인 거주 외국인이 직접 기획과 검증 과정에 참여합니다.
*   **실제 현장 기반(Real-World Context):** 실험실 안의 기술이 아닌, 실제 금천구청 민원실 등 행정 현장에서 발생하는 페인 포인트(Pain Point)를 해결합니다.
*   **지속 가능한 혁신:** 일회성 개발에 그치지 않고, 피드백 루프를 통해 지역 사회에 실질적인 변화를 가져오는 것을 목표로 합니다.

<br/>

## ✨ Implementation Highlights
사용자 편의성과 서비스 신뢰성을 최우선으로 고려한 **기술적 구현 사항**입니다.

*   **Seamless UX with Splash Animation:** 앱 접속 시 로고와 마스코트가 화면 중앙에서 상단으로 이동하며 콘텐츠가 나타나는 역동적인 인트로를 구현하여 서비스의 첫인상을 강화했습니다.
*   **SVG-Based Interactive Map:** 복잡한 민원실 구조를 정밀한 SVG 패스로 직접 구현했습니다. 이미지 대비 압도적인 해상도를 제공하며, 각 구역 클릭 시 실시간 상태 관리를 통해 창구 정보를 직관적으로 안내합니다.
*   **Scalable Feature-Based Architecture:** 프로젝트가 커짐에 따라 유지보수성을 높이기 위해 도메인 중심(Feature-based) 아키텍처로 리팩토링을 완료했습니다.
*   **Scalable I18n Architecture:** `useTranslate` 커스텀 훅과 중앙 집중식 데이터 구조를 통해 5개 국어(KO, EN, ZH, JA, VI)를 실시간 지원합니다.
*   **Direct Feedback Loop:** 내비게이션 바에 피드백 버튼을 상시 노출하여 리빙랩의 핵심 가치인 '사용자 의견 수렴'을 기술적으로 뒷받침합니다.

<br/>

## 🛠 Tech Stack

| 분류 | 기술 | 비고 |
| :--- | :--- | :--- |
| **Core** | ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue) | 최신 UI 라이브러리 및 언어 |
| **Build** | **Create React App** | 빌드 도구 및 개발 서버 |
| **Infra** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | 호스팅 및 CI/CD |
| **Style** | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC) | 유틸리티 우선 스타일링 |
| **Icons** | **lucide-react** | 인터랙티브 벡터 아이콘 |
| **Pkg Mgr** | **npm** | 패키지 매니저 |
| **Quality** | ESLint, Prettier | 코드 품질 및 포맷팅 |

<br/>

## 📂 Project Structure (폴더 구조)

우리는 **기능(Feature) 중심의 아키텍처**를 사용합니다. 각 기능별로 컴포넌트와 데이터를 응집력 있게 관리합니다.

```text
src/
├── components/          # 공통 UI 컴포넌트 (Header, Lightbox 등)
├── shared/              # 전역 공통 유틸리티 및 타입 (types.ts, analytics.ts)
├── features/            # 핵심 도메인별 기능 모음
│   ├── forms/           # 서식 목록 및 상세 안내 (ListView, DetailView)
│   ├── office-map/      # 민원실 안내 지도 (OfficeMap)
│   ├── i18n/            # 언어 선택 및 온보딩 (LandingView)
│   └── feedback/        # 사용자 피드백 시스템
├── hooks/               # 전역 공통 훅 (useTranslate 등)
├── data/                # 전역 정적 데이터 (languages, UI strings)
├── App.tsx              # 메인 라우팅 및 전역 상태 관리
└── index.tsx            # 엔트리 포인트
```

---
© 2026 Gusring Team. All rights reserved.
