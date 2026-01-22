'use client';

import React from 'react';
import { NavigationItem } from '@/types/navigation';
import { AsyncPhotoProvider, AsyncPhotoView } from 'shared/common/AsyncPhotoView';
import { STRAPI_PUBLIC_URL } from 'shared/config/env';

interface ServiceGalleryProps {
    navigation?: NavigationItem[] | null;
    onChange: (index: number) => void;
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({ navigation, onChange }) => {
    if (!navigation || navigation.length === 0) {
        return null;
    }

    

    return (
        <AsyncPhotoProvider
            maskOpacity={0.4}
            maskClassName="blurred-mask"
            speed={() => 0}
            loop={true}
            onIndexChange={onChange}
            maskClosable={false}
        >
            {navigation.map((item, index) => (
                <AsyncPhotoView
                    key={item.id}
                    title={item.title}
                    description={
                        <>
                            <span>{item.duration}</span>
                            <span>{item.price}</span>
                        </>
                    }
                    src={STRAPI_PUBLIC_URL + (item?.img?.url || '')}
                    width={250}
                    height={37}
                >
                    <div id={'service-' + index} />

                </AsyncPhotoView>
            ))}
        </AsyncPhotoProvider>
    );
};

export default ServiceGallery;


