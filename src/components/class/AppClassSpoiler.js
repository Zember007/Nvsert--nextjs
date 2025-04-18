import axios from "axios";
import { useState } from "react";

const AppClassSpoiler = ({ spoiler, slug }) => {

    const [childs, setChilds] = useState([]);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const spoilerName = spoiler.code ? spoiler.code + ': ' + spoiler.name : spoiler.name;



    async function getChilds(evt) {
        if (spoiler.id && !spoiler.is_leaf_node) {
            if (slug !== 'okp/' && slug !== 'tnved/') return false;

            setLoading(true)

            let url = ''
            if (slug === 'tnved/') {
                url = 'tn'
            } else {
                url = 'okp'
            }
            try {
                const response = await axios.get('/api/' + url, {
                    params: {
                        parent_id: spoiler.id,
                    },
                })

                if (response.data && response.data.content && response.data.content.length > 0) {
                    setChilds(response.data.content)
                    setContentLoaded(true)
                    setLoading(false)
                    setTimeout(() => {
                        toggleOpen(evt);
                    }, 100)

                }

            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                    return [];
                }
            }
        }
    }

    function classBtnHandler(evt) {
        if (spoiler.is_leaf_node) return;
        try {
            if (contentLoaded) {
                toggleOpen(evt);

            } else {
                getChilds(evt)
            }
        } catch (error) {
            if (error instanceof Error) console.error(error);
        }
    }

    function toggleOpen(evt) {
        evt.preventDefault();

        let target = evt.target.closest('.js-spoiler-button');

        const spoiler = target.closest('.js-spoiler-item');
        const spoilerContent = spoiler.querySelector('.js-spoiler-content');
        let parentContent = spoilerContent
            .closest('.js-spoiler-item')
            .closest('.js-spoiler-content');

        if (!spoiler.classList.contains('active')) {
            spoiler.classList.add('active');
            spoilerContent.style.height = 'auto';

            let height = spoilerContent.clientHeight + 'px';
            spoilerContent.style.height = '0px';

            spoilerContent.addEventListener(
                'transitionend',
                function () {
                    spoilerContent.style.height = 'auto';
                },
                {
                    once: true,
                }
            );

            setTimeout(function () {
                spoilerContent.style.height = height;
            }, 0);
        } else {
            spoilerContent.style.height = spoilerContent.clientHeight + 'px';

            spoilerContent.addEventListener(
                'transitionend',
                function () {
                    spoiler.classList.remove('active');
                },
                {
                    once: true,
                }
            );

            setTimeout(function () {
                spoilerContent.style.height = '0px';
            }, 0);
        }
    }
    return (
        <div
            className={`mtp__spoiler-item js-spoiler-item ${spoiler.is_leaf_node && 'empty'} ${loading && 'loading'}`}>
            <div className="mtp__spoiler-item-header">
                <button
                    className="mtp__spoiler-button js-spoiler-button"
                    onClick={(event) => { classBtnHandler(event) }}
                >
                    {spoilerName}
                </button>
            </div >
            <div className="mtp__spoiler-item-content js-spoiler-content">

                {childs && childs.length > 0 &&
                    <div className="mtp__spoiler-text">
                        {childs.map((spoiler, i) => <AppClassSpoiler
                            key={i}
                            spoiler={spoiler}
                            slug={slug}
                        />)}
                    </div>
                }

            </div>
        </div >
    );
};

export default AppClassSpoiler;