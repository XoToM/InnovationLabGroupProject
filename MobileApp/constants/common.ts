import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")
const isSmallScreen = width < 375

export const colors = {
    primary: "#4361ee",
    primaryDark: "#3a56d4",
    primaryLight: "#eef2ff",
    secondary: "#f72585",
    background: "#ffffff",
    card: "#ffffff",
    text: "#1e293b",
    textLight: "#64748b",
    border: "#e2e8f0",
    success: "#10b981",
    error: "#ef4444",
    inputBg: "#f8fafc",
    gradient: ["#4361ee", "#3a56d4"] as [string, string], // Ensure it's a tuple
  }
  

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: isSmallScreen ? 16 : 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: isSmallScreen ? 24 : 28,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 56,
  },
  inputContainerError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  inputStyle: {
    fontSize: 16,
    color: colors.text,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 16,
    marginLeft: 12,
    fontWeight: "500",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 56,
    marginTop: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  footerText: {
    color: colors.textLight,
    fontSize: 15,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },
  socialButtonsContainer: {
    marginTop: 24,
  },
  socialButton: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 56,
    marginTop: 12,
  },
  socialButtonTitle: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 15,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textLight,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  iconContainer: {
    marginRight: 10,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
})
