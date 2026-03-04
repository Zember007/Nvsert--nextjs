import React, { useCallback } from 'react';

import { renderRichTextContent } from './renderRichTextContent';

export const useRichTextRenderer = () => {
  const processContent = useCallback(
    (text: string, small?: boolean): React.ReactNode[] => renderRichTextContent(text, small),
    [],
  );

  return { processContent };
};


