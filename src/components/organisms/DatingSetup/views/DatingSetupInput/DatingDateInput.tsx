import { useState } from "react";
import { DatingSetupInputProp } from "../../types";
import dayjs from "dayjs";
import { VStack, HStack, Actionsheet, FormControl } from "native-base";
import { TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { Button, CalenderIcon, Typography } from "~/components";
import { Label } from "./label";
import { Controller } from "react-hook-form";
import { MenuItem } from "~/components/atoms/MenuItem";


function formDate(date: Date): string {
    return dayjs(date).format("MM/DD/YYYY")
}

export function DatingDateInput({ config, control, errors, style, onClose }: DatingSetupInputProp): JSX.Element {
    const {
        title,
        name,
        rules,
        view,
    } = config;

    const [visible, setVisible] = useState(false)

    const onOK = () => {
        setVisible(false);
        onClose?.call(undefined);
    }

    return (
        <VStack style={style}>
            <FormControl isRequired={!!rules} isInvalid={name in errors}>
                {view !== 'menu' && <Label>{title}</Label>}
                <Controller
                    name={name}
                    control={control}
                    render={p => <>
                        {view === 'menu' ? <MenuItem
                            onPress={() => setVisible(true)}
                            title={title}
                            subTitle={formDate(p.field.value ?? new Date())}
                        /> : <TouchableOpacity
                                onPress={() => setVisible(true)}
                            >
                            <HStack
                                w="100%"
                                p={4}
                                alignItems="center"
                                justifyContent="space-between"
                                borderRadius={'lg'}
                                borderWidth={1}
                                borderColor="gray.300"
                            >
                                <Typography>{formDate(p.field.value ?? new Date())}</Typography>
                                <CalenderIcon />
                            </HStack>
                        </TouchableOpacity>}

                        <Actionsheet  isOpen={visible} onClose={onOK}>
                            <Actionsheet.Content bg="#FFFFFF">
                                <DatePicker
                                    confirmText="OK"
                                    cancelText="Cancel"
                                    title="Birthday"
                                    date={p.field.value ?? new Date()}
                                    mode="date"
                                    onDateChange={p.field.onChange}
                                />
                                <Button
                                    onPress={onOK}
                                    w='100%'
                                >OK</Button>
                            </Actionsheet.Content>
                        </Actionsheet>
                    </>}
                />
                <FormControl.ErrorMessage>
                    {errors[name]?.message}
                </FormControl.ErrorMessage>
                
            </FormControl>
        </VStack>
    )
}