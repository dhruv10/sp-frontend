<template>
  <div class="receptionist-root-container">
    <div class="card">
      <div class="info-header">
        <h1 class="gatepass-title">Gate Pass</h1>
        <div class="dflex">
          <div class="wrapper">
            <b-button
              type="is-primary"
              class="gatepass-search"
              icon-right="search"
              rounded
              outlined
              v-if="!openSearch"
              @click="openSearchInput"
            />
            <div
              :class="!searchLoading ? 'control has-icons-left has-icons-right searchInputBox' : 'control has-icons-left has-icons-right searchInputBox is-loading'"
              v-else
            >
              <input
                class="input is-rounded is-focused"
                type="email"
                placeholder="Search here"
                ref="searchInput"
                :value="searchText"
                @input="search"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
              <span
                class="icon is-small is-right clearInput"
                v-if="!searchLoading"
                @click="clearSearchInput"
              >
                <i class="fas fa-times"></i>
              </span>
            </div>
          </div>
          <b-button
            type="is-primary"
            icon-left="plus"
            rounded
            @click="openAddModal"
          >Generate gatepass</b-button>
        </div>
      </div>
      <div class="card-content">
        <div class="card">
          <div class="card-content">
            <div class="columns">
              <div class="column is-3">
                <p class="title is-6">
                  <span @click="sortList" class="sortTitle">
                    Student
                    <span class="icon is-small" v-if="sortUp && !sortDown">
                      <i class="fas fa-arrow-up"></i>
                    </span>
                    <span class="icon is-small" v-if="!sortUp && sortDown">
                      <i class="fas fa-arrow-down"></i>
                    </span>
                  </span>
                </p>
              </div>
              <div class="column is-3">
                <p class="title is-6">
                  <span class="sortTitle">Picked By</span>
                </p>
              </div>
              <div class="column is-2">
                <p class="title is-6">Reason For leaving</p>
              </div>
              <div class="column is-2">
                <p class="title is-6 align">
                  Checkout Status
                </p>
              </div>
              <div class="column is-2">
                <p class="title is-6 align">Verification</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <GatePassDetailCard :steps="steps" />
        </div>
        <GatePassDetailCard />
        <GatePassDetailCard />
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <GenerateGatepassModal
        :formData="formData"
        :formType="formType"
        @closeModal="closeModal"
        :steps="steps"
      />
    </b-modal>
    <v-tour name="myTour" :steps="steps" :options="tourOptions" :callbacks="callbacks"></v-tour>
  </div>
</template>

<script>
// import DataTable from '../../components/DataTableLayout';
import GatePassDetailCard from '../../components/GatePassDetailCard';
import GenerateGatepassModal from '../../components/GenerateGatepassModal';

export default {
  components: {
    // DataTable,
    GatePassDetailCard,
    GenerateGatepassModal,
  },
  data() {
    return {
      callbacks: {
        onNextStep: this.myCustomNextStepCallback,
      },
      openSearch: false,
      steps: [
        {
          target: '#v-step-0',
          content: 'Click here to generate new gate pass',
        },
        {
          target: '[data-v-step="1"]',
          content: 'A card will be generated with the pickup information',
        },
        {
          target: '#v-step-2',
          content: 'A card will be generated with the pickup information',
        },
        {
          target: '#v-step-3',
          content: 'A card will be generated with the pickup information',
        },
        {
          target: '#v-step-4',
          content: 'A card will be generated with the pickup information',
        },
      ],
      tourOptions: {
        useKeyboardNavigation: false,
        highlight: true,
      },
      openModal: false,
      formType: 'add',
      formData: {},
      loading: false,
      post: null,
      gatepassData: [],
      searchLoading: false,
      searchText: '',
      sortUp: false,
      sortDown: false,
    };
  },
  mounted() {
    // this.getTableData();
    // this.$tours.myTour.start();
  },
  methods: {
    myCustomNextStepCallback(curStep) {
      if (curStep === 0) {
        this.openModal = true;
      }
      if (curStep === 1) {
        this.formData = {
          guardianName: 'sakshi',
          guardianPhone: '201921',
        };
        if (curStep === 2) {
          console.log('hello');
        }
      }
    },
    search(e) {
      this.searchText = e.target.value;
      if (!this.searchText) return;
      this.searchLoading = true;
      setTimeout(() => {
        this.searchLoading = false;
      }, 2000);
    },
    openSearchInput() {
      this.openSearch = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    clearSearchInput() {
      if (!this.searchText) return;
      this.searchText = '';
    },
    sortList() {
      if (!this.sortUp && !this.sortDown) {
        this.sortUp = true;
        this.sortDown = false;
      } else if (this.sortUp && !this.sortDown) {
        this.sortUp = false;
        this.sortDown = true;
      } else if (!this.sortUp && this.sortDown) {
        this.sortUp = false;
        this.sortDown = false;
      }
    },
    getTableData() {
      this.loading = true;
      this.$http
        .get('/gatepass')
        .then((res) => {
          this.loading = false;
          this.gatepassData = res.data.results;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    openAddModal() {
      this.openModal = true;
    },
    closeModal() {
      this.openModal = false;
    },
    bulkUpload() {
      console.log('bulk');
    },
    editAdmissionQuery(rowinfo) {
      this.formType = 'edit';
      this.openModal = true;
      this.formData = rowinfo;
    },
    deleteAdmissionQuery(rowinfo) {
      const { dialog, snackbar } = this.$buefy;
      dialog.confirm({
        title: 'Deleting Gatepass Record',
        message:
          'Are you sure you want to <b>delete</b> your gatepass record? This action cannot be undone.',
        confirmText: 'Delete Gatepass Record',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.loading = true;
          this.$http
            .delete(`/gatepass/${rowinfo._id}`)
            .then(() => {
              snackbar.open('Gatepass Record deleted!');
              this.getTableData();
              this.loading = false;
            })
            .catch((e) => {
              console.log(e);
              this.loading = false;
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/app.global.scss";
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4);
}
.dflex {
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
}
.receptionist-root-container {
  margin-top: 50px;
  height: 100%;
}
.columns {
  align-items: center !important;
}
.column {
  padding: 0px !important;
}
.align {
  text-align: center;
}
.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 0px 25px;
}
.info-header > div > * {
  margin-left: 20px;
}
.main-contianer {
  margin-top: 50px;
}
.gatepass-title {
  font-size: 2rem;
  font-weight: 600;
}
.gatepass-search {
  cursor: pointer;
}
.clearInput {
  cursor: pointer !important;
}
.searchInputBox {
  width: calc(100vw - 50rem);
}
.default {
  transition: max-height 0.25s ease-out;
  width: 20px;
  transition-property: width;
}
.bigger {
  transition: max-height 0.25s ease-out;
  width: 200px;
  transition-duration: 5s;
  transition-property: width;
}
.sortTitle {
  cursor: pointer;
}
</style>
