
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
      <div class="post_view" v-for="results in results" :key="results.theme_post" :product="results">
        <div class="icon-post">
          <b-row>
           <b-col  md="1" lg="1" >
              <img src="./avatar.jpg">
           </b-col>
           <b-col md="1" lg="1" >
            <a href="#"><p>Funny</p></a>
           </b-col>
           <b-col  md="10" lg="10" >
           </b-col>
          </b-row>
        </div>
        <div class="title-post">
          <a href="#" >
            <h4> {{results.title}}</h4>
          </a>
        </div>
        <div class="media-post">
          <a href="#">
         <iframe width="727" height="409" src= {{ result.content }} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </a>
        </div>
        <div class="post-meta">
          <span>nhnnnn</span>
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

              

            </div> -->
               <ul class="btn-vote left-up">
                <li>
                  
                  <b-button class="btn-vote-post"><span><i aria-hidden="true" class="fa fa-arrow-up"></i></span></b-button>
                </li>
                <li>
                   <b-button class="btn-vote-post"><span><i aria-hidden="true" class="fa fa-arrow-down"></i></span></b-button>
                </li>
              </ul>
              <ul class="btn-vote left-up">
                <li>
                   <b-button class="btn-vote-post"><span><i class="fa fa-comment-o" aria-hidden="true"></i></span></b-button>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <div class="btn_facebook">
                  <a class="btn btn-lg btn-social btn-facebook">
                  <i class="fa fa-facebook fa-fw"></i> Facebook
                  </a>
              </div>
            </div>

            <div class="col-md-3">
              <div class="btn_facebook">
                  <a  class="btn btn-lg btn-social btn-facebook btn-pinterets">
                  <i class="fa fa-pinterest"></i> Pinterest
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="post_view">
        <div class="icon-post">
          <b-row>
           <b-col  md="1" lg="1" >
              <img src="./avatar.jpg">
           </b-col>
           <b-col md="1" lg="1" >
            <a href="#"><p>Funny</p></a>
           </b-col>
           <b-col  md="10" lg="10" >
           </b-col>
          </b-row>
        </div>
        <div class="title-post">
          <a href="#" >
            <h2> Jovovich and her daughter Ever</h2>
          </a>
        </div>
        <div class="media-post">
          <a href="#">
            <img src="./bg_login.jpg">
          </a>
        </div>
        <div class="post-meta">
          <span>sdsd</span>
        </div>
        <div class="conment-post">
          <div class="row">
            <div class="col-md-6">
               <ul class="btn-vote left-up">
                <li>
                  <b-button class="btn-vote-post"><span><i aria-hidden="true" class="fa fa-arrow-up"></i></span></b-button>
                </li>
                <li>
                   <b-button class="btn-vote-post"><span><i aria-hidden="true" class="fa fa-arrow-down"></i></span></b-button>
                </li>
              </ul>
              <ul class="btn-vote left-up">
                <li>
                   <b-button class="btn-vote-post"><span><i class="fa fa-comment-o" aria-hidden="true"></i></span></b-button>
                </li>
              </ul>
            </div>
            <div class="col-md-3">
              <div class="btn_facebook">
                  <a class="btn btn-lg btn-social btn-facebook">
                  <i class="fa fa-facebook fa-fw"></i> Facebook
                  </a>
              </div>
            </div>

            <div class="col-md-3">
              <div class="btn_facebook">
                  <a class="btn btn-lg btn-social btn-facebook btn-pinterets">
                  <i class="fa fa-pinterest"></i> Pinterest
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>  -->
    </div>
   <div>

<!-- Modal log in -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <h2><b>Log In</b></h2>
            <p>Connect with a social network</p>
            <div class="alert alert-danger" v-if="error">
              <p>{{ error }}</p>
            </div>
            <div class="row loginfagole">
              <div class="col-md-6">
              <div class="text-center social-btn">
                  <a href="#" class="btn btn-primary btn-block">
                    <i class="fa fa-facebook"></i><b>Facebook</b></a>
              </div>
              </div>
              <div class="col-md-6">
              <div class="text-center social-btn">
                <a href="#" class="btn btn-danger btn-block">
                  <i class="fa fa-google"></i><b>Google</b></a>
              </div>
              </div>
            </div>
            <p>Log in with your Email</p>
            <div class="form-group">
            <p><b>Email</b></p>
              <input 
                type="text"
                class="form-control"
                placeholder="Enter your username"
                v-model="credentials.username"
                required
              >
            </div>
            <div class="form-group">
            <p><b>Password</b></p>
              <input
                type="password"
                class="form-control"
                placeholder="Enter your password"
                v-model="credentials.password"
                required
              >
            </div>
            <button class="btn btn-primary" @click="submit($event)">log In</button>
          </form>
        </div>
        <div class="modal_footer">
          <span><center><b>Get 9GAG app</b></center></span>
          
          <div class="row btn_dowloadapp">
            <div class="col-md-4  dow_app_store">
              <a href="#">
              <img src="./appstore.png">
              </a>
            </div>
            <div class=" col-md-4 dow_app_googleplay">
              <a href="#">
              <img src="./googleplay.png">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal sing up -->
  <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <h2><b>Hey there!</b></h2>
            <p>9GAG is your best source for fun. Share anything you find interesting, get real responses from people all over the world, and discover what makes you laugh</p>
            <div class="alert alert-danger" v-if="error">
              <p>{{ error }}</p>
            </div>
            <div class="row loginfagole">
              <div class="col-md-6">
              <div class="text-center social-btn">
                  <a href="#" class="btn btn-primary btn-block">
                    <i class="fa fa-facebook"></i><b>Facebook</b></a>
              </div>
              </div>
              <div class="col-md-6">
              <div class="text-center social-btn">
                <a href="#" class="btn btn-danger btn-block">
                  <i class="fa fa-google"></i><b>Google</b></a>
              </div>
              </div>
            </div>
            <p>Sign up with your <a href="javascript:void(0)" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal2">Email</a> </p>
              <p>Have an account? <a href="javascript:void(0)" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#exampleModal">Log in</a> </p>
          </form>
        </div>
        <div class="modal_footer">
        
          
          <div class="row btn_dowloadapp">
            <div class="col-md-4  dow_app_store">
              <a href="#">
              <img src="./appstore.png">
              </a>
            </div>
            <div class=" col-md-4 dow_app_googleplay">
              <a href="#">
              <img src="./googleplay.png">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- modal login email -->
  <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <h2><b>Become a member</b></h2>
            <div class="alert alert-danger" v-if="error">
              <p>{{ error }}</p>
            </div>
            <div class="form-group">
            <p><b>Full name</b></p>
              <input 
                type="text"
                class="form-control"
                v-model="credentials.username"
                required
              >
            </div>
            <div class="form-group">
            <p><b>Email</b></p>
              <input
                type="text"
                class="form-control"
                v-model="credentials.password"
                required
              >
            </div>

             <div class="form-group">
            <p><b>Password</b></p>
              <input
                type="password"
                class="form-control"
                v-model="credentials.password"
                required
              >
            </div>
            <button class="btn btn-primary" @click="submit($event)">log In</button>
          </form>
        </div>
        <div class="modal_footer">
          <span><center><b>Get 9GAG app</b></center></span>
          
          <div class="row btn_dowloadapp">
            <div class="col-md-4  dow_app_store">
              <a href="#">
              <img src="./appstore.png">
              </a>
            </div>
            <div class=" col-md-4 dow_app_googleplay">
              <a href="#">
              <img src="./googleplay.png">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
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
import axios from 'axios'
export default {
  
  data() {
    return {
      item :{},
      results: {
        results: [],
      },
      currentPage:1,
      perPage:5,
      rows:15,
      name: '',
      credentials:{
        username:'',
        password:''
      },
      error:''
    };
  },

  components: {

  },
  mounted : function(){
	  axios.get('http://localhost:8000/get')
	  .then(req=>{
		  this.results = req.data;
		  console.log(req);
	  })
	  .catch( error =>{
		  console.log(error)
	  })
  },
  methods: {
    submit(e){  
    }
  },
  computed: {
    
  },
  watch: {
  
  }
};
</script>


<style >

</style>



like() {
      if(this.likeChecked == false){
        this.likeChecked = true
        this.likes += 1;
        if(this.dislikeChecked == true){
          this.dislikes -= 1;
        
        }
      }
      else if(this.likeChecked == true ){
        this.likeChecked = false
        this.likes -= 1;
      }
    },
    dislike() {
      if(this.dislikeChecked == false){
        this.dislikeChecked = true
        this.dislikes += 1;
        if(this.likeChecked = true){
          this.likes -= 1;
        }
      }
      else{
        this.dislikeChecked = false
        this.dislikes -= 1;
      }
    }