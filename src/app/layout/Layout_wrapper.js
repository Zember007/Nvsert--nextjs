import '@/assets/styles/base.scss'
import AppHeader from '@/components/general/AppHeader.js';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '@/components/general/AppFooter.js';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { updateActionConfigs, updateActionFileConfigs } from '@/store/configs';
import useHeadLayout from '@/hook/useHeadLayout';

const Layout_wrapper = ({ children }) => {

    const dispatch = useDispatch()

    const [modalContentName, setModalContentName] = useState('')

    const { transparent } = useHeaderContext();
    const { overflow } = useSelector((state) => state.body);
    const { calcPageBodyClass } = useSelector((state) => state.documents);

    const { configs: configsPure, file_configs: fileConfigsPure, status, error } = useSelector((state) => state.config);


    const configs = useMemo(() => {

        let parsedConf = {};
        configsPure?.forEach((item) => {
            let key = item.key;
            let value = item.value;
            parsedConf[key] = value;
        });

        return parsedConf;
    }, [configsPure])

    const file_configs = useMemo(() => {
        let parsedConf = {};
        fileConfigsPure?.forEach((item) => {
            let key = item.key;
            let value = item.value;
            parsedConf[key] = value;
        });

        return parsedConf;
    }, [fileConfigsPure])

    function defineModalContentListener() {
        // $nuxt.$on('defineModalContent', (name) => {
        //   modalContentName = name;
        //   $modal.show('defaultModal');
        // });
    }

    function overflowListener() {
        // $nuxt.$on('enableOverflow', () => {
        //   $store.dispatch('body/enableOverflow');
        // });
        // $nuxt.$on('disableOverflow', () => {
        //   $store.dispatch('body/disableOverflow');
        // });
    }

    useEffect(() => {
        dispatch(updateActionConfigs())
        dispatch(updateActionFileConfigs())

        function set100Vh() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        set100Vh();

        window.addEventListener('resize', set100Vh);

    }, [])
    return (

        <main className={`${transparent && 'transparent-header'}  ${calcPageBodyClass && 'cost-calc-page'}`}>
            {useHeadLayout(configs, file_configs)}
            <div className="container">
                <div className="content">
                    <AppHeader />
                    {children}
                </div>

                <AppFooter />
            </div>
        </main >

    );
};

export default Layout_wrapper;