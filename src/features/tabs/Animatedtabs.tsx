import React, { FC } from 'react';
import { SharedStateProvider } from './SharedContext';
import UserBottomTab from './UserBottomTabs';

const AnimatedTabs: FC = () => {
  return (
    <SharedStateProvider>
      <UserBottomTab />
    </SharedStateProvider>
  );
};

export default AnimatedTabs;
