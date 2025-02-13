<template>
    <div>
        <main class="article">
            <div class="wrapper">
                <AppBreadcrumbs :root="'/'"
                    :breadcrumbs='[{ full_slug: "about", id: 2, seo_h1: "О компании", title: "О компании" }]' />

                <div class="article__wrapper">
                    <!-- <transition name="fade" appear> -->
                    <button @click.prevent="toogleMobileSidebar"
                        class="cat-menu__btn js-cat-menu-btn btn btn--l btn--primary" type="button">
                        <span class="btn-text">Категории</span>
                    </button>
                    <div class="cat-menu js-cat-menu">
                        <AppSidebar :navigation="navigation" :mobileOpened="sidebarOpened" />
                    </div>
                    <!-- </transition> -->

                    <div class="mtp">
                        <div class="about">
                            <h1 class="about__title">О компании</h1>

                            <div class="about__text">
                                <h3 class="about__text-title">«Центр стандартизации»</h3>
                                <p>Более чем 12 лет мы занимается предоставлением услуг в сфере сертификации. За длительный
                                    период
                                    деятельность NVSERT по достоинству оценили тысячи промышленных предприятий Российской
                                    Федерации, Евразийского Экономического Союза и зарубежных стран, выбрав нас надежным
                                    партнером и заключив
                                    долгосрочные партнерские соглашения о сотрудничестве.</p>
                                <p>Мы предоставляем обширный спектр услуг, направленный на оформление и создание различного рода
                                    документов:
                                    обязательной и добровольной сертификации, декларирования, оформление соответствия требований
                                    технических
                                    регламентов и других видов услуг в сфере оформления разрешительных документов. Помимо этого,
                                    наша компания
                                    занимается предоставлением профессиональных консультаций по индивидуальному созданию и
                                    оформлению пакетов
                                    разрешительной документации. </p>
                                <p>Благодаря высокоразвитой базе нашего центра, состоящей из аккредитованных органов
                                    сертификации, ведущих
                                    испытательных лабораторий  и штата квалифицированных экспертов, мы имеем возможность
                                    проводить сертификацию
                                    абсолютно любых видов продукции. Мы ценим время и требовательность наших клиентов, поэтому
                                    каждая работа
                                    будет проделана в сжатые сроки с соблюдением качества и пожеланий наших клиентов. Для
                                    постоянных клиентов
                                    создана гибкая схема оплаты за предоставляемые услуги. </p>
                                <p>Кроме того, доставка пакета документов по всей территории РФ осуществляется за счет нашей
                                    организации.</p>
                            </div>

                            <div class="about__adv">
                                <div class="about__adv-item">
                                    <img src="~/assets/images/svg/adv-1.svg" width="80" height="80" />
                                    <span class="about__adv-desc">12 лет работы</span>
                                </div>
                                <div class="about__adv-item">
                                    <img src="~/assets/images/svg/adv-2.svg" width="80" height="80" />
                                    <span class="about__adv-desc">Представлены во всех регионах ТС ЕАЭС</span>
                                </div>
                                <div class="about__adv-item">
                                    <img src="~/assets/images/svg/adv-3.svg" width="80" height="80" />
                                    <span class="about__adv-desc">Собственные лаборатории</span>
                                </div>
                                <div class="about__adv-item">
                                    <img src="~/assets/images/svg/adv-4.svg" width="80" height="80" />
                                    <span class="about__adv-desc">Более 100000 сделанных документов</span>
                                </div>
                                <div class="about__adv-item">
                                    <img src="~/assets/images/svg/adv-5.svg" width="80" height="80" />
                                    <span class="about__adv-desc">75 сотрудников</span>
                                </div>
                                <div class="about__adv-item">
                                    <img src="~/assets/images/svg/adv-6.svg" width="80" height="80" />
                                    <span class="about__adv-desc">Возможна постоплата или рассрочка</span>
                                </div>
                            </div>

                            <h3 class="about__subtitle">Реквизиты </h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th colspan="2">ООО «Центр стандартизации»</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Директор</th>
                                        <td>Владимиров Владимир Михайлович (действует на основании Устава)</td>
                                    </tr>
                                    <tr>
                                        <th>Юридический адрес</th>
                                        <td>180007, Россия, Псковская обл., город Псков г.о., Псков г., Рижский пр-кт, д. 16, помещение 1001, кабинет 9</td>
                                    </tr>
                                    <tr>
                                        <th>Почтовый адрес</th>
                                        <td>180007, г. Псков, а/я 933</td>
                                    </tr>
                                    <tr>
                                        <th>ИНН</th>
                                        <td> 6027189146</td>
                                    </tr>
                                    <tr>
                                        <th>КПП</th>
                                        <td>602701001</td>
                                    </tr>
                                    <tr>
                                        <th>E-mail</th>
                                        <td>info@nvsert.ru</td>
                                    </tr>
                                    <tr>
                                        <th>Коды по ОКВЭД</th>
                                        <td>71.20;
                                            41.10 ; 42.21; 42.22; 46.12; 46.13; 46.14; 46.15; 46.18; 46.19; 46.46; 46.61; 46.62;
                                            46.63;
                                            46.64; 46.66; 46.69; 46.72; 46.73; 46.75; 58.29; 61.10; 61.20; 80.20;
                                            58.11 ; 59.11 ; 64.92 ; 68.10 ; 68.10.1 ; 68.20 ; 68.32 ; 70.22 ; 73.11 ; 73.20 ;
                                            96.09 ;
                                        </td>
                                    </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th colspan="2">Банковские реквизиты Альфа-Банк</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>р/с</th>
                                        <td>40702810232380003475</td>
                                    </tr>
                                    <tr>
                                        <th>кор.сч.</th>
                                        <td>30101810600000000786</td>
                                    </tr>
                                    <tr>
                                        <th>Банк</th>
                                        <td>Филиал «САНКТ-ПЕТЕРБУРГСКИЙ» АО «АЛЬФА-БАНК»</td>
                                    </tr>
                                    <tr>
                                        <th>Бик</th>
                                        <td>044030786</td>
                                    </tr>
                                    <tr>
                                        <th>ОГРН</th>
                                        <td>1186027004217</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="form">
                                <div class="form__img">
                                    <img class="logo" src="~/assets/images/robot-4.gif" alt="logo" width="416" height="546">
                                </div>
                                <div class="form__wrapper">
                                    <h2 class="form-title">Остались вопросы?</h2>
                                    <p class="form-subtitle">Оставь свои контактные данные, мы подготовимся и на все ответим</p>
                                    <AppDefaultForm :btnText="$t('form.help.btn')" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
  
<script>
import head from '@/mixins/head.js';

import AppArticle from '@/components/pages/AppArticle.vue';

import articleMobileSidebar from '@/mixins/articleMobileSidebar.js';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs.vue';
import AppSidebar from '@/components/general/AppSidebar.vue';
import AppDefaultForm from "@/components/forms/AppDefaultForm";

export default {
    name: 'AppPage',
    watch: {
        '$route.query': function (newQuery, oldQuery) {
            if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
                // console.log("Query changed");
                this.$fetch();
            }
        },
    },
    mixins: [articleMobileSidebar, head],

    computed: {
        SEO() {
            return {
                title: 'О компании - NVSERT - Сертификация продукции и оборудования',
                og_description: 'сертификация, сертификаты, декларации, техническая документация, технические условия, свидетельства, регистрация, ИСО, экспертное заключение, СЕ',
                // og_image: article.og_image,
                // og_title: article.og_title,
                seo_description: 'В Российской Федерации, странах Евразийского Экономического Союза, странах Евросоюза и в любой другой стране,наличие документов, подтверждающих качество продукции, является неотъемлемым условием веден',
                seo_h1: 'О компании - NVSERT - Сертификация продукции и оборудования',
                seo_keywords: 'сертификация, сертификаты, декларации, техническая документация, технические условия, свидетельства, регистрация, ИСО, экспертное заключение, СЕ',
                seo_title: 'О компании - NVSERT - Сертификация продукции и оборудования',
            }
        },

        navigation() {
            return this.$store.getters['navigation/getterNavigation'];
        },
    },

    async fetch() {

        this.$store.dispatch('pages/resetActionPages');

        if (this.$store.getters['navigation/getterNavigation'].length === 0) {
            await this.$store.dispatch('navigation/updateActionNavigation', [
                this.navigationOrdering,
            ]);
        }

    },

    components: {
        AppArticle,
        AppBreadcrumbs,
        AppSidebar,
        AppDefaultForm,
    },
};
</script>
    
<style lang="scss">


@import '~/assets/styles/about.scss';
</style>
  