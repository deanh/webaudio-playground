class Simple {
    audioBuffer: AudioBuffer;
    filepath: string;
    ctx: AudioContext;
    stopTime?: number;

    constructor(filepath: string, ctx: AudioContext, stopTime?: number) {
        this.filepath = filepath;
        this.ctx      = ctx;
        this.stopTime = stopTime;
    }

    async getFile(): Promise<Simple> {
        const response    = await fetch(this.filepath);
        console.log(response);
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer  = await this.ctx.decodeAudioData(arrayBuffer);

        return this;
    }

    gen(ctx: AudioContext = this.ctx): AudioScheduledSourceNode {
        const sampleSource = ctx.createBufferSource();
        sampleSource.buffer = this.audioBuffer;  
        sampleSource.connect(ctx.destination);

        return sampleSource;
    }
}

export = Simple;