import React from "react";
import { Button, CircularProgress, LoadIndicator, Typography } from "~/components/elemental";
import { StyleSheet } from "react-native";
import { margin } from "../consts";

export function ContinueButton({
    label = 'Continue',
    loading,
    onPress,
    disabled,
}: {
    label?: string,
    onPress?: VoidFunction,
    disabled?: boolean,
    loading?: boolean,
}): JSX.Element {
    
    return <Button
        isLoading={loading}
        backgroundColor={disabled ? 'primary.200' : 'primary.500'}
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
    >
        <Typography
            fontSize='md'
            fontWeight='600'
            color={disabled ? 'gray.500' : '#fff'}
        >
            {label}
        </Typography>
    </Button>
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: margin,
    },

});