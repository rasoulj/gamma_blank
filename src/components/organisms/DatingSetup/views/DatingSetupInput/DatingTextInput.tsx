import { VStack, TextArea, FormControl, Input } from "native-base";
import { DatingSetupInputProp } from "../../types";
import { Label } from "./label";
import { Controller } from "react-hook-form";
import { useEffect, useRef } from "react";

export function DatingTextInput({ config, control, errors, style }: DatingSetupInputProp): JSX.Element {
    const {
        title,
        type,
        name,
        rules,
        placeholder,
    } = config;

    const inputRef = useRef<any>();

    useEffect(() => {
        inputRef?.current?.focus();
    }, [inputRef])


    return <VStack style={style}>
        <FormControl isRequired={!!rules} isInvalid={name in errors}>
            <Label>{title}</Label>
            <Controller
                control={control}
                render={({ field: { value, onChange } }) => type === 'text' ? <Input
                    ref={inputRef}
                    id={name}
                    value={value}
                    onChangeText={onChange}
                    p='4'
                    size="2xl"
                    placeholder={placeholder}
                    variant="outline"
                    borderRadius='lg'
                    color='gray.800'
                /> : <TextArea
                    ref={inputRef}
                    value={value}
                    onChangeText={onChange}
                    h={40}
                    p='4'
                    size="2xl"
                    placeholder={placeholder}
                    variant="outline"
                    borderRadius='lg'
                    autoCompleteType={undefined}
                    color='gray.800'
                        
                />}
                name={name}
                rules={rules}
                defaultValue=""
            />
            
            <FormControl.ErrorMessage>
                {errors[name]?.message}
            </FormControl.ErrorMessage>
        </FormControl>
    </VStack>
}
