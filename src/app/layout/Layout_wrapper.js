import '@/assets/styles/base.scss'
import AppHeader from '@/components/general/AppHeader.js';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import AppFooter from '../components/general/AppFooter.vue';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { updateActionConfigs, updateActionFileConfigs } from '@/store/configs';

const Layout_wrapper = ({ children }) => {

    const dispatch = useDispatch()

    const [modalContentName, setModalContentName] = useState('')
    const { transparent } = useHeaderContext();

    // calcBodyClass() {
    //     return $store.getters['documents/getterCalcPageBodyClass'];
    //   },

    //   overflow() {
    //     return $store.getters['body/getterOverflow'];
    //   },

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
    }, [])
    return (
        // ${overflow && 'overflow'} ${calcBodyClass && 'cost-calc-page'}
 
            <main className={`${transparent && 'transparent-header'}  `}>

                <div className="container">
                    <div className="content">
                        <AppHeader />
                        {children}
                    </div>

                    {/* <AppFooter /> */}
                </div>
            </main >
       
    );
};

export default Layout_wrapper;