<template>
    <div class="index">
        <Language></Language>
        <div>{{$t('common.a')}}</div>
    </div>
</template>

<script>
    import Language from '@/lang/language.vue'
    export default {
        components:{
            Language
        },
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .index{
        color: red;
    }
</style>

