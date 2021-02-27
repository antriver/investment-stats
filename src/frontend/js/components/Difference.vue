<template>
    <span :class="{ 'text-danger': value < 0, 'text-success': value > 0 }">
        {{ value | profit(asCurrency) }}{{ asPercentage ? '%' : '' }}
    </span>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Difference',
    props: {
        value: {
            type: [Number, String],
            required: true,
        },
        asCurrency: {
            type: String,
            default: null,
        },
        asPercentage: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
