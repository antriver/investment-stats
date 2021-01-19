<template>
    <div class="asset-card">
        <div class="asset-card__name">
            {{ asset.name }}
            <small>{{ asset.amount | round(4) }} {{ asset.asset }}</small>
        </div>

        <div class="asset-card__value">
            <span v-if="asset.gbpProfit !== null"
                  :class="[asset.gbpProfit < 0 ? 'text-danger' : 'text-success']">
                {{ asset.gbpProfit | profit }}
            </span>
            <small>{{ asset.gbpValue | currency }}</small>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    props: {
        asset: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style lang="less">
.asset-card {
    background: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    small {
        color: #999;
        display: block;
        font-size: 13px;
    }

    &__name {
        flex-grow: 1;

        small {
            margin-top: 3px;
        }
    }

    &__value {
        flex-grow: 0;
        flex-shrink: 0;
        font-size: 15px;
        text-align: right;
    }
}
</style>
