<template>
    <div id="header">
        <div class="container">
            <router-link to="/">
                Home
            </router-link>
        </div>
    </div>
</template>

<style lang="less">
@import (less, reference) "../../less/app.less";

#header {
    background: @brand-warning;
    color: #fff;
    height: @header-height;

    .container {
        padding-top: 0;
        padding-bottom: 0;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .logo {
        height: 30px;
    }
}
</style>
