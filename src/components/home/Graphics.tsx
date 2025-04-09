import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import LottieView from 'lottie-react-native';
import { Platform, View } from 'react-native';

const Graphics = () => {
  const { styles } = useStyles(homeStyles);

  return (
    <View style={styles.lottieContainer} pointerEvents="none">
      <LottieView
        enableMergePathsAndroidForKitKatAndAbove
        enableSafeModeAndroid
        style={styles.lottie}
        source={require('@assets/animations/event.json')}
        autoPlay
        loop
        hardwareAccelerationAndroid
      />
    </View>
  );
};

export default Graphics;
