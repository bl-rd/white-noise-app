// https://noisehack.com/generate-noise-web-audio-api/

export default class Noise {

  constructor() {
    this.audioContext = new AudioContext();
    this.bufferSize = 4096;
    this.node = null;
    this.playing = false;
  }

  /**
   * 
   */
  start() {
    if (!this.node) {
      this.node = this.getNode();
    }
    this.node.connect(this.audioContext.destination);
    this.playing = true;
  }

  /**
   * 
   */
  stop() {
    this.node.disconnect(this.audioContext.destination);
    this.playing = false;
  }

  /**
   * 
   * @returns {ScriptProcessorNode}
   */
  getNode() {
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    const node = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        const output = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < this.bufferSize; i++) {
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
  }
}