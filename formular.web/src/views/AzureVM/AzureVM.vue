<template>
  <div class="vm-list">
    <v-client-table :data="tableData" :columns="columns" :options="options">
      <div slot="vmDetailButton" slot-scope="props">
          <Button @click="onClickDetailButton(props.row.vmDetailButton)">{{props.row.vmDetailButton}}</Button>
      </div>
        <!-- <Button @click="modal2 = true" div slot="detroyButton" slot-scope="props" v-model="props.row.destoryButton">Destroy</Button> -->
    </v-client-table>
    <Modal v-model="isShowDetailModal" title="Standard" 
          @on-ok="DetailModalOk" @on-cancel="DetailModalCancel" 
          ok-text="Ok" cancel-text="Cancel">
        <p>{{vmDetailInfo}}</p>
    </Modal>
  </div>
</template>

<script lang="ts">
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
      isShowDetailModal: false,
      vmDetailInfo: {},
      columns: ["createAt", "terraformWorkspace", "resourceGroupName", "jobTrigger","vmDetailButton", "detroyButton"],
      tableData: [],
      options: {
      }
    }
  },
  async mounted() {
    await axios.get('/api/azure/vm/table/get')
               .then((res) => { this.tableData = res.data })
               .catch((error) => { this.$Message.error(error) })
               .finally(() => { /* 不論失敗成功皆會執行 */ });
    console.log(this.tableData);
    // await axios.get('/api/azure/vm/table/getall')
    //            .then((res) => { this.tableData = res.data })
    //            .catch((error) => { console.error(error) })
    //            .finally();
  },
  methods: {
    onClickDetailButton(detailName: string){
      this.isShowDetailModal = true;
      this.vmDetailInfo = {"Detail":detailName}
      this.$Message.info(`Clicked button, vmDetailInfo: ${JSON.stringify(this.vmDetailInfo)}`);
    },
    DetailModalOk() {
      this.vmDetailInfo = {}
      this.$Message.info(`Clicked ok, vmDetailInfo: ${JSON.stringify(this.vmDetailInfo)}`);
    },
    DetailModalCancel () {
      this.vmDetailInfo = {}
      this.$Message.info(`Clicked cancel, vmDetailInfo: ${JSON.stringify(this.vmDetailInfo)}`);
    }
  }
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

