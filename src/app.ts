import Metro, {} from "./metro";
import Simple from "./simple";
import Noise from "./noise"

let aCtx = new AudioContext()
let m1 = new Metro(aCtx, [500, 750, 500, 500, 750]);

let sample = new Simple("./rw_auto_10-011.mp3", aCtx, 800);

sample.getFile().then((s: Simple) => {
    m1.addEvery(s);
});

/* m1.addEvery({
    stopTime: 2,
    gen: (ctx) => {
        let osc = ctx.createOscillator();
        osc.frequency.value = Math.floor(Math.random() * 20) * 10 + 40;
        osc.connect(ctx.destination);

        return osc;
    }
}); */

/* let sample2 = new Simple("./rw_auto_10-008.mp3", aCtx, 1);

let m2 = new Metro(aCtx, [300, 200, 200, 200, 200]);

sample2.getFile().then((samp: Simple) => {
    m2.addEvery(samp);
}); */

/* let n = new Noise(0.01);

m2.addEvery(n);
 */