import {NodeGenerator} from './nodeGenerator';

export class Simple implements NodeGenerator {
    audioBuffer: AudioBuffer;
    filepath: string;
    ctx: AudioContext;
    stopTime?: number;
    playbackRate?: number;

    constructor(filepath: string, ctx: AudioContext, {playbackRate, stopTime}: {playbackRate?: number, stopTime?: number}) {
        this.filepath     = filepath;
        this.ctx          = ctx;
        this.stopTime     = stopTime;
        this.playbackRate = playbackRate;
    }

    async getFile(): Promise<Simple> {
        const response    = await fetch(this.filepath);
        console.log(response);
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer  = await this.ctx.decodeAudioData(arrayBuffer);

        return this;
    }

    async gen(ctx: AudioContext = this.ctx): Promise<AudioScheduledSourceNode> {
        const sampleSource = ctx.createBufferSource();
        sampleSource.buffer = this.audioBuffer;
        sampleSource.playbackRate.value = this.playbackRate || 1.0;

        return sampleSource;
    }
}
