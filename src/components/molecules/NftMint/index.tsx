import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, Input} from 'native-base';

import styles from './styles';
import UploadPhoto from '../../elemental/upload/UploadPhoto';

export interface NFTMintProps {}

const NFTMint = ({}: NFTMintProps) => {
  const [name, setName] = useState<string>('');
  const [externalLink, setExternalLink] = useState<string>('');
  const [collection, setCollection] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  return (
    <ScrollView>
      <View style={styles.Container}>
        <Text style={styles.Title}>Create New Item</Text>
        <Text style={styles.SubTitle}>Image, Video, Audio, Or 3D Model</Text>
        <Text style={styles.Description}>
          File Types Supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max Size: 100 MB
        </Text>
        <View style={styles.ImageUploadWrapper}>
          <UploadPhoto />
        </View>
        <View style={styles.FormItemWrapper}>
          <Text style={styles.InputTitle}>Item Name</Text>
          <Input
            value={name}
            variant="rounded"
            placeholder="Write Your Item Name"
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.FormItemWrapper}>
          <Text style={styles.InputTitle}>External Link</Text>
          <Text style={styles.InputDescription}>
            Our Website Will Include A Link To This URL On This Item's Detail
            Page So That Users Can Click To Learn More About It. You Are Welcome
            To Link To Your Own Webpage With More Details.
          </Text>
          <Input
            value={externalLink}
            variant="rounded"
            placeholder="External Link"
            onChangeText={text => setExternalLink(text)}
          />
        </View>
        <View style={styles.FormItemWrapper}>
          <Text style={styles.InputTitle}>Collection</Text>
          <Input
            value={collection}
            variant="rounded"
            placeholder="Collection"
            onChangeText={text => setCollection(text)}
          />
        </View>
        <View style={styles.FormItemWrapper}>
          <Text style={styles.InputTitle}>Price</Text>
          <Input
            value={price}
            variant="rounded"
            placeholder="ETH"
            onChangeText={text => setPrice(text)}
          />
        </View>

        <Button
          marginTop={5}
          variant="solid"
          rounded="full"
          onPress={() => console.log('on Click')}>
          Create
        </Button>
      </View>
    </ScrollView>
  );
};

export default NFTMint;
