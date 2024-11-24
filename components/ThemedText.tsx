import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  color?: string
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  color,
  ...rest
}: ThemedTextProps) {

  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        { color },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'semibold',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 20
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});
