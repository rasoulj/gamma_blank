import React, {useState} from 'react';
import Card from '../../atoms/Card';
import {
  shadow,
  Typography,
  relativeTime,
  EventLocationIcon,
  Button,
  RelativeLayout,
  IMG,
  cache,
} from '~/components/elemental';

export default function RenderItem({
  item,
  index,
  onPressActivate,
  onPressDelete,
}) {
  return (
    <Card
      style={{
        flex: 1,
        minHeight: 50,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#2222220D',
        borderWidth: 1,
        shadowOffset: {width: 0, height: 2},
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.12,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: item?.event?.isActive ? '#ffffff' : '#F2F2F2',
      }}>
      <RelativeLayout
        style={{
          flex: 1,
          margin: 0,
          padding: 0,
        }}>
        <RelativeLayout
          style={{
            flex: 1,
            flexDirection: 'row',
            margin: 0,
            padding: 0,
          }}>
          <RelativeLayout
            data-id="3a43ca61-547a-4469-9489-728a756025aa"
            data-name="RelativeLayout"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
            }}
            data-parent="d4309d1e-d61e-43f3-a09f-afa93a6bf1f7">
            <IMG
              data-id="event?.imageUrl"
              data-name="IMG"
              style={{
                position: 'relative',
                width: 112,
                height: 129,
                borderRadius: 9,
                opacity: item?.event?.isActive ? 1 : 0.6,
              }}
              attribute="event?.imageUrl"
              src={item?.event?.imageUrl}
              data-parent="3a43ca61-547a-4469-9489-728a756025aa"
            />
          </RelativeLayout>
          <RelativeLayout
            data-id="062f8cec-6d93-4bad-8f92-88ee09dda1db"
            data-name="RelativeLayout"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              marginTop: 10,
            }}
            data-parent="d4309d1e-d61e-43f3-a09f-afa93a6bf1f7">
            <Typography
              data-id="event?.title"
              data-name="Typography"
              style={{
                position: 'relative',
                fontWeight: 'bold',
                fontSize: 12,
              }}
              attribute="event?.title"
              data-parent="062f8cec-6d93-4bad-8f92-88ee09dda1db">
              {item?.event?.title}
            </Typography>
            <Typography
              data-id="event?.eventCategory?.name"
              data-name="Typography"
              style={{
                position: 'relative',
                marginTop: 12,
                color: '#818181',
                fontSize: 10,
              }}
              attribute="event?.eventCategory?.name"
              data-parent="062f8cec-6d93-4bad-8f92-88ee09dda1db">
              {item?.event?.eventCategory?.name}
            </Typography>
            <Typography
              data-id='{relativeTime(item?.event?.date, "MMMM, DD/YYYY / HH:MM")}'
              data-name="Typography"
              style={{
                position: 'relative',
                marginTop: 12,
                color: '#818181',
                fontSize: 10,
              }}
              attribute={relativeTime(
                item?.event?.date,
                'MMMM, DD/YYYY / HH:MM',
              )}
              data-parent="062f8cec-6d93-4bad-8f92-88ee09dda1db">
              {relativeTime(item?.event?.date, 'MMMM, DD/YYYY / HH:MM')}
            </Typography>
            <RelativeLayout
              data-id="85ceab27-0af0-4bdc-8233-4b665d4ba9ad"
              data-name="RelativeLayout"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 20,
                padding: 0,
              }}
              data-parent="062f8cec-6d93-4bad-8f92-88ee09dda1db">
              <EventLocationIcon
                data-id="0f914ba4-3151-409b-ac7b-893cdb10a81a"
                data-name="EventLocationIcon"
                style={{position: 'relative'}}
                data-parent="85ceab27-0af0-4bdc-8233-4b665d4ba9ad">
                eventlocationicon
              </EventLocationIcon>
              <Typography
                data-id="event?.city"
                data-name="Typography"
                style={{
                  position: 'relative',
                  color: '#006194',
                  fontSize: 10,
                  marginLeft: 5,
                }}
                attribute="event?.city"
                data-parent="85ceab27-0af0-4bdc-8233-4b665d4ba9ad">
                {item?.event?.state}, {item?.event?.city}
              </Typography>
            </RelativeLayout>
          </RelativeLayout>
        </RelativeLayout>
        <RelativeLayout
          flexDirection="row"
          style={{flex: 1}}
          justifyContent="space-between"
          // alignItems="center"
        >
          <Button
            variant={'outline'}
            _text={{
              fontWeight: 'bold',
              color: '#1de9b6',
            }}
            borderColor={'#1de9b6'}
            px={6}
            py={2}
            borderWidth={2}
            // onPress={() => onPressDelete(item?.event?.id)}
            onPress={onPressDelete}>
            Delete event
          </Button>
          <Button
            borderWidth={2}
            px={6}
            py={2}
            _text={{
              fontWeight: 'bold',
            }}
            bgColor={'#1de9b6'}
            borderColor={'#1de9b6'}
            // onPress={() => onPressActivate(item?.event?.id)}
            onPress={() => onPressActivate(item)}>
            {item?.event?.isActive ? 'Deactive event' : 'Activate event'}
          </Button>
        </RelativeLayout>
      </RelativeLayout>
    </Card>
  );
}
