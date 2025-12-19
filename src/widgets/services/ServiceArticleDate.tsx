import React from 'react';

interface ServiceArticleDateProps {
    date?: string;
}

const ServiceArticleDate: React.FC<ServiceArticleDateProps> = ({ 
    date = '20.04.2025' 
}) => {
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; // Return original string if date is invalid
            }
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        } catch {
            return dateString; // Return original string on error
        }
    };
    
    return (
        <div className="w-full flex justify-end">
            <p className="text-[12px] leading-[8px] text-[#000] font-light">
                Статья написана {formatDate(date)}
            </p>
        </div>
    );
};

export default ServiceArticleDate;

