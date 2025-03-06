'use client';
import '@/assets/styles/cost-calc.scss'
import AppCalcFormWrapper from '@/components/calculation/AppCalcFormWrapper';
import AppCalcProgress from '@/components/calculation/AppCalcProgress';
import { updateActionDiscounts, updateActionDocuments } from '@/store/documents';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/config/store'

const Page = () => {

    const dispatch = useDispatch<AppDispatch>()


    const { discounts, documents } = useSelector((state: RootState) => state.documents)

    useEffect(() => {
        dispatch(updateActionDocuments())
        dispatch(updateActionDiscounts())
    }, [])

    const { discountSum, currentStep } = useSelector((state: RootState) => state.find_out_cost)


    return (
        <div className="cost-calc wrapper">
            <div className="cost-calc__wrapper" >
                <AppCalcProgress
                    currentStep={currentStep}
                    currentDiscount={discountSum}

                />

                <AppCalcFormWrapper
                    discount={discounts}
                    documents={documents}
                    currentStep={currentStep}

                />
            </div>
        </div>
    );
};

export default Page;