<template>

</template>

<script>
    import { head } from 'lodash';

    export default {
        async fetch ({ $axios, store, params, redirect }) {
            await $axios.get(process.env.apiUrl + '/api/directory/list/all').then(res => {
                let data = head(res.data);
                data ? redirect('/directory/' + data.id) : redirect('/');
            });
        },

    }
</script>