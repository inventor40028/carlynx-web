// Car image carousel — 1:1 square, dot indicators per view.
// Auto-slides every 3s until user interrupts (click, dot, arrow, or open lightbox).
// Tapping the image opens a fullscreen lightbox; back button or tap outside closes it.
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import type { CarView } from '@/lib/blueprint';

interface CarImageCarouselProps {
  views: CarView[];
  showLabel?: boolean;
  autoSlideMs?: number; // default 3000
}

export default function CarImageCarousel({
  views,
  showLabel = true,
  autoSlideMs = 3000,
}: CarImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [interrupted, setInterrupted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = views.length;

  // Auto-slide: runs while NOT interrupted and lightbox is closed
  useEffect(() => {
    if (interrupted || lightboxOpen || total <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, autoSlideMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [interrupted, lightboxOpen, total, autoSlideMs]);

  const stopAuto = () => setInterrupted(true);

  const go = (next: number) => {
    stopAuto();
    setIndex((next + total) % total);
  };

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [lightboxOpen]);

  // ESC closes the lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  const openLightbox = () => {
    stopAuto();
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      {/* Square 1:1 image frame */}
      <div
        className="relative w-full aspect-square bg-[#eef3f8] overflow-hidden cursor-zoom-in"
        style={{ borderRadius: '12px' }}
        onClick={openLightbox}
        role="button"
        aria-label="Open larger view"
      >
        <Image
          src={views[index].src}
          alt={views[index].label}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(index - 1); }}
              aria-label="Previous view"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#0d1b2e] p-2 transition-colors"
              style={{ borderRadius: '9999px' }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(index + 1); }}
              aria-label="Next view"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#0d1b2e] p-2 transition-colors"
              style={{ borderRadius: '9999px' }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* View label chip */}
        {showLabel && (
          <span
            className="absolute top-3 left-3 bg-[#0d1b2e]/85 text-white text-xs font-bold px-3 py-1"
            style={{ borderRadius: '9999px' }}
          >
            {views[index].label}
          </span>
        )}
      </div>

      {/* Dot indicators — one dot per view */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {views.map((v, i) => (
            <button
              key={v.label}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${v.label}`}
              className="transition-all"
              style={{
                width: i === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '9999px',
                background: i === index ? '#1d4ed8' : '#cfd6e3',
              }}
            />
          ))}
        </div>
      )}

      {/* Lightbox — fullscreen overlay. Tap outside the image OR the back button to close. */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Back button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            aria-label="Close image"
            className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white text-[#0d1b2e] px-4 py-2 font-semibold shadow-lg hover:bg-[#eef3f8] transition-colors"
            style={{ borderRadius: '12px' }}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Image — large but contained, click on image itself does nothing (so users can pinch-zoom on mobile without dismissing) */}
          <div
            className="relative w-full max-w-4xl"
            style={{ aspectRatio: '1 / 1', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={views[index].src}
              alt={views[index].label}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Lightbox dots */}
          {total > 1 && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {views.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${v.label}`}
                  className="transition-all"
                  style={{
                    width: i === index ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '9999px',
                    background: i === index ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
