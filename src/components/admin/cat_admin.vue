<template>
  <div id="user">
    <div>
        <h3>Quản lý Danh Mục</h3>
		  <form>
                <b-row class="justify-content-md-center">
                    <b-col cols="6">
                        <b-input-group prepend="Danh mục">
                            <input type="text" class="form-control" name="theme_post" v-model="cut.theme_post" required placeholder="Nhập vào đây">
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="justify-content-md-center">
                    <b-col cols="6">
                        <b-input-group prepend="Hình ảnh danh mục">
                            <input type="text" class="form-control" name="theme_image" v-model="cut.theme_image" required placeholder="Nhập vào đây">
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <div class="form-group">
                            <button class="btn btn-primary but" v-on:click="addcut()" >Thêm mới</button>
                        </div>
                    </b-col>
                </b-row>
		</form>
	  </div>

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
                <div id="table">
                <b-table
                striped hover
                id="my-table"
                :items="items"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage">
                <template v-slot:cell(index)="data">
                  {{ data.index + 1 }}
                </template>
                <template  v-slot:cell(image)="data">
                  <iframe :src=data.item.theme_image alt="" width="50" height="50"></iframe>
                </template>
                <template v-slot:cell(action)="action">
                <b-button variant="success" v-b-modal.modal-lg v-on:click="editcut(action.item)" >Edit</b-button>
                <b-button variant="outline-primary" @click="deletecut(action.index)" >Delete</b-button>
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
            </div>
            <b-modal id="modal-lg" size="lg" title="Cập nhập">
              <form>
                <b-row class="justify-content-md-center">
                    <b-col cols="6">
                        <b-input-group prepend="Danh mục">
                            <input type="text" class="form-control" name="theme_post" v-model="cut.theme_post" required placeholder="Nhập vào đây">
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="justify-content-md-center">
                    <b-col cols="6">
                        <b-input-group prepend="Hình ảnh danh mục">
                            <input type="text" class="form-control" name="theme_image" v-model="cut.theme_image" required placeholder="Nhập vào đây">
                        </b-input-group>
                    </b-col>
                </b-row>
                <div class="form-group">
                  <button class="btn btn-primary but" v-on:click="updatecut()" >
                          Cập nhập
                        </button>
                </div>
		          </form>
              <template v-slot:modal-footer="{ cancel}">
                <b-button size="sm" variant="danger" @click="cancel()">
                  Cancel
                </b-button>
                
              </template>
            </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'row',
  data () {
    return {
    cut :{},
    keyword: '',
    perPage: 10,
    currentPage: 1,
    lengthRow: 10,
		results: [],
    fields: [
        { key: "index", label:'id', sortable: true, thClass: "col1" },
        { key: "theme_post", label:'Danh mục', sortable: true },
        { key: "image", label:'Hình ảnh danh mục', sortable: true },
        { key: "action", label:'Thao tác', sortable: false,thClass: "col100" }
    ],
    }
  },
  mounted : function(){
	  axios.get('http://localhost:8000/cat/cat')
	  .then(req=>{
          this.results = req.data; 
	  })
	  .catch( error =>{
		  console.log(error)
	  })
  },
  methods: {
	  addcut(){
		  axios.post('http://localhost:8000/cat/addcat',this.cut).then(response => {
		   console.log("response");
			 window.location.reload();
		  })
	  },
	  editcut(cut){
      var data_edit = cut;
		  this.cut = data_edit;
	  },
	  updatecut(index){
		  axios.post('http://localhost:8000/cat/updatecat',this.cut).then(res => {
			  this.cut={};
			   console.log(this.results);
		  })
	  },
	  deletecut(index){
      var data_edit = this.results[index];
        this.cut = data_edit;
        axios.post('http://localhost:8000/cat/deletecat', this.cut).then((res) => {
        this.cut={};
        console.log(this.cut);
        window.location.reload();
		  })
	  }
  },
  computed: {
    items(){
      return this.keyword
                ? this.results.filter(itemu => itemu.theme_post.includes(this.keyword) )
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
.col-6 {
    -webkit-box-flex: 0;
    flex: 12 0 50%;
    max-width: 80%;
}
.input-group-text {
    width: 80px;
    place-content: center;
}
.row.justify-content-md-center {
    margin: auto;
    margin-bottom: 25px;
}
.form-group {
    text-align-last: center;
}
#table iframe {
    width: 108px;
    height: 104px;
}
</style>
