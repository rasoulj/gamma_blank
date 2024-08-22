import { Input, Typography} from "~/components";
import { DatingSetupInputProp } from "../../types";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Label } from "./label";
import { Box, Button, HStack, TextArea, VStack } from "native-base";


type ButtonProp = {
    onPress: VoidFunction,
    sibling?: boolean,
    type: 'primary' | 'error',
    visible?: boolean,
};

function CustomButton({ onPress, sibling, type, visible }: ButtonProp): JSX.Element {
    return visible && <Button
        mr={sibling ? 4 : 0}
        flex={1}
        borderColor={type+'.500'}
        onPress={onPress}
        borderWidth={2}
        borderRadius={10}
        variant='outline'
    >
        <Typography
            
            color={type+'.500'}
            fontSize="sm"
            fontWeight='700'
        >
            {type === 'primary' ? 'New Question' : 'Delete'}
        </Typography>
    </Button>
}

type QuestionProp = {
    control: Control,
    index: number,
    name: string,
    length: number,
    append: VoidFunction,
    remove: (index: number) => void,
};

function Question({
    length,
    control,
    index,
    name,
    append,
    remove,
}: QuestionProp): JSX.Element {
    return <VStack>
        
        <Label>Question</Label>
        <Controller
            name={`${name}.${index}.q`}
            control={control}
            render={({ field: { value, onChange } }) => <Input
                value={value}
                onChangeText={onChange}
                p='4'
                size="2xl"
                placeholder="Question"
                variant="outline"
                borderRadius='lg'
            />}
        />
        <Box h={4} />
        <Label>Answer</Label>
        <Controller
            name={`${name}.${index}.a`}
            control={control}
            render={({ field: { value, onChange } }) => <TextArea
                value={value}
                onChangeText={onChange}
                h={40}
                p='4'
                size="2xl"
                placeholder='Answer'
                variant="outline"
                borderRadius='lg'
                autoCompleteType={undefined}
                color='gray.800'
            />}
        />
        <HStack pt={4} pb={6}>           
            <CustomButton
                visible={length > 1}
                sibling={index === length - 1}  
                type='error'
                onPress={() => remove(index)}
            />
            <CustomButton
                visible={index === length - 1}
                onPress={append}
                type='primary'
            />
        </HStack>
    </VStack>
}

export function QuestionsInput({
    config,
    control,
    style,
}: DatingSetupInputProp): JSX.Element {

    const { name, view } = config;

    const {
        fields,
        append,
        remove,
    } = useFieldArray({ name, control })

    const _append = () => append({
        q: '',
        a: '',
    })

    if (view === 'menu') return <Question
        length={-1}
            append={_append}
            remove={remove}
            name={name}
            index={fields.length}
            control={control}
    />

    return <>
        {fields.map((item, index) => <Question
            append={_append}
            remove={remove}
            key={item.id}
            name={name}
            index={index}
            control={control}
            length={fields.length}
        />)}

        <VStack>
            <CustomButton
                type='primary'
                visible={fields.length === 0}
                onPress={_append}
            />
        </VStack>
    </>

}