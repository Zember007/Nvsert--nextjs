'use client';
import '@/assets/styles/cost-calc.scss'
import AppCalcFormWrapper from '@/components/calculation/AppCalcFormWrapper';
import AppCalcProgress from '@/components/calculation/AppCalcProgress';
import { updateActionDiscounts, updateActionDocuments } from '@/store/documents';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {

    const dispatch = useDispatch()
    

    const { discounts, documents } = useSelector(state => state.documents)

    const [discountSum, setDiscountSum] = useState(0)
    const [currentStep, setCurrentStep] = useState(1)

    useEffect(() => {
        dispatch(updateActionDocuments())
        dispatch(updateActionDiscounts())
    }, [])

    // stepChangeListener() {
    //     this.$nuxt.$on('stepChange', () => {
    //       this.currentStep < 3 ? (this.currentStep += 1) : false;
    //     });
    //   }

    //   stepBackListener() {
    //     this.$nuxt.$on('stepBack', () => {
    //       this.currentStep > 1 ? (this.currentStep -= 1) : false;
    //     });
    //   }

    //   discountListener() {
    //     this.$nuxt.$on('changeCurrDiscount', (value) => {
    //       this.discountSum = value;
    //     });
    //   }
    return (
        <main className="cost-calc wrapper">
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
        </main>
    );
};

export default Page;