import React from 'react';
import {
  ActionSheet,
  Button,
  HStack,
  Layer,
  Typography,
  VStack,
} from '~/components';
import {getColor} from '~/utils/helper/theme.methods';

const ConfirmationActionSheet = ({
  isOpen = false,
  confirmButtonText,
  onClose,
  isLoading = false,
  onConfirmPress,
  description,
  title,
  confirmBtnColor = 'error.500',
  onCancelPress,
  cancelBtnText = 'Cancel',
}: {
  isOpen: boolean;
  confirmButtonText?: string;
  onClose?: any;
  isLoading?: boolean;
  onConfirmPress: any;
  description?: string;
  title?: string;
  confirmBtnColor?: string;
  onCancelPress?: () => void;
  cancelBtnText?: string;
}) => {
  return (
    <ActionSheet {...{isOpen, onClose}}>
      <ActionSheet.Content
        mx="0"
        px="0"
        style={{backgroundColor: getColor({color: 'background.500'})}}>
        <VStack pb="5" px="5" w="100%" backgroundColor="background.500">
          <Typography
            data-name="Typography"
            fontSize="lg"
            fontWeight={700}
            color={'gray.800'}
            style={{
              display: 'flex',
              textAlign: 'center',
              marginTop: 8,
            }}>
            {title ?? 'Confirmation'}
          </Typography>
          <Typography
            data-name="Typography"
            fontSize="sm"
            w="100%"
            fontWeight={500}
            color={'gray.800'}
            marginY="6">
            {description ?? 'Are you sure you want to delete this item ?'}
          </Typography>
          <HStack space="4">
            <Button
              flex="1"
              variant="outline"
              data-parent="button_box"
              onPress={onCancelPress ?? onClose}>
              <Typography
                fontSize="sm"
                fontWeight={700}
                color={'primary.500'}
                m={0}
                p="0">
                {cancelBtnText}
              </Typography>
            </Button>
            <Button
              flex="1"
              bgColor={confirmBtnColor}
              isLoading={isLoading}
              data-parent="button_box"
              onPress={onConfirmPress}>
              <Typography
                fontSize="sm"
                fontWeight={700}
                color={'gray.50'}
                m={0}
                p="0">
                {confirmButtonText ?? 'Delete'}
              </Typography>
            </Button>
          </HStack>
        </VStack>
      </ActionSheet.Content>
    </ActionSheet>
  );
};
export default ConfirmationActionSheet;
