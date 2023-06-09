import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js'; 

export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      require: true,
      type: Object
    }
  },
  computed: {
        icon(){
          return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`
        },

        isTalk(){
          return this.agendaItem.type === 'talk'
        },

        title(){
          return this.agendaItem.title || agendaItemDefaultTitles[this.agendaItem.type]
        }
      },
  template: `
    <div class="agenda-item" :key='agendaItem.id'>
      <div class="agenda-item__col">
        <img :src="icon" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p class="agenda-item__talk" v-if="isTalk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
