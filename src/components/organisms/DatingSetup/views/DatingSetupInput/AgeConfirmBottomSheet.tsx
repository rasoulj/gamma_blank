import { Actionsheet, HStack } from 'native-base'
import React from 'react'
import { Button } from 'native-base'
import { Typography } from '~/components'
import { calcAge } from '../../types'

export function AgeConfirmBottomSheet({
    bodDisclose: {
        isOpen,
        onClose
    },
    onOK,
    dob,
}: {
    onOK: VoidFunction,
    bodDisclose: any,
    dob: Date,
}) {
    
    const age = calcAge(dob)

    return (<Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
            px={8}
            pt={10}
        >
            <Typography
                color='gray.800'
                fontSize='lg'
                fontWeight='700'
            >
                You're {age}
            </Typography>

            <HStack
                pt={6}
                pb={4}
                w='100%'
            >
                <Typography
                    color='gray.800'
                >
                    Make sure this is your correct age.
                </Typography>
            </HStack>

            <HStack>
                
                <Button
                    variant='outline'
                    mr={1}
                    borderRadius={10}
                    borderWidth={2}
                    flex={1}
                    onPress={onClose}
                >
                    <Typography
                        fontSize='sm'
                        color='primary.500'
                        fontWeight='700'
                    >
                        Cancel
                    </Typography>
                    
                </Button>
                
                <Button
                    ml={1}
                    borderRadius={10}
                    flex={1}
                    onPress={() => {
                        onOK();
                        onClose();
                    }}
                >
                    <Typography
                        fontSize='sm'
                        color='#fff'
                        fontWeight='700'
                    >
                        Confirm
                    </Typography>
                </Button>
                
            </HStack>
        </Actionsheet.Content>
    </Actionsheet>)
            
}

