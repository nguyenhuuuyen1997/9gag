<template>
  <div id="wapper">
      <b-card
        overlay
        img-src="https://images.nintendolife.com/c039b050990bc/rayman-legends-definitive-edition-artwork.900x250.jpg"
        img-alt="Card Image"
        text-variant="white"
        :title="$t('home.ti')"
        :sub-title="$t('home.su')"
      >
        <b-card-text>
          {{ $t('home.ba') }}
        </b-card-text>
      </b-card>
    <h1>{{ $t('home.thongke') }}</h1>
    <div v-for="(bar,index) in bars" :key="index" class="row mb-1">
      <div class="col-sm-2">{{ bar.variant }}:</div>
      <div class="col-sm-10 pt-1">
        <b-progress :value="bar.value" :label="bar.label" :variant="bar.variant" :key="bar.variant"></b-progress>
      </div>
    </div>
    <div>
      <b-row>
          <b-col>
             <div class="danh_gia">
                <label for="rating-lg-no-border" class="mt-3">{{ $t('home.dg') }}</label>
                <b-form-rating id="rating-lg-no-border" v-model="item.rating" no-border size="lg"></b-form-rating>
                <button class="btn btn-success but" v-on:click="additem()" >{{ $t('home.bg') }}</button>
              </div>
          </b-col>
      </b-row>
      <b-row>
          <b-col>
            <div>
              <h3>{{ $t('home.thongke') }}</h3>
              <b-table striped hover 
              :items="item" 
              :fields="field"
              id="table"
              :per-page="per"
              :current-page="cur"
              >
               <template v-slot:cell(index)="data">
                  {{ data.index + 1 }}
                </template>
                <template v-slot:cell(like)="">
                  <i class="fa fa-thumbs-up" style="font-size:22px"></i>
                </template>
              </b-table>
              
              <b-pagination
                v-model="cur"
                :total-rows="row"
                :per-page="per"
                aria-controls="table"
              ></b-pagination>
            </div>
          </b-col>
          <b-col>
            <div>
              <h3>{{ $t('home.bl') }}</h3>
              <b-table striped hover 
              :items="items" 
              :fields="fields"
              id="my-table"
              :per-page="perPage"
              :current-page="currentPage"
              >
              <template v-slot:cell(index)="data">
                  {{ data.index + 1 }}
              </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
            </div>
          </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name:'home',
    data() {
      return {
        results: [],
        get_like:[],
        perPage: 3,
        currentPage: 1,
        per: 3,
        rating:'',
        cur: 1,
        bars: [
          { variant: 'Lịch sử truy cập', value: 75 },
          { variant: 'Số người đăng nhập', value: 75 },
          { variant: 'Số người đã thích', value: 75 },
          { variant: 'Lượng truy cập web', value: 75 },
          { variant: 'Số lượng bài viết', value: 75 },
          { variant: 'Lượng bài viết mới', value: 75 },
          { variant: 'Tài khoản mới lập', value: 75 }
        ],
        fields: [
            { key: "index", label:'STT', sortable: true },
            { key: "name", label:'Tài khoản', sortable: true },
            { key: "post_id", label:'Bài viết', sortable: true },
            { key: "comment", label:'Bình Luận', sortable: false },       
           ],
        field: [
          { key: "index", label:'STT', sortable: false },
            { key: "name", label:'Tài khoản', sortable: true },
            { key: "post_id", label:'Bài viết', sortable: true },
            { key: "like", label:'Thích', sortable: false },       
           ],
      }
    },
    mounted : function() {
      this.timer = setInterval(() => {
        this.bars.forEach(bar => (bar.value = 25 + Math.random() * 75))
      }, 2000)
      axios.get('http://localhost:8000/home/get')
      .then(req=>{
            this.results = req.data; 
      })
      .catch( error =>{
        console.log(error)
      })
      axios.get('http://localhost:8000/home/get_like')
      .then(req=>{
            this.get_like = req.data; 
      })
      .catch( error =>{
        console.log(error)
      })
      },
      
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    },
    methods: {

    },
    computed: {
    items(){
      return this.results;
    },
    item(){
      return this.get_like;
    },
    rows() {
        return this.items.length
      },
    row() {
        return this.item.length
      }
    },
    watch: {
    lengthRow(value) {
        this.perPage = this.lengthRow;
      },
    lengthRow(value) {
        this.per = this.lengthRow;
      }
    }
  }
</script>
<style>
#wapper h1 {
    font-size: 40px;
    font-family: cursive;
    font-weight: bolder;
    margin-bottom: 30px;
    margin-top: 20px;
    color: initial;
}
#wapper .mb-1, .my-1 {
    margin-bottom: 1.25rem!important;
}
#wapper .col-sm-2 {
    font-size: 15px;
    font-weight: 800;
    font-family: cursive;
    text-align: left;
    color: unset;
}
path {
  color: red;
}
</style>