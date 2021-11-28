export interface NodeGenerator {
    gen: (ctx: AudioContext, next?: AudioNode) => Promise<AudioScheduledSourceNode>;
    stopTime?: number;
}
