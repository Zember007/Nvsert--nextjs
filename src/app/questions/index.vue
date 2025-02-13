<template>
    <div>
        <main class="questions wrapper">
            <div class="questions-success" v-if="pollDone">
                <div class="questions-success__text">
                    <h3 class="questions-success__title">Мы приняли ваш отзыв</h3>
                    <p class="questions-success__description">Мы обработаем его и возможно свяжемся с вами для уточнения деталей</p>
                    <nuxt-link :to="localePath({path: '/'})" class="btn btn--primary btn--l question-success__to-main">На главную</nuxt-link>
                </div>
                <div class="questions-success__img">
                    <img src="~assets/images/question-success.svg" alt="question-success">
                </div>
            </div>
            <div class="questions__wrapper" v-else>
                <div class="questions__stages">
                    <h3 class="questions__title">Ответьте пожалуйста <br>
                        на 5 вопросов:</h3>
                    <p class="questions__subtitle">Мы будем очень благодарны <br> вам за отзыв!</p>
                    <div class="questions__list">
                        <div class="stage" :class="{
                                'in-progress': question.stage === 'inProgress',
                                'done': question.stage === 'done',
                            }" v-for="(question, questionIndex) in questions" :key="question.id">
                            <div class="stage__icon">
                                <i class="icon icon--dots"></i>
                                <i class="icon icon--done"></i>
                            </div>
                            <div class="stage__name"><span>{{ question.navText }}</span><span>{{ questionIndex }}</span></div>
                        </div>
                    </div>
                </div>
                <div class="questions__form">
                    <p class="form-text">{{ questions[currentQuestion].text }}</p>
                    <form @submit="sendQuestion">

                        <div class="rating-area">
                            <input @change="ratingError = false" type="radio" id="star-10" name="rating" value="10">
                            <label class="field" for="star-10" title="Оценка «10»"></label>
                            <input @change="ratingError = false" type="radio" id="star-9" name="rating" value="9">
                            <label class="field" for="star-9" title="Оценка «9»"></label>
                            <input @change="ratingError = false" type="radio" id="star-8" name="rating" value="8">
                            <label class="field" for="star-8" title="Оценка «8»"></label>
                            <input @change="ratingError = false" type="radio" id="star-7" name="rating" value="7">
                            <label class="field" for="star-7" title="Оценка «7»"></label>
                            <input @change="ratingError = false" type="radio" id="star-6" name="rating" value="6">
                            <label class="field" for="star-6" title="Оценка «6»"></label>
                            <input @change="ratingError = false" type="radio" id="star-5" name="rating" value="5">
                            <label class="field" for="star-5" title="Оценка «5»"></label>
                            <input @change="ratingError = false" type="radio" id="star-4" name="rating" value="4">
                            <label class="field" for="star-4" title="Оценка «4»"></label>
                            <input @change="ratingError = false" type="radio" id="star-3" name="rating" value="3">
                            <label class="field" for="star-3" title="Оценка «3»"></label>
                            <input @change="ratingError = false" type="radio" id="star-2" name="rating" value="2">
                            <label class="field" for="star-2" title="Оценка «2»"></label>
                            <input @change="ratingError = false" type="radio" id="star-1" name="rating" value="1">
                            <label class="field" for="star-1" title="Оценка «1»"></label>

                        </div>

                        <div class="field">
                            <ul class="error-list" v-show="ratingError">
                                <li class="error-item">
                                    Это поле обязательно
                                </li>
                            </ul>
                        </div>

                        <label class="field">
                            <textarea class="field__input" placeholder="Описать подробнее" name="message"></textarea>
                        </label>

                        <div class="form-bottom">
                            <button class="btn btn--primary btn--l" 
                                v-if="currentQuestion === 3"
                                @click="skipStep" 
                                type="button">
                                Пропустить
                            </button>
                            <button class="btn btn--primary btn--l" type="submit">Далее</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentQuestion: 0,
                pollDone: false,
                ratingError: false,
                questions: [
                    {
                        text: 'Какова вероятность, что Вы порекомендуете нашу компанию Вашим друзьям и деловым партнерам?',
                        navText: 'Первый вопрос',
                        stage: 'inProgress',
                        skipAble: false,
                        id: 2,
                    },
                    {
                        text: 'Как Вы оцениваете профессионализм сотрудника нашей организации?',
                        navText: 'Второй вопрос',
                        stage: '',
                        skipAble: false,
                        id: 4,
                    },
                    {
                        text: 'Насколько оперативно мы решили Ваши задачи по оформлению документации?',
                        navText: 'Третий вопрос',
                        stage: '',
                        skipAble: false,
                        id: 6,
                    },
                    {
                        text: 'Оцените, пожалуйста, работу бухгалтерии, если Вы с ней работали',
                        navText: 'Четвертый вопрос',
                        stage: '',
                        skipAble: true,
                        id: 7,
                    },
                    {
                        text: 'Планируете работать с нами в дальнейшем?',
                        navText: 'Пятый вопрос',
                        stage: '',
                        skipAble: false,
                        id: 8,
                    },
                ],
            }
        },
        computed: {
            sessionId() {
                return this.$store.getters['session/getterSessionId'];
            }
        },
        methods: {
            skipStep(e) {
                let vm = this;
                e.target.closest('form').reset();
                vm.questions[vm.currentQuestion].stage = 'done';
                vm.currentQuestion++;
                vm.questions[vm.currentQuestion].stage = 'inProgress';
                window.scrollTo(0,0);
            },
            async sendQuestion(e) {

                e.preventDefault();
                
                let vm = this;
                let form = e.target;
                let formData = new FormData(form);

                if(formData.get('rating') === null) {
                    vm.ratingError = true;
                    window.scrollTo(0,0);
                    return;
                }
                
                await this.$axios.$post(`/api/polls/${vm.questions[vm.currentQuestion].id}?session_key=${vm.sessionId}`, formData)
                .then((response) => {
                    vm.questions[vm.currentQuestion].stage = 'done';
                    if(vm.currentQuestion === 4) {
                        vm.pollDone = true;
                        window.scrollTo(0,0);
                        return;
                    }
                    vm.currentQuestion++;
                    vm.questions[vm.currentQuestion].stage = 'inProgress';
                    form.reset();
                    window.scrollTo(0,0);
                    vm.ratingError = false;
                });

            }
        }
    }
</script>

<style lang="scss">
    @import '~assets/styles/questions.scss';
</style>