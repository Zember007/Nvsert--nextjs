import Image01 from '@/assets/images/main-gallery/01.webp';
import Image02 from '@/assets/images/main-gallery/02.webp';
import Image03 from '@/assets/images/main-gallery/03.webp';
import Image04 from '@/assets/images/main-gallery/04.webp';
import Image05 from '@/assets/images/main-gallery/05.webp';
import Image06 from '@/assets/images/main-gallery/06.webp';
import Image07 from '@/assets/images/main-gallery/07.webp';
import Image08 from '@/assets/images/main-gallery/08.webp';
import Image09 from '@/assets/images/main-gallery/09.webp';
import Image10 from '@/assets/images/main-gallery/10.webp';
import Image11 from '@/assets/images/main-gallery/11.webp';
import Image12 from '@/assets/images/main-gallery/12.webp';
import Image15 from '@/assets/images/main-gallery/15.webp';
import Image16 from '@/assets/images/main-gallery/16.webp';
import Image17 from '@/assets/images/main-gallery/17.webp';
import Image18 from '@/assets/images/main-gallery/18.webp';
import Image19 from '@/assets/images/main-gallery/19.webp';
import Image20 from '@/assets/images/main-gallery/20.webp';
import Image21 from '@/assets/images/main-gallery/21.webp';
import Image22 from '@/assets/images/main-gallery/22.webp';
import Image23 from '@/assets/images/main-gallery/23.webp';
import { StaticImageData } from 'next/image';

type NavigationImg = {
    [key: string]: { img: StaticImageData }[];
};

export const navigationImg: NavigationImg = {
    tekhDokumentatsiya: [
        { img: Image09 },
        { img: Image11 },
        { img: Image22 },
        { img: Image23 }
    ],
    rospotrebnadzor: [
        { img: Image12 },
        { img: Image15 },
        { img: Image21 }
    ],
    iso: [
        { img: Image16 },
        { img: Image17 },
        { img: Image18 }
    ],
    sertifikatsiya: [
        { img: Image08 },
        { img: Image10 },
        { img: Image19 },
        { img: Image20 }
    ],
    tamozhennySoyuz: [
        { img: Image06 },
        { img: Image05 },
        { img: Image04 },
        { img: Image07 }
    ],
    gostR: [
        { img: Image01 },
        { img: Image02 },
        { img: Image03 }
    ]
}