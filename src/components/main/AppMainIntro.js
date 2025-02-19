'use client'
import '@/assets/styles/sections/main/main-banner.scss';
import Image from "next/image"
import AppIntroLink from "./AppIntroLink"
import searchIcon from '@/assets/images/search-icon.gif'
import searchIcon2 from '@/assets/images/search-icon-2.gif'
import Type4 from '@/assets/images/svg/type-4.svg'
import Type3 from '@/assets/images/svg/type-3.svg'
import Type2 from '@/assets/images/svg/type-2.svg'
import Type1 from '@/assets/images/svg/type-1.svg'
import { useEffect, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import {
    resetActionSearchResults,
    updateDefaultResults,
    updateSearchResults,
    selectSearchResults,
    selectSearchDefault,
    selectIsLoading,
    selectError,
} from '@/store/search';
import { useTranslation } from 'react-i18next';
import {useHeaderContext} from '@/components/contexts/HeaderContext'


const AppMainIntro = () => {

    const { t } = useTranslation()

    const dispatch = useDispatch();

    const {openDefaultModal} = useHeaderContext()

    const searchResults = useSelector(selectSearchResults);
    const defaultResults = useSelector(selectSearchDefault);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);


    const [limit, setLimit] = useState(25)
    const [placeholder, setPlaceholder] = useState('all')
    const [operating, setOperatin] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [nothingFounded, setNothingFounded] = useState(false)
    const [searchCategories, setSearchCategories] = useState([])
    const [currentSearchCategory, setCurrentSearchCategory] = useState('article')
    const [delayTimer, setDelayTimer] = useState(0)
    const [listFolded, setListFolded] = useState(true)

    const searchInput = useRef()

    const placeholderText = useMemo(() => {
        switch (placeholder) {
            case 'all':
                return t('mainIntro.placeholder.all');

            case 'section':
                return t('mainIntro.placeholder.section');

            case 'okp':
                return t('mainIntro.placeholder.okp');

            case 'tn':
                return t('mainIntro.placeholder.tnved');

            default:
                return t('mainIntro.placeholder.all');

        }
    }, [placeholder])


    const resultsToShow = useMemo(() => {
        if (searchResults.content && searchResults.content.length > 0) {
            return searchResults.content;
        } else if (defaultResults && defaultResults.content) {
            switch (currentSearchCategory) {
                case 'article':
                    return defaultResults.content.default ?? [];
                case 'tn':
                    return defaultResults.content.tn_ved ?? [];
                case 'okp':
                    return defaultResults.content.okp ?? [];
                case 'section':
                    return defaultResults.content.sections ?? [];
                default:
                    return defaultResults.content.default ?? [];
            }
        }
    }, [searchResults, currentSearchCategory, defaultResults])

    const resultsToShowFinal = useMemo(() => {
        if (resultsToShow) {
            return listFolded
                ? resultsToShow.slice(0, 5)
                : resultsToShow;
        } else {
            return [];
        }
    }, [resultsToShow, listFolded])

    const maxDifference = useMemo(() => {
        if (resultsToShow && resultsToShowFinal) {
            return resultsToShow.length - resultsToShowFinal.length;
        } else {
            return 0;
        }
    }, [resultsToShow, resultsToShowFinal])

    function focusInput() {
        searchInput.current.focus();
    }

    function resetCategory() {
        setSearchCategories([])
        setPlaceholder('all')
        setCurrentSearchCategory('article')
        setSearchValue('')
        setOperatin(false)
        setListFolded(true)
        setNothingFounded(false)
        dispatch(resetActionSearchResults())
    }

    function chooseCategory(evt) {
        setSearchCategories(searchCategories.filter(
            (cat) => cat == evt.target.value
        ))
        if (searchCategories.length > 0) {
            setSearchValue('')
            setPlaceholder(searchCategories[0])
            setCurrentSearchCategory(searchCategories[0])
            setOperatin(true)
            focusInput();
        } else {
            setPlaceholder('all')
            setCurrentSearchCategory('article')
            setOperatin(false)
            focusInput();
        }

        dispatch(resetActionSearchResults())

    }

    function performSearch(value) {
        clearTimeout(delayTimer);
        if (value.length > 2) {

            setDelayTimer(setTimeout(async () => {

                dispatch(updateSearchResults({ slug: currentSearchCategory, search: value, limit: 10 })).then((res) => {             

                    setListFolded(true)
                    
                    searchResults.content?.length === 0
                        ? (setNothingFounded(true))
                        : (setNothingFounded(false));
                })
            }, 500))

        } else {
            dispatch(resetActionSearchResults())
            setNothingFounded(false)
        }
    }

    function openIntroModal() {
        openDefaultModal('introForm')
    }

    function unfoldList() {
        setListFolded(false)
    }

    useEffect(() => {
        dispatch(updateDefaultResults(limit))
        performSearch(searchValue)
    }, [])
    const getEnding = useMemo(() => {
        if (maxDifference > 0) {
            switch (true) {
                case maxDifference === 1:
                    return t('mainIntro.button.variant');

                case maxDifference > 1 && maxDifference < 5:
                    return t('mainIntro.button.variants_s');
                case maxDifference > 5:
                    return t('mainIntro.button.variants_l');
                default:
                    return t('mainIntro.button.variant');
            }
        } else {
            return '';
        }
    }, [maxDifference])

    return (
        <>
            <section className="main-banner">
                <div className="wrapper">
                    <h1 className="main-banner__title">{t('mainIntro.title')}</h1>
                    <div className="main-banner__content">
                        <div className="main-banner__img">

                            {operating ?
                                <Image alt='search' src={searchIcon} width={'370'} height={'485'} />
                                :
                                <Image alt='search' src={searchIcon2} width={'370'} height={'485'} />
                            }


                        </div>
                        <div className={`main-banner__search ${operating && 'operating'}`}>

                            {operating && <button

                                type="button"
                                onClick="resetCategory"
                                className="btn btn--close search__cancel"
                            >
                                <i className="icon icon--close"></i>
                            </button>}


                            <div className="form">
                                <label className="field search__label">


                                    {operating &&
                                        <>
                                            {
                                                currentSearchCategory == 'section' &&
                                                <div
                                                    className="search__category-icon"
                                                >
                                                    <Image
                                                        alt="type-1"
                                                        src={Type1}
                                                        width="40"
                                                        height="40"
                                                    />
                                                </div>
                                            }
                                            {currentSearchCategory == 'okp' &&
                                                <div
                                                    className="search__category-icon"
                                                >
                                                    <Image
                                                        alt="type-2"
                                                        src={Type2}
                                                        width="40"
                                                        height="40"
                                                    />
                                                </div>
                                            }
                                            {currentSearchCategory == 'tn' &&
                                                <div
                                                    className="search__category-icon"
                                                >
                                                    <Image
                                                        alt="type-3"
                                                        src={Type3}
                                                        width="40"
                                                        height="40"
                                                    />
                                                </div>
                                            }
                                        </>
                                    }


                                    <input
                                        type="text"
                                        className="field__input search__input js-search-input"
                                        onInput={(e) => { setSearchValue(e.target.value); performSearch(e.target.value); }}
                                        ref={searchInput}
                                        placeholder={placeholderText}
                                    />

                                    <span className="field__title search__input-title">{
                                        placeholderText
                                    }</span>


                                    <button type="submit" className="field__btn">
                                        <i className="icon icon--search"></i>
                                    </button>
                                </label>
                            </div>

                            {resultsToShow && !nothingFounded &&
                                <ul
                                    className={`main-banner__tags ${!listFolded && 'opened'} `}
                                >
                                    {resultsToShowFinal.map(item => (
                                        <AppIntroLink
                                            key={JSON.stringify(item)}
                                            item={item}
                                            linkType={currentSearchCategory}
                                        />
                                    ))
                                    }

                                    {maxDifference > 0 && <button
                                        key={maxDifference}
                                        type="button"
                                        onClick={() => unfoldList()}
                                        className="main-banner__tag-btn"
                                    >
                                        {t('mainIntro.button.showMore')}  {maxDifference} {getEnding}
                                    </button>}
                                </ul>}

                            <ul
                                className="main-banner__types"
                                style={{ display: (operating || nothingFounded) && 'none' }}
                            >
                                <span className="main-banner__subtitle">{
                                    t('mainIntro.info')
                                }</span>
                                <li>
                                    <label className="main-banner__type" type="button">
                                        <input
                                            type="checkbox"
                                            value="section"
                                            onChange={(event) => {chooseCategory(event);  }}
                                        />
                                        <div className="main-banner__type-content">
                                            <Image
                                                alt="type-1"
                                                src={Type1}
                                                width="40"
                                                height="40"
                                            />
                                            {t('mainIntro.button.section')}
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <label className="main-banner__type" type="button">
                                        <input
                                            type="checkbox"
                                            value="okp"
                                            onChange={(event) => { chooseCategory(event); }}
                                        />
                                        <div className="main-banner__type-content">
                                            <Image
                                                alt="type-2"
                                                src={Type2}
                                                width="40"
                                                height="40"
                                            />
                                            {t('mainIntro.button.okp')}
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <label className="main-banner__type" type="button">
                                        <input
                                            type="checkbox"
                                            value="tn"
                                            onChange={(event) => { chooseCategory(event);  }}

                                        />
                                        <div className="main-banner__type-content">
                                            <Image
                                                alt="type-3"
                                                src={Type3}
                                                width="40"
                                                height="40"
                                            />
                                            {t('mainIntro.button.tnved')}
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <button
                                        className="btn main-banner__type"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            openIntroModal()
                                        }}
                                    >
                                        <div className="main-banner__type-content">
                                            <Image
                                                alt="type-4"
                                                src={Type4}
                                                width="40"
                                                height="40"
                                            />
                                            {t('mainIntro.button.form')}
                                        </div>
                                    </button>
                                </li>
                            </ul>


                            {nothingFounded && <div className="main-banner__no-results" >
                                <h3 className="no-results__title">
                                    {t('mainIntro.unknown.title')}
                                </h3>
                                <p className="no-results__text">
                                    {t('mainIntro.unknown.text')}
                                </p>
                                <p className="no-results__text">
                                    {t('mainIntro.unknown.subtext')}
                                </p>

                                <div className="no-results__controls">
                                    <button
                                        type="button"

                                        onClick={(e) => {
                                            e.preventDefault()
                                            openIntroModal()
                                        }}
                                        className="btn btn--primary"
                                    >
                                        {t('mainIntro.unknown.btn')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            resetCategory()
                                        }}
                                        className="btn btn--hollow"
                                    >
                                        {t('mainIntro.unknown.cancel')}
                                    </button>
                                </div>
                            </div >}

                        </div >
                    </div >
                </div >
            </section >
        </>
    );
};

export default AppMainIntro;