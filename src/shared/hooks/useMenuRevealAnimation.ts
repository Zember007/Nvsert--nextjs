import { useLayoutEffect, useState } from 'react';

/**
 * Defers the "open" CSS class by two animation frames so transitions from
 * the default (off-screen) state to `.active` run when the panel mounts
 * with `active` already true (dynamic import + conditional render).
 */
export function useMenuRevealAnimation(active: boolean): boolean {
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    if (!active) {
      setRevealed(false);
      return;
    }
    setRevealed(false);
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setRevealed(true);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [active]);

  return revealed;
}
