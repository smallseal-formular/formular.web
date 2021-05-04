<template>
  <div class="vm-list">
    <v-client-table :ref="myTable" :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
import Vue from 'vue';
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import axios from '@/modules/axios.factory'
import VueAxios from 'vue-axios'

Vue.use(ClientTable); //Client table
Vue.use(ServerTable); //Server table
Vue.use(VueAxios, axios)

export default Vue.extend({
  name: 'AzureVM',
  components: {

  },
  data() {
    return {
      columns: [],
      tableData: [],
      options: {}
    }
  },
  async mounted() {
    await axios.get('/api/azure/vm/table/getcolumn')
               .then((res) => { this.columns = res.data })
               .catch((error) => { console.error(error) })
               .finally(() => { /* 不論失敗成功皆會執行 */ });
    await axios.get('/api/azure/vm/table/getall')
               .then((res) => { this.tableData = res.data })
               .catch((error) => { console.error(error) })
               .finally();
    console.log(this.columns);
  },
})

</script>

<style lang="less">

.VueTables__child-row-toggler {
  width:16px;
  height:16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
   content: "+";
}

.VueTables__child-row-toggler--open::before  {
    content: "-";
}

</style>

