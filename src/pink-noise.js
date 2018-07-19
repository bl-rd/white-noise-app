// https://noisehack.com/generate-noise-web-audio-api/

export default class Noise {

  static get audioContext() {
    return new AudioContext();
  }

  static get bufferSize() {
    return 4096;
  }

  /**
   * TODO: rewrite nicer!
   */
  static pinkNoise() {
    var audioContext = new AudioContext();
    var bufferSize = 4096;
    var pinkNoise = (function() {
        var b0, b1, b2, b3, b4, b5, b6;
        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
        var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = function(e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11; // (roughly) compensate for gain
                b6 = white * 0.115926;
            }
        }
        return node;
    })();
    
    pinkNoise.connect(audioContext.destination);
    // const context = new AudioContext();
    // console.log('PINK NOISE TIME!');
    // const noise = () => {
    //   let buffers = new Array(7);
    //   buffers = buffers.map(b => 0.0);

    //   const node = context.createScriptProcessor(this.bufferSize, 1, 1);
    //   node.onaudioprocess = event => {
    //     const output = event.outputBuffer.getChannelData(0);
    //     for (let i = 0; i < this.bufferSize; i++) {
    //       const white = Math.random() * 2 - 1;
    //       buffers[0] = 0.99886 * buffers[0] + white * 0.0555179;
    //       buffers[1] = 0.99332 * buffers[1] + white * 0.0750759;
    //       buffers[2] = 0.96900 * buffers[2] + white * 0.1538520;
    //       buffers[3] = 0.86650 * buffers[3] + white * 0.3104856;
    //       buffers[4] = 0.55000 * buffers[4] + white * 0.5329522;
    //       buffers[5] = -0.7616 * buffers[5] - white * 0.0168980;
    //       output[i] = buffers.reduce((accum, curr) => accum + curr) + white * 0.5362;
    //       output[i] *= 0.11;
    //       buffers[6] = white * 0.115926;
    //     }
    //   };
    //   return node;
    // };

    // noise().connect(context.destination);
  }
}