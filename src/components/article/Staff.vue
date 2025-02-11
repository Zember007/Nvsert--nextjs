<template>
    <div class="specialists" v-if="staff && staff.length > 0">
        <div class="search-form js-search-form">
            <label class="search-form__label">
                <input type="text" 
                class="search-form__input js-search-form__input" 
                placeholder="Введите имя сотрудника"
                v-model="query"
                @input="filterStaff()" @change="filterStaff()">
            </label>
            <div class="search-form__controls">
                <button type="reset" class="btn search-form__btn search-form__btn--reset js-search-form__btn--reset"
                        @click="resetSearch()"
                        title="Сбросить">
                    <i class="icon icon--close"></i>
                </button>
            </div>
        </div>
        <ul class="specialists__list" v-if="!$fetchState.pending">
            <li class="specialists__list-item" v-for="person in filteredStaff">
                {{ person.name }}
            </li>
            <li class="specialists__list-item" v-show="filteredStaff.length === 0">{{ $t('staff.noResults') }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'StaffList',
        data() {
            return {
                query: '',
                filteredStaff: [],
                loaded: false,
            }
        },
        computed: {
            staff() {
                return this.$store.getters['staff/getterStaff'];
            }
        },
        methods: {
            filterStaff() {
                let vm = this;
                if(vm.query === '') {
                    vm.filteredStaff = vm.staff;
                    return;
                }
                vm.filteredStaff = vm.staff.filter(person => person.name.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1);
            },
            resetSearch() {
                let vm = this;
                vm.query = '';
                vm.filterStaff();
            }
        },
        async fetch() {
            await this.$store.dispatch('staff/updateStaff');
            this.filterStaff();
        }
    }
</script>