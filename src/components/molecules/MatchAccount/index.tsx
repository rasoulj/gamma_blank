import {
  DropDown,
  Form,
  Typography,
  View,
  Ranger,
  Layer,
  Button,
  useAuth,
} from '~/components/elemental';
import React, {useState} from 'react';

import useAuthStore from '~/stores/authStore';
import useMatchAcceptedStore from '~/stores/matchAcceptedStore';
import {useUpdateUser} from '../GalleryStyle/hooks';

export default function MatchAccount() {
  const {user} = useAuth();
  const setIsIntroVisited = useAuthStore(state => state?.setIsIntroVisited);
  const setMatchFilter = useMatchAcceptedStore(state => state.setMatchFilter);
  const {mutate: updateUser} = useUpdateUser();
  const [filter, setFilter]: any = useState({
    gender: 'MALE',
    age: {start: 0, end: 0},
    distance: 0,
  });
  const onSave = () => {
    setMatchFilter(filter);
    setIsIntroVisited(true);
    updateUser({userId: user?.id, userInput: {introSeen: true}});
  };

  return (
    <Layer style={{flex: 1}}>
      <Form>
        <Typography
          style={{
            marginBottom: 4,
            marginTop: 24,
          }}>
          Looking for
        </Typography>
        <DropDown
          style={{
            marginBottom: 24,
            width: '100%',
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
          defaultValue={{label: filter.gender, value: filter.gender}}
        />

        <Typography>Age</Typography>
        <Ranger
          name="age"
          range={[18, 32]}
          max={60}
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

        <Typography
          style={{
            marginBottom: 12,
            marginTop: 24,
          }}>
          Maximum Distance <Typography color={'gray.400'}>(Miles)</Typography>
        </Typography>
        <Ranger
          name="distance"
          range={[50]}
          max={100}
          onValuesChange={v =>
            setFilter(f => {
              return {...f, distance: v[0]};
            })
          }
        />
      </Form>
      <View style={{flex: 1}} />
      <Button
        onPress={onSave}
        backgroundColor={'primary.500'}
        style={{
          width: '100%',
          marginTop: 24,
        }}>
        Save
      </Button>
    </Layer>
  );
}
