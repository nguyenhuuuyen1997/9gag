<template>
  <div>
    <div>
      <div class="icon-post">
        <b-row>
          <b-col md="1" lg="1">
            <b-img :src="getpost.theme_image" rounded="circle" alt="Circle image"></b-img>
          </b-col>
          <b-col md="1" lg="1">
            <router-link :to="{name:'post_user',params:{user_id:getpost.user_id }}">
              <p>{{ getpost.theme_post }}</p>
            </router-link>
            <!-- <a href="#" @click="handlegetPostUser(getpost.user_id)">
              <p>{{ getpost.name }}</p>
            </a>-->
          </b-col>
          <b-col md="10" lg="10"></b-col>
        </b-row>
      </div>
      <div class="title-post">{{ getpost.post_title }}</div>
      <div class="media-post">
        <a href="#">
         <b-embed v-if="getpost.is_uploads=='video'" 
            type="iframe"
            aspect="16by9"
            :src=getpost.post_media 
            allowfullscreen
          ></b-embed>
             <img v-if="getpost.is_uploads=='image'" :src=getpost.post_media />
             <img v-if="getpost.is_uploads=='uploads_image'" :src="'http://localhost:8000/' + getpost.post_media" />
            <video controls width="100%" height="100%" v-if="getpost.is_uploads=='uploads_video'">
              <source :src="'http://localhost:8000/' + getpost.post_media" type="video/mp4">
          </video>
          <audio controls v-if="getpost.is_uploads=='uploads_audio'">
            <source :src="'http://localhost:8000/' + getpost.post_media">
            <p>Your browser doesn't support HTML5 audio. Here is a <a href="viper.mp3">link to the audio</a> instead.</p>
          </audio>
        </a>
      </div>
      <div class="post-meta" style="height:50px;">
        <!-- <input readonly style="border:none;" v-if="isActionLike==false" v-model="countlike" />
        <input readonly style="border:none;" v-if="isActionLike==true" v-model="countlike" /> -->
        <section>{{ countlike }} người thích bài này</section>
      </div>
      <div class="conment-post">
        <div class="row">
          <div class="col-md-6">
            <ul v-if="ischecklike===true" class="btn-vote left-up">
              <li>
                <b-button class="btn-vote-post" @click="handleUnLike(id)">
                  <span>
                    <i aria-hidden="true" class="fa fa-thumbs-up like-btn"></i>
                  </span>
                </b-button>
              </li>
            </ul>
            <ul v-if="ischecklike===false" class="btn-vote left-up">
              <li>
                <b-button class="btn-vote-post" @click="handleLike(id)">
                  <span>
                    <i aria-hidden="true" class="fa fa-thumbs-o-up like-btn"></i>
                  </span>
                </b-button>
              </li>
            </ul>
            <div class="btn-vote left-up">
              <div>
                <li>
                  <b-button class="btn-vote-post">
                    <span>
                      <i class="fa fa-comment-o" aria-hidden="true" @click="test(checklike)"></i>
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
                url="http://localhost:9000/post/:id"
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
              <span>Pinterest</span>
            </div>
          </div>
        </div>
      </div>
      <div class="comment_detail">
        <div class="textarea-box">
          <form @submit.prevent="handlecomment()" method="post">
            <b-row>
              <b-col class="icon-post" md="1" lg="1">
                <img style="clip-path: circle();" :src="getimageuser" />
              </b-col>
              <b-col md="9" lg="9" offset="1" class="right-comment-text">
                <b-row>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="1"
                    v-model="text_comment"
                    placeholder="Write comments..."
                    style="height:50px;font-size: 12px;"
                  ></textarea>
                </b-row>
                <b-row style="border: 1px solid #ced4da;height:40px">
                  <b-col md="1" lg="1" mt="10">
                    <div class="action-comment-left">
                      <i class="fa fa-smile-o">
                        <!-- <input type="file"> -->
                      </i>
                    </div>
                  </b-col>
                  <b-col md="1" lg="1" mt="10">
                        <input
                      style="display: none;"
                      id="file-upload"
                      type="file"
                      ref="file"
                      @change="onFileChange"
                    />
                     <label id="lable_image_comment" for="file-upload">
                        <i class="fa fa-camera"></i>
                    </label>
                  
                  </b-col>
                    <b-col md="5" lg="5" mt="5">
                         <input readonly style="border:none;" v-model="image_name" />
                  </b-col>
                  <b-col md="5" lg="5" mt="5">
                    <div class="action-comment-right">
                      <div class="comment-action comment-cancel">
                        <b-button style="width: 70px;" class="btn btn-light">Cancel</b-button>
                      </div>
                      <div class="comment-action comment-post">
                        <button style="width: 70px;" class="btn btn-primary">Post</button>
                      </div>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </form>
        </div>
        <div class="list-comment"></div>
      </div>
      <div class="list-comment">
        <comment-app v-bind:id="id" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import comment from "../view/post-comment";
export default {
  props: ["id"],
  data() {
    return {
      user_id: "",
      currentPage: 1,
      perPage: 5,
      rows: 15,
      name: "",
      username: "",
      password: "",
      error: "",
      notiteMsg: "",
      text_comment: "",
      isActionLike: false,
      rating_likee: "",
      isStatusLike: false,
      img: "",
      ischecklike: "",
      file:'',
      image_name:'',
    };
  },
  components: {
    "comment-app": comment,
  },
  async created() {
    console.log(this.id);
    console.log(this.user_id);
    // console.log(this.id);
    // lấy số like`
    await this.$store.dispatch("countlike", {
      post_id: this.id,
    });
    // lấy thông tin post
    await this.$store.dispatch("getpost", {
      post_id: this.id,
    });
    // this.img = await this.$cookies.get("user");
    //  console.log(this.img);
    // kiểm tra like post
    await this.$store.dispatch("checklike", {
      post_id: this.id,
      user_id: this.$cookies.get("user").data[0].user_id,
    });
    // console.log(this.$store.state.checklike[0])
  },
  async mounted() {
    setTimeout(() => {
      this.checklike();
    }, 1000);
    // this.checklike();
  },
  methods: {
    handleUnLike(id) {
      this.ischecklike = false;
      this.$store.dispatch("unlike", {
        post_id: this.id,
        user_id: this.$cookies.get("user").data[0].user_id,
      });
      this.$store.dispatch("countlike", {
        post_id: this.id,
      });
      return this.$store.getters.countlike;
    },
    handleLike(id) {
      this.ischecklike = true;
      let action = 1;
      let cookie = this.$cookies.get("user");
      if (cookie) {
        this.rating_like = this.rating_like + 1;
        let user_id = cookie.data[0].user_id;
        this.$store.dispatch("addlike", {
          post_id: this.id,
          user_id: user_id,
          action: action,
        });
        this.$store.dispatch("countlike", {
          post_id: this.id,
        });
        return this.$store.getters.countlike;
      } else {
        alert("ban chua dang nhap");
      }
    },
    async handlecomment() {
      let cookie = this.$cookies.get("user");
      let user_id = cookie.data[0].user_id;
      const formData = new FormData();
      formData.append("post_id", this.id);
      formData.append("user_id", user_id);
      formData.append("comment", this.text_comment);
      formData.append("file", this.file);
      console.log(formData)
      await axios
        .post("http://localhost:8000/addcomment", formData)
        .then((res) => {
          console.log(res);
          if (res.data.success == true) {
            this.text_comment = "";
            this.image_name = "";
            this.$store.dispatch("getcomment", {
              post_id: this.id,
            });
            return this.$store.state.getcomment;
            
          } else {
            this.text_comment = "";
            this.$store.dispatch("getcomment", {
              post_id: this.id,
            });
            return this.$store.state.getcomment;
            
          }
        });
     
    },
    checklike() {
      if (this.$cookies.get("user")) {
        let arr = this.$store.getters.checklike;
        if (arr == true) {
          this.ischecklike = true;
        } else {
          this.ischecklike = false;
        }
      } else {
        this.ischecklike = false;
      }
    },
    handlegetPostUser() {
      let user_id = this.$cookies.get("user").data[0].user_id;
      // console.log(user_id)
      this.$store.dispatch("getPostUser", user_id);
    },
     onFileChange(e) {
      const file = e.target.files[0];
      this.file = e.target.files[0];
      this.image_name = this.file.name
      console.log(file);
    },
  },
  computed: {
    getimageuser() {
      if (this.$cookies.get("user")) {
        this.img = this.$cookies.get("user").data[0].img;
        return this.img;
      } else {
        console.log("chua dang nhap");
      }
    },
    countlike() {
      console.log(this.$store.getters.countlike);
      return this.$store.getters.countlike;
    },
    getpost() {
      return this.$store.state.post;
    },
  },
  watch: {},
};
</script>

<style>
</style>