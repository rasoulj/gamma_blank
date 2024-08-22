import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {SendIcon2, getColor, isDark, Layer} from '~/components/elemental';

const MessageInput = ({
  onSendMessage,
}: {
  onSendMessage: (text: string) => void;
}) => {
  const inputRef = useRef<TextInput>();
  const inputText = useRef();
  const onPress = () => {
    inputRef.current.clear();
    onSendMessage(inputText.current);
  };

  const onChangeText = value => {
    inputText.current = value;
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Layer style={styles.innerView}>
      <TextInput
        placeholder="Message..."
        multiline={false}
        numberOfLines={1}
        onChangeText={onChangeText}
        style={styles.input}
        ref={inputRef}
      />
      <TouchableOpacity style={styles.sendTouchable} onPress={onPress}>
        <SendIcon2
          color={getColor({
            color: isDark('primary') ? 'gray.50' : 'gray.800',
          })}
        />
      </TouchableOpacity>
    </Layer>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  sendTouchable: {
    width: 50,
    height: 50,
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  input: {
    width: '82%',
    fontSize: 14,
    height: 49,
    backgroundColor: getColor({color: 'background.500'}),
    paddingHorizontal: 15,
    borderRadius: 10,
    color: getColor({color: 'gray.800'}),
    borderColor: getColor({color: 'gray.800'}),
    borderWidth: 1,
  },
});
