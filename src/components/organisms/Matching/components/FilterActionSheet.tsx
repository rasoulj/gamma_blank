import React, {useState} from 'react';
import ActionSheet from '../../../atoms/ActionSheet';
import Typography from '../../../atoms/Typography';
import {deviceWidth} from '../../../molecules/Auth/Signin.styles';
import Form from '../../../atoms/Form';
import {Center, DropDown, Ranger, SubmitButton, View} from '../../../elemental';
import {getColor} from '~/utils/helper/theme.methods';
import useMatchAcceptedStore from '~/stores/matchAcceptedStore';
import {capitalize} from 'lodash';

export default function FilterActionSheet({onApply, isOpen, onClose}) {
  const matchingFilter = useMatchAcceptedStore(state => state?.matchingFilter);
  const setMatchFilter = useMatchAcceptedStore(state => state?.setMatchFilter);

  const [filter, setFilter]: any = useState(
    matchingFilter || {
      gender: 'Male',
      age: {start: 0, end: 0},
      distance: 0,
    },
  );

  return (
    <ActionSheet width={deviceWidth} isOpen={isOpen} onClose={onClose}>
      <ActionSheet.Content
        style={{
          width: deviceWidth,
          paddingHorizontal: 64,
          backgroundColor: getColor({color: 'background.500'}),
        }}>
        <Center
          style={{
            width: '100%',
          }}>
          <Form style={{width: '90%'}}>
            <Typography alignSelf={'center'} fontWeight={'bold'}>
              Filter
            </Typography>
            <Typography
              style={{
                marginTop: 10,
                marginBottom: 4,
              }}>
              Age
            </Typography>
            <View>
              <Ranger
                name="age"
                range={[filter?.age?.start || 20, filter?.age?.end || 32]}
                max={60}
                min={10}
                onValuesChange={v =>
                  setFilter(f => {
                    return {
                      ...f,
                      age: {
                        start: v[0],
                        end: v[1],
                      },
                    };
                  })
                }
              />
            </View>
            <Typography
              style={{
                marginTop: 16,
                marginBottom: 8,
              }}>
              Looking for
            </Typography>
            <DropDown
              defaultValue={{label: filter.gender, value: filter.gender}}
              style={{
                marginBottom: 8,
              }}
              onChangeValue={v =>
                setFilter(f => {
                  return {
                    ...f,
                    gender: v,
                  };
                })
              }
              name="looking_for"
              data={[
                {label: 'Female', value: 'FEMALE'},
                {label: 'Male', value: 'MALE'},
              ]}
            />
            <Typography
              style={{
                marginTop: 16,
                marginBottom: 4,
              }}>
              Maximum Distance (Miles)
            </Typography>
            <Ranger
              name="distance"
              range={[filter?.distance]}
              max={200}
              onValuesChange={v =>
                setFilter(f => {
                  return {...f, distance: v};
                })
              }
            />
            <SubmitButton
              backgroundColor={'primary.500'}
              style={{
                marginTop: 24,
              }}
              onPress={data => {
                onApply(filter);
                setMatchFilter(filter);
              }}>
              Apply
            </SubmitButton>
          </Form>
        </Center>
      </ActionSheet.Content>
    </ActionSheet>
  );
}
