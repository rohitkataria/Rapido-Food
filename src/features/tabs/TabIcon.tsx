import { FC, memo } from 'react';
import { Image, View } from 'react-native';
import { Colors } from '@unistyles/Constants';
import { TextStyle, ViewStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/global/CustomText';

import DeliveryFocused from '@assets/tabicons/delivery_focused.png';
import Delivery from '@assets/tabicons/delivery.png';

import ReorderFocused from '@assets/tabicons/reorder_focused.png';
import Reorder from '@assets/tabicons/reorder.png';

import LiveFocused from '@assets/tabicons/live_focused.png';
import Live from '@assets/tabicons/live.png';

import DiningFocused from '@assets/tabicons/dining_focused.png';
import Dining from '@assets/tabicons/dining.png';
import { useSelector } from 'react-redux';



interface TabProps {
  name: string;
}

interface IconProp {
  focused: boolean;
}

const styles = {
  width: RFValue(18),
  height: RFValue(18),
};

const tabStyles: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyleInActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.lightText,
  fontSize: RFValue(9.5),
};

const textStyleActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.active,
  fontSize: RFValue(9.5),
};

const TabIcon: FC<TabProps> = memo(({ name }) => {
    return (
      <View style={tabStyles}>
        <Image
          source={
            name === 'Delivery'
              ? Delivery
              : name === 'Dining'
              ? Dining
              : name === 'Reorder'
              ? Reorder
              : Live
          }
          style={styles}
        />
        <CustomText style={textStyleInActive}>{name}</CustomText>
      </View>
    );
  });
  

  const TabIconFocused: FC<TabProps> = memo(({ name }) => {
    const isVegMode = useSelector((state:any) => state.user.isVegMode)
    return (
      <View style={tabStyles}>
        <Image
          source={
            name === 'Delivery'
              ? DeliveryFocused
              : name === 'Dining'
              ? DiningFocused
              : name === 'Reorder'
              ? ReorderFocused
              : LiveFocused
          }
          style={[
            styles,
            {
              tintColor:
                name === 'Live'
                  ? undefined
                  : isVegMode
                  ? Colors.active
                  : Colors.primary,
            },
          ]}
        />
        <CustomText style={textStyleActive}>{name}</CustomText>
      </View>
    );
  });
  
  export const DeliveryTabIcon: FC<IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name="Delivery" /> : <TabIcon name="Delivery" />;
  };
  
  export const ReorderTabIcon: FC<IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name="Reorder" /> : <TabIcon name="Reorder" />;
  };
  
  export const DiningTabIcon: FC<IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name="Dining" /> : <TabIcon name="Dining" />;
  };
  
  export const LiveTabIcon: FC<IconProp> = ({ focused }) => {
    return focused ? <TabIconFocused name="Live" /> : <TabIcon name="Live" />;
  };
  