export const colors = {
  primary: '#2160C4',
  primaryLight: '#3B82F6',
  text: '#1F2937',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  background: '#F9FAFB',
  white: '#FFFFFF',
  danger: '#DC2626',
  success: '#16A34A',
  warningBg: '#FEF3C7',
  warningText: '#92400E',
};

export const moduleColors: Record<string, { bg: string; text: string }> = {
  assign: { bg: '#FEE2E2', text: '#DC2626' },
  forum: { bg: '#EDE9FE', text: '#7C3AED' },
  resource: { bg: '#DBEAFE', text: '#2563EB' },
  default: { bg: '#F3F4F6', text: '#6B7280' },
};

export const headerOptions = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.white,
  headerShadowVisible: false,
};
