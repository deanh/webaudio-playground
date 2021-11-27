# webaudio-playground
Some simple WebAudio building blocks and a web app to experiement and (kind of) live code with them.

## Currently
- ```Metro``` class to do time interval based AudioNode playback (using WebAudio timing)
- ```Simple``` a sample node generator
- ```Noise``` a noise node generator
- ```MidiFreq``` functions to translate between MIDI note numbers and frequencies

## TODO
- More node generators (saw/square osc, filters, etc)
- Composite nodes (graphs)
### Pitch related
- mstoBPM() and BPMtoms() functions
- Port five limit scale code from Max JS
- Control of sample playback rate
### Amplitude related
- Envelopes
- Connect gain nodes and gain control to the generated nodes for playback
### Timing / tempo related
- Create a Tempo object wrapped around Metro to provide a more traditional musical interface (BPM, time signature)
### Architecture related
- Use a worker to schedule from a different thread
- Evaluate what needs to be async