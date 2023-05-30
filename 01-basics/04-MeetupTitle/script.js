import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';


createApp({
  data(){
    return{
      title: 'MEETUP_TITLE',
      radioIDs: [1,2,3,4,5],
      activeRadio: ''
    }
  },
  watch: {
    activeRadio(){
      let responce = this.fetchMeetupById(this.activeRadio)
      this.title = responce.title;
    }
  },
  methods: {
    fetchMeetupById(meetupId) {
      return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      }).then(data=>{ this.title = data.title; });
    }
  },
  template: `
  <div>
    <label v-for="item in radioIDs"><input type="radio" :id="item" name="meetupId" :value="item" v-model="activeRadio"/> {{item}}</label>
    <hr />

    <h3>{{title}}</h3>
  </div>
  `
}).mount('#app')
