import Metro, {} from "./metro";
import Simple from "./simple";
import Noise from "./noise"

let aCtx = new AudioContext()
let m1 = new Metro(aCtx, [1300, 300, 300]);

let sample = new Simple("./rw_auto_10-006.mp3", aCtx, 0.5);

sample.getFile().then((s) => {
    m1.addEvery(s);
});

/* m1.addEvery({
    stopTime: 0.3,
    gen: (ctx) => {
        let osc = ctx.createOscillator();
        osc.frequency.value = Math.floor(Math.random() * 200 ) + 200;
        osc.connect(ctx.destination);

        return osc;
    }
}); */

let sample2 = new Simple("./rw_auto_10-004.mp3", aCtx, 1);

let m2 = new Metro(aCtx, [200, 900, 900]);

sample2.getFile().then((samp) => {
    m2.addEvery(samp);
});

/* let n = new Noise(0.02);

m2.addEvery(n);
 */