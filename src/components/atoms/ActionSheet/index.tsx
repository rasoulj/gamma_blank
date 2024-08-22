import React from 'react';
import {
  Actionsheet as NativeActionSheet,
  IActionsheetContentProps,
  IActionsheetItemProps,
  IActionsheetProps,
} from 'native-base';

const ActionSheet = (props: IActionsheetProps) => {
  return <NativeActionSheet {...props} />;
};

const Content = function (props: IActionsheetContentProps) {
  return <NativeActionSheet.Content {...props} />;
};

const Item = function (props: IActionsheetItemProps) {
  return <NativeActionSheet.Item {...props} />;
};

ActionSheet.Content = Content;
ActionSheet.tItem = Item;

export default ActionSheet;
