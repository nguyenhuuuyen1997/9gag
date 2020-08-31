<template>
  <b-row>
    <b-col md="2" lg="2">
      <left-app />
    </b-col>
    <b-col md="7" lg="7">
      <theme-app v-bind:id="id" />
    </b-col>
    <b-col md="3" lg="3">
      <right-app />
    </b-col>
  </b-row>
</template>

<script>
import Appleft from "./layout/Appleft";
import Right from "./layout/Right";
import themeconten from "./view/theme-conten";
import axios from "axios";
export default {
  props: ["id"],
  components: {
    "left-app": Appleft,
    "right-app": Right,
    "theme-app": themeconten,
  },
};
</script>

<style>
</style>