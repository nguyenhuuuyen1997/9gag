<template>
  <div class="btn-group">
    <button
      type="button"
      class="drop_comment dropdown-toggle dropdown-toggle-split"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <div class="dropdown-menu" style=" font-size: 12px;">
      <a
        class="dropdown-item"
        href="javascrip:void(0)"
        @click="handledelecomment(list_comment.comment_id,list_comment.user_id)"
      >Delete</a>
      <a class="dropdown-item" href="#">Copy link</a>
      <a class="dropdown-item" href="#">Report Comment</a>
      <a class="dropdown-item" href="#">I just don't it</a>
    </div>
  </div>
</template>

<script>
export default {
    props:["list_comment"],
    data(){
        return{

        }
    },
    methods:{
    async handledelecomment(comment_id,user_id){
      console.log(this.list_comment);
      // console.log(user_id);
      if( this.$cookies.get("user").data[0].user_id==user_id){
      let obj = {};
      obj.comment_id = comment_id;
      await axios
      .post("http://localhost:8000/deletecomment", obj)
      .then((res) => {
          console.log(res);
          if (res.data.success == true) {
            console.log(rendercomment)
            this.renderdeletecomment++;
            this.$forceUpdate()
            // console.log(this.renderdeletecomment++)
            // this.rederpost++;
          } else {
            this.$bvModal.hide("bv-modal-previewimage");
            this.notiteMsg = "Đăng bài thất bại!";
            this.$bvModal.show("bv-modal-success");
          }
        });
      // this.rendercomment++;
      }else{
        alert('bạn không thể xóa comment này')
      }
    },
    
  },
    mounted:function (){
        console.log(this.list_comment)
    }
};
</script>

<style>
</style>