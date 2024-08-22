import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {Fragment} from 'react';
import Layer from '../../../atoms/Layer';
import {
  IMG,
  Typography,
  getColor,
  ReplyIcon,
  relativeTimeFromNow,
  useNavigate,
  isDark,
  User2Icon,
  VStack,
} from '../../../elemental';
import {User} from '~/types/auth';

const QuestionCommentItem = ({
  item,
  setReplyTo,
  selected,
  selectQuestion,
  setSelected,
  setSelectQuestion,
  canReply,
  educator,
}: {
  item: any;
  setReplyTo?: (item) => void;
  selected: any;
  selectQuestion: boolean;
  setSelected: (item) => void;
  setSelectQuestion: (item) => void;
  canReply?: boolean;
  educator?: User;
}) => {
  const {navigateWithName} = useNavigate();

  return (
    <Fragment>
      <TouchableOpacity
        onLongPress={() => {
          setSelectQuestion(true);
          setSelected(item);
        }}
        style={[
          styles.row,
          {
            backgroundColor:
              selected?.id === item?.id && selectQuestion
                ? getColor({color: 'primary.100'})
                : null,
          },
        ]}>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() =>
            navigateWithName('profile', {
              item: item?.user,
            })
          }>
          {item?.user?.photoUrl ? (
            <IMG
              style={styles.image}
              source={{
                uri: item?.user?.photoUrl ?? item?.review?.user?.photoUrl,
              }}
            />
          ) : (
            <User2Icon width={38} height={38} />
          )}
        </TouchableOpacity>
        <VStack style={styles.flexGrow}>
          <Layer style={styles.content}>
            <Layer style={styles.rowView}>
              <Typography color="primary.500" style={styles.boldText}>
                {item?.user?.fullName || item?.user?.email}
              </Typography>
              <Typography
                alignSelf="flex-end"
                color="gray.500"
                style={styles.time}>
                {relativeTimeFromNow(item?.createdDate)}
              </Typography>
            </Layer>
            <Typography
              color={isDark() ? 'gray.50' : 'gray.800'}
              style={styles.text}>
              {item?.question}
            </Typography>
          </Layer>
          {canReply && (
            <Layer style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => {
                  setReplyTo(item);
                }}
                style={styles.centerRow}>
                <ReplyIcon />
                <Typography color="secondary.500" style={styles.text}>
                  Reply
                </Typography>
              </TouchableOpacity>
            </Layer>
          )}
        </VStack>
      </TouchableOpacity>
      {item?.answer && (
        <TouchableOpacity
          onLongPress={() => {
            setSelectQuestion(false);
            setSelected(item);
          }}
          style={[
            styles.row,
            {
              backgroundColor:
                selected?.id === item?.id && !selectQuestion
                  ? getColor({color: 'primary.100'})
                  : null,
            },
          ]}>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() =>
              navigateWithName('profile', {
                item: item?.user,
              })
            }>
            {educator?.photoUrl ? (
              <IMG
                style={styles.image}
                source={{
                  uri: educator?.photoUrl,
                }}
              />
            ) : (
              <User2Icon width={38} height={38} />
            )}
          </TouchableOpacity>
          <VStack style={styles.flexGrow}>
            <Layer style={styles.content}>
              <Layer style={styles.rowView}>
                <Typography color="secondary.500" style={styles.boldText}>
                  {educator?.fullName || educator?.email}
                </Typography>
                <Typography
                  alignSelf="flex-end"
                  color="gray.500"
                  style={styles.time}>
                  {relativeTimeFromNow(item?.answerDate)}
                </Typography>
              </Layer>
              <Typography
                color={isDark() ? 'gray.50' : 'gray.800'}
                style={styles.text}>
                {item?.answer}
              </Typography>
            </Layer>
          </VStack>
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default QuestionCommentItem;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', paddingVertical: 8},

  profileBtn: {alignSelf: 'flex-start', marginRight: 8, marginBottom: 28},

  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: 'gray',
  },

  flexGrow: {flexShrink: 1},

  content: {
    flex: 1,
  },

  rowView: {flexDirection: 'row'},

  text: {marginLeft: 4, fontSize: 14, fontWeight: '400'},

  centerRow: {flexDirection: 'row', alignItems: 'center'},

  btnContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },

  boldText: {marginRight: 8, fontSize: 14, fontWeight: '700'},

  time: {fontSize: 12, fontWeight: '400'},

  replyItem: {
    marginLeft: 0,
  },
});
