import React from "react";
import { View, StyleSheet } from "react-native";
import { getColor } from "~/components/elemental";

export function ProgressBar({
    percent,
    bg = getColor({ color: 'gray.300' }),
    color = getColor({ color: 'gray.800' }),
    height = 6,
}: {
    percent: number,
    bg?: string,
    color?: string,
    height?: number,
    }): JSX.Element {
    
    return (
        <View style={[styles.progressContainer, {height, backgroundColor: bg, borderColor: bg }]}>
            <View style={[styles.progress, {width: `${percent}%`, backgroundColor: color, borderColor: color }]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressContainer: {
        marginBottom: 16,
        marginTop: 8,
        borderRadius: 200,
    },

    progress: {
        height: '100%',
        borderRadius: 200,
    },
});
