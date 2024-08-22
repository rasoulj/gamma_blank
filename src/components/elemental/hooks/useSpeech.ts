import {useState} from 'react';

import RNFetchBlob, {Dirs} from 'react-native-blob-util';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';

const subscriptionKey = 'ae334ccd505243bdaab8a6a92c8e4d1a';

const options = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  audioSource: 6,
  wavFile: 'record.wav',
};
AudioRecord.init(options);

const useSpeech = () => {
  const [transcriptText, setTranscriptText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      await AudioRecord.start();
      setIsRecording(true);
    } catch (e) {
      console.log({e});
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      const filePath = await AudioRecord.stop();
      const text = await speechToText(filePath);
      setTranscriptText(text.DisplayText);
    } catch (e) {
      console.log({e});
    }
  };

  async function textToSpeech(text) {
    const requestBody = `
    <speak version='1.0' xml:lang='en-US'>
      <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
        ${text}
      </voice>
    </speak>
  `;

    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        `https://westus2.tts.speech.microsoft.com/cognitiveservices/v1`,
        {
          'Content-Type': 'application/ssml+xml',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        },
        requestBody,
      );

      const parentDir = RNFetchBlob.fs.dirs.CacheDir;
      const isParentDirExists = await RNFetchBlob.fs.exists(parentDir);
      if (!isParentDirExists) {
        await RNFetchBlob.fs.mkdir(parentDir);
      }

      const filePath = `${parentDir}/output.mp3`;
      await RNFetchBlob.fs.writeFile(filePath, response.data, 'base64');
      playSound(filePath);
    } catch (e) {
      console.log('Text to speech error:', e);
    }
  }

  function playSound(soundFile, callback?) {
    const sound = new Sound(soundFile, '', error => {
      if (error) {
        console.log('Error loading sound:', error);
        return;
      }

      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
          if (callback) {
            callback();
          }
        } else {
          console.log('Failed to play sound');
        }
      });
    });
  }

  async function speechToText(fileUrl) {
    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        'https://westus2.stt.speech.microsoft.com/speech/recognition/interactive/cognitiveservices/v1?language=en-US',
        {
          'Content-Type': 'audio/wav; codec=audio/pcm; samplerate=16000',
          'Transfer-Encoding': 'chunked',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        RNFetchBlob.wrap(fileUrl),
      );

      const json = await response.json();
      return json;
    } catch (e) {
      console.log('speech to text error: ', e);
    }
  }

  return {
    transcriptText,
    speechToText,
    textToSpeech,
    startRecording,
    stopRecording,
    isRecording,
  };
};

export default useSpeech;
