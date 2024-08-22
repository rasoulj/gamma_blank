import { HStack, Pressable, Slider, VStack } from "native-base";
import { DatingSetupInputProp } from "../../types";
import { useState } from "react";
import { RefreshIconSet, Typography } from "~/components";
import { Controller } from "react-hook-form";

function getHeight(value: number, isCM: boolean): string {
    return isCM ? `${value} cm` : `${Math.round(3.93701*value)/10} ‘`;
}

export function DatingSliderInput({ config, control, style }: DatingSetupInputProp): JSX.Element {
    const [isCM, setIsCM] = useState(true);

    const {
        name
    } = config;

    return <VStack style={style}>
        <Controller
            defaultValue={180}
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => <>
                <HStack
                    pb={8}
                    justifyContent='space-between'
                >
                    <Typography
                        color='primary.500'
                        fontSize='md'
                        fontWeight='500'
                    >
                        {getHeight(value, isCM)}
                    </Typography>

                    <Pressable onPress={() => setIsCM(!isCM)}>
                        <HStack>
                            <RefreshIconSet color='primary.500' />
                            <Typography
                                pl={2}
                                color='primary.500'
                                fontSize='sm'
                                fontWeight='700'
                            >
                                {isCM ? 'inches' : 'Cm'}
                            </Typography>
                        </HStack>
                    </Pressable>
                </HStack>
                <Slider value={value} minValue={150} maxValue={210} step={1} onChange={onChange}>
                    <Slider.Track>
                        <Slider.FilledTrack />
                    </Slider.Track>
                    <Slider.Thumb />
                </Slider>

            </>} />
        
    </VStack>
}