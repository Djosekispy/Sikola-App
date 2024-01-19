import React, { useState } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import "../../globals/global.css";
import { Feather, FontAwesome } from '@expo/vector-icons';
type CardProps = {
  image: string,
  title: string,
  uuid: string,
  price: string,
  Description: string,
}

export default function Moduloslist({ image, title, uuid, price,Description }: CardProps) {
  const [hidden, setHidden] = useState(false);
  return (
<View className='flex gap-2 ml-5 relative'>
<View className='w-52 h-52 rounded-2xl overflow-hidden'>
<Image
onLoadStart={()=><ActivityIndicator color='blue' size={24} />}
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#0553',
          }}
          resizeMode='cover'
          source={{ uri: image }}
          progressiveRenderingEnabled={true}
        />
</View>
<View>
    <Text className='text-[#FFFFFFFF] text-lg h-6 w-28 text-ellipsis overflow-x-hidden'>{title}</Text>
    <Text className='text-[#FFA5A5A5] h-5 w-24 text-sm text-ellipsis overflow-x-hidden'>{price} kz</Text>
    </View>
</View>

  );
}