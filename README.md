# Gusring — 금천구 다국어 민원 가이드

금천구 외국인 주민을 위한 행정 서식 안내 웹앱입니다.  
41종의 민원 서류를 5개 언어로 제공하며, 서식 미리보기 및 PDF 다운로드를 지원합니다.

<br/>

## 주요 기능

- **5개 언어 지원** — 한국어, English, 中文, 日本語, Tiếng Việt
- **41종 행정 서식** — 가족관계 · 증명서 · 체류/주거 · 신분/인감 · 차량/이륜차
- **서식 미리보기** — 핀치 줌 / 더블탭 확대 지원
- **PDF 다운로드** — 서식 파일 직접 저장
- **피드백 수집** — Google Form 연동
- **모바일 최적화** — Safe Area, 바텀시트 등 네이티브 UX

<br/>

## 기술 스택

| 분류 | 사용 기술 |
|---|---|
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS, Pretendard |
| Icons | Lucide React |
| Deploy | Netlify |

<br/>

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm start

# 프로덕션 빌드
npm run build
```

<br/>

## 프로젝트 구조

```
src/
├── components/       # UI 컴포넌트
│   ├── LandingView   # 언어 선택 페이지
│   ├── ListView      # 서식 목록
│   ├── DetailView    # 서식 상세 + FAB
│   ├── FormViewer    # 서식 미리보기 (줌 지원)
│   └── FeedbackThread# 피드백 (Google Form 연동)
├── data/             # 서식 데이터, 카테고리, 언어 정의
├── hooks/            # useTranslate 등 커스텀 훅
└── types.ts          # 공통 타입 정의
```

<br/>

## 배포

Netlify를 통해 자동 배포됩니다. `main` 브랜치에 푸시하면 빌드가 트리거됩니다.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"
```

<br/>

## 팀

**Team EL** · 금천구 리빙랩 프로젝트  
© 2026 Geumcheon-gu Living Lab
