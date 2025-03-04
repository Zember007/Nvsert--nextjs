'use client'
import '@/assets/styles/sections/main/main-banner.scss';
import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import {
    resetActionSearchResults,
    updateDefaultResults,
    updateSearchResults,
    selectSearchResults,
    selectSearchDefault,
} from '@/store/search';
import { useTranslation } from 'react-i18next';
import { useHeaderContext } from '@/components/contexts/HeaderContext'
import AppMainForm from '../forms/AppMainForm';


const AppMainIntro = () => {

    const { t } = useTranslation()

 

    return (
        <>
            <section className="main-banner">
                <div className="wrapper">
                    <div className='main-banner__content'>
                        <h1 className="main-banner__title">{t('mainIntro.title')}</h1>
                        <div className='border-main p-[32px] max-w-[420px] bg-[#00000099] flex flex-col gap-[20px] rounded-[6px]'>
                            <span className='text-[#FFF] text-[32px]'>Оставить заявку</span>
                            <AppMainForm btnText={'Отправить заявку'} />                            
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
};

export default AppMainIntro;