import { atom } from 'recoil';

export interface UiSettingsState {
  themeMode: 'light' | 'dark';
  guestMode: boolean;
}
const defaultState: UiSettingsState = {
  themeMode: 'light',
  guestMode: false,
};
export const uiSettingState = atom<UiSettingsState>({
  key: 'uiSettingState',
  default: defaultState,
});
