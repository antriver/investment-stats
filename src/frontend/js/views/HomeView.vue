<template>
    <div id="home">
        <div class="left">
            <div class="assets container">

                <header class="header">
                    <button type="button"
                            class="btn btn-default mr-1"
                            @click.prevent="createSnapshot">
                        <i v-if="snapshotInProgress"
                           class="fas fa-spinner fa-spin"></i>
                        <i v-else
                           class="fas fa-sync"></i>
                    </button>

                    <h4 v-if="compareToSnapshot">
                        {{ latestSnapshot.createdAt | relativeTime }}
                        compared to
                        {{ compareToSnapshot.createdAt | relativeTime }}
                    </h4>
                    <h4 v-else-if="latestSnapshot">
                        {{ latestSnapshot.createdAt | relativeTime }}
                    </h4>
                </header>

                <AssetsTable v-if="latestSnapshotAssets"
                             :assets="latestSnapshotAssetsWithProfit"></AssetsTable>

                <!--                <template v-if="compareToSnapshot">-->
                <!--                    <div v-if="compareToSnapshotAssets"-->
                <!--                         class="asset-grid">-->
                <!--                        <AssetCard v-for="asset in comparedAssets"-->
                <!--                                   :profit-display="profitDisplay"-->
                <!--                                   :key="asset.id"-->
                <!--                                   :asset="asset" />-->
                <!--                    </div>-->
                <!--                </template>-->
                <!--                <template v-else-if="latestSnapshotAssets">-->
                <!--                    <div class="asset-grid">-->
                <!--                        <AssetCard v-for="asset in latestSnapshotAssetsWithProfit"-->
                <!--                                   :profit-display="profitDisplay"-->
                <!--                                   :key="asset.id"-->
                <!--                                   :asset="asset" />-->
                <!--                    </div>-->
                <!--                </template>-->
            </div>
        </div>

        <div class="right">
            <h4>Compare To</h4>
            <ul class="comparison-snapshots nav nav-pills nav-stacked">
                <li :class="{active: !compareToSnapshot}">
                    <a @click.prevent="setCompareToSnapshot(null)">None</a>
                </li>
                <li v-for="snapshot in availableSnapshots"
                    v-if="!latestSnapshot || snapshot.id !== latestSnapshot.id"
                    :key="snapshot.id"
                    :class="{active: compareToSnapshot && snapshot.id === compareToSnapshot.id}">
                    <a href="#"
                       @click.prevent="setCompareToSnapshot(snapshot)">
                        {{ snapshot.createdAt | relativeTime }}
                        <small>{{ snapshot.createdAt | friendlyTime }}</small>
                    </a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import AssetCard from '@/frontend/js/components/AssetCard.vue';
import AssetsTable from '@/frontend/js/components/AssetsTable.vue';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { cloneDeep } from 'lodash';

export default {
    components: {
        AssetsTable,
        AssetCard,
    },

    data() {
        return {
            /**
             * @type {Object<string, OwnedAsset>}
             */
            ownedAssets: {},

            /**
             * @type {Snapshot}
             */
            latestSnapshot: null,

            /**
             * @type {SnapshotAsset[]}
             */
            latestSnapshotAssets: null,

            /**
             * @type {Snapshot[]}
             */
            availableSnapshots: [],

            /**
             * @type {Snapshot|null}
             */
            compareToSnapshot: null,

            /**
             * @type {SnapshotAsset[]|null}
             */
            compareToSnapshotAssets: null,

            /**
             * @type {boolean}
             */
            snapshotInProgress: false,
        };
    },

    async created() {
        axios.get('/api/assets')
            .then(({ data }) => {
                this.ownedAssets = data;
            });

        axios.get('/api/snapshots/latest')
            .then(({ data }) => {
                this.latestSnapshot = data.snapshot;

                const { assets } = data;
                assets.forEach((a) => {
                    a.gbpProfitFloat = parseFloat(a.gbpProfit || 0);
                });
                assets.sort((a, b) => {
                    if (a.gbpProfitFloat < b.gbpProfitFloat) {
                        return 1;
                    }
                    if (a.gbpProfitFloat > b.gbpProfitFloat) {
                        return -1;
                    }
                    return 0;
                });
                this.latestSnapshotAssets = assets;
            });

        axios.get('/api/snapshots')
            .then(({ data }) => {
                this.availableSnapshots = data;
            });
    },

    computed: {
        comparedAssets() {
            console.log('comparedAssets');

            /** @type {SnapshotAsset[]} */
            let currentAssets = cloneDeep(this.latestSnapshotAssets);

            const findOldAsset = (asset) => this.compareToSnapshotAssets.find((a) => a.asset === asset);

            currentAssets = currentAssets
                .filter((asset) => {
                    // Filter out assets we have now that we didn't then.
                    return !!findOldAsset(asset.asset);
                })
                .map((asset) => {
                    const oldAsset = findOldAsset(asset.asset);

                    // Recalculate values based on the old asset.
                    const gbpProfit = (new BigNumber(asset.gbpValue))
                        .minus(oldAsset.gbpValue);

                    asset.gbpProfit = gbpProfit
                        .decimalPlaces(2)
                        .toNumber();

                    // Calculate percentage profit.
                    asset.percentageProfit = gbpProfit.dividedBy(oldAsset.gbpValue)
                        .multipliedBy(100)
                        .decimalPlaces(2)
                        .toNumber();

                    asset.amountChange = (new BigNumber(asset.amount))
                        .minus(oldAsset.amount)
                        .decimalPlaces(4, BigNumber.ROUND_HALF_UP)
                        .toNumber();

                    return asset;
                });

            if (this.profitDisplay === 'percent') {
                this.sortByPercentageProfit(currentAssets);
            } else if (this.profitDisplay === 'fiat') {
                this.sortByGbpProfit(currentAssets);
            }

            return currentAssets;
        },

        latestSnapshotAssetsWithProfit() {
            /** @type {SnapshotAsset[]} */
            const currentAssets = cloneDeep(this.latestSnapshotAssets);

            currentAssets.forEach((a) => {
                // Clear profit returned by API as this is going to be removed.
                a.gbpProfit = null;
                a.usdProfit = null;

                /**
                 * @type {OwnedAsset}
                 */
                const oa = this.ownedAssets[a.asset];
                if (!oa) {
                    return;
                }

                const gbpProfit = (new BigNumber(a.gbpValue)).minus(oa.totalGbpPaid);
                a.gbpProfit = gbpProfit
                    .decimalPlaces(2)
                    .toNumber();

                const usdProfit = (new BigNumber(a.usdValue)).minus(oa.totalUsdPaid);
                a.usdProfit = usdProfit
                    .decimalPlaces(2)
                    .toNumber();

                // Calculate percentage profit.
                a.percentageProfit = usdProfit.dividedBy(oa.totalUsdPaid)
                    .multipliedBy(100)
                    .decimalPlaces(2)
                    .toNumber();
            });

            return currentAssets;
        },
    },

    methods: {
        sortByPercentageProfit(assets) {
            assets.sort((a, b) => {
                const aProfit = a.percentageProfit || 0;
                const bProfit = b.percentageProfit || 0;

                if (aProfit === bProfit) {
                    return 0;
                }
                return aProfit > bProfit ? -1 : 1;
            });
        },

        sortByGbpProfit(assets) {
            assets.sort((a, b) => {
                const aProfit = a.gbpProfit || 0;
                const bProfit = b.gbpProfit || 0;

                if (aProfit === bProfit) {
                    return 0;
                }
                return aProfit > bProfit ? -1 : 1;
            });
        },

        setCompareToSnapshot(snapshot) {
            if (!snapshot) {
                this.compareToSnapshot = null;
                this.compareToSnapshotAssets = null;
                return;
            }

            this.compareToSnapshot = snapshot;
            axios.get(`/api/snapshots/${snapshot.id}`)
                .then(({ data }) => {
                    this.compareToSnapshot = data.snapshot;
                    this.compareToSnapshotAssets = data.assets;
                });
        },

        createSnapshot() {
            if (this.snapshotInProgress) {
                return;
            }

            this.snapshotInProgress = true;
            axios.post('/api/snapshots')
                .then(({ data }) => {
                    window.location.reload();
                })
                .finally(() => {
                    this.snapshotInProgress = false;
                });
        },
    },
};
</script>

<style lang="less">
@import (less, reference) "../../less/app.less";

.asset-grid {
    .asset-card {
        margin-bottom: 20px;
    }
}

#home {
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;

        h4 {
            flex-grow: 1;
            margin: 0;
            text-align: left;
        }
    }

    .right {
        padding: 20px;

        .nav {
            margin-top: 20px;
        }
    }
}

@media (min-width: @screen-lg-min) {
    .asset-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;

        .asset-card {
            margin: 0;
        }
    }

    #home {
        display: flex;
        align-items: stretch;
        min-height: 100vh;

        .left {
            flex-grow: 1;
            flex-shrink: 1;
        }

        .right {
            flex-grow: 0;
            flex-shrink: 0;
        }
    }

    .right {
        min-width: 250px;
        background: #fff;
        padding: 20px;
        overflow-y: auto;
        border-left: 1px solid rgb(241, 243, 245);
    }
}
</style>
