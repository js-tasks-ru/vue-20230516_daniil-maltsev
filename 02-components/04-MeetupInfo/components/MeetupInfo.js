import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  props: {
    organizer: {
      type: Text,
      required: true
    },
    place: {
      type: Text,
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  },
  computed: {
    localDateISO() {
      return new Date(this.date).toISOString().substring(0, 10)
    },
    localDate(){
      return new Date(this.date).toLocaleDateString(navigator.language, {year: 'numeric',
      month: 'long',
      day: 'numeric'})
    }
  },
  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="localDateISO">{{ localDate }}</time>
      </li>
    </ul>`,
});
