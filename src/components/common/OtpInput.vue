<template>
  <otp-input-lib
    v-model="userToken"
    class="field-container"
    :length="4"
    pattern="[^0-9]+"
    :ignorePattern="false"
    fieldClass="custom-field-class"
    :size="15"
    @change="onOtp"
  />
</template>

<script>
import OTPInput8 from '@8bu/vue-otp-input';
import '@8bu/vue-otp-input/dist/vue-otp-input.css';

export default {
  name: 'otp-input',
  components: {
    'otp-input-lib': OTPInput8,
  },
  data() {
    return {
      userToken: '',
    };
  },
  methods: {
    onOtp(otp) {
      if (otp.length === 4) {
        this.$emit('value', otp);
      }
    },
    clearFields() {
      this.userToken = '';
    },
  },
};
</script>

<style>
.otp-input-8-field {
  border-radius: 4px;
  border: 1px solid #f5cd79;
  margin-right: 0.4rem;
}
</style>
