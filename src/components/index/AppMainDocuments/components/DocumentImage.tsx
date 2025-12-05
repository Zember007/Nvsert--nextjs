import Image from 'next/image';
import { FC, memo } from 'react';
import type { AnimationControls } from 'framer-motion';
import { motion } from 'framer-motion';

import { AsyncPhotoView } from '@/components/common/AsyncPhotoView';

export interface DocumentImageProps {
  title: string;
  duration: string;
  price: string;
  imageUrls: {
    full: string;
  };
  index: number;
  controls: AnimationControls;
}

export const DocumentImage: FC<DocumentImageProps> = memo(
  ({ title, duration, price, imageUrls, index, controls }) => (
    <AsyncPhotoView
      title={title}
      description={
        <>
          <span>{duration}</span>
          <span>{price}</span>
        </>
      }
      src={imageUrls.full}
      width={475}
      height={667}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={controls}
        className="document__big-img "
      >
        <Image
          decoding="async"
          alt="document"
          src={imageUrls.full}
          width={250}
          height={349}
          loading="lazy"
        />
      </motion.div>
    </AsyncPhotoView>
  ),
);

DocumentImage.displayName = 'DocumentImage';


