'use client';

import React, { useMemo } from 'react';
import { useRichTextRenderer } from 'shared/lib';

interface ServiceRichTextRendererProps {
    content: string;
}


const ServiceRichTextRenderer: React.FC<ServiceRichTextRendererProps> = ({ content }) => {
    const { processContent } = useRichTextRenderer();

    const rendered = useMemo(() => {
        const prepared = content
            .replace(/📞/g, '\n')
            .replace('-', '\n');
        return processContent(prepared);
    }, [content, processContent]);

    return <>{rendered}</>;
};

export default ServiceRichTextRenderer;


