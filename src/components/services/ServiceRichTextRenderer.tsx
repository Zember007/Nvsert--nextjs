'use client';

import React from 'react';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';

interface ServiceRichTextRendererProps {
    content: string;
}


const ServiceRichTextRenderer: React.FC<ServiceRichTextRendererProps> = ({ content }) => {
    const { processContent } = useRichTextRenderer();

    const preparedContent = content
        .replace(/📞/g, '\n')
        .replace('-', '\n');

    return <div>{processContent(preparedContent)}</div>;
};

export default ServiceRichTextRenderer;


