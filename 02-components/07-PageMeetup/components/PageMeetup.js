import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js'
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  props: {
    meetupId : {
      require: true,
      type: Number
    }    
  },

  data(){
    return{
      meetupContent: null,
      fetchStatus: 'loading'
    }
  },
  watch: {
    meetupId: {
      immediate: true,
      handler(){
        this.fetchStatus = 'loading';
        fetchMeetupById(this.meetupId)
        .then(data => {
          this.meetupContent = data;
          this.fetchStatus = "success";
          })
        .catch(error => {
          this.fetchStatus = error.message;
        })
      }
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="fetchStatus === 'success'" :meetup="meetupContent" />
      <UiContainer v-else-if="fetchStatus === 'loading'">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else >
        <UiAlert>{{ fetchStatus }}</UiAlert>
      </UiContainer>
    </div>`,
});
