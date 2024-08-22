import {Pressable, StyleSheet} from 'react-native';
import React, {memo, useState} from 'react';
import {
  Box,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIconSet,
  HStack,
  Input,
  Typography,
  VStack,
  getColor,
} from '~/components/elemental';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {Label} from '~/components/organisms/DatingSetup/views/DatingSetupInput/label';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';
import {TouchableOpacity} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const CourseFaqs = ({productData, setProductData}) => {
  const [selectedItem, setSelectedItem] = useState<number>(
    !productData?.faqs && 0,
  );

  const {control, handleSubmit} = useForm({
    defaultValues: {inputs: productData?.faqs ?? [{question: '', answer: ''}]},
  });
  const {fields, append, remove} = useFieldArray({name: 'inputs', control});

  const handleArrowDirection = i => {
    selectedItem == i ? setSelectedItem() : setSelectedItem(i);
  };

  const onCreatePress = data => {
    setProductData({...productData, faqs: data?.inputs});
  };

  const rightSwipeActions = index => {
    return (
      <HStack>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            remove(index);
          }}>
          <CloseIconSet width={20} height={20} color={'gray.50'} />
        </TouchableOpacity>
      </HStack>
    );
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.mb}
        showsVerticalScrollIndicator={false}>
        <Typography style={styles.faq} color={'gray.800'}>
          FAQs
        </Typography>
        {fields?.map((item, index) => (
          <Swipeable renderRightActions={() => rightSwipeActions(index)}>
            <Pressable onPress={() => handleArrowDirection(index)} key={index}>
              <VStack
                w="99%"
                alignSelf="center"
                my="2"
                shadow={'3'}
                p="4"
                bg={getColor({color: 'background.500'})}
                borderRadius="md">
                <HStack alignSelf="center" justifyContent="space-between">
                  <Typography
                    color={getColor({color: 'gray.800'})}
                    fontSize="sm"
                    lineHeight={19}
                    fontWeight={'400'}
                    flex={1}>
                    Question {index + 1}
                  </Typography>
                  {selectedItem === index ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </HStack>
                {selectedItem === index && (
                  <VStack
                    width="100%"
                    alignSelf="center"
                    pb="2"
                    bg={getColor({color: 'background.500'})}>
                    <Box h={4} />
                    <Label>Question</Label>
                    <Controller
                      name={`inputs.${index}.question`}
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          p="4"
                          size="2xl"
                          placeholder="Write your Question"
                          variant="outline"
                          borderRadius="lg"
                        />
                      )}
                    />
                    <Box h={4} />
                    <Label>Answer</Label>
                    <Controller
                      name={`inputs.${index}.answer`}
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          p="4"
                          textAlignVertical="top"
                          size="2xl"
                          multi
                          maxLength={300}
                          placeholder="Write your Answer..."
                          variant="outline"
                          borderRadius="lg"
                        />
                      )}
                    />
                  </VStack>
                )}
              </VStack>
            </Pressable>
          </Swipeable>
        ))}
        <Button
          variant={'outline'}
          style={styles.createBtn}
          _text={styles.btnText}
          onPress={() => {
            append({question: '', answer: ''});
            handleArrowDirection(selectedItem + 1);
          }}>
          Add Question
        </Button>
      </CustomKeyboardAwareScrollView>
      <Button style={styles.btn} onPress={handleSubmit(onCreatePress)}>
        Create
      </Button>
    </GestureHandlerRootView>
  );
};

export default memo(CourseFaqs);

const styles = StyleSheet.create({
  faq: {fontSize: 16, fontWeight: '600', marginBottom: 8},
  btn: {bottom: 10, position: 'absolute', width: '100%'},
  mb: {paddingBottom: 100},
  createBtn: {marginVertical: 24, height: 36},
  closeBtn: {
    width: 24,
    height: 24,
    padding: 2,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 10,
  },
  flex: {flex: 1},
  btnText: {lineHeight: 16, fontWeight: '700'},
});
