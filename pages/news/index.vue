<template>

</template>

<script>
    import { head } from 'lodash';

    export default {
        async fetch ({ $axios, store, params, redirect }) {
            await $axios.get(process.env.API_URL + '/api/news-type/list/all').then(res => {
                let data = head(res.data);
                data ? redirect('/news/' + data.id) : redirect('/');
            });
        },

    }
</script>
