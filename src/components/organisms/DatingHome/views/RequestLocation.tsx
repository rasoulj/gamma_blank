import React from 'react'
import { Actionsheet, Button, Toast, Typography } from '~/components'
import Geolocation from '@react-native-community/geolocation';

export function RequestLocation({
    saveLocation,
    disclose: {
        isOpen,
        onClose
    },
}: {
    saveLocation: VoidFunction,
    disclose: any,
}
): JSX.Element {

    const requestAuthorization = () => {
        Geolocation.requestAuthorization(() => {
            onClose();
            //TODO: saveLocation();
        }, (error: any) => {
            Toast.show({
                    title: 'Error',
                    description: error?.message ?? 'Unknown error occurred.',
                    duration: 3000
                })
        });
    };

    return (<Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content alignItems='center' px={8} pt={10}>
            <Typography color='gray.800' fontSize='lg' fontWeight='700' lineHeight='2xl'>
                Confirmation
            </Typography>
            <Typography m={4} color='gray.800' fontSize='sm' fontWeight='500' lineHeight='xl' textAlign='center'>
                To find the right people for you, we need access to your location
            </Typography>

            <Button w='100%' onPress={requestAuthorization}>
                Allow Location
            </Button>
            
        </Actionsheet.Content>
    </Actionsheet>)
}