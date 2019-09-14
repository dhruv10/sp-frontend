
<template>
  <div class="classroom-root-container">
    <div class="card">
      <div class="card-content">
        <div class="main-container">
          <div class="tile is-8 is-vertical is-parent">
        <h1 class="title">Verify Gatepass</h1>
      </div>
          <div class="card-content">
            <div class="content card-area">
              <div class="mt-3">
                <div class="columns">
                  <div class="column is-8">
                    <section>
                      <b-field label="OTP">
                        <b-input icon-pack="fas" v-model="gatepass.otp" icon="credit-card"></b-input>
                      </b-field>
                    </section>
                  </div>
                  <div class="column is-4">
                    <b-field label="Code">
                      <b-input v-model="gatepass.code"></b-input>
                    </b-field>
                  </div>
                </div>
                <div class="submit">
                  <b-button
                    @click="verifyGatepass()"
                    icon-right="arrow-circle-right"
                    class="submit"
                    :type="startLoading ? 'is-loading is-primary' : 'is-primary'"
                  >Verify Gatepass</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startLoading: false,
      gatepass: {
        otp: '',
        code: '',
      },
    };
  },
  methods: {
    verifyGatepass() {
      const { snackbar } = this.$buefy;
      this.startLoading = true;
      this.$http
        .post('/gatepass/verify', { ...this.gatepass })
        .then(() => {
          this.startLoading = false;
          snackbar.open('Verified Successfully!');
        })
        .catch((e) => {
          console.log(e);
          this.startLoading = false;
          snackbar.open('Wrong gatepass details!');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/app.global.scss";

.main-container {
  background: white;
  height: 83.7vh;
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
.classroom-root-container {
  margin-top: 50px;
  height: 100%;
}
</style>
