import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
    data(){
        return{
            leftNum: 0,
            rightNum: 0,
            operator: ''
        }
    },

    computed: {
        computedValue() {
            if(this.operator === "sum") {
                return this.leftNum + this.rightNum
            } else if(this.operator === "subtract"){
                return this.leftNum - this.rightNum
            }
            else if(this.operator === "multiply"){
                return this.leftNum * this.rightNum
            }
            else if(this.operator === "divide"){
                return this.leftNum / this.rightNum
            }
            else {
                return 0
            }       
        }
    }
})

app.mount('#app');
