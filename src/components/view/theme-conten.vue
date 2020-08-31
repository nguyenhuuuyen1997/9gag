<template>
  <div>
      <div
        class="post_view"
        v-for="(results,index) in data_theme_post"
        :key="results.theme_id"
        :product="index"
      >
        <div class="icon-post">
          <b-row>
            <b-col md="1" lg="1">
              <img src="./avatar.jpg" />
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
              width="100%"
              height="409"
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
              <!-- <div class="example">
                <div class="rating" id="rating2">
                    <button class="btn btn-default like">Like</button>
                    <span class="likes">0</span>
                    <button class="btn btn-default dislike">Dislike</button>
                    <span class="dislikes">0</span>
                </div>
              </div>-->
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
                        <i class="fa fa-comment-o" aria-hidden="true"></i>
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
                <span>Pinterest</span>

                <!-- <a  class="btn btn-lg btn-social btn-facebook btn-pinterets">
                  <i class="fa fa-pinterest"></i> Pinterest
                </a>-->
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
  props: ["id"],
  data(){
      return{
        data_theme_post:{
            data_theme_post:[]
        },
      }
  },
  mounted() {
    let obj = {};
    obj.theme_id = this.id;
    axios
      .post("http://localhost:8000/theme/querytheme", obj)
      .then((req) => {
        this.data_theme_post = req.data;
        let data_theme_post = req.data;
        console.log(data_theme_post);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>