export abstract class MidiFreq {
    static numSemitones = 12;
    static midiNumber   = {
        // TODO :)
        "A4": 69
    };

    static mtof(midiNote: number, base: number = 440): number {
        return Math.pow(2, (midiNote - this.midiNumber["A4"])/this.numSemitones) * base;
    }

    static ftom(freq: number, base: number = 440): number {
        return this.numSemitones * Math.log2(freq / base) + this.midiNumber["A4"];
    }
}