<template>
  <input
      type="checkbox"
      :checked="checked_"
      class="checkbox-input"
  />
  <label
      class="checkbox-label"
      v-bind:class="{ 'checkbox-gray-out': grayOut }"
      v-on:click.prevent="checked_ = !checked_"
  >
  </label>
</template>

<script>
import {useModelWrapper} from "@/components/ModelWrapper";

export default {
  props:{
    checked: Boolean,
    grayOut: {
      type: Boolean,
      default: false,
    }
  },
  emits:["update:checked"],
  setup(props, { emit }) {
    return {
      checked_ : useModelWrapper(props, emit, "checked"),
    }
  }
}

</script>

<style scoped>

@keyframes dothabottomcheck {
  0% {
    height: 0;
  }
  100% {
    height: 62%;
  }
}
@keyframes dothatopcheck {
  0% {
    height: 0;
  }
  50% {
    height: 0;
  }
  100% {
    height: 115%;
  }
}


.checkbox-input {
  display: none;
}


.checkbox-label {
  height: 40px;
  width: 40px;
  margin: 0;
  background-color: transparent;
  border: 0.35em solid #000;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  transition: border-color ease 0.2s;
  cursor: pointer;
}
.checkbox-label::before, .checkbox-label::after {
  box-sizing: border-box;
  position: absolute;
  height: 0;
  width: 25%;
  background-color: #34b93d;
  display: inline-block;
  transform-origin: left top;
  border-radius: 5px; /*rounding of the edges of the checkmark*/
  content: ' ';
  transition: opacity ease .5s;
}
.checkbox-label.checkbox-gray-out::before, .checkbox-label.checkbox-gray-out::after {
  background-color: #374231;
}
.checkbox-label::before {
  /* check mark top */
  top: 90.5%;
  left: 51%;
  box-shadow: 0 0 0 0.16em #ffffff;
  transform: rotate(-135deg);
}
.checkbox-label::after {
  /* check mark bottom */
  top: 46.8%;
  left: 7%;
  transform: rotate(-45deg);
}

.checkbox-input:checked + .checkbox-label{
  border-color: #34b93d;
}
.checkbox-input:checked + .checkbox-label.checkbox-gray-out{
  border-color: #374231;
}
.checkbox-input:checked + .checkbox-label::after{
  height: 50px;
  animation: dothabottomcheck 0.2s ease 0s forwards;
}
.checkbox-input:checked + .checkbox-label::before{
  height: 120px;
  animation: dothatopcheck 0.4s ease 0s forwards;
}
</style>
