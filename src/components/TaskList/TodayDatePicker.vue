<template>
  <div class="col-4 d-flex align-items-center justify-content-end">
    <datepicker class="col" v-model="chosen_date" style="width:90px"/>
  </div>
</template>


<script>
import Datepicker from 'vue3-datepicker'

export default {
  name: "TodayDatePicker",
  components: {
    Datepicker,
  },
  computed: {
    chosen_date: {
      // getter
      get: function () {
        return this.$store.state.today
      },
      // setter
      set: function (newValue) {
        console.log("Set today to ", newValue)
        this.$store.commit('set_today', newValue)
      }
    }
  }
}
</script>

<style scoped>

</style>