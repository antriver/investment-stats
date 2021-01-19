<template>
    <main id="app"
          :key="$route.fullPath">
        <!-- <Header />-->
        <router-view class="view" />
    </main>
</template>

<script>
import Header from './components/Header.vue';

export default {
    components: {
        Header,
    },
};
</script>

<style lang="less">
@import "../less/app.less";
</style>
