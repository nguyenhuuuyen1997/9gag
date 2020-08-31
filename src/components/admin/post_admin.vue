<template>
  <div id="user">
    <div>
	  </div>
            <h3>Quản Lý Bài Viết</h3>
            <div>
              <b-row>
              <b-col style="text-align: initial;">
                <span>Hiển thị</span>
                <select v-model="lengthRow" value="3">
                  <option value="3">3</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>bản ghi</span>
              </b-col>
              <b-col style="text-align: right;">
                <p>
                  Hiển thị bản ghi
                  <strong>1 - {{ lengthRow }}</strong> trên tổng số
                  <strong>{{ rows }}</strong> bản ghi
                </p>
              </b-col>
              </b-row>
              <b-row class="seach">
                <b-col>
                  <b-input-group>
                <b-form-input v-model="keyword" placeholder="Search" type="text"></b-form-input>
                <b-input-group-text slot="append">
                  <b-btn class="p-0" :disabled="!keyword" variant="link" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
                </b-input-group-text>
                  </b-input-group>
                </b-col>
              </b-row>
              <div>
                <b-table
                striped hover
                id="my-table"
                :items="items"
                :fields="fields"
                :keyword="keyword"
                :per-page="perPage"
                :current-page="currentPage">
                <template v-slot:cell(index)="data">
                  {{ data.index + 1 }}
                </template>
                <template  v-slot:cell(image)="data">
                  <iframe :src=data.item.post_media alt="" width="50" height="50"></iframe>
                </template>
                <template v-slot:cell(sta)="data">
                  <b-badge v-if="data.item.status" variant="success">Bài Nổi bật</b-badge>
                  <b-badge v-else variant="warning">Bài viết mới</b-badge>
                </template>
               <template v-slot:cell(isActive)="data">
                  <b-badge v-if="data.item.acti" variant="success">Đã phê duyệt</b-badge>
                  <b-badge v-else variant="warning">Chưa phê duyệt</b-badge>
                </template>
                <template v-slot:cell(action)="action">
                <b-button variant="warning" @click="pheduyet(action.item),$bvModal.show('bv-modal-example')">Phê duyệt</b-button>
                <b-button variant="warning" @click="chuyen(action.item),$bvModal.show('bv-modal-example')">Bài nổi bật</b-button>
                <b-button variant="danger" @click="deletecut(action.index)" >Xóa bài  </b-button>
                
                </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                ></b-pagination>

                <p class="mt-3">Current Page: {{ currentPage }}</p>
              </div>
              <b-modal id="bv-modal-example" hide-footer>
                <template v-slot:modal-title>
                  Phê Duyệt
                </template>
                <div class="d-block text-center">
                  <h3>Phê duyệt bài viết thành công </h3>
                </div>
                <b-button class="mt-3" block @click="load(),$bvModal.hide('bv-modal-example')">Thoát</b-button>
              </b-modal>
              <b-modal id="bv-modal-example" hide-footer>
                <template v-slot:modal-title>
                  Phê Duyệt
                </template>
                <div class="d-block text-center">
                  <h3>Phê duyệt bài viết thành công </h3>
                </div>
                <b-button class="mt-3" block @click="load(),$bvModal.hide('bv-modal-example')">Thoát</b-button>
              </b-modal>
            </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "post",
  props: ["post"],
  data () {
    return {
    cut :{},
    keyword: '',
     perPage: 10,
      currentPage: 1,
      lengthRow: 10,

			results: [],
    fields: [
        { key: "index", label:'STT', sortable: true, thClass: "col1" },
        { key: "post_title", label:'Tiêu đề', sortable: true },
        { key: "image", label:'Nội Dung', sortable: true },
        { key: "theme_post", label:'Danh mục', sortable: true },
        { key: "sta", label:'Trạng thái', sortable: true },
        { key: "name", label:'Tài khoản đăng ', sortable: true },
        { key: "isActive", label:'Hoạt động ', sortable: true },
        { key: "action", label:'Thao tác', sortable: false,thClass: "col100" }
    ]
    }
  },
  mounted : function(){
	  axios.get('http://localhost:8000/posts/posts')
	  .then(req=>{
		  this.results = req.data;
		  console.log(req);
	  })
	  .catch( error =>{
		  console.log(error)
	  })
  },
  methods: {
    async pheduyet(item){
       console.log(item)
     await axios.post('http://localhost:8000/posts/update',item).then(res => {
			 
			   console.log(res);
		  })
    },
    async chuyen(item){
       console.log(item)
     await axios.post('http://localhost:8000/posts/update_post',item).then(res => {
			 
			   console.log(res);
		  })
    },
    load(){
      window.location.reload();
    },
	  deletecut(index){
		var data_edit = this.results[index];
		  this.cut = data_edit;
		  axios.post('http://localhost:8000/posts/deletepost', this.cut).then((res) => {
			this.cut={};
			   console.log(this.cut);
		window.location.reload();
		  })
	  }
  },
  computed: {
    items(){
      return this.keyword
                ? this.results.filter(item => item.post_title.includes(this.keyword))
                : this.results
    },
    rows() {
        return this.items.length
      }
  },
  watch: {
  lengthRow(value) {
      this.perPage = this.lengthRow;
    }
  }
}
</script>

<style>
.input-group-text {
    width: 80px;
    place-content: center;
}
.row.justify-content-md-center {
    margin: auto;
    margin-bottom: 25px;
}
button.btn.btn-danger {
    width: 91px;
}
iframe {
    width: 246px;
    height: 161px;
}
</style>
