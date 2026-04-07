import { TYPE_THEMES } from '../constants/theme';

export const getTheme = (type: string) => TYPE_THEMES[type] ?? TYPE_THEMES.normal;
