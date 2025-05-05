'use client'
import '@/assets/styles/sections/main/main-banner.scss';
import { useTranslation } from 'react-i18next';
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


                        <AppMainForm btnText={'Оформить заявку'} />

                    </div>
                </div >
            </section >
        </>
    );
};

export default AppMainIntro;