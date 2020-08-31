<template>
  <div >
    <div
      class="comment_list"
      v-for="(getcomment,index) in getcomment"
      :key="index"
    >
      <b-row >
        <b-col class="icon-post" md="1" lg="1">
          <img style="clip-path: circle();" :src=getcomment.img />
        </b-col>
        <b-col md="9" lg="9" offset="1" class="right-comment-text">
          <b-row class="comment-reply">
            <a href="#">{{ getcomment.name }}</a>
            <!-- Example split danger button -->
            <!-- <delete-comment-app /> -->
              <div class="btn-group">
                <button type="button" class="drop_comment dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu" style=" font-size: 12px;">
                  <a class="dropdown-item" href="javascrip:void(0)"  @click="handledelecomment(getcomment.comment_id,getcomment.user_id)">Delete</a>
                  <a class="dropdown-item" href="#">Copy link</a>
                  <a class="dropdown-item" href="#">Report Comment</a>
                  <a class="dropdown-item" href="#">I just don't it</a>
                </div>
              </div>
          </b-row>
          <b-row>
            <h5>{{ getcomment.comment }}</h5>
          </b-row>
          
        </b-col>
      </b-row>
      <b-row >
        <b-row  v-if="getcomment.img_comment" class="list_comment_img">
          <b-col  offset-md="2" >
            <img :src="'http://localhost:8000/' + getcomment.img_comment" />
          </b-col>
          </b-row>
          <!-- <b-row class="comment-reply">
            <a href="javascript:void(0)"  @click="handleReplyComment()">Reply</a>
          </b-row> -->
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import deletecomment from "./action_comment"
export default {
  props: ["id"],
  data() {
    return {
     
    };
  },
  //  components: {
  //   "<delete-comment-app": comment,
  // },
  // mounted(){
  //   this.handlegetcomment(this.id);
  // },
  created() {
    this.$store.dispatch("getcomment", {
          post_id: this.id,
        });
    },
  // },
  // mounted() {
  //   console.log(this.id);
  //   let obj = {};
  //   obj.post_id = this.id;
  //   axios
  //     .post("http://localhost:8000/getcomment", obj)
  //     .then((req) => {
  //       this.list_comment = req.data;
  //       let list_comment = req.data;
  //       console.log(list_comment);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },
  computed:{
    getcomment(){
      return this.$store.state.getcomment;
    }
  },
  methods:{
    async handledelecomment(comment_id,user_id){
      // console.log(comment_id);
      // console.log(user_id);
      if( this.$cookies.get("user").data[0].user_id==user_id){
       await this.$store.dispatch("deletecomment", {
          comment_id: comment_id,
        });
        this.$store.dispatch("getcomment", {
          post_id: this.id,
        });
         return this.$store.state.getcomment;
      }else{
        alert('bạn không thể xóa comment này')
      }
    },
    
  },
};
</script>

<style>
.comment_list a {
  width: 200;
}
.list_comment_img img{
  width: 90%;
  height: 90%;
}
</style>