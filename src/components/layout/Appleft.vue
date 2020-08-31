<template>
  <div id="app">
    <div>
      <div>
        <div class="sidebar-container">
          <div class="vertical-menu">
            <div class="sidebar">
              <ul>
                <li>
                  <i class="fa fa-firefox"></i>
                  <a href="#" class="active" @click="handleHot()">{{ $t('sidebar.hot') }}</a>
                </li>
                <li>
                  <i class="fa fa-line-chart" aria-hidden="true"></i>
                  <a href="#">{{ $t("sidebar.Trending") }}</a>
                </li>
              </ul>
              <p></p>
              <span style="color:black;">POPULAR</span>
              <ul v-for="results in datatheme" :key="results.theme_post" :product="results">
                <li>
                   <router-link :to="{name:'theme',params:{id:results.theme_id }}">{{ results.theme_post }}
                      <img :src="results.theme_image" />
                   </router-link>
                   
                
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      item: {},
    };
  },
  mounted(){
    this.$store.dispatch('gettheme');
  },
  methods:{
    handleHot(){
       this.$router.push("/hot");
    },
  },
  computed:{
    datatheme(){
       return this.$store.state.themes;
    },
  }
};
</script>
<style>
</style>

