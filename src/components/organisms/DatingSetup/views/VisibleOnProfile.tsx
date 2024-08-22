import { HStack } from "native-base"
import { Control, Controller } from "react-hook-form"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Layer, TickIconSet, Typography, getColor } from "~/components"
import { margin } from "../consts"
import { EyeFillIcon } from "~/assets/icons/dating"

export function ProgressText({ text }: { text?: string }): JSX.Element {
    return !!text && <HStack marginLeft={margin} >
            <EyeFillIcon />
            
            <Typography
                style={styles.progressText}
                color="gray.800"
                fontWeight="400"
                fontSize="xs"
            >
                {text}
            </Typography>
        </HStack >
    
}

type VisibleOnProfileProps = {
    name: string,
    control: Control,
    visible?: boolean,
}
export function VisibleOnProfile({
    name,
    control,
    visible,
}: VisibleOnProfileProps): JSX.Element {
    return !!visible && <HStack style={styles.bottomContainer0}>
        <Controller
            control={control}
            key={name + '_visible'}
            name={name + '_visible'}
            render={({ field: { value, onChange } }) => {
                return <CustomCheckBox
                    key={name + '_visible'}
                    labelStyle={styles.labelStyle}
                    label={'Visible on profile'}
                    onToggle={() => onChange(!value)}
                    isChecked={value ?? false}
                />
            }}
        />
    </HStack>
                
}


export const CustomCheckBox = ({ label, isChecked, onToggle, labelStyle = undefined }) => {
    return (
        <TouchableOpacity onPress={onToggle}>
            <Layer style={styles.checkboxContainer}>
                <Layer
                    style={{
                        ...styles.checkbox,
                        backgroundColor: getColor({
                            color: isChecked ? 'primary.500' : 'background.500',
                        }),
                    }}>
                    {isChecked && <TickIconSet width={16} color={'#fff'} />}
                </Layer>
                <Typography style={labelStyle ?? styles.defLabel}>
                    {label}
                </Typography>
            </Layer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    defLabel: { fontSize: 16, fontWeight: '400' },

    bottomContainer0: {
        paddingTop: 6,
        marginStart: 0,
        alignItems: 'flex-end',
        height: 24,
    },
    
    bottomContainer: {
        paddingTop: 6,
        marginStart: margin,
        alignItems: 'flex-end',
        height: 24,
    },

    progressText: {
        marginStart: 8,
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#9999',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderRadius: 1,
    },


    labelStyle: {
        color: 'gray.800',
        fontWeight: '400',
        fontSize: 12,
    }

})