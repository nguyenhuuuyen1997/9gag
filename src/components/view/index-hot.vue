<template>
  <div class="container-page">
    
    <div class="gag_tag">
      <a href="#">Liverpool</a>
      <a href="#">Henry Cavill</a>
      <a href="#">Elon Musk</a>
      <a href="#">Kanye West</a>
      <a href="#">Hong Kong</a>
      <a href="#">Trump</a>
      
    </div>
    <div id="list_view">
      <div
        class="post_view"
        v-for="(results,index) in getdatahot"
        :key="results.post_id"
        :product="index"
      >
        <div class="icon-post">
          <b-row>
            <b-col md="1" lg="1">
                <b-img :src="results.img" rounded="circle" alt="Circle image"></b-img>
              <!-- <img src="./avatar.jpg" /> -->
            </b-col>
            <b-col md="1" lg="1">
              <a href="#">
                <p>{{ results.name }}</p>
              </a>
            </b-col>
            <b-col md="10" lg="10"></b-col>
          </b-row>
        </div>
        <div class="title-post">
          <router-link :to="{name:'post',params:{id:results.post_id }}">{{ results.post_title }}</router-link>
        </div>
        <div class="media-post">
          <a href="#">
            <iframe
            
              scrolling="no"
              :src="results.post_media"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </a>
        </div>
        <div class="post-meta" style="height:50px;">
          <section>{{ rating_like }}</section>
        </div>
        <div class="conment-post">
          <div class="row">
            <div class="col-md-6">
              <ul class="btn-vote left-up">
                <li>
                  <b-button class="btn-vote-post" @click.prevent="handlegetId(results.post_id)">
                    <span>
                      <i aria-hidden="true" class="fa fa-thumbs-o-up"></i>
                    </span>
                  </b-button>
                </li>
              </ul>
              <div class="btn-vote left-up">
                <div>
                  <li>
                    <b-button class="btn-vote-post">
                      <span>
                         <router-link :to="{name:'post',params:{id:results.post_id }}" style="color:black;">
                        <i class="fa fa-comment-o" aria-hidden="true"></i></router-link>
                      </span>
                    </b-button>
                  </li>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="btn_facebook">
                <ShareNetwork
                  network="facebook"
                  url="https://news.vuejs.org/issues/180"
                  title
                  description
                  quote
                  hashtags
                  twitterUser
                >
                  <a class="btn btn-lg btn-social btn-facebook">
                    <i class="fa fa-facebook fa-fw"></i>
                    <span>Facebook</span>
                  </a>
                </ShareNetwork>

                <!-- <a class="btn btn-lg btn-social btn-facebook">
                  <i class="fa fa-facebook fa-fw"></i> Facebook
                </a>-->
              </div>
            </div>

            <div class="col-md-3">
              <div class="btn_facebook">
                <ShareNetwork
                  network="pinterest"
                  url="https://news.vuejs.org/issues/180"
                  title
                  description
                  quote
                  hashtags
                  twitterUser
                >
                  <a class="btn btn-lg btn-social btn-pinterets">
                    <i class="fa fa-pinterest btn-social btn-facebook btn-pinterets"></i>
                    <span>Pinterest</span>
                  </a>
                </ShareNetwork>

                <!-- <a  class="btn btn-lg btn-social btn-facebook btn-pinterets">
                  <i class="fa fa-pinterest"></i> Pinterest
                </a>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="list_view"
    ></b-pagination>
    <b-row></b-row>
  </div>
</template>
<script>
import axios from "axios";
import VueCookies from "vue-cookies";
// import indexvotelike from "./index-vote"
export default {
  data() {
    return {
      id: "",
      count_like: 0,
      rating_like: "",
      item: {},
      user_id: "",
      currentPage: 1,
      perPage: 5,
      rows: 15,
      name: "",
      username: "",
      password: "",
      error: "",
      notiteMsg: "",
    };
  },

  components: {
    // "vote-app":indexvotelike,
  },

  mounted: function () {
     this.$store.dispatch('gethot');
  },
  computed:{
    getdatahot(){
      return this.$store.state.hot;
    },
  },
  methods: {
    handlegetId(post_id) {
      console.log(post_id);
      let id = post_id;
      let action = "like";
      let cookie = this.$cookies.get("user");
      let user_id = cookie.data[0].user_id;
      console.log("a");
      //  console.log(count_like)
      this.count_like = this.count_like + 1;
      console.log(this.count_like);
      let obj = {};
      obj.post_id = id;
      obj.user_id = user_id;
      obj.action = action;
      // console.log(obj)
      axios
        .post("http://localhost:8000/rating", obj)
        .then((res) => {
          this.results = res.data;
          // console.log(req);
        })
        .catch((error) => {
          console.log(error);
        });
    },
   
  },

  watch: {},
};
</script>


<style scoped>
 img {
  widows: 100%;
  height: 100%;
}
</style>
