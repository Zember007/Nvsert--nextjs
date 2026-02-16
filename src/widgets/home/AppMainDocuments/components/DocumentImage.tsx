import Image from "next/image";
import { FC, memo } from "react";
import type { AnimationControls } from "framer-motion";
import { motion } from "framer-motion";

import { AsyncPhotoView } from "shared/common/AsyncPhotoView";
import mainDocumentsStyles from "@/assets/styles/main.module.scss";
import { STRAPI_PUBLIC_URL } from "../../../../shared/config/env";

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
      src={imageUrls.full}
      width={475}
      height={667}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={controls}
        className={`${mainDocumentsStyles["document__big-img"]} `}
      >
        <Image
          unoptimized={true}
          decoding="async"
          alt="document"
          src={STRAPI_PUBLIC_URL + imageUrls.full}
          width={250}
          height={349}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
        />
      </motion.div>
    </AsyncPhotoView>
  ),
);

DocumentImage.displayName = "DocumentImage";
