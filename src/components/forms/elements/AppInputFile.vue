<template>
  <div class="cost-calc__file js-cost-calc__file">
    <label class="field" v-show="files.length === 0">
      <input
        type="file"
        :name="inputName"
        @change="fileInputHandler($event)"
        class="js-input-file"
        hidden multiple
      />
      <span class="cost-calc__file-btn"
        ><i class="icon icon--clip"></i
        >{{ $t('calculation.form.placeholder.file_doc') }}</span
      >
      <span class="cost-calc__file-desc">{{
        $t('calculation.form.placeholder.file')
      }}</span>
    </label>
    <div v-show="files.length > 0" class="files-preview">
      
      <div class="files-preview__item" v-for="(file) in files" :key="JSON.stringify(file)">

        <div class="top">
          <i class="icon icon--file"></i>
          {{ file.name }}
        
        </div>
        <div class="info">{{ formatBytes(file.size) }}</div>

      </div>

      <button type="button" v-show="files.length > 0" class="files-preview__reset" @click="resetInputFile($event)">Удалить все</button>

    </div>
    <span class="discount" v-if="discount > 0">+{{ discount }}%</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputFiled: false,
      files: [],
    };
  },

  methods: {
    fileInputHandler(event) {
      let vm = this;

      let input = event.target;

      if (input.files.length === 0) {
        vm.files = [];
        return;
      }

      for(let i = 0; i < input.files.length; i++) {
        vm.files.push({
          name: input.files[i].name,
          size: input.files[i].size,
        });
      }

    },
    formatBytes(bytes, decimals = 2) {
      if (!+bytes) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    },
    resetInputFile(event) {
      let fileInput = event.target.closest('.js-cost-calc__file').querySelector('.js-input-file');
      if(!fileInput) {
        return;
      }
      
      fileInput.value = "";

      let customEvent = new Event('change', {
        bubbles: true,
      });

      fileInput.dispatchEvent(customEvent);
    }
  },

  props: {
    inputName: {
      type: String,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
