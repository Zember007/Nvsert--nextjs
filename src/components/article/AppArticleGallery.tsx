import Image from "next/image";
import { AsyncPhotoProvider, AsyncPhotoView } from '@/components/common/AsyncPhotoView';

interface MediaItem {
    image_webp: string;
}

interface AppArticleGalleryProps {
    media: MediaItem[];
}

const AppArticleGallery: React.FC<AppArticleGalleryProps> = ({ media }) => {


    return (
        <div className="mtp__gallery js-mtp-gallery">
            <AsyncPhotoProvider maskOpacity={0.4}>
                <div className="mtp__gallery-wrapper">
                    {
                        media.map((item, index) => (
                            <div key={index} className="mtp__gallery-item js-mtp-gallery-item">
                                <AsyncPhotoView src={item.image_webp}>
                                    <Image src={item.image_webp} alt={'gallery'} width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-full h-auto" loading="lazy" />
                                </AsyncPhotoView>
                            </div>
                        ))
                    }
                </div>
            </AsyncPhotoProvider>
        </div >
    );
};

export default AppArticleGallery;