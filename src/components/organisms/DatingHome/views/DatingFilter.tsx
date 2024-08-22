import { Actionsheet, CustomCheckBox, DropDown, Form, HStack, Ranger } from "~/components";
import { IFilterHook } from "../hooks/DatingHome.hook";
import { Label } from "../../DatingSetup/views/DatingSetupInput/label";
import { Button } from "native-base";


const GenderData = [
    {label: 'Woman', value: 'Woman'},
    {label: 'Man', value: 'Man'},
    {label: 'Non-binary', value: 'Non-binary'},
    {label: 'Everyone', value: 'Everyone'},
]


function RangeInput({ label, children }): JSX.Element {
    return <>
        <Label paddingTop={4}>{label}</Label>
        {children}
    </>
}

export function DatingFilter({
    filterHook,
    onApply,
    disclose: {
        isOpen,
        onClose
    },
}: {
    filterHook: IFilterHook,
    onApply: VoidFunction,
    disclose: any,
}
): JSX.Element {

    const { filter, setValue, clear } = filterHook;

    const _apply = () => {
        onClose();
        onApply()
    }

    const _clear = () => {
        clear();
        onApply();
    }
    
    return (<Actionsheet hideDragIndicator isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content alignItems='flex-start' px={8} pt={10}>
            <Form width="100%">
                <DropDown
                    placeholder="Select"
                    data={GenderData}
                    onChangeValue={value => setValue('genderOption', value)}
                    name="genderOption"
                    label="Show Me"
                />


                <RangeInput label='Age Range'>
                    <Ranger
                        onValuesChange={value => setValue('age', value)}
                        range={filter.age}
                        min={18}
                        max={80}
                        name=""
                    />
                </RangeInput>
                
                
                <RangeInput label='Height Range (cm)'>
                    <Ranger
                        onValuesChange={value => setValue('height', value)}
                        range={filter.height}
                        min={120}
                        max={220}
                        name=""
                    />
                </RangeInput>
                
                <RangeInput label='Distance (km)'>
                    <Ranger
                        onValuesChange={value => setValue('distance', value)}
                        range={filter.distance}
                        min={0}
                        max={220}
                        name=""
                        enabledOne={false}
                        customMarkerLeft={e => null}
                    />
                </RangeInput>

                <HStack marginTop={4}>
                    <CustomCheckBox
                        isChecked={filter.verifiedOnly}
                        onToggle={() => setValue('verifiedOnly', !filter.verifiedOnly)}
                        label='Show me photo verified only'
                    />
                </HStack>

                <HStack marginTop={8}>
                    <Button
                        onPress={_clear}
                        size='md'
                        variant='outline'
                        mr={2}
                        borderRadius={10}
                        borderWidth={2}
                        w='1/2'
                    >Reset</Button>
                    
                    <Button
                        onPress={_apply}
                        w='1/2'
                        ml={2}
                        borderRadius={10}
                    >Apply</Button>
                </HStack>
                
            </Form>
        </Actionsheet.Content>
    </Actionsheet>)
        

}