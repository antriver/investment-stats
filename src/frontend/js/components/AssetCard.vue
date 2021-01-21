<template>
    <div class="asset-card">
        <img v-if="asset.logoUrl"
             :src="asset.logoUrl"
             class="asset-card__logo" />

        <div class="asset-card__name">
            {{ asset.name }}
            <small>
                {{ asset.amount | round(4) }}
                {{ asset.asset }}
                <Difference v-if="asset.amountChange"
                            :value="asset.amountChange"></Difference>
            </small>
        </div>

        <div class="asset-card__value">
            <template v-if="profitDisplay === 'fiat'">
                <Difference v-if="asset.gbpProfit !== null"
                            :value="asset.gbpProfit"
                            :as-currency="true"></Difference>
                <small>{{ asset.gbpValue | currency }}</small>
            </template>

            <template v-if="profitDisplay === 'percent'">
                <Difference v-if="asset.percentageProfit !== undefined"
                            :value="asset.percentageProfit"
                            :as-percentage="true"></Difference>
            </template>
        </div>
    </div>
</template>

<script>
import Difference from '@/frontend/js/components/Difference.vue';
import Vue from 'vue';

export default Vue.extend({
    components: {
        Difference,
    },
    props: {
        asset: {
            type: Object,
            required: true,
        },
        profitDisplay: {
            type: String,
            default: 'fiat',
        },
    },
});
</script>

<style lang="less">
.asset-card {
    background: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.075) 0 2px 4px 0;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
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
