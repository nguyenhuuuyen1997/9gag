<template>
  <div class="container-page">
    <div class="gag_tag">
      <a href="#" @click="handlegetLIKE(getpostid)">Liverpool</a>
      <a href="#">Henry Cavill</a>
      <a href="#">Elon Musk</a>
      <a href="#">Kanye West</a>
      <a href="#">Hong Kong</a>
      <a href="#">Trump</a>
    </div>
    <div id="list_view">
      <div class="post_view" v-for="(result) in datapostuser" :key="result.post_id">
        <div class="icon-post">
          <b-row>
            <b-col md="1" lg="1">
               <b-img :src="result.img" rounded="circle" alt="Circle image"></b-img>
              <!-- <img class="icon-post" style="clip-path: circle();" :src="result.img" /> -->
            </b-col>
            <b-col md="1" lg="1">
              <a href="#">
                <p>{{ result.name }}</p>
              </a>
            </b-col>
            <b-col md="9" lg="9"></b-col>
            <b-col md="1" lg="1">
              <div class="btn-group">
                <button
                  type="button"
                  class="drop_comment dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu" style=" font-size: 12px;">
                  <a
                    class="dropdown-item"
                    href="javascrip:void(0)"
                    @click="deletepost(result.post_id)"
                  >Delete</a>
                  <a class="dropdown-item" href="#">Copy link</a>
                  <a class="dropdown-item" href="#">Report Comment</a>
                  <a class="dropdown-item" href="#">I just don't it</a>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="title-post">
          <router-link :to="{name:'post',params:{id:result.post_id }}">{{ result.post_title }}</router-link>
        </div>
        <div class="media-post">
          <a href="#">
            <!-- <b-embed type="iframe" aspect="16by9" :src="results.post_media" allowfullscreen></b-embed> -->
            <iframe
              scrolling="no"
              :src="result.post_media"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
             <!-- <img :src="require('@/../server/uploads/' + result.post_media)" /> -->
            <!-- @load="iframeStyles" -->
          </a>
        </div>
        <div class="post-meta" style="height:50px;">
          <span v-for="getlike in getlike" :key="getlike.post_id">
             <section v-if="getlike.post_id==result.post_id"> {{ getlike.amount }} người thích bài này </section>
              <!-- <section v-else> </section> -->
            <!-- <i v-if="result.post_id == getlike.post_id" aria-hidden="true" class="fa fa-thumbs-up like-btn"></i> -->
          </span>
        </div>
        <div class="conment-post">
          <div class="row">
            <div class="col-md-6">
              <ul class="btn-vote left-up">
                <li>
                  <b-button class="btn-vote-post" @click.prevent="handlegetId(result.post_id)">
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
                        <router-link
                          :to="{name:'post',params:{id:result.post_id }}"
                          style="color:black;"
                        >
                          <i class="fa fa-comment-o" aria-hidden="true"></i>
                        </router-link>
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
   
    <b-row></b-row>
  </div>
</template>
<script>
import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  props: ["user_id"],
  data() {
    return {
      
    };
  },

  created() {
    console.log(this.user_id)
    this.$store.dispatch("getdatapostuser",{user_id:this.user_id});
  },

  mounted() {

    this.$store.dispatch("getlike");
  },
  computed: {
    datapostuser() {
      return this.$store.state.datapostuser;
    },
    getlike(){
      return this.$store.state.getlike;
    },
    getpostid() {
      let arr =  this.$store.state.datapostuser;
      let data = [];
      // console.log(arr)
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          let rows = arr[i].post_id;
          data.push(rows);
        }
        // console.log(data)
      }
      console.log(data);
    return data
    },
  },

  methods: {
    handlegetLIKE(getpostid) {
      // console.log(this.getpostid);
      this.$store.dispatch("getlikepost", {
          getpostid:getpostid
        });
      return this.$store.state.getlikepost;
    },
    async deletepost(post_id) {
      console.log(post_id);
      await this.$store.dispatch("deletepost", {
        post_id: post_id,
      });
      this.$store.dispatch("getdatapostuser",{user_id:this.user_id});
      this.datapostuser
    },
  },

  watch: {},
};
</script>


<style >
</style>
