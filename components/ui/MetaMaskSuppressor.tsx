// Suppresses the noisy "Failed to connect to MetaMask" runtime overlay that
// fires when the MetaMask browser extension probes pages for an injected wallet
// provider. We don't use crypto wallets — this is purely an extension artefact.
// We swallow ONLY messages that originate from the MetaMask extension scripts
// so real app errors remain visible.
'use client';

import { useEffect } from 'react';

export default function MetaMaskSuppressor() {
  useEffect(() => {
    const isMetaMaskNoise = (msg: unknown, stack?: string) => {
      const m = typeof msg === 'string' ? msg : '';
      const s = stack ?? '';
      return (
        /failed to connect to metamask/i.test(m) ||
        /metamask extension not found/i.test(m) ||
        /chrome-extension:\/\/nkbihfbeogaeaoehlefnkodbefgpgknn/.test(s) ||
        /chrome-extension:\/\/nkbihfbeogaeaoehlefnkodbefgpgknn/.test(m)
      );
    };

    const onRejection = (ev: PromiseRejectionEvent) => {
      const reason = ev.reason;
      const msg = reason?.message ?? String(reason ?? '');
      const stack = reason?.stack ?? '';
      if (isMetaMaskNoise(msg, stack)) {
        ev.preventDefault();
        ev.stopImmediatePropagation?.();
      }
    };

    const onError = (ev: ErrorEvent) => {
      if (isMetaMaskNoise(ev.message, ev.error?.stack)) {
        ev.preventDefault();
        ev.stopImmediatePropagation?.();
      }
    };

    window.addEventListener('unhandledrejection', onRejection);
    window.addEventListener('error', onError);
    return () => {
      window.removeEventListener('unhandledrejection', onRejection);
      window.removeEventListener('error', onError);
    };
  }, []);

  return null;
}
