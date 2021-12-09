<template>

        <div id="pagination" class="col-12 clearfix uk-margin-small-top">
            <!-- v-show -->
            <ul class="uk-pagination uk-flex-center" uk-margin v-show="setPages > 1">
                <li :class="{'uk-disabled': page === 1}" @click.prevent="selectPage(1)">
                    <a href="#">
                        <span uk-icon="icon: chevron-double-left; ratio: 1.2"></span>
                    </a>
                </li>
                <li :class="{'uk-disabled': page === 1}" @click.prevent="selectPage(page - 1)">
                    <a href="#">
                        <span uk-pagination-previous></span>
                    </a>
                </li>
                <li :class="{'uk-active': p === page}" @click.prevent="selectPage(p)" v-for="p in page_array">
                    <a href="javascript: void(0);" :class="{'uk-text-primary': p === page, 'uk-text-bold': p === page}">
                        {{p}}
                    </a>
                </li>
                <li :class="{'uk-disabled': page === pages}" @click.prevent="selectPage(page + 1)">
                    <a href="#">
                        <span uk-pagination-next></span>
                    </a>
                </li>
                <li :class="{'uk-disabled': page === pages}" @click.prevent="selectPage(pages)">
                    <a href="#">
                        <span uk-icon="icon: chevron-double-right; ratio: 1.2"></span>
                    </a>
                </li>
            </ul>
        </div>

</template>

<script>
    export default {
        props: {
            directory_id: String,
            all_count: Number,
            page_count: Number,
            page_item_count: Number,
        },
        computed: {
            setPages() {
                this.pages = Math.ceil(this.all_count / this.page_item_count);

                this.page_array = [];
                let start = this.page - 2;
                let end = this.page + 2;
                for (let p = start; p <= end; p++) {
                    if (p >= 1 && p <= this.pages) {
                        this.page_array.push(p);
                    }
                }

                return this.pages;
            },
        },
        watch: {
            'page'(new_data, old_data) {
                this.page_array = [];
                let start = this.page - 2;
                let end = this.page + 2;
                for (let p = start; p <= end; p++) {
                    if (p >= 1 && p <= this.pages) {
                        this.page_array.push(p);
                    }
                }
            },
        },
        data() {
            return {
                page: 1,
                pages: 0,
                page_array: [],
            }
        },
        methods: {
            selectPage(page) {
                let directory_id = this.directory_id ? this.directory_id : null;
                if (page >= 1 && page <= this.pages) {
                    this.page = page;
                    this.$emit('get-data', page, directory_id);
                }
            },
            setPage(page) {
                this.page = page;
            },
        },
    }
</script>
