<template>
  <b-row>
    <b-col md="2" lg="2">
      <left-app />
    </b-col>
    <b-col md="7" lg="7">
      <post-app v-bind:id="id"/>
    </b-col>
    <b-col md="3" lg="3">
      <right-app />
    </b-col>
  </b-row>
</template>

<script>
import Appleft from "./layout/Appleft";
import Right from "./layout/Right";
import postconten from "./view/post-conten"
import axios from 'axios'
import VueCookies from 'vue-cookies'
export default {
  name: "app",
  props: ["id"],
  data() {
    return {
      item: {},
      data_post: {
        data_post: [],
      },
    };
  },
  mounted() {
    let obj = {};
    obj.post_id = this.id;
    axios
      .post("http://localhost:8000/getpost", obj)
      .then((req) => {
        this.data_post = req.data;
        let data_post = req.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {};
  },
  components: {
    "left-app": Appleft,
    "right-app": Right,
    "post-app": postconten,
  },
};
</script>

<style>
body {
  color: #5d6062;
  line-height: 1.4;
  font-size: 14px;
}
.head-page {
  height: 70px;
}
button,
.btn {
  font-size: 14px;
}
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none;
}

@import "./assets/css/mobile.css";
</style>