import Vue from 'vue';
import { store } from 'ui/store';
import App from 'ui/App.vue';
import Settings from 'ui/settings/Settings.vue';
import Field from 'ui/fields/Field.vue';
import Gradient from 'ui/fields/Gradient.vue';

if(module.hot) {
	module.hot.accept();
}


Vue.component('geometrize-settings', Settings);
Vue.component('geometrize-field', Field);
Vue.component('geometrize-field-gradient', Gradient);

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});