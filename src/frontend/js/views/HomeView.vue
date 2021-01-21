<template>
    <div id="home"
         class="container">

        <template v-if="compareToSnapshot">
            <p class="text-center">Comparing to {{ compareToSnapshot.createdAt | relativeTime }}</p>
            <div v-if="compareToSnapshotAssets"
                 class="asset-grid">
                <AssetCard v-for="asset in compareAssets"
                           :key="asset.id"
                           :asset="asset" />
            </div>
        </template>
        <template v-else-if="latestSnapshotAssets"
                  class="asset-grid">
            <p class="text-center">All time</p>
            <div class="asset-grid">
                <AssetCard v-for="asset in latestSnapshotAssets"
                           :key="asset.id"
                           :asset="asset" />
            </div>
        </template>

        <ul>
            <li v-for="snapshot in availableSnapshots"
                :key="snapshot.id">
                <a href="#"
                   @click.prevent="setCompareToSnapshot(snapshot)">{{ snapshot.createdAt | relativeTime }}</a>
            </li>
            <li><a @click.prevent="setCompareToSnapshot(null)">All time</a></li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import AssetCard from '@frontend/components/AssetCard.vue';
import { cloneDeep } from 'lodash';
import BigNumber from 'bignumber.js';

export default {
    components: {
        AssetCard,
    },

    data() {
        return {
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
        };
    },

    async created() {
        const latestSnapshotResponse = await axios.get('/api/snapshots/latest');
        this.latestSnapshot = latestSnapshotResponse.data.snapshot;

        const { assets } = latestSnapshotResponse.data;
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

        const availableSnapshotsResponse = await axios.get('/api/snapshots');
        this.availableSnapshots = availableSnapshotsResponse.data;
    },

    computed: {
        sortedAssets() {
            const sorted = this.latestSnapshotAssets.map((a) => a);
            sorted.sort((a, b) => a.gbpProfit.toString().localeCompare(b.gbpProfit));

            return sorted;
        },

        compareAssets() {
            /** @type {SnapshotAsset[]} */
            const currentAssets = cloneDeep(this.latestSnapshotAssets);

            const findOldAsset = (asset) => this.compareToSnapshotAssets.find((a) => a.asset === asset);

            return currentAssets
                .filter((asset) => {
                    // Filter out assets we have now that we didn't then.
                    return !!findOldAsset(asset.asset);
                })
                .map((asset) => {
                    const oldAsset = findOldAsset(asset.asset);

                    // Recalculate values based on the old asset.
                    asset.gbpProfit = (new BigNumber(asset.gbpValue)).minus(oldAsset.gbpValue).decimalPlaces(2).toNumber();

                    return asset;
                });
        },
    },

    methods: {
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

@media (min-width: @screen-lg-min) {
    .asset-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;

        .asset-card {
            margin: 0;
        }
    }
}
</style>
