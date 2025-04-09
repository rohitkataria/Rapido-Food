import { createContext, FC, ReactNode, useContext } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

interface SharedStateContextType {
  scrolly: Animated.SharedValue<number>;
  scrollyGlobal: Animated.SharedValue<number>;
  scrollToTop: () => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const scrolly = useSharedValue(0);
  const scrollyGlobal = useSharedValue(0);

  const scrollToTop = () => {
    scrolly.value = withTiming(0, { duration: 300 });
    scrollyGlobal.value = withTiming(0, { duration: 300 });
  };

  return (
    <SharedStateContext.Provider value={{ scrollToTop, scrolly, scrollyGlobal }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};
