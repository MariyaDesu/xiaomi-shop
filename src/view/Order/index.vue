<template>
  <div>
    <router-view />
    <service-bar />

  </div>
</template>

<script>

import ServiceBar from '@/components/ServiceBar.vue';
export default {
  name: 'order',
  components: {  ServiceBar },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
</style>