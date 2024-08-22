import { StyleSheet } from 'react-native';
import { ArrowRightIconSet, Layer, Pressable, Typography, VStack, getColor, isDark } from "~/components";

export function MenuItem({ onPress, title,  subTitle = undefined}) {
    return <Pressable
        onPress={onPress}>
        <Layer style={styles.item}>
            <VStack>
                <Typography color='gray.800' fontSize='md' lineHeight={22} fontWeight='600'>{title}</Typography>
                {!!subTitle && <Typography color='gray.800' fontSize='xs' lineHeight={17} fontWeight='400'>{subTitle}</Typography>}
            </VStack>
            
            <ArrowRightIconSet color={getColor({ color: 'gray.800' })} />
        </Layer>
    </Pressable>
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 24,
        borderBottomColor: isDark()
            ? getColor({ color: 'gray.500' })
            : getColor({ color: 'gray.300' }),
        borderBottomWidth: 0.5,
    
    },
})