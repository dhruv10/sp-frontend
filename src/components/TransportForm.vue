<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Transport Fee' : 'Edit Transport Fee' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="mt-3">
          <div class="columns">
            <div class="column is-12">
              <section>
                <b-field label="Admission Number">
                  <b-input icon-pack="fas" required v-model="transportFeeRecord.admissionNo" icon="credit-card"></b-input>
                </b-field>
              </section>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <b-field label="Fee Amount">
                <b-input v-model="transportFeeRecord.amount" required></b-input>
              </b-field>
            </div>
            <div class="column is-6">
              <b-field label="Payment Mode">
                <MultiSelect
                  required
                  v-model="transportFeeRecord.paymentMode"
                  :isMultiple="false"
                  :allOptions="paymentOptions"
                  placeholder="Select payment mode"
                />
              </b-field>
            </div>
          </div>
          <div class="columns" v-if="transportFeeRecord.paymentMode && transportFeeRecord.paymentMode == 'Cheque'">
            <div class="column is-12">
              <b-field label="Note">
                <b-input class="notearea" v-model="transportFeeRecord.note" maxlength="200" type="textarea"></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="submit mt-2">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
          <b-button
            @click="formType === 'add' ? addtransportFeeRecord() : edittransportFeeRecord()"
            icon-right="arrow-circle-right"
            :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
          >{{ formType === 'add' ? 'Add Transport Fee' : 'Edit Transport Fee' }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect.vue';

export default {
  name: 'FeeDepositForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    formData: {
      type: Object,
    },
  },
  components: { MultiSelect },
  data() {
    return {
      startLoading: false,
      paymentOptions: ['Cash', 'Cheque', 'Online'],
      transportFeeRecord: {
        admissionNo: 0,
        paymentMode: '',
        amount: 0,
      },
    };
  },
  mounted() {
    if (this.formType === 'edit') this.transportFeeRecord = this.formData;
    this.paymentOptions = this.paymentOptions.map(val => ({
      name: `${val}`,
      code: `${val}`,
    }));
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addtransportFeeRecord() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/transportFeeRecord', { ...this.transportFeeRecord })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('Department added!');
        })
        .catch(e => console.log(e));
    },
    edittransportFeeRecord() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/transportFeeRecord/${this.formData._id}`, { ...this.transportFeeRecord })
        .then(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('Fee Record edited!');
        })
        .catch(e => console.log(e));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/app.global.scss";

.main-container {
  background: white;
  .card-header {
    background: $primary-color;
    .header {
      font-size: 22px;
      font-weight: 800;
      color: white;
      margin-left: 20px;
    }
  }
  .card-area {
    margin: 0px 8px 10px 8px;
  }
  .line {
    display: flex;
    .mid {
      margin: 0px 20px;
    }
  }
}
.submit {
  display: flex;
  justify-content: flex-end;
}
.mr-1 {
  margin-right: 1rem;
}

.notearea {
  min-height: 7rem !important;
}
</style>
