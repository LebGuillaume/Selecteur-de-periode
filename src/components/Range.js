


export default class Range {
    constructor(start, end){
        this.start = start
        this.end = end
        //console.log(start);
    }
    getStart () {
        return this.start
    }
    setstart(date) {
       
        if(date.getTime() > this.end.getTime()){
            throw new Error('start > end')
        }
         this.start = date
    }
    getEnd () {
         
        return this.end
    }
    setEnd(date){
        if (date.getTime() < this.start.getTime()) {
            throw new Error('end < start')
        }
        this.end = date
    }
    contains(date){
        return date.getTime() >= this.start.getTime() &&
        date.getTime() <= this.end.getTime()
    }
    intersect(range){
        return this.contains(range.getStart()) ||
        this.contains(range.getEnd()) ||
        (range.getStart().getTime() < this.start.getTime() && range.getEnd().getTime() > this.end.getTime())
    }
    merge (range) {
        if(range.getStart().getTime() < this.start.getTime()){
            this.setstart(range.getStart())
        }
        if (range.getEnd().getTime() > this.end.getTime()) {
            this.setEnd(range.getEnd())
        }

    }

    isStart(date) {
        
        return date.toDateString() === this.start.toDateString()
    }

    isEnd(date) {
        return date.toDateString() === this.end.toDateString()
    }
}