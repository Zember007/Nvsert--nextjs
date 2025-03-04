import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateActionStaff } from '@/store/staff';
import { AppDispatch } from '@/config/store';

interface StaffMember {
    name: string;
}

interface State {
    staff: {
        staff: StaffMember[];
    };
}

const Staff: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { staff } = useSelector((state: State) => state.staff);

    const { t } = useTranslation();

    const [query, setQuery] = useState('');
    const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>([]);

    function filterStaff() {
        if (query === '') {
            setFilteredStaff(staff);
            return;
        }
        setFilteredStaff(staff.filter(person => person.name.toLowerCase().indexOf(query.toLowerCase()) !== -1));
    }

    function resetSearch() {
        setQuery('');
        filterStaff();
    }

    const init = async () => {
        dispatch(updateActionStaff());
        filterStaff();
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <>
            {staff && staff.length > 0 &&
                <div className="specialists">
                    <div className="search-form js-search-form">
                        <label className="search-form__label">
                            <input type="text"
                                className="search-form__input js-search-form__input"
                                placeholder="Введите имя сотрудника"
                                value={query}
                                onInput={(e) => {
                                    setQuery(e.currentTarget.value);
                                    filterStaff();
                                }} />
                        </label>
                        <div className="search-form__controls">
                            <button type="reset" className="btn search-form__btn search-form__btn--reset js-search-form__btn--reset"
                                onClick={() => resetSearch()}
                                title="Сбросить">
                                <i className="icon icon--close"></i>
                            </button>
                        </div>
                    </div>
                    <ul className="specialists__list">
                        {filteredStaff.map((person, index) => <li key={index} className="specialists__list-item">
                            {person.name}
                        </li>)}
                        <li className="specialists__list-item"
                            style={{ display: (filteredStaff.length !== 0) ? 'none' : 'block' }}>
                            {t('staff.noResults')}
                        </li>
                    </ul>
                </div>
            }
        </>
    );
};

export default Staff;