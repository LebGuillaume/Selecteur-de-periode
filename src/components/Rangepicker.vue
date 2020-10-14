<template>
<div class="Rangepicker">
    <div class="rangepicker_month" v-for="(month, index) in months" :key="index">
        <div class="rangepicker_monthtitle">

            {{ month.getName() }}

        </div>
        <div class="rangepicker_days">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mer</div>
            <div>Jeu</div>
            <div>Ven</div>
            <div>Sam</div>
            <div>Dim</div>
        </div>
        <div class="rangepicker_numbers">
            <div v-for="(day, index) in month.getDays()" :key="index" @mousedown="startDrag(day)" @mouseover="overDay(day)" @dblclick="removeRange(day)" class="rangepicker_day" :class="classForDay(day, month, newRange)">{{ day.getDate() }}</div>

        </div>
    </div>
    <div class="action"><button @click="onSubmit" class="btn btn-primary">Soummettre</button>
        <button @click="onCancel" class="btn btn-danger ml-2">Annuler</button>
    </div>
</div>
</template>

<script>
import Month from './Month.js';
import Ranges from './Ranges'
import Range from './Range'
export default {
    name: 'Rangepicker',
    mixins: [],
    components: {},
    data() {
        return {
            months: [],
            ranges: [],
            newRange: null,
            cursor: 1,
            startDate: null
        };
    },
    model: {},
    props: {
        year: Number,
        value: Array
    },
    methods: {
        classForDay(day, month, newRange) {

            let classes = []
            let range = this.ranges.contains(day)
            //console.log(this.ranges)

            if (range !== null) {
                classes.push('rangepicker_range')
                if (range.isEnd(day)) {
                    classes.push('rangepicker-is-end')
                }
                if (range.isStart(day)) {
                    classes.push('rangepicker-is-start')
                }
            }
            if (!month.contains(day)) {
                classes.push('rangepicker_out')
            }
            if (newRange !== null) {
                if (newRange.contains(day)) {
                    classes = ['rangepicker_newrange']
                    if (newRange.isEnd(day)) {
                        classes.push('rangepicker-is-end')
                    }
                    if (newRange.isStart(day)) {
                        classes.push('rangepicker-is-start')
                    }
                }

            }
            return classes
        },
        startDrag(day) {

            let range = this.ranges.contains(day)
            if (range) {
                if (range.isStart(day)) {
                    this.newRange = range
                    this.ranges.removeRange(range)
                    this.startDate = range.getEnd()
                    this.cursor = 0
                }
            } else {
                this.startDate = day
                this.newRange = new Range(day, day)
            }

        },
        overDay(day) {
            if (this.newRange !== null) {
                try {
                    if (this.cursor === 1) {

                        this.newRange.setEnd(day)
                    } else {
                        this.newRange.setStart(day)
                    }

                } catch (e) {
                    this.cursor = Math.abs(this.cursor - 1)
                    this.newRange = new Range(this.startDate, this.startDate)
                }

            }
        },
        onRelease() {
            if (this.newRange) {
                this.ranges.addRange(this.newRange)
            }
            this.newRange = null
        },
        removeRange(day) {
            let range = this.ranges.contains(day)
            if (range) {
                this.ranges.removeRange(range)
            }
        },
        onCancel() {
            this.$emit('cancel')
        },
        onSubmit() {
            this.$emit('input', this.ranges.toTimestamps())
            this.$emit('submit')
        }

    },
    computed: {},
    watch: {},
    mounted() {
        this.ranges = Ranges.fromTimestamps(this.value)
        this.months = Month.createMonthsForYear(this.year)
        document.addEventListener('mouseup', this.onRelease)

    },
    destroyed() {
        document.removeEventListener('mouseup', this.onRelease)

    },

}
</script>

<style lang="scss" src="./Rangepicker.scss" scoped>
</style>
