import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

// Responsive values based on screen size
const { width, height } = Dimensions.get('window');
export const isTablet = width >= 768;
export const fontSize = {
  xs: isTablet ? 12 : 10,
  sm: isTablet ? 14 : 12,
  md: isTablet ? 16 : 14,
  lg: isTablet ? 18 : 16,
  xl: isTablet ? 22 : 18,
  xxl: isTablet ? 28 : 22,
};

export const spacing = {
  xs: isTablet ? 4 : 2,
  sm: isTablet ? 8 : 4,
  md: isTablet ? 16 : 8,
  lg: isTablet ? 24 : 16,
  xl: isTablet ? 32 : 24,
  xxl: isTablet ? 48 : 32,
};

// Common Colors
export const colors = {
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  secondary: '#10B981',
  accent: '#8B5CF6',
  danger: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  dark: '#1F2937',
  medium: '#4B5563',
  light: '#6B7280',
  lightest: '#9CA3AF',
  background: '#F3F4F6',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Button Components
export const PrimaryButton = ({ title, onPress, icon, style, disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.primaryButton, 
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={fontSize.lg} 
          color={colors.white} 
          style={styles.buttonIcon} 
        />
      )}
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const SecondaryButton = ({ title, onPress, icon, style, disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.secondaryButton, 
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={fontSize.lg} 
          color={colors.primary} 
          style={styles.buttonIcon} 
        />
      )}
      <Text style={styles.secondaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const DangerButton = ({ title, onPress, icon, style, disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.dangerButton, 
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={fontSize.lg} 
          color={colors.white} 
          style={styles.buttonIcon} 
        />
      )}
      <Text style={styles.dangerButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Text Components
export const Heading = ({ children, style }) => (
  <Text style={[styles.heading, style]}>{children}</Text>
);

export const Subheading = ({ children, style }) => (
  <Text style={[styles.subheading, style]}>{children}</Text>
);

export const BodyText = ({ children, style }) => (
  <Text style={[styles.bodyText, style]}>{children}</Text>
);

export const CaptionText = ({ children, style }) => (
  <Text style={[styles.captionText, style]}>{children}</Text>
);

// Card Component
export const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

// Badge Component
export const Badge = ({ title, type = 'primary', style }) => {
  const badgeStyles = {
    primary: styles.primaryBadge,
    secondary: styles.secondaryBadge,
    success: styles.successBadge,
    danger: styles.dangerBadge,
    warning: styles.warningBadge,
  };

  const textStyles = {
    primary: styles.primaryBadgeText,
    secondary: styles.secondaryBadgeText,
    success: styles.successBadgeText,
    danger: styles.dangerBadgeText,
    warning: styles.warningBadgeText,
  };

  return (
    <View style={[badgeStyles[type], style]}>
      <Text style={textStyles[type]}>{title}</Text>
    </View>
  );
};

// Divider Component
export const Divider = ({ style }) => (
  <View style={[styles.divider, style]} />
);

// Loading Component
export const Loading = ({ size = 'large', color = colors.primary }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

// Empty State Component
export const EmptyState = ({ icon, message, style }) => (
  <View style={[styles.emptyStateContainer, style]}>
    {icon && (
      <Ionicons name={icon} size={50} color={colors.lightest} style={styles.emptyStateIcon} />
    )}
    <Text style={styles.emptyStateText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  // Button Styles
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: colors.lightest,
    borderColor: colors.lightest,
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  dangerButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },

  // Text Styles
  heading: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.md,
  },
  subheading: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  bodyText: {
    fontSize: fontSize.md,
    color: colors.medium,
    lineHeight: fontSize.md * 1.5,
  },
  captionText: {
    fontSize: fontSize.sm,
    color: colors.light,
  },

  // Card Style
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: spacing.md,
  },

  // Badge Styles
  primaryBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  secondaryBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  successBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  dangerBadge: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  warningBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  primaryBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  secondaryBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  successBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  dangerBadgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  warningBadgeText: {
    color: colors.dark,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },

  // Divider Style
  divider: {
    height: 1,
    backgroundColor: colors.background,
    marginVertical: spacing.md,
    width: '100%',
  },

  // Loading Style
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },

  // Empty State Style
  emptyStateContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateIcon: {
    marginBottom: spacing.md,
  },
  emptyStateText: {
    fontSize: fontSize.md,
    color: colors.light,
    textAlign: 'center',
  },
}); 