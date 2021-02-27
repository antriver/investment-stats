<template>
    <div class="assets-table">
        <table class="table">
            <thead>
                <tr>
                    <th>Coin</th>
                    <th v-for="col in columns"
                        :key="col[1]"
                        class="cursor--pointer"
                        @click.prevent="setSortBy(col[0])">
                        {{ col[1] }}
                        <i v-if="sortBy === col[0] && sortDirection === 'DESC'"
                           class="fa fa-chevron-down"></i>
                        <i v-if="sortBy === col[0] && sortDirection === 'ASC'"
                           class="fa fa-chevron-up"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asset in sortedAssets"
                    :key="asset.asset">
                    <!-- Coin -->
                    <td>
                        <div class="flex flex--align-center flex--justify-start">
                            <img v-if="asset.logoUrl"
                                 :src="asset.logoUrl"
                                 :alt="asset.name"
                                 class="asset-card__logo" />
                            <span>
                                <strong>{{ asset.asset }}</strong>
                                <small>{{ asset.name }}</small>
                            </span>
                        </div>
                    </td>

                    <!-- Units -->
                    <td>{{ asset.amount | round(4) }}</td>

                    <!-- Avg. Paid -->
                    <td>
                        <span v-if="asset.averageUsdPaid">
                            {{ asset.averageUsdPaid | currency('USD') }}
                        </span>
                    </td>

                    <!-- Current Price -->
                    <td>{{ asset.usdPrice | currency('USD') }}</td>

                    <!-- Invested -->
                    <td>
                        <span v-if="asset.totalUsdPaid">
                            {{ asset.totalUsdPaid | currency('USD') }}
                        </span>
                    </td>

                    <!-- P/L ($) -->
                    <td>
                        <Difference v-if="asset.usdProfit !== null"
                                    :value="asset.usdProfit"
                                    as-currency="USD"></Difference>
                    </td>

                    <!-- P/L (%) -->
                    <td>
                        <Difference v-if="asset.percentageProfit !== undefined"
                                    :value="asset.percentageProfit"
                                    :as-percentage="true"></Difference>
                    </td>

                    <!-- Current Value -->
                    <td>{{ asset.usdValue | currency('USD') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Difference from '@/frontend/js/components/Difference.vue';
import { cloneDeep } from 'lodash';

export default {
    name: 'AssetsTable',

    components: {
        Difference,
    },

    data() {
        return {
            sortBy: 'usdProfit',
            sortDirection: 'DESC',

            columns: [
                ['amount', 'Units'],
                ['averageUsdPaid', 'Avg. Paid'],
                ['usdPrice', 'Current Price'],
                ['totalUsdPaid', 'Invested'],
                ['usdProfit', 'P/L ($)'],
                ['percentageProfit', 'P/L (%)'],
                ['usdValue', 'Current Value'],
            ],
        };
    },

    props: {
        assets: {
            type: Array,
            required: true,
        },
    },

    computed: {
        sortedAssets() {
            const assets = cloneDeep(this.assets);
            this.sortAssets(assets, this.sortBy, this.sortDirection);
            return assets;
        },
    },

    methods: {
        setSortBy(sortBy) {
            if (this.sortBy === sortBy) {
                this.sortDirection = this.sortDirection === 'DESC' ? 'ASC' : 'DESC';
            } else {
                this.sortBy = sortBy;
                this.sortDirection = 'DESC';
            }
        },

        sortAssets(assets, sortBy, sortDirection) {
            assets.sort((a, b) => {
                const aVal = parseFloat(a[sortBy]) || 0;
                const bVal = parseFloat(b[sortBy]) || 0;

                if (aVal === bVal) {
                    return 0;
                }

                if (sortDirection === 'ASC') {
                    return aVal > bVal ? 1 : -1;
                }
                return aVal > bVal ? -1 : 1;
            });
        },
    },
};
</script>

<style lang="less">
.assets-table {
    background: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.075) 0 2px 4px 0;
    padding: 10px;

    .table {
        th,
        td {
            text-align: right !important;
            vertical-align: middle !important;

            &:first-child {
                text-align: left !important;
            }
        }
    }
}
</style>
