<template>
  <div id="wapper">
	  <div>
		  <h3>{{ $t('taikhoan.qltk') }} </h3>
		  <form  @submit.prevent="additem" method="post">
			<b-row class="justify-content-md-center" >
                    <b-col cols="6">           
                        <b-input-group :prepend="$t('taikhoan.dn')">
                            <input type="text" class="form-control" name="name"  v-model="item.name" required :placeholder="$t('pla')">
                        </b-input-group>
                    </b-col>
            
                </b-row>
		
                       <b-row class="justify-content-md-center">
                    <b-col cols="6">
                        <b-input-group :prepend="$t('taikhoan.mk')">
                            <input type="text" class="form-control" name="pass" v-model="item.pass" required :placeholder="$t('pla')">
                        </b-input-group>
                    </b-col>
                </b-row>
			<b-row class="justify-content-md-center">
                    <b-col cols="6">
                      <b-input-group :prepend="$t('taikhoan.em')">
                            <input type="text" class="form-control" name="email"  v-model="item.email" required :placeholder="$t('pla')">
                        </b-input-group>
                    </b-col>
                </b-row>
			<b-row class="justify-content-md-center">
                    <b-col cols="6">
						          <b-input-group :prepend="$t('taikhoan.st')">
                            <b-form-select
                                name="decentralization"
                                v-model="item.decentralization"
                                :options="decen"
                                ></b-form-select>
                        </b-input-group>
                    </b-col>
                </b-row>
        <b-row class="justify-content-md-center">
                    <b-col cols="6">
                      <b-input-group :prepend="$t('taikhoan.anh')">
                            <input type="text" class="form-control" name="img"  v-model="item.img" :placeholder="$t('pla')">
                            <!-- <b-form-file v-model="item.img"   name="img"  style="display: none;" id="file-upload" class="mt-3" plain></b-form-file>
                            <label id="load" for="file-upload">Upload</label>
                            Selected file: {{ img ? img.name : '' }} -->
                        </b-input-group>
                    </b-col>
                </b-row>
			<div class="form-group">
				  <button class="btn btn-primary but">{{ $t('taikhoan.tm') }}</button>
			</div>
		</form>
	  </div>
	<div>
		<div>
              <b-row>
              <b-col style="text-align: initial;">
                <span>{{ $t('hienthi') }}</span>
                <select v-model="lengthRow" value="3">
                  <option value="3">3</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>{{ $t('banghi') }}</span>
                
              </b-col>
              <b-col style="text-align: right;">
                <p>
                  {{ $t('hienthi') }} {{ $t('banghi') }}
                  <strong>1 - {{ lengthRow }}</strong> {{ $t('tts') }}
                  <strong>{{ rows }}</strong> {{ $t('banghi') }}
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
                :keyword='keyword'
                :per-page="perPage"
                :current-page="currentPage">
                <template v-slot:cell(index)="data">
                  {{ data.index + 1 }}
                </template>
                 <template  v-slot:cell(image)="data">
                  <iframe :src=data.item.img alt="" width="50" height="50"></iframe>
                </template>
                <template v-slot:cell(action)="action">
                <b-button variant="success" v-b-modal.modal-lg v-on:click="edititem(action.item)" >Edit</b-button>
                <b-button variant="outline-primary" @click="deleteitem(action.item)" >Delete</b-button>
                </template>
                </b-table>
                <b-pagination
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
                ></b-pagination>
              </div>
            </div>
	</div>
    <b-modal id="modal-lg" size="lg" hide-footer title="Cập nhập" >
      <form @submit.prevent="updateitem" method="post">
 				<b-row class="justify-content-md-center" >
                    <b-col cols="6">           
                        <b-input-group :prepend="$t('taikhoan.dn')">
                            <input type="text" class="form-control" name="name"  v-model="item.name" required :placeholder="$t('pla')">
                        </b-input-group>
                    </b-col>
            
                </b-row>
		
                       <b-row class="justify-content-md-center">
                    <b-col cols="6">
                        <b-input-group :prepend="$t('taikhoan.mk')">
                            <input type="text" class="form-control" name="pass" v-model="item.pass" required :placeholder="$t('pla')">
                        </b-input-group>
                    </b-col>
                </b-row>
			<b-row class="justify-content-md-center">
                    <b-col cols="6">
                      <b-input-group :prepend="$t('taikhoan.em')">
                            <input type="text" class="form-control" name="email"  v-model="item.email" required :placeholder="$t('pla')">
                        </b-input-group>
                    </b-col>
                </b-row>
			<b-row class="justify-content-md-center">
                    <b-col cols="6">
						          <b-input-group :prepend="$t('taikhoan.st')">
                            <b-form-select
                                name="decentralization"
                                v-model="item.decentralization"
                                :options="decen"
                                ></b-form-select>
                        </b-input-group>
                    </b-col>
                </b-row>
        <b-row class="justify-content-md-center">
                    <b-col cols="6">
                      <b-input-group :prepend="$t('taikhoan.anh')">
                            <input type="text" class="form-control" name="img"  v-model="item.img" :placeholder="$t('pla')">
                            <!-- <b-form-file v-model="item.img"   name="img"  style="display: none;" id="file-upload" class="mt-3" plain></b-form-file>
                            <label id="load" for="file-upload">Upload</label>
                            Selected file: {{ img ? img.name : '' }} -->
                        </b-input-group>
                    </b-col>
                </b-row>
        <div class="form-group">
            <button class="btn btn-success but">UPDATE</button>
        </div>
      </form>
    </b-modal>
     <!-- popup thong bao -->
        <b-modal
          id="bv-modal-success"
          title="Thông báo!"
          hide-footer
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          :centered="true"
          
        >
          <div class="d-block text-center" >
            <span class="title_success" v-html="notiteMsg"></span>
            <div class="popup-footer">
              <b-col cols="12">
                <b-button
                  type="button"
                  variant="danger"
                  class="mt-3"
                  @click="load(),$bvModal.hide('bv-modal-success')"
                >Đóng</b-button>
              </b-col>
            </div>
          </div>
        </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'row',
  data () {
    return {
    item :{},
    perPage: 10,
    file: null,
    keyword: '',
    name: '',
    notiteMsg: '',
    img: null,
    pass: '',
    email:'',
    currentPage: 1,
    lengthRow: 10,
    results: [],
		// fields: [
    //     { key: "index", label:'STT', sortable: true, thClass: "col1" },
		//     { key: "name", label: this.$t('taikhoan.acti') , sortable: true },
		//     { key: "pass", label:'Mật Khẩu', sortable: true },
		//     { key: "email", label:'Email', sortable: true },
    //     { key: "decentralization", label:'Quyền', sortable: true },
    //     { key: "image", label:'Ảnh', sortable: true },
    //     { key: "action", label: this.$t('taikhoan.acti'), sortable: false,thClass: "col100" }
    //     ],

		decen: [
            { value: 'người dùng chung', text: 'người dùng chung' },
            { value: 'Quản trị viên', text: 'Quản trị viên' }                
        ]
    }
  },
  mounted :
   function(){
	  axios.get('http://localhost:8000/user/get')
	  .then(req=>{
		  this.results = req.data;
		  // console.log(req);
	  })
	  .catch( error =>{
		  console.log(error)
	  })
  },
  methods: {
	  additem(){
		  axios.post('http://localhost:8000/user/additem',this.item).then(res => {
        console.log(res);
       if (res.data.success == false) {
          this.notiteMsg = "Tên hoặc email đã tồn tại";
          this.$bvModal.show("bv-modal-success");
        } else {
          this.notiteMsg = "Thêm tài khoản thành công!";
          this.$bvModal.show("bv-modal-success");
        }
		  })
	  },
	  edititem(item){
      var data_edit = item; 
      console.log(data_edit)
      this.item = data_edit;
	  },
	  updateitem(index){
     
		  axios.post('http://localhost:8000/user/update',this.item).then(res => {
       
			   if (res.data.success == false ) {
          this.notiteMsg = "Trùng email hãy nhập lại!";
          this.$bvModal.show("bv-modal-success");
        } else {
          this.notiteMsg = "Thay đổi thành công!";
          this.$bvModal.show("bv-modal-success");
        }
		  })
    },
    load(){
      window.location.reload();
    },
	  deleteitem(item){
		  axios.post('http://localhost:8000/user/delete',item).then((res) => {
      this.item={};
       window.location.reload();
		  })
	  }
  },
  computed: {
    fields() {
            return [
              { key: "index", label:'STT', sortable: true, thClass: "col1" },
              { key: "name", label: this.$t('taikhoan.name') , sortable: true },
              { key: "pass", label: this.$t('taikhoan.pass') , sortable: true },
              { key: "email", label: this.$t('taikhoan.email') , sortable: true },
              { key: "decentralization", label: this.$t('taikhoan.dece') , sortable: true },
              { key: "image", label: this.$t('taikhoan.img') , sortable: true },
              { key: "action", label: this.$t('taikhoan.acti'), sortable: false,thClass: "col100" }
            ]
            },
    items(){
      return this.keyword
                ? this.results.filter(item => item.name.includes(this.keyword) || item.email.includes(this.keyword))
                : this.results
    },
    rows() {
        return this.items.length
      },
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
.form-group {
    text-align-last: center;
}
#wapper iframe {
    width: 63px;
    height: 59px;
}
#load {
  border: 1px solid crimson;
    padding-left: 17px;
    padding-right: 20px;
    height: 30px;
    line-height: 1px;
    margin-bottom: -1.5rem;
    padding: 18px;
}
</style>