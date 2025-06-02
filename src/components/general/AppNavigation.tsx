
import Image from "next/image";
import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { gostR, iso, rospotrebnadzor, sertifikatsiya, tamozhennySoyuz, tekhDokumentatsiya } from './utils'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useHeaderContext } from "../contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/config/store";
import { useDispatch, useSelector } from "react-redux";
import { updateActionNavigation } from "@/store/navigation";

interface navigationLang {
    title: string
}

const AppNavigation = ({ active }: { active: boolean }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { navigation } = useSelector((state: RootState) => state.navigation);

    [
        {
            "id": 131,
            "seo_h1": "Сертификация ГОСТ Р",
            "title": "Сертификация ГОСТ Р",
            "short_text": "",
            "slug": "gost-r",
            "full_slug": "gost-r",
            "article_preview": "",
            "children": [
                {
                    "id": 112,
                    "seo_h1": "Добровольный сертификат соответствия ГОСТ Р",
                    "title": "Добровольный сертификат соответствия ГОСТ Р",
                    "short_text": "",
                    "slug": "sertifikat-sootvetstviya-gost-r",
                    "full_slug": "gost-r/sertifikat-sootvetstviya-gost-r",
                    "article_preview": "gost-r/sertifikat-sootvetstviya-gost-r/dobrovolnyi-sertifikat-sootvetstviia-gost-r",
                    "children": []
                },
                {
                    "id": 16,
                    "seo_h1": "Декларация соответствия ГОСТ Р",
                    "title": "Декларация соответствия ГОСТ Р",
                    "short_text": "",
                    "slug": "deklaraciya-sootvetstviya-gost-r",
                    "full_slug": "gost-r/deklaraciya-sootvetstviya-gost-r",
                    "article_preview": "gost-r/deklaraciya-sootvetstviya-gost-r/deklaratsiia-sootvetstviia-gost-r",
                    "children": []
                },
                {
                    "id": 43,
                    "seo_h1": "Сертификат соответствия \"Сейсмостойкости\"",
                    "title": "Сертификат соответствия \"Сейсмостойкости\"",
                    "short_text": "",
                    "slug": "sertifikat-sootvetstviya-seysmostoykosti",
                    "full_slug": "gost-r/sertifikat-sootvetstviya-seysmostoykosti",
                    "article_preview": "gost-r/sertifikat-sootvetstviya-seysmostoykosti/seismostoikost-2",
                    "children": []
                }
            ]
        },
        {
            "id": 9,
            "seo_h1": "Сертификация Таможенного Союза",
            "title": "Сертификация Таможенного Союза",
            "short_text": "",
            "slug": "tamozhennogo-soyuza",
            "full_slug": "tamozhennogo-soyuza",
            "article_preview": "",
            "children": [
                {
                    "id": 113,
                    "seo_h1": "Сертификат Таможенного Союза (СС ТР ТС)",
                    "title": "Сертификат Таможенного Союза (СС ТР ТС)",
                    "short_text": "",
                    "slug": "sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                    "full_slug": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts",
                    "article_preview": "tamozhennogo-soyuza/sertifikat-tamozhennogo-soyuza-ss-tr-ts/sertifikat-sootvetstviia-tamozhennogo-soiuza",
                    "children": []
                },
                {
                    "id": 132,
                    "seo_h1": "Прохождение инспекционного контроля (ИК)",
                    "title": "Прохождение инспекционного контроля (ИК)",
                    "short_text": "",
                    "slug": "prohozhdenie-inspekcionnogo-kontrolya-ik",
                    "full_slug": "tamozhennogo-soyuza/prohozhdenie-inspekcionnogo-kontrolya-ik",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 114,
                    "seo_h1": "Декларация Таможенного Союза (ДС ТР ТС)",
                    "title": "Декларация Таможенного Союза (ДС ТР ТС)",
                    "short_text": "",
                    "slug": "deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                    "full_slug": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts",
                    "article_preview": "tamozhennogo-soyuza/deklaraciya-tamozhennogo-soyuza-ds-tr-ts/deklaratsiia-sootvetstviia-tamozhennogo-soiuza",
                    "children": []
                },
                {
                    "id": 62,
                    "seo_h1": "Сертификат соответствия Пожарной Безопасности",
                    "title": "Сертификат соответствия Пожарной Безопасности",
                    "short_text": "",
                    "slug": "sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                    "full_slug": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti",
                    "article_preview": "tamozhennogo-soyuza/sertifikat-sootvetstviya-pozharnoy-bezopasnosti/pozharnyi-sertifikat-1",
                    "children": []
                }
            ]
        },
        {
            "id": 11,
            "seo_h1": "Роспотребнадзор",
            "title": "Роспотребнадзор",
            "short_text": "",
            "slug": "rospotrebnadzor",
            "full_slug": "rospotrebnadzor",
            "article_preview": "",
            "children": [
                {
                    "id": 66,
                    "seo_h1": "Свидетельство о государственной регистрации (СГР)",
                    "title": "Свидетельство о государственной регистрации (СГР)",
                    "short_text": "",
                    "slug": "svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                    "full_slug": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr",
                    "article_preview": "rospotrebnadzor/svidetelstvo-o-gosudarstvennoy-registracii-sgr/svidetelstvo-o-gos-registratsii",
                    "children": []
                },
                {
                    "id": 74,
                    "seo_h1": "Экспертное заключение (ЭЗ)",
                    "title": "Экспертное заключение (ЭЗ)",
                    "short_text": "",
                    "slug": "ekspertnoe-zaklyuchenie-ez",
                    "full_slug": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez",
                    "article_preview": "rospotrebnadzor/ekspertnoe-zaklyuchenie-ez/ekspertnoe-zakliuchenie",
                    "children": []
                }
            ]
        },
        {
            "id": 111,
            "seo_h1": "ИСО (СМК)",
            "title": "ИСО (СМК)",
            "short_text": "",
            "slug": "iso",
            "full_slug": "iso",
            "article_preview": "",
            "children": [
                {
                    "id": 17,
                    "seo_h1": "ГОСТ Р ИСО 9001–2015 (Стандарт организации)",
                    "title": "ГОСТ Р ИСО 9001–2015 (Стандарт организации)",
                    "short_text": "",
                    "slug": "gost-r-iso-90012015-standart-organizacii",
                    "full_slug": "iso/gost-r-iso-90012015-standart-organizacii",
                    "article_preview": "iso/gost-r-iso-90012015-standart-organizacii/gost-iso-9001-2011-1",
                    "children": []
                },
                {
                    "id": 18,
                    "seo_h1": "ГОСТ Р ИСО 14001-2016 (Экологический менеджмент)",
                    "title": "ГОСТ Р ИСО 14001-2016 (Экологический менеджмент)",
                    "short_text": "",
                    "slug": "gost-r-iso-140012016-ekologicheskiy-menedzhment",
                    "full_slug": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment",
                    "article_preview": "iso/gost-r-iso-140012016-ekologicheskiy-menedzhment/gost-r-iso-14001-2007-ekologiia",
                    "children": []
                },
                {
                    "id": 20,
                    "seo_h1": "ГОСТ Р ИСО 22000-2007 (Пищевой менеджмент)",
                    "title": "ГОСТ Р ИСО 22000-2007 (Пищевой менеджмент)",
                    "short_text": "",
                    "slug": "gost-r-iso-220002007-pishchevoy-menedzhment",
                    "full_slug": "iso/gost-r-iso-220002007-pishchevoy-menedzhment",
                    "article_preview": "iso/gost-r-iso-220002007-pishchevoy-menedzhment/gost-r-iso-22000-2007-iso-220002005",
                    "children": []
                }
            ]
        },
        {
            "id": 104,
            "seo_h1": "Техническая документация",
            "title": "Техническая документация",
            "short_text": "",
            "slug": "tehnicheskaya-dokumentatsiya",
            "full_slug": "tehnicheskaya-dokumentatsiya",
            "article_preview": "",
            "children": [
                {
                    "id": 133,
                    "seo_h1": "Протокол испытаний (исследований) ПИ",
                    "title": "Протокол испытаний (исследований) ПИ",
                    "short_text": "",
                    "slug": "protokol-ispytaniy-issledovaniy-pi",
                    "full_slug": "tehnicheskaya-dokumentatsiya/protokol-ispytaniy-issledovaniy-pi",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 107,
                    "seo_h1": "Технические условия (ТУ)",
                    "title": "Технические условия (ТУ)",
                    "short_text": "",
                    "slug": "tehnicheskie-usloviya-tu",
                    "full_slug": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu",
                    "article_preview": "tehnicheskaya-dokumentatsiya/tehnicheskie-usloviya-tu/tekhnicheskie-usloviia",
                    "children": []
                }
            ]
        },
        {
            "id": 14,
            "seo_h1": "Сертификация",
            "title": "Сертификация",
            "short_text": "",
            "slug": "sertifikaciya",
            "full_slug": "sertifikaciya",
            "article_preview": "",
            "children": [
                {
                    "id": 134,
                    "seo_h1": "Сертификат на тип продукции",
                    "title": "Сертификат на тип продукции",
                    "short_text": "",
                    "slug": "sertifikat-na-tip-produkcii",
                    "full_slug": "sertifikaciya/sertifikat-na-tip-produkcii",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 127,
                    "seo_h1": "Информационное отказное письмо",
                    "title": "Информационное отказное письмо",
                    "short_text": "",
                    "slug": "informacionnoe-otkaznoe-pismo",
                    "full_slug": "sertifikaciya/informacionnoe-otkaznoe-pismo",
                    "article_preview": "other-services/informacionnoe-otkaznoe-pismo/otkaznoe-pismo",
                    "children": []
                },
                {
                    "id": 135,
                    "seo_h1": "Паспорт безопасности химической продукции",
                    "title": "Паспорт безопасности химической продукции",
                    "short_text": "",
                    "slug": "pasport-bezopasnosti-himicheskoy-produkcii",
                    "full_slug": "sertifikaciya/pasport-bezopasnosti-himicheskoy-produkcii",
                    "article_preview": "",
                    "children": []
                },
                {
                    "id": 136,
                    "seo_h1": "Сертификат о происхождении товара (СТ-1)",
                    "title": "Сертификат о происхождении товара (СТ-1)",
                    "short_text": "",
                    "slug": "sertifikat-o-proishozhdenii-tovara-st-1",
                    "full_slug": "sertifikaciya/sertifikat-o-proishozhdenii-tovara-st-1",
                    "article_preview": "",
                    "children": []
                }
            ]
        }
    ]

    useEffect(() => {
        if (navigation.length === 0) {
            dispatch(updateActionNavigation());
        }
    }, [dispatch, navigation]);

    const { t } = useTranslation()

    const controls = useAnimation();

    const defaultSettings = {
        duration: 0.6,
        bounce: 5,
        delay: 0,
        ease: [0.34, 1.56, 0.64, 1], // Кастомная cubic-bezier кривая
        times: [0, 0.2, 0.5, 0.8, 1], // Временные точки
        openY: [0, 26, 0, 0, 0], // Эффект отскока при открытии
        closeY: [60, -6, 0, 0, 0], // Эффект отскока при закрытии
        opacity: [0, 1, 1, 1, 1],
    };

    useEffect(() => {
        if (active) {
            controls.start({
                y: defaultSettings.openY, // Используем openY для отскока
                opacity: defaultSettings.opacity,
                transition: {
                    duration: defaultSettings.duration,
                    ease: defaultSettings.ease,
                    times: defaultSettings.times,
                    delay: 0.1
                }
            });
        }
    }, [active]);

    const gostRLang = t('navigation.gostR', { returnObjects: true }) as navigationLang[]
    const tamozhennySoyuzLang = t('navigation.tamozhennySoyuz', { returnObjects: true }) as navigationLang[]
    const sertifikatsiyaLang = t('navigation.sertifikatsiya', { returnObjects: true }) as navigationLang[]
    const isoLang = t('navigation.iso', { returnObjects: true }) as navigationLang[]
    const rospotrebnadzorLang = t('navigation.rospotrebnadzor', { returnObjects: true }) as navigationLang[]
    const tekhDokumentatsiyaLang = t('navigation.tekhDokumentatsiya', { returnObjects: true }) as navigationLang[]
    return (
        <>
            <div className="grid grid-cols-6 w-full gap-[30px]">

                <div className="flex flex-col gap-[20px]">
                    {gostR.map((item, i) => (
                        <WrapperItem key={i} title={gostRLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {tamozhennySoyuz.map((item, i) => (
                        <WrapperItem key={i} title={tamozhennySoyuzLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {sertifikatsiya.map((item, i) => (
                        <WrapperItem key={i} title={sertifikatsiyaLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {iso.map((item, i) => (
                        <WrapperItem key={i} title={isoLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {rospotrebnadzor.map((item, i) => (
                        <WrapperItem key={i} title={rospotrebnadzorLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {tekhDokumentatsiya.map((item, i) => (
                        <WrapperItem key={i} title={tekhDokumentatsiyaLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

            </div>
        </>
    );
};

const WrapperItem = ({ img, title, controls }: { img: string | StaticImport, title: string, controls: AnimationControls }) => {
    const { darkHeader } = useHeaderContext();
    const { setButtonRef, setWrapperRef } = useButton()

    return (
        <>
            <div ref={setWrapperRef} className="tariff-wrap">
                <Link ref={setButtonRef} href={'#'} className={`tariff no-transitions no-light not-backdrop flex gap-[10px] group  rounded-[4px] items-center ${darkHeader ? `hover:bg-[#5B6788]` : 'hover:bg-[#00000080]'} border-solid ${darkHeader ? 'hover:border-[#000]' : 'hover:border-[#ccc]'} border border-[transparent]`}>
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        className="min-w-[43px] rounded-[4px] overflow-hidden group-hover:rounded-[2px]"
                        animate={controls}>
                        <Image src={img} width={43} height={60} alt="document" />
                    </motion.div>
                    <p className={`${darkHeader ? 'text-[#000] group-hover:text-[#FFF]' : 'text-[#FFF]'} pr-[12px] leading-[1.2]  max-w-[170px]  text-[14px]`}>{filterPrepositions(title)}</p>
                </Link>
            </div>
        </>
    )
}

export default AppNavigation;