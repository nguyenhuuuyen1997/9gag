import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        header:{
          login: 'Log In',
          singup: 'Sing Up',
          upload:'Upload'
        },
        sidebar:{
            hot: 'Hot',
            Trending: 'Trending',
          },
          tc: 'Trang chủ',
          tk: 'Tài khoản',
          dm: 'Danh mục bài viết',
          bv: 'Bài viết',
          /////Hiển thị
          hienthi: 'Hiển thị',
          banghi: 'bản ghi',
          tts: 'trên tổng số', 
          pla: 'Nhập vào đây', 
          ////     
          home: {
              thongke: 'Thống kê trang web',
              ba: 'Một số văn bản ví dụ nhanh để xây dựng trên thẻ và tạo nên phần lớn nội dung của thẻ.',
              ti: 'Lớp phủ Hình ảnh',
              su: 'Phụ đề',
              dg: 'Đánh giá sản phẩm của chúng tôi',
              bl: 'Thông kê đã bình luận',
              bg: 'Đánh giá',
          },
          taikhoan: {
              dn: 'Tên đăng nhập',
              mk: 'Mật khẩu',
              em: 'Email',
              st: 'Quyền',
              anh: 'Ảnh',
              tm: 'Thêm mới',
              qltk: 'Quản Lý Tài Khoản',
              acti: 'Thao tác',
              name: 'Tên',
              pass: 'Mật khẩu',
              email: 'Email',
              dece: 'Quyền',
              img : 'Ảnh',
          },
      
    },
    'vn': {
         header:{
          login: 'Đăng nhập',
          singup: 'Đăng ký',
          upload:'Tải lên'
        },
        sidebar:{
            hot: 'Nổi bật',
            Trending: 'Thịnh Hành',
          },
          tc: 'Home',
          tk: 'Account',
          dm: 'Category',
          bv: 'Posts',  
          ///hienthibanghi
          banghi: 'record',
          hienthi: 'Display',
          tts: 'on total',
          pla: 'Enter here',
          ///
          home: {
              thongke: 'Web site statistics',
              ba: 'Some quick example text to build on the card and make up the bulk of the cards content',
              ti: 'Image Overlay',
              su: 'Subtitle',
              dg: 'Rate our products',
              bl: 'Statistics commented',
              bg: 'Evaluate',
            },
          taikhoan: {
              dn: 'User name',
              mk: 'Password',
              em: 'Email',
              st: 'Status',
              anh: 'Image',
              tm: 'Add new',
              qltk: 'Account Management',
              acti: 'Action',
              name: 'Name',
              pass: 'Pass',
              email: 'Email',
              dece: 'decentralization',
              img : 'Image',
          },
       
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'vn', // set fallback locale
    messages, // set locale messages
});

export default i18n;
