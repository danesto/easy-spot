enum SettingsTabs {
  INVITATIONS = 'invitations',
  PERSONAL_INFO = 'personal-info',
  NOTIFICATIONS = 'notifications',
}

const TAB_INDEXES_MAP: { [key: string]: number } = {
  [SettingsTabs.INVITATIONS]: 0,
  [SettingsTabs.PERSONAL_INFO]: 1,
  [SettingsTabs.NOTIFICATIONS]: 2,
};

export { TAB_INDEXES_MAP, SettingsTabs };
