<template>
    <div id="menu">
        <div id="header">
            <b-nav tabs justified>
                <b-nav-item><router-link to='/admin/home'>{{ $t('tc') }}</router-link></b-nav-item>
                <b-nav-item><router-link to='/admin/user_admin'>{{ $t('tk') }}</router-link></b-nav-item>
                <b-nav-item><router-link to='/admin/cat_admin'>{{ $t('dm') }}</router-link></b-nav-item>
                <b-nav-item><router-link to='/admin/post_admin'>{{ $t('bv') }}</router-link></b-nav-item>
                <b-nav-item><router-link to='/admin/t'>Test</router-link></b-nav-item>
            </b-nav>
            <b-button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
                {{entry.title}}
            </b-button>
        </div>
        <div id="conten">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import i18n from '../../i18n';
export default {
   name: 'app',
        components: {
        },
        data() {
            return {
                languages: [
                    { flag: 'us', language: 'en', title: 'English' },
                    { flag: 'es', language: 'es', title: 'Việt Nam' }
                ]
            };
        },
        methods: {
            changeLocale(locale) {
                i18n.locale = locale;
            }
        }
}
</script>
<style>
input.form-control.mr-sm-2 {
    width: 130px;
}
#menu a.nav-link {
    text-decoration: none;
    font-size: 15px;
    margin-top: 0px;
    height: 42px;
    line-height: 37px;
}
div#header {
    margin-bottom: 44px;
    background: lightgrey;
}
div#conten {
    text-align: center;
    background: gainsboro;
}
.input-group-text {
    padding-right: 84px;
    padding-left: 78px;
}
h3 {
    font-family: cursive;
    margin-bottom: 36px;
    font-weight: 700;
}
#header a {
    text-decoration: none;
    font-family: cursive;
    font-weight: 700;
    color: black;
}
#menu li.nav-item:hover {
    background: lightblue;
}
ul.pagination.b-pagination {
    place-content: center;
}
.row.seach {
    width: 453px;
}
.seach .input-group-text {
    height: 38px;
}
.card.text-white {
    padding-bottom: 60px;
}
.card.text-white {
    padding-bottom: 60px;
}
</style>
