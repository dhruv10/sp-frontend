<template>
  <div class="main-container">
    <div class="card">
      <header class="card-header">
        <p
          class="card-header-title header"
        >{{ formType === 'add' ? 'Add Invoice' : 'Edit Invoice' }}</p>
      </header>
    </div>
    <div class="card-content">
      <div class="content card-area">
        <div class="">

          <h2>Discount Details</h2>
          <div class="columns">
            <div class="column is-12">

                <b-field label="Title">
                  <b-input icon-pack="fas" required v-model="invoice.title" icon="credit-card"></b-input>
                </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <section>
                <b-field label="Amount">
                  <b-input icon-pack="fas" required v-model="invoice.amount" type="number"></b-input>
                </b-field>
              </section>
            </div>
            <div class="column is-6">
              <b-field label="Percentage">
                <b-input v-model="invoice.percentage" type="number" required></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <b-field label="Note">
                <b-input class="notearea" required v-model="invoice.note" maxlength="200" type="textarea"></b-input>
              </b-field>
            </div>
          </div>
          <h2>Fee Details</h2>
          <div class="columns">
            <div class="column is-8">
              <section>
                <b-field label="Title">
                  <b-input icon-pack="fas" required v-model="invoice.feeTitle" type="number"></b-input>
                </b-field>
              </section>
            </div>
            <div class="column is-4">
              <b-field label="Type">
                <b-input v-model="invoice.feeType" type="number" required></b-input>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <b-field label="Note">
                <b-input class="notearea" required v-model="invoice.feeNote" maxlength="200" type="textarea"></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="submit">
          <b-button outlined type="is-primary" class="mr-1" @click="closeModal()">Cancel</b-button>
          <b-button
            @click="formType === 'add' ? addinvoice() : editinvoice()"
            icon-right="arrow-circle-right"
            class="submit"
            :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
          >{{ formType === 'add' ? 'Add Invoice' : 'Edit Invoice' }}</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'invoiceForm',
  props: {
    formType: {
      type: String,
      default: 'add',
    },
    formData: {
      type: Object,
    },
  },
  data() {
    return {
      startLoading: false,
      invoice: {
        title: '',
        code: '',
        note: '',
      },
    };
  },
  mounted() {
    if (this.formType === 'edit') this.invoice = this.formData;
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    addinvoice() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/Invoice', { ...this.invoice })
        .then(() => {
          this.startLoading = false;
          this.$emit('getTableData');
          this.$emit('closeModal');
          snackbar.open('invoice added!');
        })
        .catch(e => console.log(e));
    },
    editinvoice() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .put(`/invoice/${this.formData._id}`, { ...this.invoice })
        .then(() => {
          this.startLoading = false;
          this.$emit('closeModal');
          snackbar.open('invoice edited!');
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
    margin: 0px 8px 50px 8px;
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
