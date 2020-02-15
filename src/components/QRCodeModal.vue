<template>
    <qrcode :value="gatePassId" :options="{ width: 500 }"></qrcode>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  props: {
    gatePassId: {
      type: String,
      default: '',
    },
    checkoutAt: {
      type: String,
      default: '',
    },
  },
  components: {
    qrcode: VueQrcode,
  },
  methods: {
    scan() {

    },
  },
};
</script>

<style scoped>
.image {
    background: 'white'
}
</style>
