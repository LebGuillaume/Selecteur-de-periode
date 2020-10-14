<template>
<div id="app">
    {{ranges}}
    <div class="container-fluide">
        <button @click="pickerShow" class="btn btn-primary">rangepicker</button>
        <div v-if="pickerVisible" style="position: static; top:0; right:0; left:0; bottom:0; overflow: scroll">
            <range-picker :year="2020" v-model="ranges" @cancel="pickerHide" @submit="pickerHide"></range-picker>
        </div>

    </div>
</div>
</template>

<script>
import Rangepicker from './components/Rangepicker'
export default {
    name: 'App',
    components: {
        'range-picker': Rangepicker
    },
    data() {
        return {
            ranges: [
                [1597073169000, 1597937169000],
                [1600183569000, 1601047569000],
                [1591716369000, 1593271569000],
                [1586273169000, 1587569169000],
                [1604593569000, 1606753569000],
            ],
            pickerVisible: false
        }
    },
    methods: {
        pickerShow() {
            this.pickerVisible = true

        },
        pickerHide() {
            this.pickerVisible = false
        }
    },
}
</script>

<style>
</style>
