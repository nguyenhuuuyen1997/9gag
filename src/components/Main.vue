<template>
   <b-row>
        <b-col  md="2" lg="2" >
            <left-app/>
        </b-col>
        <b-col  md="7" lg="7" >
            <index-app  />
        </b-col>
        <b-col  md="3" lg="3" >
            <right-app/>
        </b-col>
    </b-row>
</template>

<script>
import Appleft from "./layout/Appleft"
import index from "./view/index"
import Right from "./layout/Right"
export default {
  name: 'app',
  data () {
        return {
        }
    },
    components:{
           "left-app":Appleft, 
           "index-app":index, 
           "right-app":Right, 
    },
}
</script>

<style>
body{
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

@import './assets/css/mobile.css';
</style>