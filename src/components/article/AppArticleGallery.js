import Image from "next/image";

const AppArticleGallery = ({ media }) => {

    
    return (
        <div className="mtp__gallery js-mtp-gallery">
            {/* !!! */}
            <div className="mtp__gallery-wrapper">                
                {
                    media.map((item, index) => (
                        <a href={item.image} key={index} className="mtp__gallery-item js-mtp-gallery-item">
                            <picture>
                                {item.image_webp && <source srcSet={item.image_webp} type="image/webp" />}
                                {item.image && <Image src={item.image} alt={'gallery'} height={413} width={295} loading="lazy" />}
                            </picture>
                        </a>
                    ))
                }
            </div>
        </div >
    );
};

export default AppArticleGallery;