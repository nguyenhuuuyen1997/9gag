<template>
  <div id="app">
    <div class="head-page">
      <header-app />
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/AppHeader.vue"
import $ from 'jquery'
export default {
  name: 'app',
  data () {
        return {

        }
    },
    components:{
           "header-app":Header,
    },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
body{
    text-align: none;
    color: #5d6062;
    line-height: 1.4;
    font-size: 14px;
}
.head-page {
  height: 70px ;
}
button,.btn{
    font-size: 14px;
}
ul{
  margin:0;
  padding:0;
  list-style-type: none;
}
a{
  text-decoration: none;
}
/* css index */
iframe {
    width: 600px;
    height: 400px;
}

.container-page a{
  text-decoration: none;
}
.gag_tag {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 12px;
}
.gag_tag a {
    display: block;
    height: 32px;
    line-height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
    background-color: rgba(0,0,0,.06);
    color: #000;
    text-decoration: none;
    padding: 0 8px;
    border-radius: 2px;
    text-align: center;
}
.icon-post img {
  width: 200%;
  height: 95%;
}

.icon-post p {
  font-size: 12px;
  margin: 15px 0;
}
.icon-post a{
  padding: 5px 0;
  color: #999;
}
.title-post a{
  font-size: 16px;
  color: #000;

}
.title-post a:hover{
  color:#09f;
}
.media-post {
  width: 90%;
  height: 100%;
}
.media-post img{
  width: 100%;
}
.conment-post {
  width: 90%;
  height: 100%;
}
.post_view {
  margin: 20px 10px;
  border-top: 1px solid rgba(0,0,0,.1);
}
.left {
    float: left!important;
}
.left-up {
  float: left;
}
.btn-vote {
    overflow: hidden;
}
.btn-vote ul {
  float: left;
}
.btn-vote li {
    padding: 0 10px 0 0;
    float: left;
    list-style: none;
  }

.btn-vote span i{
  margin: 0;
}
.btn-vote-post {
  background: white;
  color: #000;
}
.btn-facebook a{
   color: #fff;
}
.btn-facebook {
  width: 100%;
  height: 40px;
  background-color: #3b5998;
  border-color: rgba(0,0,0,0.2);
}
.btn-facebook:hover {
  background-color:#4c70ba;
}
.btn-pinterets {
  background-color: #bd081c;
  width: 100%;
  height: 40px;
  border-color: rgba(0,0,0,0.2);
}
.btn-pinterets:hover{
 background-color: #ee0a23;
 
}
.btn-social {
    position: relative;
    padding-left: 44px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.btn-social:hover {
    color: #eee;
}
.btn-social :first-child {
    position: absolute;
    left: 0;
    top: 4px;
    bottom: 0;
    width: 40px;
    padding: 7px;
    font-size: 16px;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,0.2);
}
.btn_facebook {
  /* background: #1877f2; */
  width: 110%;
  color: white;
  font-size: x-large;
}
a.btn-connect-option.facebook:hover{
  background: #2d72d9;
}
a.btn-connect-option {
    width: 100%;
    display: block;
    font-size: 20px;
    font-weight: 700;
    background-color:#4367b0;
    color: #fff;
    line-height: 28px;
    text-align: center;
    padding: 15px 15px 15px 60px;
    border-radius: 2px;
    text-decoration: none;    
}
.social-btn .btn {
    margin: 10px 0;
    font-size: 15px;
    text-align: left; 
    line-height: 32px;  
    height: 50px;     
}
.social-btn .btn i {
    float: left;
    margin: 4px 15px  0 5px;
    min-width: 15px;
}
.btn_dowloadapp {
  margin:  5% 0;
}
.btn_dowloadapp img {
  width: 100%;
}
.dow_app_store {
  margin: 0 0 0 16%;
}

/* end css index */
/* css header */

.vertical-menu::-webkit-scrollbar { 
    display: none;
}
.vertical-menu a {
  /* background-color: #eee; */
  color: black;
  display: block;
  padding: 5px;
  margin: 1px 0;
  text-decoration: none;
}

.vertical-menu a:hover {
  background-color:#f7f7f7;
  width: 180px;
}

.vertical-menu a.active {
  width: 180px;
  background-color: #f7f7f7;
  color: black;
}

.header {
    box-sizing: border-box;
    width: 100%;
    border-style: solid;
    height: 100px;
    margin-bottom: 30px;
    
  }
  .header-page {
    width: 100%;
    height: auto;
    position: absolute;
  }
  #header-nav {
   width: 100%;
   position: fixed;
   top: 0; /*Nằm trên cùng*/
   z-index: 10;
  }
  .navbar {
    padding: 0 0;
  }
  .navbar-collapse{
    padding:0 8%;
  }
  .fa{
    font-size: x-large;
  }
  .header-nav .fa:hover {
    color: white;
  }
  .nav_form_head {
    margin: 0 10px;
  }
  .navbar-nav>li>a {
    line-height: 0px;
}
  .dark-mode {
  background-color: black;
  color: white;
  }
  .search-box{
  position: absolute;
  top: 49px;
  right: 10.7%;
  width: 120px;
  display: none;
}
.search-box input[type="text"]{
  width: 200px;
  padding: 5px 10px;
  margin-left: 23px;
  border: 1px solid #D80B15;
  outline: none;
}

.search-box input[type="button"]{
  width: 80px;
  padding: 5px 0;
  background: #D80B15;
  color: #fff;
  margin-left: -6px;
  border: 1px solid #D80B15;
  outline: none;
  cursor: pointer;
}
.active {
  background: #09f;
}
.nav-link {
 padding: 0 1rem;
}
.logo-header img{
  width: 50%;
}

/* end header */
/* css sidebar */

.sidebar-container {
  position: fixed;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  color: #fff;
}
.content-container {
  padding-top: 20px;
}
.sidebar ul li i{
  float: left;
  margin: 0 10px 0 0;
  padding: 3px;
  color: black;
}
.sidebar li img {
  width: 24px;
  float: left;
  margin: -3px 10px 0 0;
}
.vertical-menu::-webkit-scrollbar { 
    display: none;
}
.vertical-menu a {
  /* background-color: #eee; */
  color: black;
  display: block;
  padding: 8px;
  margin: 1px 0;
  text-decoration: none;
}

.vertical-menu a:hover {
  background-color:#f7f7f7;
  width: 180px;
}

.vertical-menu a.active {
  width: 180px;
  background-color: #f7f7f7;
  color: black;
}

/* end sidebar */
.comment-cancel {
  margin: 0 0 0 30%;
  float: left;
}
.comment-post{
  margin: 1px 0px 10px 70%;
}
.comment-action {
  width: 30px;
}

.right-comment-text{
  margin: 0 0 0 30px;
}
.list-comment {
  margin: 10px 0 10px 0;
}
.drop_comment {
  border: none;
  background: white;
  float: right;
}
.comment-reply a{
  text-decoration: none;
  color: #999;
  font-size: 12px;
}
.comment_list {
  border-top: 1px solid #999;
  margin: 10px 0;
}
.btn-secondary {
  background: white;
  color: #000;
  border: none;
  font-size: 12px;
}
.btn-secondary:hover{
  background: white;
  color: #000;
}
.btn-secondary:active{
  background: white;
  color: #000;
}
@import './assets/css/mobile.css';
</style>