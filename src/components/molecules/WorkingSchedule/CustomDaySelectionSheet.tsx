import React, {useEffect} from 'react';
import {
  VStack,
  Button,
  DrawerKit,
  View,
  Layer,
  Typography,
  useDrawer,
  HStack,
  CustomRadioGroup,
  CustomFormInput,
  deviceWidth,
  Scrollable,
  DropDown,
  DatePicker,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {StyleSheet} from 'react-native';
import {
  WorkingScheduleRepeatEveryType,
  repeatEveryData,
  shortDayNames,
} from './enums';
const schema = yup.object().shape({
  radio: yup.string(),
  repeatEveryType: yup.object(),
  repeatEveryValue: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable(true),
  endsAfter: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable(true),
  endsOn: yup.string(),
});
const CustomDaySelectionSheet = ({
  onDone,
  dayValue,
  index,
  value,
}: {
  onDone: any;
  dayValue: string;
  index: number;
  value?: any;
}) => {
  const {isOpen: isDeleteDrawerKitOpen, setIsOpen: setIsDeleteDrawerKitOpen} =
    useDrawer(`CustomDate${index}`);
  const {...methods} = useForm<Record<string, any>, object>({
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
    mode: 'onChange',
    defaultValues: {},
  });
  const {setValue, handleSubmit, watch} = methods;
  useEffect(() => {
    setValue('repeatEveryType', value?.repeatEveryType ?? repeatEveryData[0]);
    setValue('endsOn', value?.endsOn ?? undefined);
    setValue('endsAfter', value?.endsAfter ?? 10);
    setValue('repeatEveryValue', value?.repeatEveryValue ?? 0);
    if (value?.endsAfter) setValue('radio', 'r3');
    else if (value?.endsOn) setValue('radio', 'r2');
    else setValue('radio', 'r1');
  }, [value]);
  const onDonePress = (formData: any) => {
    console.log(JSON.stringify({formData}));
    onDone?.({
      ...formData,
      endsOn: formData?.radio != 'r2' ? undefined : formData?.endsOn,
      endsAfter: formData?.radio != 'r3' ? undefined : formData?.endsAfter,
    });
    setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
  };
  const onCloseDrawer = () => {
    setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
  };
  return (
    <DrawerKit
      data-id={`custom-date${index}`}
      data-name="DrawerKit"
      style={styles.drawer}
      position="bottom"
      data-parent="screen">
      <FormProvider {...methods}>
        <Scrollable
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          keyboardShouldPersistTaps={'handled'}
          enableResetScrollToCoords={false}
          bounces={false}
          style={{padding: 0, width: '100%'}}
          contentContainerStyle={{width: '100%'}}>
          <View
            data-name="RelativeLayout"
            style={styles.viewContainer}
            data-parent={`custom-date${index}`}>
            <VStack
              data-name="Layer"
              space="16px"
              style={{position: 'relative', marginLeft: 20, marginRight: 20}}>
              <Typography
                data-name="Typography"
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                  marginTop: 8,
                }}>
                Custom
              </Typography>
              <HStack space="8px" alignItems="center" w="full">
                <Typography
                  data-name="Typography"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  Repeat Every {watch('repeatEveryType')?.label}
                </Typography>
                <CustomFormInput
                  name={'repeatEveryValue'}
                  placeholder="12"
                  style={styles.dayInput}
                  keyboardType="numeric"
                />
                <DropDown
                  data={repeatEveryData}
                  name="repeatEveryType"
                  style={styles.dayDropDown}
                  defaultValue={{
                    label: watch('repeatEveryType')?.value,
                    value: watch('repeatEveryType')?.value,
                  }}
                />
              </HStack>

              {watch('repeatEveryType')?.value ===
                WorkingScheduleRepeatEveryType.Days && (
                <VStack>
                  <Typography
                    data-name="Typography"
                    style={{
                      position: 'relative',
                      marginBottom: 8,
                      display: 'flex',
                      textAlign: 'left',
                      fontSize: 17,
                      color: 'gray.800',
                    }}>
                    Repeat every
                  </Typography>
                  <HStack justifyContent="space-between">
                    {shortDayNames.map((item, index) => {
                      return (
                        <VStack
                          w="40px"
                          h="40px"
                          borderRadius={'20px'}
                          borderWidth={1}
                          borderColor="gray.400"
                          alignItems="center"
                          backgroundColor={
                            dayValue === item.value ? 'primary.500' : undefined
                          }
                          justifyContent="center">
                          <Typography
                            data-name="Typography"
                            color={
                              dayValue === item.value
                                ? '#FFFFFF'
                                : 'primary.500'
                            }
                            style={{
                              fontSize: 17,
                            }}>
                            {item?.label}
                          </Typography>
                        </VStack>
                      );
                    })}
                  </HStack>
                </VStack>
              )}
              <Typography
                data-name="Typography"
                style={{
                  fontSize: 17,
                  color: '#fff',
                }}>
                End
              </Typography>
              <HStack>
                <CustomRadioGroup
                  name="radio"
                  data={[
                    {label: 'Never', value: 'r1'},
                    {
                      label: 'On',
                      value: 'r2',
                      extraComponent: (
                        <DatePicker
                          name="endsOn"
                          borderRadius={10}
                          type="date"
                          dateFormat={'MMM D, YYYY'}
                          disabled={watch('radio') != 'r2'}
                          width={deviceWidth * 0.44}
                        />
                      ),
                    },
                    {
                      label: 'After',
                      value: 'r3',
                      extraComponent: (
                        <CustomFormInput
                          name="endsAfter"
                          disabled={watch('radio') != 'r3'}
                          style={styles.currencyInput}
                          placeholder="30 currencies"
                          keyboardType="numeric"
                        />
                      ),
                    },
                  ]}
                />
              </HStack>
              <Layer
                data-id="button_box"
                data-name="Layer"
                style={styles.buttonContainer}>
                <Button
                  data-id="cancel_btn"
                  data-name="Button"
                  style={styles.cancelBtn}
                  variant="outline"
                  data-parent="button_box"
                  onPress={onCloseDrawer}>
                  Cancel
                </Button>
                <Button
                  data-id="cancel_btn"
                  data-name="Button"
                  style={styles.cancelBtn}
                  data-parent="button_box"
                  onPress={handleSubmit(onDonePress)}>
                  Done
                </Button>
              </Layer>
            </VStack>
          </View>
        </Scrollable>
      </FormProvider>
    </DrawerKit>
  );
};
export default CustomDaySelectionSheet;
const styles = StyleSheet.create({
  dayDropDown: {
    borderRadius: 10,
    width: deviceWidth * 0.4,
    margin: 0,
    height: 50,
  },
  dayInput: {borderRadius: 10, width: '15%'},
  currencyInput: {width: deviceWidth * 0.44, borderRadius: 10},
  cancelBtn: {position: 'relative', width: '45%'},
  drawer: {position: 'relative', zIndex: 5},
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    width: '100%',
  },
  viewContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
  },
});
