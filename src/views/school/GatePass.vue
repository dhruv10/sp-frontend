<template>
  <div class="receptionist-root-container">
    <div class="card table-card">
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
              class="control has-icons-left has-icons-right searchInputBox"
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
            </div>
          </div>
          <b-button
            type="is-primary"
            icon-left="plus"
            rounded
            @click="openAddModal"
          >Generate gatepass</b-button>
        </div>
        <!-- <div id="v-step-0">
          <b-button
            type="is-primary"
            icon-left="plus"
            rounded
            @click="openAddModal"
          >Generate gatepass</b-button>
        </div>-->
      </div>
      <div class="card-content" ref="element">
        <div class="card" v-if="filteredGatepassList.length">
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
                <p class="title is-6">Picked By</p>
              </div>
              <div class="column is-2">
                <p class="title is-6">Reason For leaving</p>
              </div>
              <div class="column is-2">
                <p class="title is-6 align">Checkout Status</p>
              </div>
              <div class="column is-2">
                <p class="title is-6 align">Verification</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="filteredGatepassList.length">
          <div v-for="(gatepass, i) in filteredGatepassList" :key="i">
            <GatePassDetailCard
              :steps="steps"
              :gatepassData="gatepass"
              @getTableData="getTableData"
            />
          </div>
        </div>
        <div v-else class="dflex">
          <img :src="blankCanvas" class="not-found-img" />
          <p class="not-found-txt">No gatepasses found...</p>
        </div>
      </div>
    </div>
    <b-modal :active.sync="openModal" :width="640" scroll="keep">
      <GenerateGatepassModal
        :formData="formData"
        :formType="formType"
        @closeModal="closeModal"
        @getTableData="getTableData"
      />
    </b-modal>
    <v-tour name="myTour" :steps="steps" :options="tourOptions"></v-tour>
  </div>
</template>

<script>
import blankCanvas from '@/assets/blank_canvas.svg';
import GatePassDetailCard from '../../components/GatePassDetailCard';
import GenerateGatepassModal from '../../components/GenerateGatepassModal';

export default {
  components: {
    GatePassDetailCard,
    GenerateGatepassModal,
  },
  data() {
    return {
      blankCanvas,
      steps: [
        {
          target: '#v-step-0',
          content: 'Click here to generate new gate pass',
        },
        {
          target: '#v-step-1',
          content: 'A card will be generated with the pickup information',
        },
        {
          target: '#v-step-3',
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
      gatepassList: [],
      tableConfig: [
        {
          headerName: 'Student Name',
          field: 'student',
          sortable: true,
        },
        {
          headerName: "Guardian's Name",
          field: 'guardianName',
          sortable: true,
        },
        {
          headerName: "Guardian's Phone No",
          field: 'guardianPhone',
          sortable: true,
        },
      ],
      searchText: '',
      sortUp: false,
      sortDown: false,
      openSearch: false,
      filteredGatepassList: [],
    };
  },
  mounted() {
    this.getTableData();
    // this.$tours.myTour.start();
  },
  methods: {
    getTableData() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.element.$el,
      });
      this.$http
        .get('/gatepass')
        .then((res) => {
          const gatepassList = res.data.gatepasses;
          const sortedList = [
            ...gatepassList.filter(g => !g.otpVerified && !g.closed),
            ...gatepassList.filter(g => g.otpVerified),
            ...gatepassList.filter(g => g.closed),
          ];
          this.gatepassList = sortedList;
          this.filteredGatepassList = sortedList;
          loadingComponent.close();
        })
        .catch((e) => {
          console.log(e);
          loadingComponent.close();
        });
    },
    search(e) {
      this.searchText = e.target.value;
      if (!this.searchText) {
        this.filteredGatepassList = this.gatepassList;
        return;
      }

      const filteredList = this.gatepassList.filter(gatepass => (
        gatepass.student.basicInfo.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
          || gatepass.reason.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
          || gatepass.guardianName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
          || gatepass.guardianPhone.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
      ));
      this.filteredGatepassList = filteredList;
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
    openAddModal() {
      this.openModal = true;
    },
    closeModal() {
      this.openModal = false;
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
.not-found-img {
  width: 50%;
}
.not-found-txt {
  font-size: 3rem;
  font-weight: 500;
  color: #7957d5;
  margin: auto;
  width: 45%;
}
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4);
}
.receptionist-root-container {
  margin-top: 50px;
}
.table-card {
  min-height: 88vh;
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
.dflex {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
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
.gatepass-search {
  cursor: pointer;
}
.clearInput {
  cursor: pointer !important;
}
.searchInputBox {
  width: calc(100vw - 50rem);
}
</style>
