import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, VStack, Typography, Input} from '~/components/elemental';
import chatGPT from '~/utils/chatGPT';
import translator from '../../../utils/translator';
const Translation = () => {
  const [textInput, setTextInput] = useState('');
  const [language, setLanguage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<'TEXT' | 'YES_NO'>('TEXT');

  const FindResult = async () => {
    setLoading(true);
    const res = await translator({
      text: textInput,
      targetLanguage: language,
    }).then(res => {
      console.log(res);
      setResult(res);
      setLoading(false);
    });
  };

  return (
    <VStack space={5}>
      <Input onChangeText={text => setTextInput(text)} />
      <Input onChangeText={text => setLanguage(text)} />

      <Button isLoading={loading} onPress={() => FindResult()}>
        Submit
      </Button>
      <ScrollView>
        <Typography>{result}</Typography>
      </ScrollView>
    </VStack>
  );
};

export default Translation;

const styles = StyleSheet.create({});
