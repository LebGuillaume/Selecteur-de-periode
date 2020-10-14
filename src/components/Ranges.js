import Range from './Range';

export default class Ranges {
    constructor (ranges){
        this.ranges = ranges
        //console.log(ranges);
    }
    contains(date) {
        for (let k in this.ranges) {
            if(
                this.ranges[k].contains(date)
            )
            {
                return this.ranges[k]
            }

            
        }
        return null
    }
    addRange(range){
        for (let k in this.ranges){
            if(this.ranges[k].intersect(range)){
                this.ranges[k].merge(range)
                return
            }
        }
        this.ranges.push(range)
    }
    removeRange (range){
        this.ranges = this.ranges.filter(r => r !== range)
    }
    toTimestamps(){
        return this.ranges.map(range => {
            return [range.getStart().getTime(), range.getEnd().getTime()]
        })
    }
    static fromTimestamps(ranges) {
       return new Ranges( ranges.map(range => {
            return new Range(new Date(new Date(range[0])), new Date(range[1]))
        }))
    }
}