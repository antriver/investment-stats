<template>
    <span :class="{ 'text-danger': value < 0, 'text-success': value > 0 }">
        {{ value | profit(asCurrency) }}
    </span>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Difference',
    props: {
        value: {
            type: Number,
            required: true,
        },
        asCurrency: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
