import {NodeGenerator} from './nodeGenerator';
class Noise implements NodeGenerator {
    stopTime?: number;

    constructor(stopTime?: number) {
        this.stopTime = stopTime;
    }

    async gen(ctx: AudioContext): Promise<AudioBufferSourceNode> {
        const bufferSize = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);    
    
        let data = buffer.getChannelData(0); // get data

        // fill the buffer with noise  
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        let noise = ctx.createBufferSource();
        noise.buffer = buffer;

        return noise;
    }
}

export = Noise;