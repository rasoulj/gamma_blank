import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Card,
  Center,
  FlatList,
  IMG,
  RelativeLayout,
  scale,
  Screen,
  Scrollable,
  Text,
  Typography,
  verticalScale,
  useNavigate,
  cache,
} from '~/components/elemental';
import theme from '~/theme';
import {useGetCurrentUser} from './hooks';

const UserProfile = ({gql, ...props}) => {
  const {isLoading, data, error} = useGetCurrentUser(gql);
  const [isLoading1, setIsLoading] = useState(false);

  const {navigateWithName} = useNavigate();

  const user = data?.user_getCurrentUser?.result;
  const renderItem = ({item}: {item: any}) => {
    return <Item {...{item}} />;
  };

  return (
    <Screen isLoading={isLoading} {...props}>
      <Scrollable>
        <RelativeLayout
          data-id="83e89cb5-8450-4792-946c-b4f50ff8854b"
          data-name="RelativeLayout"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            // marginTop: 50,
            //   margin: 24,
          }}
          data-parent="screen">
          <RelativeLayout
            data-id="3980a975-d55e-4df5-8ea2-cd40fb2dce24"
            data-name="RelativeLayout"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              columnGap: 10,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 0,
              marginBottom: 0,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
            data-parent="83e89cb5-8450-4792-946c-b4f50ff8854b">
            <Center>
              {isLoading1 ? (
                <Center
                  zIndex={1000}
                  position="absolute"
                  width="100%"
                  height="100%">
                  <ActivityIndicator
                    color={theme.colors.green[400]}
                    size="small"
                  />
                </Center>
              ) : (
                false
              )}
              <IMG
                data-id="018678ba-b872-44c0-a5c6-0d06b7816871"
                data-name="IMG"
                alt="image"
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  position: 'relative',
                  borderWidth: 1,
                  borderColor: theme?.colors?.gray[300],
                }}
                source={{uri: user?.photoUrl}}
                data-parent="3980a975-d55e-4df5-8ea2-cd40fb2dce24"
              />
            </Center>

            <RelativeLayout
              data-id="170b40c5-9e74-4376-8919-0e630f0e53c7"
              data-name="RelativeLayout"
              style={{
                position: 'relative',
                flex: 1,
                flexDirection: 'column',
                rowGap: 10,
                display: 'flex',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              data-parent="3980a975-d55e-4df5-8ea2-cd40fb2dce24">
              <Typography
                data-id="a11dcef4-1ca7-45a8-bb1d-6306ffc02f29"
                data-name="Typography"
                style={{position: 'relative'}}
                data-parent="170b40c5-9e74-4376-8919-0e630f0e53c7">
                {user?.fullName}
              </Typography>
              <Typography
                data-id="5d61dec7-c9c6-4111-a162-8d1f1b775cf4"
                data-name="Typography"
                style={{position: 'relative'}}
                data-parent="170b40c5-9e74-4376-8919-0e630f0e53c7">
                {/* {user?.address} */}
              </Typography>
            </RelativeLayout>
          </RelativeLayout>

          <TouchableOpacity
            style={{
              borderColor: '#1DE9B6',
              borderWidth: 2,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
              // width: '100%',
              height: verticalScale(40),
              borderRadius: 30,
              marginHorizontal: 30,
              // paddingHorizontal: 20,
            }}
            onPress={() => navigateWithName('edit profile')}>
            <Text style={{color: '#1DE9B6'}} fontWeight="700" fontSize={17}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <Card
            data-id="f342e5b5-80c1-4616-b056-9900916e4696"
            data-name="Card"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              margin: 20,
              padding: 10,
              //   minHeight: 150,
              borderRadius: 10,
            }}
            data-parent="83e89cb5-8450-4792-946c-b4f50ff8854b">
            <Typography
              data-id="917f7eda-b7cf-4e36-abae-8918db6cfbb6"
              data-name="Typography"
              style={{position: 'relative'}}
              data-parent="f342e5b5-80c1-4616-b056-9900916e4696">
              {user?.about}
            </Typography>
          </Card>
          <FlatList
            data={user?.userGallery || []}
            numColumns={3}
            mx="3"
            contentContainerStyle={styles.contentContainerStyle}
            columnWrapperStyle={styles.wrapperStyle}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            keyExtractor={(_, index) => `item${index}`}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
          />
        </RelativeLayout>
      </Scrollable>
    </Screen>
  );
};

export default UserProfile;

const Item = ({item}: {item: any}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Center
      w="30%"
      mt="3"
      mx="1.5%"
      borderRadius="xl"
      shadow="1"
      height={scale(100)}
      borderWidth="1"
      borderColor={theme.colors.gray[300]}
      justifyContent="flex-start">
      {isLoading ? (
        <Center zIndex={1000} position="absolute" width="100%" height="100%">
          <ActivityIndicator color={theme.colors.green[400]} size="small" />
        </Center>
      ) : (
        false
      )}
      <Image
        style={{width: '100%', height: '100%', borderRadius: 10}}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        source={{
          uri:
            item?.photoUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHgD-7kP3hbPiQYBy6N3-pWaFqUNgsUwKE9XVydJQ&s',
        }}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    // backgroundColor: 'gray',
  },
  contentContainerStyle: {
    flex: 1,
    paddingBottom: 40,
  },
  wrapperStyle: {},
  image: {
    height: scale(64),
    width: scale(64),
    borderRadius: 100,
  },
  iconContainer: {
    position: 'absolute',
    right: 3,
    bottom: 0,
  },
});
