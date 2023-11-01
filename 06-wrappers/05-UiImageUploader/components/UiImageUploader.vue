<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{'image-uploader__preview-loading' : loadingClass}" :style="hasPreview">
      <span class="image-uploader__text">{{ textValue }}</span>
      <input @click="removeImage" @change="gettingFile" v-bind="$attrs" type="file" accept="image/*" class="image-uploader__input" />
    </label>
  </div>
</template>

<script>

const placeholderImage = '/link.jpeg';

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: URL,
    uploader: Function
  },
  emits: ['select', 'upload', 'error', 'remove'],
  data(){
    return{
     imageLink: null,
     status: 'download'
    }
  },
  methods: {
    gettingFile(event){
      const prevImage = this.imageLink;
      const image = event.target.files[0]
      this.imageLink = URL.createObjectURL(image);
      this.$emit('select', image)

      if(this.uploader){
        this.uploadFile(image, prevImage)
      } else {
        this.defaultStatus;
      } 
      event.target.value = null
    },

    uploadFile(file, prevImage){
      this.status = "loading";

      this.uploader(file)
      .then((result) => this.$emit("upload", result),
      (error) => {
        this.$emit('error', error);
        this.imageLink = prevImage;
      }
      )
      .finally(this.defaultStatus)
    },

    defaultStatus(){
      if(this.imageLink === placeholderImage){
        console.log('this.imageLink', this.imageLink)
        console.log('placeholderImage', placeholderImage)
        this.status = "download"
      } else {
        this.status = "remove"
      }
    },

    removeImage($event){
      if( this.status === "loading") {
        $event.preventDefault();
      } else {
        this.imageLink = placeholderImage;
        this.defaultStatus();
        this.$emit('remove')
      }
    }
  },
  computed: {
    hasPreview(){
      return this.imageLink ? `--bg-url: url('${this.imageLink}')` : `--bg-url: url('/link.jpeg')`
    },

    textValue(){
      if(this.imageLink == placeholderImage) {
        return 'Загрузить изображение'
      } else if(this.status === "loading"){
        return "Загрузка..."
      } else if(this.imageLink != placeholderImage){
        return "Удалить изображение"
      } else {
        return "Удалить изображение"
      }
    },
    loadingClass(){
      return this.status === "loading";
    }
  },

  created(){
    this.imageLink = this.preview ? this.preview : placeholderImage;
    this.defaultStatus();
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
