<template>
    <div class="card">
      <div class="card-content">
        <div class="columns col">
          <div class="column inner-col is-3">
            <p class="title is-5">Sakshi Srivastava</p>
            <p class="subtitle is-6">VI - A, 45</p>
          </div>

          <div class="column inner-col is-3">
            <p class="picked-title title is-5 m-0">Rekha Srivastava</p>
            <p class="is-6">Niece, 8585858593</p>
            <!-- <p class="subtitle is-6 is-inline">Verified By:</p>
            <p class="title is-6 is-inline">Father</p>-->
          </div>

          <div class="column inner-col is-2">
            <!-- <p class="picked-title title is-6 m-0">Reason for picking:</p> -->
            <p class="is-6">Family function at nani's home</p>
          </div>

          <div class="column inner-col is-2">
            <div class="right-container">
              <!-- <div>Fri, 26 Jan, 2019 (10:45)</div> -->
              <!-- <div class="mt-1"></div> -->
              <p class="title is-6">
                <b-tag rounded type="is-warning">Awaiting</b-tag>
              </p>
            </div>
          </div>

          <div class="column inner-col is-2">
            <!-- <div class="status">
              <b-icon pack="fas" icon="exclamation-triangle" size="is-small" type="is-warning"></b-icon>
            </div>-->
            <div class="btn-details">
              <b-button type="is-primary" size="is-small">Verify OTP</b-button>
            </div>
            <div class="btn-details">
              <a class="cancel">Cancel Request</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.right-container {
  text-align: center;
}
.status {
  text-align: center;
}
.btn-details {
  text-align: center;
  margin-top: 2px;
}
.picked-title {
  margin: 0 !important;
}
.cancel {
  color: red;
  font-size: 12px;
}
.col {
  align-items: center !important;
}
.inner-col {
  padding: 0px !important;
}
</style>
