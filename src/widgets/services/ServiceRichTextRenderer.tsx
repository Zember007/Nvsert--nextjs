'use client';

import React from 'react';
import { useRichTextRenderer } from 'shared/lib';

interface ServiceRichTextRendererProps {
    content: string;
}


const ServiceRichTextRenderer: React.FC<ServiceRichTextRendererProps> = ({ content }) => {
    const { processContent } = useRichTextRenderer();

    const preparedContent = content
        .replace(/📞/g, '\n')
        .replace('-', '\n');

    return <>{processContent(preparedContent)}</>;
};

export default ServiceRichTextRenderer;


