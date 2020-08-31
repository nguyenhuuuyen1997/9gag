<template>
  <div class="containre-right">
    <div class="right-post">
      <div  v-for="item in dataright" :key="item.right_id">
        <router-link :to="{name:'right',params:{id:item.right_id }}">
          <img :src="require('@/assets/images/' + item.image)" />
          <!-- <img src='http://localhost:8000/Anh2.jpg' /> -->
          <p>{{ item.post_title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          right_id: 1,
          image: "r1.jpg",
          post_title: "Artist Reimagines Fast Food Mascots As Villains",
        },
        {
          right_id: 2,
          image: "r2.jpg",
          post_title: "Artist Reimagines Fast Food Mascots As Villains",
        },
        { right_id: 3, image: "r3.jpg", post_title: "Best video today haha" },
        {
          post_id: 4,
          image: "r4.jpg",
          post_title:
            "Karens Gone Wild ( COVID-19 Edition) Buy your DVD now and get a free Vaccination",
        },
      ],
    };
  },
  mounted(){
      this.$store.dispatch('getdataright',{
          arr: this.items
      });  
  },
  computed:{
    dataright() {
      return this.$store.state.dataright;
    },
  },
};
</script>

<style>
.containre-right {
  position: relative;
  display: contents;
}
.right-post a {
  text-decoration: none;
  color: black;
  font-size: 14px;
}

.right-post {
  position: fixed;
  width: 20%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  color: #fff;
}
::-webkit-scrollbar {
  width: 0px;
}
.right-post img {
  width: 90%;
}
.right-post a:hover {
  color: #09f;
}
</style>