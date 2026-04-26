import React, { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ImageLightbox: React.FC<Props> = ({ images, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);
  const startX = React.useRef(0);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(images.length - 1, c + 1)), [images.length]);

  // ESC 키로 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  // 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // 스와이프
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff >  50) next();
    if (diff < -50) prev();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors btn-press"
        onClick={onClose}
      >
        <X size={20} className="text-white" />
      </button>

      {/* 이미지 카운터 */}
      {images.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold">
          {current + 1} / {images.length}
        </div>
      )}

      {/* 이전 버튼 */}
      {images.length > 1 && current > 0 && (
        <button
          className="absolute left-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors btn-press z-10"
          onClick={e => { e.stopPropagation(); prev(); }}
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
      )}

      {/* 다음 버튼 */}
      {images.length > 1 && current < images.length - 1 && (
        <button
          className="absolute right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors btn-press z-10"
          onClick={e => { e.stopPropagation(); next(); }}
        >
          <ChevronRight size={22} className="text-white" />
        </button>
      )}

      {/* 이미지 */}
      <div
        className="w-full h-full flex items-center justify-center px-14 py-16"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={e => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current]}
          alt={`view ${current + 1}`}
          className="max-w-full max-h-full object-contain animate-scale-in"
          style={{ animationDuration: '150ms' }}
          draggable={false}
        />
      </div>

      {/* 하단 인디케이터 도트 */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={e => { e.stopPropagation(); setCurrent(idx); }}
              className={`rounded-full transition-all duration-200 ${
                idx === current ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
