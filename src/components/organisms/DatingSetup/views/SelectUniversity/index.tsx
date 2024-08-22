import React from 'react'
import { Container } from '../Container'
import { Typography } from '~/components/elemental'
import {
    useSelectUniversity,
    IUniversity,
} from './SelectUniversity.hook'
import {
    FlatList,
    Pressable,
    View,
} from 'native-base'
import {
    ArrowLeft1IconSet,
    CloseIconSet,
    EmptyData,
    Input,
    SearchNormalIconSet,
} from '~/components'
import { StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

function UniversityRow({
    university,
    onPress,
}: {
        university: IUniversity,
        onPress: VoidFunction,
}): JSX.Element {
    return <Pressable
        py={4}
        onPress={onPress}
    >
        <Typography
            color='gray.800'
            fontSize='md'
            fontWeight='500'
            lineHeight='lg'
        >
            { university.institution }
        </Typography>
    </Pressable>
}

function SelectUniversity(): JSX.Element {

    const {
        isLoading,
        data,
        searchText,
        setSearchText,
        clearSearch,
    } = useSelectUniversity()

    const { goBack } = useNavigation();
    const {params} = useRoute();

    const onSelect = (uni: IUniversity) => {
        (params as any)?.onChange(uni.institution);
        goBack();
    }

    return (
        <Container
            isLoading={isLoading}
            header={<View style={styles.header}>
                <View style={styles.backContainer}>
                    <Pressable onPress={goBack}>
                        <ArrowLeft1IconSet />
                    </Pressable>
                </View>
                <View style={styles.flex1}>
                    <Input
                        value={searchText}
                        onChangeText={setSearchText}
                        rightElement={searchText !== '' && <Pressable
                            onPress={clearSearch}
                        >
                            <CloseIconSet style={styles.closeBtn} />
                        </Pressable>}
                        leftElement={<SearchNormalIconSet style={styles.searchIcon}/>}
                        placeholder='Search'
                    />
                </View>
            </View>}
        >
            <FlatList
                ListEmptyComponent={<EmptyData />}
                p={8}
                data={data}
                renderItem={({ item, index }) => <UniversityRow
                    onPress={() => onSelect(item)}
                    key={index}
                    university={item}
                />}
            />
            
        </Container>
    )
}

export default SelectUniversity

const styles = StyleSheet.create({
    backContainer: {
        flex: 0.1,
        justifyContent: 'center',
    },

    header: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },

    closeBtn: {
        marginEnd: 12,
    },

    searchIcon: {
        marginStart: 12,
    },

    flex1: {
        flex: 1,
    }
})