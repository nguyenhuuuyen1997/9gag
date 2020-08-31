<template>
   <b-row>
        <b-col  md="2" lg="2" >
            <left-app/>
        </b-col>
        <b-col  md="7" lg="7" >
            <rightpage-app  />
        </b-col>
        <b-col  md="3" lg="3" >
            <right-app/>
        </b-col>
    </b-row>
</template>

<script>
import Appleft from "./layout/Appleft"
import rightpage from "./view/right-conten"
import Right from "./layout/Right"
export default {
  name: 'app',
  data () {
        return {
        }
    },
    components:{
           "left-app":Appleft, 
           "rightpage-app":rightpage, 
           "right-app":Right, 
    },
}
</script>

<style>


/* @import './assets/css/mobile.css'; */
</style>