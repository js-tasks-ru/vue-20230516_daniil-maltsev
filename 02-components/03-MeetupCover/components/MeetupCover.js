import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',
  props: {
    title: {
      type: Text
    },
    image: {
      type: URL
    }
  },
  computed: {
    coverImage(){
      return `url(${this.image})`
    }
  },
  template: `
    <div class="meetup-cover" :style="image && '--bg-url:url(' + image + ')'">
        <h1 class="meetup-cover__title">{{ title }} {{ image }}</h1>
    </div>`,
});
