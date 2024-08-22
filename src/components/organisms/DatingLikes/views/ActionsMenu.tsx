import React from 'react'
import { Actionsheet, HStack, Typography } from '~/components';

export type CommandType = {
    id: number,
    label: string,
    icon: any,
}

interface CommandTypeFunction {
    (command: CommandType): void;
}


export type ActionsMenusProps = {
    commands: CommandType[],
    onCommand: CommandTypeFunction,
    disclose: {
        isOpen: boolean,
        onClose: VoidFunction,
    }
}

export function ActionsMenu({ commands, onCommand, disclose }: ActionsMenusProps): JSX.Element {
    return (<Actionsheet hideDragIndicator={false} isOpen={disclose.isOpen} onClose={disclose.onClose}>
        <Actionsheet.Content>
            {commands.map(command => (<Actionsheet.Item key={command.id} onPress={() => onCommand(command)}>
                <HStack justifyContent={'center'}>
                    {command.icon}
                    <Typography color={'error.500'} fontWeight={'700'} pl={2}>
                        {command.label}
                    </Typography>
                </HStack>
            </Actionsheet.Item>))}
        </Actionsheet.Content>
    </Actionsheet>)
    
}

