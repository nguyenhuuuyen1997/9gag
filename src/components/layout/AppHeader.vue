<template>
  <header>
    <div class="header-page">
      <div class="header-nav">
        <b-navbar toggleable="lg" type="dark" variant="dark" id="header-nav">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#" class="logo-header">
                <img src="@/assets/header.png" @click="backhome($event)" />
              </b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form class="nav_form_head">
                <i class="fa fa-adjust" aria-hidden="true" v-on:click="handledarkmode()"></i>
              </b-nav-form>
              <b-nav-form class="nav_form_head">
                <i class="fa fa-search" aria-hidden="true" @click="handlesreach()"></i>
                <div class="search-box">
                   <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
                </div>
              </b-nav-form>
              <b-nav-form v-if="logged === false">
                  <b-nav-item href="javascript:void(0)" @click="checklogin()">{{ $t("header.login") }}</b-nav-item>
                  <b-nav-item
                    href="javascript:void(0)"
                    class="active"
                    @click="checkuploads()"
                  >{{ $t("header.singup") }}</b-nav-item>
                </b-nav-form>
                <b-nav-form  v-if="logged === true">
                  <b-nav-item href="javascript:void(0)" @click="check_logout()"> 
                    {{ user_name }}
                    <!-- <b-img class="icon-user" :src=user_img rounded="circle" alt="Circle image"> </b-img> -->
                      </b-nav-item>
                  <b-nav-item
                    href="javascript:void(0)"
                    class="active"
                    @click="checkuploads()"
                  >{{ $t("header.upload") }}</b-nav-item>
                  <b-nav-item>
                    <select name="LeaveType" @change="onChange($event)" v-model="key">
                        <option v-for="entry in languages" :key="entry.title" 
                        :value="entry.language ">{{entry.title}}</option>
                    </select>
                  </b-nav-item>
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

        <!-- popup login -->
        <b-modal
          id="bv-modal-login"
          modal-class="medium"
          title="Login"
          hide-footer
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          :centered="true"
        >
          <div class="d-block text-center">
            <form @submit.prevent="handleLogin" method="post">
              <!-- <span class="title_success">{{messageAction}}</span> -->
              <div class="content-popups">
                <h2>
                  <b>Log In</b>
                </h2>
                <p>Connect with a social network</p>
                <div class="alert alert-danger" v-if="error">
                  <p>{{ error }}</p>
                </div>
                <div class="row loginfagole">
                  <div class="col-md-6">
                      <v-facebook-login app-id="1301895466686211"></v-facebook-login>
                    <!-- <div class="text-center social-btn">
                      <a href="#" class="btn btn-primary btn-block">
                      
                        <i class="fa fa-facebook"></i>
                        <b>Facebook</b>
                      </a>
                    </div> -->
                  </div>
                  <div class="col-md-6">
                     <!-- <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin> -->

                    <div class="text-center social-btn">
                      <a href="#" class="btn btn-danger btn-block">
                        <i class="fa fa-google"></i>
                        <b>Google</b>
                      </a>
                    </div>
                  </div>
                </div>
                <p>Log in with your Email</p>
                <div class="form-group">
                  <p>
                    <b>Email</b>
                  </p>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your username"
                    v-model="username"
                    required
                  />
                </div>
                <div class="form-group">
                  <p>
                    <b>Password</b>
                  </p>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    v-model="password"
                    required
                  />
                </div>
                <button class="btn btn-primary">log In</button>
              </div>
              <div class="popup-footer">
                <span>
                  <center>
                    <b>Get 9GAG app</b>
                  </center>
                </span>

                <div class="row btn_dowloadapp">
                  <div class="col-md-4 dow_app_store">
                    <a href="#">
                      <img src="./appstore.png" />
                    </a>
                  </div>
                  <div class="col-md-4 dow_app_googleplay">
                    <a href="#">
                      <img src="./googleplay.png" />
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </b-modal>

        <!-- popup sing up -->
        <b-modal
          id="bv-modal-singup"
          modal-class="medium"
          title="Login"
          hide-footer
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          :centered="true"
        >
          <div class="d-block text-center">
            <form @submit.prevent="handlesingup" method="post">
              <!-- <span class="title_success">{{messageAction}}</span> -->
              <div class="content-popups">
                <h2>
                  <b>Hey there!</b>
                </h2>
                <p>9GAG is your best source for fun. Share anything you find interesting, get real responses from people all over the world, and discover what makes you laugh</p>
                <div class="alert alert-danger" v-if="error">
                  <p>{{ error }}</p>
                </div>
                <div class="row loginfagole">
                  <div class="col-md-6">
                    <div class="text-center social-btn">
                      <a href="#" class="btn btn-primary btn-block">
                        <i class="fa fa-facebook"></i>
                        <b>Facebook</b>
                      </a>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="text-center social-btn">
                      <a href="#" class="btn btn-danger btn-block">
                        <i class="fa fa-google"></i>
                        <b>Google</b>
                      </a>
                    </div>
                  </div>
                </div>
                <p>
                  Sign up with your
                  <a href="javascript:void(0)" @click="openregister()">Email</a>
                </p>
                <p>
                  Have an account?
                  <a href="javascript:void(0)" @click="openlogin()">Log in</a>
                </p>
                <div class="row btn_dowloadapp">
                  <div class="col-md-4 dow_app_store">
                    <a href="#">
                      <img src="./appstore.png" />
                    </a>
                  </div>
                  <div class="col-md-4 dow_app_googleplay">
                    <a href="#">
                      <img src="./googleplay.png" />
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </b-modal>
        <!-- end popup sing up -->

        <!-- popup register -->
        <b-modal
          id="bv-modal-register"
          modal-class="medium"
          title="Login"
          hide-footer
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          :centered="true"
        >
          <div class="d-block text-center">
            <form @submit.prevent="handleregister" method="post">
              <!-- <span class="title_success">{{messageAction}}</span> -->
              <div class="content-popups">
                <h2>
                  <b>Become a member</b>
                </h2>
                <div class="alert alert-danger" v-if="error">
                  <p>{{ error }}</p>
                </div>
                <div class="form-group">
                  <p>
                    <b>Full name</b>
                  </p>
                  <input type="text" class="form-control" v-model="fullname" required />
                </div>
                <div class="form-group">
                  <p>
                    <b>Email</b>
                  </p>
                  <input type="text" class="form-control" v-model="email" required />
                </div>

                <div class="form-group">
                  <p>
                    <b>Password</b>
                  </p>
                  <input type="password" class="form-control" v-model="pass" required />
                </div>
                <div class="form-group">
                  <p>
                    <b>Again Password</b>
                  </p>
                  <input type="password" class="form-control" v-model="pass_again" required />
                </div>
                <button class="btn btn-primary">log In</button>
                <div class="row btn_dowloadapp">
                  <div class="col-md-4 dow_app_store">
                    <a href="#">
                      <img src="./appstore.png" />
                    </a>
                  </div>
                  <div class="col-md-4 dow_app_googleplay">
                    <a href="#">
                      <img src="./googleplay.png" />
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </b-modal>
        <!-- end register -->

        <!-- popup thong bao -->
        <b-modal
          id="bv-modal-success"
          title="Thông báo!"
          hide-footer
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          :centered="true"
        >
          <div class="d-block text-center">
            <span class="title_success" v-html="notiteMsg"></span>
            <div class="popup-footer">
              <b-col cols="12">
                <b-button
                  type="button"
                  variant="danger"
                  class="mt-3"
                  @click="$bvModal.hide('bv-modal-success')"
                >Đóng</b-button>
              </b-col>
            </div>
          </div>
        </b-modal>
        <!-- popup uploads post  -->

        <b-modal id="bv-modal-newpost" hide-footer>
          <div class="d-block text-center">
            <h4>
              <b>Uploads a Post</b>
            </h4>
            <p>Choose how you want to upload the post</p>
            <div class="conten-popups">
              <div class="conten-top-popups text-center">
                <input
                  style="display: none;"
                  id="file-upload"
                  type="file"
                  ref="file"
                  @change="onFileChange"
                />
                <label id="lable_inputfile" for="file-upload">
                  <i class="fa fa-file" style="font-size:80px;margin-top:50px"></i>
                  <b-row>
                    <span style="margin:5px 31%;">Drop image to upload or</span>
                  </b-row>
                  <b-row class="gag_tag choosefile">
                    <a href="#">Choose files...</a>
                  </b-row>
                </label>
                <b-row style="width:90%;margin:10px auto;">
                  <b-col
                    md="4"
                    lg="4"
                    class="conten-last-popups-uploads"
                    @click="opennewpostimage()"
                  >
                    <i
                      class="fa fa-picture-o"
                      aria-hidden="true"
                      style="font-size:40px;margin-top:30px"
                    ></i>
                    <p>Paste image URL</p>
                  </b-col>
                  <b-col
                    md="4"
                    lg="4"
                    class="conten-last-popups-uploads"
                    @click="opennewpostvideo($event)"
                  >
                    <i
                      class="fa fa-play-circle"
                      aria-hidden="true"
                      style="font-size:40px;margin-top:30px"
                    ></i>
                    <p>Paste Video URL</p>
                  </b-col>
                  <b-col
                    md="4"
                    lg="4"
                    class="conten-last-popups-uploads"
                    @click="opennewpostmeme()"
                  >
                    <i
                      class="fa fa-picture-o"
                      aria-hidden="true"
                      style="font-size:40px;margin-top:30px"
                    ></i>
                    <p>Make meme</p>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </b-modal>

        <!-- end popup post -->

        <!-- popup url image -->
        <b-modal id="bv-modal-newpostimage" hide-footer>
          <div class="d-block">
            <h4>
              <b>Upload from URL</b>
            </h4>
            <p>Type or paste Image URL</p>
            <div class="conten-popups text-center">
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="https://"
                v-model="url_media"
              />

              <!-- <vue-img-preview
                input-name= "profile_picture"
                default-image= "data:image/jpeg;base64,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"
                bg-color= "#ffffff"
                text-color= "#000000"
                alt-text="profile picture"
                  button-text="Choose image"
                  picker-style="regular"
              ></vue-img-preview>-->
            </div>
            <div class="action-comment-right">
              <div class="comment-action comment-cancel">
                <b-button
                  style="width: 70px;height:35px;background: #ddd;"
                  class="btn btn-light"
                  @click="handleClosenewpostimage($event)"
                >Cancel</b-button>
              </div>
              <div class="comment-action comment-post">
                <button
                  style="width: 65px;height:35px;"
                  class="btn btn-primary"
                  @click="handlepriviewurl()"
                >Next</button>
              </div>
            </div>
          </div>
        </b-modal>
        <!-- end popup url image -->

        <!-- popup preview Image -->
        <b-modal id="bv-modal-previewimage" hide-footer>
          <form @submit.prevent="handlePost" method="post">
            <div class="d-block text-center">
              <h4>
                <b>Give your post a title</b>
              </h4>
              <p>An accurate, descriptive title can help people discover your post.</p>
              <div class="conten-popups text-center" id="body_preview">
                <b-row class="row_priview">
                  <b-col md="3" lg="3">
                    <div class="preview-image">
                      <img v-if="url" :src="url" />
                      <img v-if="url_media" :src="url_media" />
                    </div>
                  </b-col>
                  <b-col md="9" lg="3">
                    <textarea
                      class="textarea_title_post"
                      id="jsid-upload-title"
                      placeholder="Describe your post..."
                      data-minlength="3"
                      data-maxlength="280"
                      v-model="textarea_title"
                    ></textarea>
                  </b-col>
                </b-row>
                <b-row class="row_priview">
                  <b-col md="12" lg="12">
                    <div class="form-group row">
                      <label for="inputPassword" class="col-form-label">Tag</label>
                      <div class="col-sm-10">
                        <input class="input_title_post" placeholder="tag1,tag2,tag3" />
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="row_priview">
                  <b-col md="12" lg="12">
                    <div class="field checkbox">
                      <label>
                        <p class="lable_priview">This is sensitive</p>
                        <!-- <input
                          class="input_checkbox_priview"
                          id="jsid-upload-is-nsfw"
                          type="checkbox"
                          v-model="ipstatus"
                        />-->
                        <input
                          class="input_checkbox_priview"
                          type="checkbox"
                          id="com-chien-toi"
                          value="1"
                          v-model="checkbox_status"
                        />
                      </label>
                    </div>
                  </b-col>
                </b-row>

                <b-row class="row_priview">
                  <select class="form-control" v-model="selected" required>
                    <option
                      v-for="option in data_theme"
                      v-bind:key="option.theme_id"
                      v-bind:value="option.theme_id"
                    >{{ option.theme_post }}</option>
                  </select>
                </b-row>
              </div>
              <div class="action-priview">
                <b-row>
                  <div class="action-priview-cancel">
                    <b-button
                      style="width: 70px;height:35px;background: #ddd;"
                      class="btn btn-light"
                      @click="handleClosePrivieww($event)"
                    >Cancel</b-button>
                  </div>
                  <div class="action-priview-next">
                    <button style="width: 65px;height:35px;" class="btn btn-primary">Next</button>
                  </div>
                </b-row>
              </div>
            </div>
          </form>
        </b-modal>
        <!-- end preview Image -->
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
import { vueImgPreview } from "vue-img-preview";
import VFacebookLogin from 'vue-facebook-login-component'
import GoogleLogin from 'vue-google-login';
// let func_index = require("../view/index")
import i18n from '../../i18n';
export default {
  created() {
    this.check_login();
  },
  data() {
    return {
      params: {
        client_id: "xxxxxx"
      },
       renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      },
      selected: "",
      logged: false,
      isAction: false,
      user: "",
      results: {
        results: [],
      },
      username: "",
      password: "",
      error: "",
      notiteMsg: "",
      fullname: "",
      pass: "",
      pass_again:'',
      email: "",
      login: "",
      uploads: null,
      user_name: "",
      url: null,
      url_video:null,
      file: "",
      textarea_title: "",
      checkbox_status: [],
      url_media: "",
      user_img:'',
      searchQuery:'',
      isUploads:'',
      timestamp:null,
      key: "",
      languages: [
          { flag: 'us', language: 'en', title: 'English' },
          { flag: 'vn', language: 'vn', title: 'Viet Nam' }
      ]
    };
  },
  components: {
      VFacebookLogin,
       GoogleLogin
    },
  mounted: function () {
   
  },
  computed:{
    data_theme(){
      return this.$store.state.themes;
    }
  },
  methods: {
    onChange(event) {
            console.log(event.target.value)
            i18n.locale = event.target.value;
        },
    getNow(){
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.timestamp = date+' '+time
      return this.timestamp;
    },
    onSuccess(googleUser) {
            console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        },
    resetinput(){
      this.url_media = '';
      this.textarea_title='';
      this.isUploads='';
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      // this.isUploads='uploads'
      console.log(this.file)
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const filetype = ["audio/mpeg","audio/ogg","audio/mp3"]
      if(allowedTypes.includes(file.type)){
        this.isUploads='uploads_image'
      }
      else if(filetype.includes(file.type)){
        this.isUploads='uploads_audio'
      }
      else{
        this.isUploads='uploads_video'
      }
      this.$bvModal.hide("bv-modal-newpost");
      console.log(file);
      this.$bvModal.show("bv-modal-previewimage");
      console.log(this.isUploads)
    },
    handlesreach() {
      $(".search-box").toggle();
      $("input[type='text']").focus();
    },
    handledarkmode() {
      var element = document.body;
      element.classList.toggle("dark-mode");
    },
    checklogin() {
      if (this.$cookies.get("user")) {
        this.logout();
      } else {
        this.$bvModal.show("bv-modal-login");
      }
    },
    checkuploads() {
      if (this.$cookies.get("user")) {
        this.uploadpost();
      } else {
        this.$bvModal.show("bv-modal-singup");
      }
    },
    async handleLogin() {
      let obj = {};
      obj.username = this.username;
      obj.password = this.password;
      console.log(obj);
      await axios.post("http://localhost:8000/users/auth", obj).then((res) => {
        console.log(res);
        if (res.data.success == false) {
          this.$bvModal.hide("bv-modal-login");
          this.notiteMsg = "Đăng nhập thất bại!";
          this.$bvModal.show("bv-modal-success");
        } else {
          VueCookies.set("user", res, "1m");
          this.$bvModal.hide("bv-modal-login");
          this.notiteMsg = "Đăng nhập thành công!";
          this.$bvModal.show("bv-modal-success");
        }
      });
      this.check_login();
    },
    handleregister() {
      let obj = {};
      obj.fullname = this.fullname;
      obj.email = this.email;
      obj.pass = this.pass;
      console.log(obj);
      axios.post("http://localhost:8000/users/register", obj).then((res) => {
        if (res.data.success == false) {
          this.$bvModal.hide("bv-modal-login");
          this.notiteMsg = "Sai tài khoản hoặc mật khẩu!";
          this.$bvModal.show("bv-modal-success");
        } else {
          VueCookies.set("user", res, "1m");
          this.$bvModal.hide("bv-modal-login");
          this.notiteMsg = "Đăng nhập thành công!";
          this.$bvModal.show("bv-modal-success");
        }
      });
    },

    async handlePost() {
      // console.log(this.$cookies.get("user").data[0].user_id)
      // console.log(this.checkbox_status)
      // console.log(this.selected)
      this.getNow()
      const formData = new FormData();
      formData.append("textarea_title", this.textarea_title);
      formData.append("theme_id", this.selected);
      formData.append("status", this.checkbox_status);
      formData.append("user_id", this.$cookies.get("user").data[0].user_id);
      formData.append("post_media", this.url_media);
      formData.append("is_uploads", this.isUploads);
      formData.append("time_at", this.timestamp);
      formData.append("file", this.file);
      console.log(formData);
      await axios
        .post("http://localhost:8000/addpost", formData)
        .then((res) => {
          console.log(res);
          if (res.data.success == true) {
            this.$bvModal.hide("bv-modal-previewimage");
            this.notiteMsg = "Đăng bài thành công !";
            this.$bvModal.show("bv-modal-success");
            this.$store.dispatch('getdatapost');
            return this.$store.state.results;
            // this.getdatapost();
            // console.log(this.rederpost)
            // this.rederpost++;
            
          } else {
            this.$bvModal.hide("bv-modal-previewimage");
            this.notiteMsg = "Đăng bài thất bại!";
            this.$bvModal.show("bv-modal-success");
          }
        });
        this.resetinput()
    },
    uploadpost() {
      this.$bvModal.show("bv-modal-newpost");
    },
    openregister() {
      this.$bvModal.hide("bv-modal-singup");
      this.$bvModal.show("bv-modal-register");
    },
    openlogin() {
      this.$bvModal.hide("bv-modal-singup");
      this.$bvModal.show("bv-modal-login");
    },
    backhome(e) {
      e.preventDefault();
      this.$router.push("/");
    },
    // logout() {
    //   let isDel = confirm("Bạn có muốn xóa bản ghi này không?");
    //   if (isDel) {
    //     this.$cookies.remove("user");
    //     this.$router.push("/");
    //   }
    // },
    opennewpostimage() {
      this.$bvModal.hide("bv-modal-newpost");
      this.isUploads='image'
      this.$bvModal.show("bv-modal-newpostimage");
    },
    handleClosePrivieww(e) {
      this.$bvModal.hide("bv-modal-previewimage");
    },
    handleClosenewpostimage(e) {
      this.$bvModal.hide("bv-modal-newpostimage");
    },
    handlepriviewurl() {
      this.$bvModal.hide("bv-modal-newpostimage");
      this.$store.dispatch('checkuploads',{
        status:1
      })
      this.$bvModal.show("bv-modal-previewimage");
    },
    //check login
    check_login() {
      if (this.$cookies.get("user")) {
        let cookie = this.$cookies.get("user");
        let user_name = cookie.data[0].name;
        let user_img = cookie.data[0].img;
         this.user_img = user_img;
        this.user_name = user_name;
        console.log(user_name);
        this.login = user_name;
        this.uploads = "Uploads";
        //gan logged
        this.logged = true;
        console.log("loged ==> ");
      } else {
        this.login = "Log in";
        this.logged = false;
        console.log("not loged ==> ");
      }
    },
    // check logout
    check_logout() {
      let isDel = confirm("Bạn có muốn đăng xuất không?");
      if (isDel) {
        this.$cookies.remove("user");
        this.$router.push("/");
        this.logged = false;
      }
    },
    opennewpostvideo(e){
      this.$bvModal.hide("bv-modal-newpost");
      this.isUploads='video'
      this.$bvModal.show("bv-modal-newpostimage");
      // let url = "https://about.9gag.com/app";
      // var win = window.open(url, '_blank');
      //  win.focus();
      // window.location.replace("https://about.9gag.com/app");
    },
    opennewpostmeme(){
      this.$bvModal.hide("bv-modal-newpost");
      this.$bvModal.show("bv-modal-newpostimage");
       let url = "https://memeful.com/generator?ref=9gag";
      var win = window.open(url, '_blank');
       win.focus();
    }
  },  
};
</script>

<style>
.conten-top-popups {
  width: 100%;
}
#lable_inputfile {
  width: 90%;
  margin: 0 auto;
  height: 240px;
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.choosefile a {
  background: #09f;
  color: white;
  margin: 15px 38%;
}
.conten-last-popups-uploads {
  height: 120px;
  border: 1px solid #ccc;
}
.conten-last-popups-uploads:hover {
  background: #ddd;
}
/* .other-source {
  width: 90%;
  margin: 0 auto;
}
.other-source-uploads {
  width: 33.33%;
  height: 120px;
  border: 1px solid #ccc;
  float:left;
  position: relative;
} */
.preview-image img {
  width: 70%;
  margin: 5px auto;
}
.textarea_title_post {
  height: 58px;
  border: none;
  border-radius: 0;
  width: 320px;
  margin-top: 0;
  font-size: 16px;
  outline: 0;
  line-height: 20px;
  margin: 6px 0;
  display: block;
}
/* #body_preview {

} */
.row_priview {
  width: 100%;
  border: 1px solid #ccc;
  margin: 5px auto;
}
.input_title_priview {
  border: none;
  width: 100%;
}
.lable_tag_priview {
  background: white;
  width: 20px;
  border: none;
}
.lable_priview {
  float: left;
  height: 100%;
  margin: 7px 18px 0px -20px;
}
.input_checkbox_priview {
  margin-left: 320px;
  height: calc(1.5em + 0.75rem + 2px);
}
.field .checkbox {
  height: calc(1.5em + 0.75rem + 2px);
}
.field .checkbox label {
  margin-bottom: 0.01rem;
}
.input_title_post {
  height: 22px;
  border: none;
  border-radius: 0;
  width: 100%;
  margin-top: 0;
  font-size: 16px;
  outline: 0;
  line-height: 20px;
  margin: 6px 0;
  display: block;
}
.action-priview-cancel {
  margin: 0px 2% 0px 68%;
}
</style>