import React, {useRef, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {Input, Button, Divider} from 'native-base';
import RBSheet from 'react-native-raw-bottom-sheet';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome';
import {VictoryLine, VictoryChart, VictoryTheme} from 'victory-native';

import BidHistory, {BidHistoryItem} from '../../molecules/Bid/BidHistory';
import CommentBox, {CommentBoxProps} from '../../molecules/CommentBox';

import styles from './styles';
import Bid from '../../molecules/Bid';

export interface NFTProps {
  image?: string;
  title: string;
  ehtPrice: string;
  price: string;
  description: string;
  property?: string;
  blockchainInfo?: string;
  comments: CommentBoxProps[];
  tradeHistory?: Record<string, number>;
  onBid: (value: string) => void;
  onComment: (comment: string) => void;
  edition: string;
  owner: string;
  views: string;
  commentsCount: string;
  estimate: string;
  expirationDate: Date;
  lastBidPrice: string;
  warningCount?: string;
  bidList?: BidHistoryItem[];
  minPrice?: string;
}

const NFT = ({
  image,
  title,
  ehtPrice,
  price,
  description,
  property,
  blockchainInfo,
  comments,
  tradeHistory,
  onBid,
  onComment,
  edition,
  owner,
  views,
  commentsCount,
  estimate,
  expirationDate,
  lastBidPrice,
  warningCount,
  bidList,
  minPrice,
}: NFTProps) => {
  const refRBSheet = useRef();
  const [expanded, setExpanded] = useState<number[]>([2]);
  const [comment, setComment] = useState<string>('');
  const [showBid, setBidShow] = useState<boolean>(false);

  const handleChangeAccordion = activeSections => {
    setExpanded(activeSections);
  };

  const toggleOpenHistory = () => {
    refRBSheet.current.open();
  };

  const toggleShowBid = () => {
    setBidShow(!showBid);
  };

  const renderAccordionHeader = section => {
    return (
      <View style={styles.AccordionHeaderWrapperMain}>
        <Divider marginY={1} />
        <View style={styles.AccordionHeaderWrapper}>
          <View style={styles.HeaderWrapper}>
            {section.icon()}
            <Text style={styles.HeaderLabel}>{section.title}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderAccordionDetail = section => {
    if (typeof section.content === 'function') {
      return section.content();
    } else {
      return <Text style={styles.Description}>{section.content}</Text>;
    }
  };

  const renderAccordionComments = () => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        {comments &&
          comments.map((comment, index) => (
            <CommentBox {...comment} key={index} />
          ))}
      </View>
    );
  };

  if (showBid) {
    return (
      <Bid
        currentPrice={price}
        minPrice={minPrice}
        onBid={(bidAmount: string) => {
          onBid(bidAmount);
          toggleShowBid();
        }}
        avatar={image}
      />
    );
  }

  const accordionData = [
    {
      title: 'Properties',
      content: property,
      icon: () => <Icon name="feature-search" size={20} color="#006194" />,
    },
    {
      title: 'Blockchain Info',
      content: blockchainInfo,
      icon: () => <Icon name="ethereum" size={20} color="#006194" />,
    },
    {
      title: 'Comments',
      content: renderAccordionComments,
      icon: () => (
        <Icon name="comment-multiple-outline" size={20} color="#006194" />
      ),
    },
  ];

  const chartData = tradeHistory
    ? Object.keys(tradeHistory).map(key => ({
        key,
        value: tradeHistory[key],
      }))
    : [];

  return (
    <View style={styles.MainWrapper}>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.Container}>
          <View style={styles.MainWrapper}>
            {image && (
              <Image
                style={styles.Image}
                source={{
                  uri: image,
                }}
              />
            )}
            <Text style={styles.Title}>{title}</Text>
            <View style={styles.PriceWrapper}>
              <Text
                style={{
                  ...styles.Price,
                  marginRight: 16,
                }}>
                {ehtPrice}
              </Text>
              <Text style={styles.Price}>{price}</Text>
            </View>
            <Text style={styles.Description}>{description}</Text>
            <View style={styles.PropertyWrapper}>
              <View style={styles.PropertyItemWrapper}>
                <Text style={styles.PropertyItem}>Edition</Text>
                <Text style={styles.PropertyItemValue}>{edition}</Text>
              </View>
              <View style={styles.PropertyItemWrapper}>
                <Text style={styles.PropertyItem}>Owner</Text>
                <Text style={styles.PropertyItemValue}>{owner}</Text>
              </View>
              <View style={styles.PropertyItemWrapper}>
                <Text style={styles.PropertyItem}>Views</Text>
                <Text style={styles.PropertyItemValue}>{views}</Text>
              </View>
              <View style={styles.PropertyItemWrapper}>
                <Text style={styles.PropertyItem}>Comments</Text>
                <Text style={styles.PropertyItemValue}>{commentsCount}</Text>
              </View>
            </View>

            {tradeHistory && (
              <View>
                <VictoryChart width={350} theme={VictoryTheme.material}>
                  <VictoryLine data={chartData} x="key" y="value" />
                </VictoryChart>
              </View>
            )}

            <Accordion
              activeSections={expanded}
              sections={accordionData}
              renderHeader={renderAccordionHeader}
              renderContent={renderAccordionDetail}
              onChange={handleChangeAccordion}
              renderAsFlatList={true}
            />

            <View style={styles.AddCommentWrapper}>
              <Input
                variant="rounded"
                placeholder="Add Comment"
                flexShrink={1}
                value={comment}
                onChangeText={text => setComment(text)}
                marginRight={3}
              />

              <Button
                variant="solid"
                rounded="full"
                flexGrow={1}
                padding={3}
                leftIcon={
                  <FontAwesomeIcon name="send" size={20} color="#fff" />
                }
                onPress={() => onComment(comment)}
              />
            </View>
          </View>

          <RBSheet
            ref={refRBSheet}
            height={550}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeOnPressBack={true}>
            <BidHistory
              estimate={estimate}
              expirationDate={expirationDate}
              lastBidPrice={lastBidPrice}
              title={title}
              bidList={bidList}
              warningCount={warningCount}
              onPlaceBid={toggleShowBid}
            />
          </RBSheet>
        </View>
      </ScrollView>

      <Button
        variant="solid"
        rounded="full"
        marginY={2}
        marginX={5}
        onPress={() => toggleOpenHistory()}>
        Place a bid
      </Button>
    </View>
  );
};

export default NFT;