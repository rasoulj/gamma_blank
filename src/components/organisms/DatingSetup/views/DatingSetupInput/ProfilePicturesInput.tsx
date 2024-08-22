import { DatingSetupInputProp } from "../../types";
import { FormControl } from "native-base";
import { Controller } from "react-hook-form";
import { SelectMedia } from "./SelectMedia";

export function ProfilePicturesInput({
    config,
    control,
    errors,
}: DatingSetupInputProp): JSX.Element {

    const {
        name,
        rules,
    } = config;


    return <FormControl isRequired={!!rules} isInvalid={name in errors}>
        <Controller
            name={name}
            rules={rules}
            defaultValue={[]}
            control={control}
            render={({ field: { value, onChange } }) => (
                <SelectMedia
                    value={value}
                    onChange={onChange}
                />
            )}
        />
        <FormControl.ErrorMessage>
            {errors[name]?.message}
        </FormControl.ErrorMessage>
    </FormControl>

}