import React from 'react';
import { View } from 'react-native';
export const DrawerContext = React.createContext(undefined);

export default function DrawerProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  const [swipeEnabled, setSwipeEnabled] = React.useState(true);
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');
  const toggleDrawer = () => setOpen(!open);
  const touchX = React.useRef(0);

  return (
    <DrawerContext.Provider
      value={{
        open,
        toggleDrawer,
        setDirection,
        setSwipeEnabled,
      }}
    >
      <View
        onTouchStart={(e) => (touchX.current = e.nativeEvent.pageX)}
        onTouchEnd={(e) => {
          if (swipeEnabled) {
            switch (direction) {
              case 'right':
                if (!open && touchX.current - e.nativeEvent.pageX > 100) {
                  toggleDrawer();
                }

                if (open && e.nativeEvent.pageX - touchX.current > 100) {
                  toggleDrawer();
                }
                break;
              case 'left':
                if (!open && e.nativeEvent.pageX - touchX.current > 100) {
                  toggleDrawer();
                }

                if (open && e.nativeEvent.pageX - touchX.current < -100) {
                  toggleDrawer();
                }
                break;
            }
          }
        }}
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </DrawerContext.Provider>
  );
}
