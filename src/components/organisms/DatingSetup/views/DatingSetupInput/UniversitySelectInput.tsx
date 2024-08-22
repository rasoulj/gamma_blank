//UniversitySelectInput

import { CloseIconSet, FormControl, HStack, Typography, VStack, useNavigate } from "~/components";
import { DatingSetupInputProp } from "../../types";
import { Label } from "./label";
import { Controller } from "react-hook-form";
import { Pressable } from "react-native";
import { MenuItem } from "~/components/atoms/MenuItem";

const TRIM_LEN = 35;

function trimLen(value?: string): string {
    const v = value ?? "";
    if (v.length <= TRIM_LEN) return v;
    else return v.substring(0, TRIM_LEN) + "…";

}

interface InputBoxProps {
    value?: string,
    placeholder?: string,
    onPress?: VoidFunction,
    onClear?: VoidFunction,
}

function InputBox({
    value,
    placeholder,
    onPress,
    onClear,
}: InputBoxProps) {
    
    const notSelected = (value ?? '').length === 0;

    return <HStack
        justifyContent='space-between'
        alignItems='center'
        p={3}
        borderRadius={8}
        borderWidth={1}
        borderColor='gray.400'
        h={12}
        w='100%'
    >
        <Pressable onPress={onPress}>
            <Typography
                color={notSelected ? 'gray.400' : 'gray.800'}
            >
                {notSelected ? placeholder : value}
            </Typography>
        </Pressable>

        {!notSelected && <Pressable onPress={onClear}>
            <CloseIconSet />
        </Pressable>}
    

    </HStack>
}

export function UniversitySelectInput({
    config,
    control,
    style,
    onClose,
}: DatingSetupInputProp): JSX.Element {

    const {
        title,
        name,
        rules,
        placeholder,
        view,
    } = config;

    const { navigateWithName } = useNavigate();

    return <VStack style={style}>
        <FormControl isRequired={!!rules}>
            {view !== 'menu' && <Label>{title}</Label>}
            <Controller
                control={control}
                render={({ field: { value, onChange } }) => view === 'menu' ? <MenuItem
                    onPress={() => navigateWithName("SelectUniversity", {
                        onChange: args => {
                            onChange(args);
                            onClose?.call(undefined);
                    } })}
                    title={title}
                    subTitle={trimLen(value)}
                /> : <InputBox
                    onClear={() => onChange('')}
                    onPress={() => navigateWithName("SelectUniversity", { onChange })}
                    value={trimLen(value)}
                    placeholder={placeholder}
                />}
                name={name}
                rules={rules}
                defaultValue=""
            />
        </FormControl>
        
    </VStack>
}
