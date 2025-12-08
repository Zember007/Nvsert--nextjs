import React from 'react';
import ServiceItem from '@/components/services/ServiceItem';
import { Services } from '@/store/navigation';

interface ServicesListProps {
    services: Services[];
    expandedServices: number[];
    hover: boolean;
    active: boolean;
    onToggleService: (index: number) => void;
}

const ServicesList: React.FC<ServicesListProps> = ({
    services,
    expandedServices,
    hover,
    active,
    onToggleService,
}) => {
    return (
        <div className="flex flex-col">
            {services.map((service, index) => (
                <ServiceItem
                    last={index === services.length - 1}
                    hover={hover}
                    active={active}
                    key={index}
                    service={service}
                    index={index}
                    isExpanded={expandedServices.includes(index)}
                    onToggle={onToggleService}
                />
            ))}
        </div>
    );
};

export default ServicesList;


