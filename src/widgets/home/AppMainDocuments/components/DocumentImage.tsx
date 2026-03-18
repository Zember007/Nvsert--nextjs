import Image from "shared/ui/OptimizedImage";
import { FC, memo } from "react";
import type { AnimationControls } from "framer-motion";
import { motion } from "framer-motion";

import { AsyncPhotoView } from "shared/common/AsyncPhotoView";
import mainDocumentsStyles from "@/assets/styles/sections/main/main-documents.module.scss";
import { getStrapiImageApiPath } from "../../../../shared/lib/strapi-image";

export interface DocumentImageProps {
  title: string;
  duration: string;
  price: string;
  imageUrls: {
    full: string;
  };
  index: number;
  controls: AnimationControls;
  isPriority?: boolean;
}

export const DocumentImage: FC<DocumentImageProps> = memo(
  ({ title, duration, price, imageUrls, index, controls, isPriority = false }) => (
    <AsyncPhotoView
      title={title}
      description={
        <>
          <span>{duration}</span>
          <span>{price}</span>
        </>
      }
      src={getStrapiImageApiPath(imageUrls.full) || imageUrls.full}
      width={475}
      height={667}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={controls}
        className={`${mainDocumentsStyles["document__big-img"]} `}
      >
        <Image
          decoding="async"
          alt="document"
          src={getStrapiImageApiPath(imageUrls.full) || imageUrls.full}
          width={250}
          height={349}
          sizes="(max-width: 639px) 190px, (max-width: 1279px) 220px, 250px"
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
        />
      </motion.div>
    </AsyncPhotoView>
  ),
);

DocumentImage.displayName = "DocumentImage";
