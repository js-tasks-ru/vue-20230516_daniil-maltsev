import { createApp } from './vendor/vue.esm-browser.js';

// From https://jsonplaceholder.typicode.com/comments
const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

// Требуется создать Vue приложение
createApp({
  data(){
    return{
      emails: [...emails],
      search: ''
    }
  },
  computed: {
    sortedEmails(){
      return emails.reduce((acc, current) => {
        return acc.concat([[current, this.search.length > 0 && current.toLowerCase().includes(this.search.toLowerCase())]])
      }, [])
    }
  },
  template: `
  <div class="container">
    <div class="form-group">
      <input type="search" v-model="this.search" />
    </div>
    <ul>
      <li v-for="email in sortedEmails" :class="{marked: email[1]}">{{email[0]}}</li>
    </ul>
  </div>
  `
}).mount('#app')