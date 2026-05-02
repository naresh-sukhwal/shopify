import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface';

export const useThemedStyles = <T>(
    styleFn: (theme: themeType) => T
): T => {
    const theme = useSelector(
        (state: RootState) => state.ThemeManager.themeColor
    );

    return useMemo(() => styleFn(theme), [theme]);
};