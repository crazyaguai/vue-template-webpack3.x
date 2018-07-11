<template>
    <div>
        <ul>
            <li v-for="item in langOptions">{{item.label}}</li>
        </ul>
    </div>
</template>

<script>
    import {langOptions} from './config.js'

    export default {
        data() {
            return {
                langOptions,
                lang: 'en'
            }
        },
        computed: {
            title() {
                return langOptions.find(item => {
                    return item.value === this.lang
                }).label
            }
        },
        methods: {
            setLang(lang) {
                this.$i18n.locale = lang
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


