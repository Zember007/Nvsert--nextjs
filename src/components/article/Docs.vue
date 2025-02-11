<template>
    <div class="mtp__document">
        <div class="mtp__document-header">
            <h3>Документы для скачивания</h3>
            <a v-for="doc in docs" :key="JSON.stringify(doc)" 
                :href="doc.file" 
                download
                class="mtp__document-item">
                <div class="mtp__document-content">
                    <i class="icon icon--download"></i>
                    <div class="name">{{ doc.title }}</div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppArticleDocs',
        props: {
            docs: {
                type: Array,
                default: () => [],
            }
        }
    }
</script>