


// ── STEP 1: 개발/테스트에서 stub 모드로 실행하려면 true 설정 ──────────
const STUB_MODE = process.env.REACT_APP_FIREBASE_STUB_MODE === 'false';

// ── STEP 2: 환경 변수(REACT_APP_*)로 Firebase 설정 값 입력 ──────────
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || ''
};

// ─────────────────────────────────────────────────────────────
// 아래는 수정하지 마세요
// ─────────────────────────────────────────────────────────────

export const isFirebaseConfigured =
  !STUB_MODE && !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

// Firebase가 설치·설정된 경우 실제 모듈 사용
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _collection: any = () => null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _addDoc: any     = async () => {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _onSnapshot: any = () => () => {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _query: any      = (...a: unknown[]) => a[0];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _orderBy: any    = () => null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _serverTs: any   = () => ({ seconds: Date.now() / 1000, nanoseconds: 0 });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any         = null;

/** Timestamp 호환 클래스 (stub용) */
export class Timestamp {
  constructor(public seconds: number, public nanoseconds: number) {}
  toDate() { return new Date(this.seconds * 1000); }
  static fromDate(d: Date) { return new Timestamp(d.getTime() / 1000, 0); }
}

if (isFirebaseConfigured) {
  /* firebase 설치 + config 입력 후 활성화됩니다.
     STUB_MODE = false 상태에서만 이 블록이 실행됩니다. */
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fbApp   = require('firebase/app');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fbStore = require('firebase/firestore');

    const app = fbApp.initializeApp(firebaseConfig);
    _db          = fbStore.getFirestore(app);
    _collection  = fbStore.collection;
    _addDoc      = fbStore.addDoc;
    _onSnapshot  = fbStore.onSnapshot;
    _query       = fbStore.query;
    _orderBy     = fbStore.orderBy;
    _serverTs    = fbStore.serverTimestamp;
  } catch (e) {
    console.warn('[Gusring] Firebase 초기화 실패. npm install firebase 를 실행했는지 확인하세요.', e);
  }
}

export const db              = _db;
export const collection      = _collection;
export const addDoc          = _addDoc;
export const onSnapshot      = _onSnapshot;
export const query           = _query;
export const orderBy         = _orderBy;
export const serverTimestamp = _serverTs;
