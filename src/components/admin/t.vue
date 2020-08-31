<template>
    <div>
        <line-chart :data="dataturn"></line-chart>
        <pie-chart :data="dataturn"></pie-chart>
        <column-chart :data="dataturn"></column-chart>
        <bar-chart :data="dataturn"></bar-chart>
        <area-chart :data="dataturn"></area-chart>
    </div>
</template>
<script>
export default {
    name: 'daea',
    data() {
        return {
            dataturn: {
                '2017-01-04': 6,
                '2017-02-04': 7,
                '2017-03-04': 1,
                '2017-04-04': 2,
                '2017-05-04': 4,
                '2017-06-04': 8,
                '2017-07-04': 9,
                '2017-08-04': 2,
                '2017-09-04': 4,
                '2017-10-04': 5,
                '2017-11-04': 3,
                '2017-12-04': 2,
            }
 
        }
        
    }
}
</script>