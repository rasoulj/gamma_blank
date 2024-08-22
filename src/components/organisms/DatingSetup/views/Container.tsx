import { Layout, ScrollView, VStack } from "~/components";
import { DismissKeyboardView } from "./DismissKeyboardView";
import { StyleSheet } from "react-native";


export function Container({
    children = undefined,
    needKeyboard = false,
    header = undefined,
    footer = undefined,
    isLoading = false,
}) {

    return needKeyboard ? (
        <Layout isLoading={isLoading} hasMargin={false} headless>
            {header}
            <DismissKeyboardView>
                <ScrollView contentContainerStyle={styles.mainContainer}>
                    {children}
                </ScrollView>
                    
            </DismissKeyboardView>
            {!!footer && <VStack>
                {footer}
            </VStack>}
            
        </Layout>
    ) : (
        <Layout isLoading={isLoading} hasMargin={false} headless>
            {header}
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {children}
            </ScrollView>
            {!!footer && <VStack>
                {footer}
            </VStack>}
        </Layout>
    );
}


const styles = StyleSheet.create({
    mainContainer: {
    },
});