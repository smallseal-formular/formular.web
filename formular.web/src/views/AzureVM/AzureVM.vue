<template>
  <div class="vm-list">
    <v-client-table :data="tableData" :columns="columns" :options="options">
      <div slot="vmDetailButton" slot-scope="props">
          <Button @click.stop="onClickDetailButton(props.row.resourceGroupName)"></Button>
      </div>
      <div slot="detroyButton" slot-scope="props">
          <Button @click.stop="onClickDestroyButton(props.row.terraformWorkspace)"></Button>
      </div>
    </v-client-table>
    <Modal v-model="isShowDetailModal" title="VmDetail">
        <Collapse>
          <Panel v-for="vm in vmDetailData"  :key='vm'>
            {{ vm.vmName }}
            <p slot="content">VM Size: {{ vm.vmSize }}</p>
            <p slot="content">Public IP: {{ vm.publicIp }}</p>
            <p slot="content">Private IP: {{ vm.privateIp }}</p>
          </Panel>
        </Collapse>
        <div slot="footer">
            <Button type="OK" size="large" @click="detailModalOk">OK</Button>
        </div>
        <!-- <li v-for="vm in vmDetailData"  :key='vm' >{{vm}}</li> -->
    </Modal>
    <Modal v-model="isShowDestroyModal" title="Destroy" 
          @on-ok="destroyModalOk" @on-cancel="destroyModalCancel" 
          ok-text="Ok" cancel-text="Cancel">
        <Form :model="destroyFrom">
          <FormItem label="TerraformWorkspace">
            <Input v-model="destroyFrom.terraformWorkspace" placeholder="The ENV_NAME to destroy this environment by jenkins"></Input>
          </FormItem>
          <FormItem label="JenkinServerName">
            <Input :disabled="true" v-model="destroyFrom.jenkinsServerName" placeholder="Which jenkins server you want to send the api"></Input>
          </FormItem>
          <FormItem label="JenkinsJobName">
            <Input :disabled="true" v-model="destroyFrom.jenkinsJobName" placeholder="Which jenkins job is used to destroy vm"></Input>
          </FormItem>
          <FormItem label="JenkinsJobBranch">
            <Input :disabled="true" v-model="destroyFrom.jenkinsJobBranch" placeholder="Which job branch is used to destroy vm"></Input>
          </FormItem>
        </Form>
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
      isShowDestroyModal: false,
      vmDetailInfo: {},
      columns: ["createAt", "terraformWorkspace", "resourceGroupName", "jobTrigger","vmDetailButton", "detroyButton"],
      tableData: [],
      options: {
      },
      vmDetailData: [],
      destroyFrom: {
        terraformWorkspace: "",
        jenkinsServerName: "eventhub",
        jenkinsJobName: "Azure.Machines",
        jenkinsJobBranch: "develop",
      },
      destroyResponse: {},
    }
  },
  async mounted() {
    await axios.get('/api/azure/vm/table/get')
               .then((res) => { this.tableData = res.data })
               .catch((error) => { this.$Message.error(error) })
               .finally(() => { /* 不論失敗成功皆會執行 */ });
    // console.log(this.tableData);
    // await axios.get('/api/azure/vm/table/getall')
    //            .then((res) => { this.tableData = res.data })
    //            .catch((error) => { console.error(error) })
    //            .finally();
  },
  methods: {
    onClickDetailButton(rgName: string){
      this.isShowDetailModal = true;
      this.getVmDetailByRgName(rgName)
      // this.$Message.info(`Clicked button, vmDetailData: ${JSON.stringify(this.vmDetailData)}`);
    },
    async getVmDetailByRgName(rgName: string){ 
      await axios.get(`/api/azure/vm/details/get/${rgName}`)
                 .then((res) => { this.vmDetailData = res.data })
                 .catch((error) => { this.$Message.error(error) })
                 .finally(() => { /* 不論失敗成功皆會執行 */ });
    },
    detailModalOk() {
      this.vmDetailData = []
      this.isShowDetailModal = false;
      // this.$Message.info(`Clicked ok, vmDetailInfo: ${JSON.stringify(this.vmDetailInfo)}`);
    },
    onClickDestroyButton(terraformWorkspace: string){
      this.isShowDestroyModal = true;
      this.destroyFrom.terraformWorkspace = terraformWorkspace
      // this.$Message.info(`Clicked button, destroyMedal: ${JSON.stringify(this.vmDetailInfo)}`);
    },
    destroyModalOk() {
      this.destroyVmByJenknisApi()
      this.destroyFrom.terraformWorkspace = ""
      this.isShowDestroyModal = false;
      // this.$Message.info(`Clicked ok, vmDetailInfo: ${JSON.stringify(this.destroyFrom)}`);
    },
    destroyModalCancel () {
      this.vmDetailInfo = {}
      this.destroyFrom.terraformWorkspace = ""
      this.isShowDestroyModal = false;
      // this.$Message.info(`Clicked cancel, vmDetailInfo: ${JSON.stringify(this.isShowDestroyModal)}`);
    },
    async destroyVmByJenknisApi(){ 
      await axios.post('/api/azure/vm/destroy/terraform-workspace', this.destroyFrom)
                 .then( response =>  {
                     this.$Message.info(`Send request to jenkins with status: ${response.statusText}`);
                   }).catch((error) => { this.$Message.error(error) })
                   .finally(() => { /* 不論失敗成功皆會執行 */ });
    },
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

