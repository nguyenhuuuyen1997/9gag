<template>
  <b-row>
    <b-col md="2" lg="2">
      <left-app />
    </b-col>
    <b-col md="7" lg="7">
      <hot-app />
    </b-col>
    <b-col md="3" lg="3">
      <right-app />
    </b-col>
  </b-row>
</template>

<script>
import Appleft from "./layout/Appleft";
import Right from "./layout/Right";
import hotconten from "./view/index-hot";
import axios from "axios";
export default {
  props: ["id"],
  components: {
    "left-app": Appleft,
    "right-app": Right,
    "hot-app": hotconten,
  },
};
</script>

<style>
</style>