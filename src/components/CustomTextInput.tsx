import {View, Text, TextInput} from 'react-native';
import React from 'react';

const CustomTextInput = (props: any) => {
  const {placeholder, value, onChangeText, title, keyboardType} = props;
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 10,
      }}>
      <Text style={{fontSize: 16, fontWeight: '500', color: '#72B4D3'}}>
        {title}
      </Text>
      <View
        style={{
          borderRadius: 15,
          borderColor: '#72B4D3',
          borderWidth: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          marginTop: 5,
        }}>
        <TextInput
          style={{fontSize: 18, flex: 1, color: '#4c4c4c'}}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={'#b2b2b2'}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
