// Section background — used for atmospheric photos behind a section.
// The image fills the section, then a navy gradient fades over it so cards/text
// in the foreground stay readable. Works for portrait or landscape source images
// because next/image with `object-cover` handles the crop.
//
// Two presets:
//   variant="soft"  → mild navy gradient (fades from top + bottom). Image is clearly
//                     visible. Use for hero-adjacent atmospheric sections (e.g. behind
//                     "Choose Your Path", "Trust & Security", About hero subhero).
//   variant="form"  → solid navy at ~60% opacity over the image. Use behind signup
//                     forms — the form stays the obvious foreground subject.
'use client';

import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

interface SectionBackgroundProps {
  src: string;
  alt: string;
  variant?: 'soft' | 'form';
  /** Where to anchor the crop. `center` works for most subjects. */
  position?: CSSProperties['objectPosition'];
  /** Optional priority hint when the image is above-the-fold. */
  priority?: boolean;
  /** Section content rendered above the image. */
  children: ReactNode;
  /** Tailwind classes added to the wrapper section. */
  className?: string;
  /** Inline style for the section (rarely needed). */
  style?: CSSProperties;
}

export default function SectionBackground({
  src,
  alt,
  variant = 'soft',
  position = 'center',
  priority = false,
  children,
  className = '',
  style,
}: SectionBackgroundProps) {
  return (
    <section className={`relative isolate overflow-hidden ${className}`} style={style}>
      {/* The photograph */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover -z-20 select-none pointer-events-none"
        style={{ objectPosition: position }}
      />

      {/* Overlay — softens the image so foreground content reads clearly */}
      {variant === 'soft' ? (
        // Soft navy fade: stronger at top + bottom, lighter in the middle so
        // the image's subject is still visible behind the section content.
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,27,46,0.72) 0%, rgba(13,27,46,0.40) 35%, rgba(13,27,46,0.40) 65%, rgba(13,27,46,0.85) 100%)',
          }}
        />
      ) : (
        // Form variant: a single 60% navy plate over the image. Forms then sit
        // on top with their normal white card so they pop visually.
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: 'rgba(13,27,46,0.60)' }}
        />
      )}

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
