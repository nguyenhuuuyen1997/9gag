<template>
  <div class="container-page">
    <div class="search-index mb-2">
        <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
        <br>
        {{ timestamp }}
    </div>
    <div class="gag_tag">
      <a href="#" @click="handlegetLIKE(getpostid)">Liverpool</a>
      <a href="#">Henry Cavill</a>
      <a href="#">Elon Musk</a>
      <a href="#">Kanye West</a>
      <a href="#">Hong Kong</a>
      <a href="#">Trump</a>
    </div>
    <div id="list_view">
      
      <div class="post_view" v-for="(result) in datapost" :key="result.post_id">
        <div v-if="result.acti==1">
        <div class="icon-post">
          <b-row>
            <b-col md="1" lg="1">
               <b-img :src="result.theme_image" rounded="circle" alt="Circle image"></b-img>
              <!-- <img class="icon-post" style="clip-path: circle();" :src="result.img" /> -->
            </b-col>
            <b-col md="10" lg="10">
              <a href="#">
                <p>{{ result.theme_post }}-
                  <span>{{moment(result.time_at).fromNow()}}</span>
                   <!-- <time-ago class="title" refresh :locale="locale" :long="longString"></time-ago> -->
                </p>
              </a>
            </b-col>
            <!-- <b-col md="7" lg="7"></b-col> -->
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
          <a href="#" @click="open_popup_media(result.post_id)" data-toggle="modal" data-target="#myModal">
            <!-- <b-embed type="iframe" aspect="16by9" :src="results.post_media" allowfullscreen></b-embed> -->
            <!-- <iframe 
              scrolling="no"
              :src="result.post_media"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> -->
            <b-embed v-if="result.is_uploads=='video'" 
            type="iframe"
            aspect="16by9"
            :src=result.post_media 
            allowfullscreen
          ></b-embed>
             <img v-if="result.is_uploads=='image'" :src=result.post_media />
             <img v-if="result.is_uploads=='uploads_image'" :src="'http://localhost:8000/' + result.post_media" />
            <!-- <video controls width="100%" height="100%" v-if="result.is_uploads=='uploads_video'">
              <source :src="'http://localhost:8000/' + result.post_media" type="video/mp4">
          </video> -->
          <div class="embed-responsive embed-responsive-16by9" v-if="result.is_uploads=='uploads_video'">
            <iframe class="embed-responsive-item" :src="'http://localhost:8000/' + result.post_media" allowfullscreen></iframe>
          </div>
          <audio controls v-if="result.is_uploads=='uploads_audio'">
            <source :src="'http://localhost:8000/' + result.post_media">
            <p>Your browser doesn't support HTML5 audio. Here is a <a href="viper.mp3">link to the audio</a> instead.</p>
          </audio>
          </a>
        </div>
        <div class="post-meta" style="height:50px;">
          <br>
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
    </div>
    <div>
     
    </div>
    <!-- popup show image -->
        <div class="popup-image" >
           <div id="myModal"  class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog" >
                <div class="modal-content" >
                    <div class="modal-body img_popup_index">
                        <img  style="width:100%;height:100%;" v-if="getdatapost.is_uploads=='uploads_image'" :src="'http://localhost:8000/' + getdatapost.post_media" class="img-responsive">
                        <img v-else :src=getdatapost.post_media class="img-responsive">
                         <video controls width="100%" height="100%" v-if="getdatapost.is_uploads=='uploads_video'">
                            <source :src="'http://localhost:8000/' + getdatapost.post_media" type="video/mp4">
                        </video>
                    </div>
                </div>
              </div>
            </div>
        </div>
        <!-- end popup  -->
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
import VueFrame from "vue-frame";
// import TimeAgo from 'vue2-timeago'
// import moment from "vue-moment"

export default {
  props: ["result.post_id"],
  data() {
    return {
      searchQuery:'',
      id: "",
      count_like: 0,
      rating_like: "",
      item: {},

      user_id: "",
      currentPage: 1,
      perPage: 5,
      rows: 5,
      name: "",
      username: "",
      password: "",
      error: "",
      notiteMsg: "",
      index: 1,
      getID: [],
      ischeckimage:false,
      getdatapost:[],
      timestamp:'',
      longString: false,
      tooltip: true,
      locale: "en",
    };
  },

  components: { VueFrame,
  // TimeAgo 
  },
  created() {

    this.$store.dispatch("getdatapost");
  },

  mounted() {
    this.$store.dispatch("getlike");
    // setInterval(this.getNow, 1000);
    // const dateTimeAgo = moment("2020-04-04 11:45:26.123").endOf('day').fromNow();
    // console.log(dateTimeAgo)
  },
  computed: {
    datapost() {
      let arr = this.$store.state.results;
      if(this.searchQuery){
      return arr.filter((result)=>{
         return this.searchQuery.toLowerCase().split(' ').every(v => result.post_title.toLowerCase().includes(v))
      })
      }else{
        return arr;
      }
      // return this.$store.state.results;
    },
    checkimage(){
      let format ="http:"
      if(format.test(string)){ 
        return this.ischeckimage = true; 
      } else { 
        return this.ischeckimage=false; 
        } 
    },
    getlike(){
      return this.$store.state.getlike;
    },
    // datapost(){
    //   return this.$store.state.post;
    // },
    getpostid() {
      let arr =  this.$store.state.results;
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
    deletepost(post_id) {
      // console.log(post_id);
      this.$store.dispatch("deletepost", {
        post_id: post_id,
      });
      this.$store.dispatch("getdatapost");
      return this.$store.state.results;
    },
    async open_popup_media(post_id){
     await this.$store.dispatch("getpost", {
      post_id: post_id,
    });
    this.getdatapost=  this.$store.state.post;
    // console.log(arr)
    return this.getdatapost;
    },
    
  },

  watch: {},
};
</script>


<style >
.img_popup_index img {
  width: 100%;
  height: 100%;
}
@import '../../assets/css/style.css';
</style>
