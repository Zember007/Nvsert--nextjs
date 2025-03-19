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
import { filterPrepositions } from '@/hook/filter';


const AppMainIntro = () => {

    const { t } = useTranslation()

 

    return (
        <>
            <section className="main-banner">
                <div className="wrapper">
                    <div className='main-banner__content'>
                        <h1 className="main-banner__title">{filterPrepositions(t('mainIntro.title'))}</h1>
                        <div className='border-main main-form p-[32px] max-w-[420px] flex flex-col gap-[20px] rounded-[6px]'>
                            <span className='text-[#FFF] text-[32px] ml-[10px]'>Оставить заявку</span>
                            <AppMainForm btnText={'Отправить заявку'} />                            
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
};

export default AppMainIntro;