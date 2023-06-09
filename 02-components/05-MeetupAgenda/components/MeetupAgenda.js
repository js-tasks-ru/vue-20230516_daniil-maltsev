import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js'; 

export default defineComponent({
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem
  },
  props: {
    agenda: {
      require: true,
      type: Object
    }
  },
  template: `
    <ul class="agenda">
      <li v-for="item in agenda" class="agenda__item">
      <MeetupAgendaItem :agenda-item="item"/>
      </li>
    </ul>`,
});
