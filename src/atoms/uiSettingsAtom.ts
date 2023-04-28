import { atom } from 'recoil';

export interface UiSettingsState {
  themeMode: 'light' | 'dark';
}
const defaultState: UiSettingsState = {
  themeMode: 'light',
};
export const uiSettingState = atom<UiSettingsState>({
  key: 'uiSettingState',
  default: defaultState,
});
