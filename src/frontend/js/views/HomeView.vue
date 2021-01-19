<template>
    <div id="home"
         class="container">
        <div v-if="latestSnapshotAssets !== null"
             class="asset-grid">
            <AssetCard v-for="asset in latestSnapshotAssets"
                       :key="asset.id"
                       :asset="asset" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import AssetCard from '@frontend/components/AssetCard.vue';

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
        };
    },

    async created() {
        const response = await axios.get('/api/snapshots/latest');
        this.latestSnapshot = response.data.snapshot;

        const { assets } = response.data;
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
    },

    computed: {
        sortedAssets() {
            const sorted = this.latestSnapshotAssets.map((a) => a);

            sorted.sort((a, b) => a.gbpProfit.toString().localeCompare(b.gbpProfit));
            //     if (a.gbpProfit === b.gbpProfit) {
            //         return 0;
            //     }
            //     return a.gbpProfit > b.gbpProfit ? -1 : 1;
            // });

            return sorted;
        },
    },

    methods: {},
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
