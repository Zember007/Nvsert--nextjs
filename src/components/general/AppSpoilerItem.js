
const AppSpoilerItem = ({title, preopened, children}) => {

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
        <div className={`mtp__spoiler-item js-spoiler-item ${preopened && 'active'}`}>
            <div className="mtp__spoiler-item-header">
                <button
                    className="mtp__spoiler-button js-spoiler-button"
                    onClick={(e) => {
                        toggleOpen(e)
                    }}
                >
                    {title}
                </button>
            </div>
            <div
                className="mtp__spoiler-item-content js-spoiler-content"
                style={{ height: preopened && 'auto' }}
            >
                <div className="mtp__spoiler-text">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AppSpoilerItem;