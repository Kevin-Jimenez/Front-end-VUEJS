import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import 'primevue/resources/themes/nova/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('Panel',Panel);
app.component('Menubar',Menubar);
app.component('Dialog',Dialog);
app.component('InputText',InputText);
app.component('Button',Button);
app.mount("#app");







