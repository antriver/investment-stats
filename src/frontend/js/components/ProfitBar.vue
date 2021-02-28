<template>
    <div class="profit-bar">
        <div>
            <span>
                {{ totalInvested | currency('USD')  }}
                <small>Invested</small>
            </span>
        </div>

        <div>
            <span>
                <Difference :value="totalPl"
                            as-currency="USD"></Difference>
                <small>
                    Profit (<Difference :value="percentagePl"
                                        :as-percentage="true"></Difference>)                      </small>
            </span>
        </div>

        <div>
            <span>
                {{ totalValue | currency('USD')  }}
                <small>Total Value</small>
            </span>
        </div>
    </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import Difference from '@/frontend/js/components/Difference.vue';

export default {
    name: 'ProfitBar',

    components: {
        Difference,
    },

    props: {
        assets: {
            type: Array,
            required: true,
        },
    },

    computed: {
        totalInvested() {
            return this.assets.reduce((total, asset) => {
                if (asset.totalUsdPaid !== null) {
                    return (new BigNumber(total)).plus(asset.totalUsdPaid)
                        .decimalPlaces(2)
                        .toNumber();
                }
                return total;
            }, 0);
        },

        totalPl() {
            return this.assets.reduce((total, asset) => {
                if (asset.usdProfit !== null) {
                    return (new BigNumber(total)).plus(asset.usdProfit)
                        .decimalPlaces(2)
                        .toNumber();
                }
                return total;
            }, 0);
        },

        percentagePl() {
            return (new BigNumber(this.totalPl))
                .dividedBy(this.totalInvested)
                .multipliedBy(100)
                .decimalPlaces(2)
                .toNumber();
        },

        totalValue() {
            return this.assets.reduce((total, asset) => {
                if (asset.totalUsdPaid !== null) {
                    return (new BigNumber(total)).plus(asset.usdValue)
                        .decimalPlaces(2)
                        .toNumber();
                }
                return total;
            }, 0);
        },
    },
};
</script>

<style lang="less">
.profit-bar {
    height: 80px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.075) 0 2px 4px 0;
    border-top: 1px solid rgb(241, 243, 245);

    > div {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 18px;

        &:not(:first-child) {
            border-left: 1px solid rgb(241, 243, 245);
        }
    }
}
</style>
