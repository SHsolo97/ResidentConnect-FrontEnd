import React from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { Button } from "@material-ui/core";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import PrimaryButton from "../../../../shared/components/PrimaryButton";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class RecordAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      audios: props.audios
    };
  }

  async componentDidMount() {}

  startRecording(e) {
    e.preventDefault();
    Mp3Recorder.start()
      .then(() => {
        this.setState({ recording: true });
      })
      .catch(e => console.error(e));

    // say that we're recording
  }

  _base64ToArrayBuffer(base64) {
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder

    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        debugger;

        this.setState({ recording: false });
        // generate video url from blob

        this.convertAudioToBase64(blob);

        const audioURL = window.URL.createObjectURL(blob);
        // append videoURL to list of saved videos for rendering
        const audios =audios.concat([audioURL]);
        this.setState({ audios });
        this.props.setAudios({ audios });
      })
      .catch(e => console.log(e));

    this.saveAudio();
  }

  convertAudioToBase64 = audio => {
    const reader = new FileReader();
    reader.readAsDataURL(audio);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log("base64data", base64data);
    };
  };

  saveAudio() {}

  deleteAudio(audioURL) {
    // filter out current videoURL from the list of saved videos
    const audios = this.state.audios.filter(a => a !== audioURL);
    this.setState({ audios });
    this.props.setAudios({ audios });

  }

  render() {
    const { recording, audios } = this.state;

    return (
      <div className="camera">
        <audio
          style={{ width: 400 }}
          ref={a => {
            this.audio = a;
          }}
        >
          <p>Audio stream not available. </p>
        </audio>
        <div>
          {!recording && (
            <PrimaryButton onClick={e => this.startRecording(e)}>Record</PrimaryButton>
          )}
          {recording && (
            <PrimaryButton onClick={e => this.stopRecording(e)}>Stop</PrimaryButton>
          )}
        </div>
        <div>
          <h5>Recorded audios:</h5>
          {audios.map((audioURL, i) => (
            <div key={`audio_${i}`}>
              <audio controls style={{ width: 200 }} src={audioURL} />
              <div>
                <PrimaryButton onClick={() => this.deleteAudio(audioURL)}>
                  Delete
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  floatTo16BitPCM(output, offset, input) {
    for (var i = 0; i < input.length; i++, offset += 2) {
      var s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  }

  writeString(view, offset, string) {
    for (var i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  encodeWAV(buffers) {
    debugger;
    var samples = buffers.length;
    var bufferes = new ArrayBuffer(buffers.length);
    var view = new DataView(bufferes);

    /* RIFF identifier */
    this.writeString(view, 0, "RIFF");
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    this.writeString(view, 8, "WAVE");
    /* format chunk identifier */
    this.writeString(view, 12, "fmt ");
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, 48000, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, 1 * 4, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 1 * 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    this.writeString(view, 36, "data");
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    this.floatTo16BitPCM(view, 44, samples);

    return view;
  }
}

export default RecordAudio;