<template>
<router-view>
   <div class="container">      
    <div class="row"> 
      <center> <label><h2>Đăng Nhập</h2></label></center>                  
      <div >                      
        <div class="btn-group">                            
        <button type="button" class="btn btn-primary"><i class="fa fa-facebook-official	
          "></i>   Facebook
        </button>                     
        </div>                 
      </div>                  
      <div >                      
        <div class="btn-group">                            
        <button type="button" class="btn btn-danger"><i class="	fa fa-google-plus-square"></i> Google+
        </button>                     
        </div>                 
      </div>                               
      </div>  
      <center> <label><h4>Hoặc đăng nhập bằng tài khoản của bạn</h4></label></center> 
    <div class="col-lg-6 well">              
      <div class="row">                    
      <div class="col-sm-6 form-group">  
        <div class="input-group">
          <div class="input-group-addon">
        <i class="fa fa-envelope-o"></i> 
          </div>
          <input class="form-control" id="email" name="email" type="text" placeholder="Email"/>
        </div>                
      </div>                  
      <div class="col-sm-6 form-group">                                           
        <div class="input-group">
          <div class="input-group-addon">
        <i class="fa fa-envelope-o"></i> 
          </div>
          <input class="form-control" id="email" name="email" type="text" placeholder="Mật khẩu"/>
        </div>                 
      </div>              
      </div>               
      <div class="row">                                 
                  
      </div>                                              
                
    </div>  
    <div class="col-sm-12 text-center">                 
      <button type="button" class="btn btn-block btn-info">Đăng nhập</button>                 
    </div>    
    </div>
</router-view>
</template>

<script>
export default {
 


}
</script>

<style>

.container {
   width: 80%;
   border: 2px;
   border-style: solid;
   clear: left;
   padding-top: 20px;
   background-color:lightyellow
 }
 .well{
   width: 70%;
   margin-left: 15%;
 }
  .btn-group{
    margin-left: 38%;
    width: 25%;
    padding: 10px;
  }
  .btn-group .btn {
    width: 100%;
  }
  .form-group {
    width: 70%;
    clear: left;
    margin-left: 10%;
  }
  .form-control {
    margin-left: 10px;
  }
  .text-center {
    width: 74%;
    margin-left: 13%;
    margin-bottom: 20px;
  }

</style>