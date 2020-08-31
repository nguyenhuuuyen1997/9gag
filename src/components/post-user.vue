<template>
   <b-row>
        <b-col  md="2" lg="2" >
            <left-app/>
        </b-col>
        <b-col  md="7" lg="7" >
            <postuser-app :user_id=user_id />
        </b-col>
        <b-col  md="3" lg="3" >
            <right-app/>
        </b-col>
    </b-row>
</template>

<script>
import Appleft from "./layout/Appleft"
import postuser from "./view/user_post"
import Right from "./layout/Right"
export default {
  name: 'app',
  props:["user_id"],
  data () {
        return {
            // user_id:this.user_id,
        }
    },
    components:{
           "left-app":Appleft, 
           "postuser-app":postuser, 
           "right-app":Right, 
    },
    created(){
        // console.log(this.user_id)
    }
}
</script>

<style>

</style>