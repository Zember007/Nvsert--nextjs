/**
 * Утилиты для работы с типографикой
 */

import { fontFamilies } from './constants';

export function getSystemFontFamily(isMac: boolean = false): string {
  return isMac ? fontFamilies.mac : fontFamilies.windows;
}
