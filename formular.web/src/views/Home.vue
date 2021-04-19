<template>
  <div class="home">
    <Table :columns="columns" :data="datas"></Table>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ 
  components: {
  },
})
export default class Home extends Vue {
  data() {
    return {
      columns:[
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: "Value",
          key: 'value'
        }
      ],
      datas: [
        { 
          name: 'TestName',
          value: 'TestValue'
        }
      ]
    }
  }
}
</script>
