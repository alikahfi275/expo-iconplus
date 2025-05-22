import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from './Icons';

const Card = (props: any) => {
  const {type, icon, title, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 20,
        borderRadius: 15,
        backgroundColor: 'white',
        height: 150,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#72B4D3',
        shadowOffset: {
          width: 1,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
      }}>
      <Icons type={type} name={icon} size={60} color="#72B4D3" />
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          marginTop: 5,
          textAlign: 'center',
          color: '#4c4c4c',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
