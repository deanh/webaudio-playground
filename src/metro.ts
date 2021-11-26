interface NodeGenerator {
    gen: (ctx: AudioContext) => AudioScheduledSourceNode;
    stopTime?: number;
}

class Metro {
    ctx: AudioContext;
    interval: number | Array<number>;
    nextBeat: number;
    playNext: Array<NodeGenerator>;
    // TODO: make this into a proper type and use for playNext?
    playEvery: Array<NodeGenerator>;

    constructor(ctx: AudioContext, interval: number | Array<number>) {
        this.ctx       = ctx;
        this.interval  = interval;
        this.playNext  = new Array<NodeGenerator>();
        this.playEvery = new Array<NodeGenerator>();

        const currentTime = Math.floor(ctx.currentTime * 1000); // ms
        const intervalMs = this.getNextInterval(currentTime);
        this.nextBeat = Math.floor(currentTime / intervalMs) * intervalMs + intervalMs;

        setTimeout(() => this.schedule(), (this.nextBeat - currentTime) / 2);
    }

    getNextInterval(now: number): number {
        let i: number | Array<number> = this.interval;
        let retInterval: number;

        if (typeof i === 'number') {
            retInterval = i;
        } else {
            // array based on type union, pull first off and rotate
            retInterval = i.shift();
            i.push(retInterval);
            this.interval = i;
        }

        return retInterval;
    }

    schedule() { 
        // assume: currentTime < this.nextBeat!
        const currentTime = Math.floor(this.ctx.currentTime * 1000); // ms
        const interval    = this.getNextInterval(currentTime);
        const timeDelta   = this.nextBeat + (interval / 2) - currentTime;

        this.nextBeat = this.nextBeat + interval;

        for (let nodeGen of this.playEvery.concat(this.playNext)) {
            let node = nodeGen.gen(this.ctx);
            let stopTime = nodeGen.stopTime || 0.1 ;

            node.start(this.nextBeat / 1000.0);
            node.stop((this.nextBeat / 1000.0) + stopTime);
        }

        this.playNext = new Array<NodeGenerator>();

        setTimeout(()=> this.schedule(), timeDelta);
    }

    addNext(nodeGen: NodeGenerator) {
        this.playNext.push(nodeGen);
    }

    addEvery(nodeGen: NodeGenerator) {
        this.playEvery.push(nodeGen);
    }
}

export = Metro;