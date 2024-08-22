import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, VStack, Typography, Input} from '~/components/elemental';
import chatGPT from '~/utils/chatGPT';
const ChatGPT = () => {
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'TEXT' | 'YES_NO'>('TEXT');

  const FindResult = async () => {
    setLoading(true);
    const res = await chatGPT({content: textInput, responseType: type}).then(
      res => {
        console.log(res);
        setResult(res);
        setLoading(false);
      },
    );
  };

  return (
    <VStack space={5}>
      <Input onChangeText={text => setTextInput(text)} />
      <Button onPress={() => setType(type === 'TEXT' ? 'YES_NO' : 'TEXT')}>
        {type}
      </Button>
      <Button isLoading={loading} onPress={() => FindResult()}>
        Submit
      </Button>
      <Typography>{result}</Typography>
    </VStack>
  );
};

export default ChatGPT;

const styles = StyleSheet.create({});
