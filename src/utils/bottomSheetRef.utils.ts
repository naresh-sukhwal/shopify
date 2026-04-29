import React from 'react';

export const globalRBSheetRef = React.createRef<any>();

export const openAuthSheet = () => {
  globalRBSheetRef.current?.open();
};

export const closeAuthSheet = () => {
  globalRBSheetRef.current?.close();
};
