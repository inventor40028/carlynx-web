// Image upload component.
// Design notes (why this looks the way it does):
//  • The native <input type="file"> is visually hidden (`sr-only`) — NOT absolutely
//    positioned. The earlier version used `absolute inset-0` which made the input
//    overlap surrounding elements (Remove button, Back/Next form buttons) and
//    re-opened the file picker on every click.
//  • The empty dropzone is a <label htmlFor={inputId}> so clicking anywhere inside
//    it opens the picker exactly once (browser-native behavior, no custom JS).
//  • When a preview exists, the dropzone is a plain <div> — only the Remove button
//    is interactive, so clicking the preview never re-opens the picker.
//  • `inputId` is built from `name + useId()` so multiple ImageUpload instances on
//    the same page can't collide on `<label htmlFor>` targets.
'use client';

import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  name: string;
  required?: boolean;
  onChange: (file: File | null) => void;
}

export default function ImageUpload({ label, name, required = false, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Unique id per instance — prevents htmlFor collisions when a form
  // renders several ImageUploads (driver-signup has 3, add-vehicle has 4).
  const reactId = useId();
  const inputId = `imgupload-${name}-${reactId}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    // Reset the input so selecting the same file again still fires onChange.
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Field label — sits ABOVE the dropzone, not on it. */}
      <span className="text-[#111827] font-semibold">
        {label} {required && <span className="text-red-600">*</span>}
      </span>

      {/* Visually-hidden real input. Browser handles label clicks natively. */}
      <input
        ref={inputRef}
        type="file"
        id={inputId}
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        // Required only while no file has been chosen.
        required={required && !preview}
        className="sr-only"
      />

      {preview ? (
        // Filled state — plain <div>, only the Remove button is interactive.
        <div
          className="border-2 border-[#cfd6e3] rounded-xl p-4 text-center bg-white"
          style={{ borderRadius: '12px' }}
        >
          <div className="relative inline-block">
            <Image
              src={preview}
              alt={`${label} preview`}
              width={200}
              height={150}
              className="mx-auto rounded-lg object-cover"
              style={{ width: 'auto', height: '150px' }}
              unoptimized
            />
          </div>
          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-semibold"
            >
              <X size={14} /> Remove
            </button>
            <label
              htmlFor={inputId}
              className="text-sm text-[#1d4ed8] hover:text-[#0d1b2e] font-semibold cursor-pointer"
            >
              Replace
            </label>
          </div>
        </div>
      ) : (
        // Empty state — the WHOLE dropzone is a <label>, so a single click opens the picker.
        <label
          htmlFor={inputId}
          className="block cursor-pointer border-2 border-dashed border-[#cfd6e3] rounded-xl p-6 text-center hover:border-[#1d4ed8] transition-colors"
          style={{ borderRadius: '12px' }}
        >
          <div className="flex justify-center mb-2">
            <Camera size={48} className="text-[#5b6575]" strokeWidth={1.5} />
          </div>
          <p className="text-[#5b6575] text-sm mb-3">Click to upload or drag and drop</p>
          <p className="text-xs text-[#5b6575]">PNG, JPG up to 5MB</p>
        </label>
      )}
    </div>
  );
}
