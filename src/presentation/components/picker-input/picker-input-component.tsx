import {
  Picker,
  PickerItemProps,
  PickerProps,
} from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { styles, Container } from './styles';
import { useTheme } from 'styled-components';
import { useState } from 'react';

export interface PickerComponentProps extends PickerProps {}
export interface PickerItemComponentProps extends PickerItemProps {}
export type PickerComponentItemValue = {} & ItemValue;

export const PickerItemComponent: React.FC<PickerItemComponentProps> = (
  props
) => {
  return <Picker.Item {...props} />;
};

export const PickerComponent: React.FC<PickerComponentProps> = (props) => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<ItemValue>();
  return (
    <Container>
      <Picker
        {...props}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedItem(itemValue);
          if (props.onValueChange) {
            props.onValueChange(itemValue, itemIndex);
          }
        }}
        style={{
          ...styles.pickerItem,
          color: !selectedItem
            ? theme.colors.placeholder
            : theme.colors.secondary,
        }}
        dropdownIconColor={theme.colors.body}
      >
        {props.children}
      </Picker>
    </Container>
  );
};
