<template>

</template>

<script>
    import { head } from 'lodash';

    export default {
        async fetch ({ $axios, store, params, redirect }) {
            await $axios.get(process.env.API_URL + '/api/cooking-type/list/1').then(res => {
                let data = head(res.data);
                data ? redirect('/cooking/' + data.id) : redirect('/');
            });
        },

    }
</script>
