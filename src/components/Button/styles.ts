import styled from "styled-components";

interface StyledButtonProps {
  $variant: "primary" | "secondary" | "danger";
  $size: "default" | "icon";
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => ($size === "icon" ? "36px" : "auto")};
  height: ${({ $size }) => ($size === "icon" ? "36px" : "auto")};
  padding: ${({ $size }) => ($size === "icon" ? 0 : "10px 16px")};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  border: ${({ $variant, theme }) =>
    $variant === "primary"
      ? `1px solid ${theme.colors.accent[500]}`
      : $variant === "danger"
        ? "1px solod ${theme.colors.error}"
        : `1px solid ${theme.colors.border.default}`};

  background-color: ${({ $variant, theme }) =>
    $variant === "primary"
      ? theme.colors.accent[500]
      : $variant === "danger"
        ? theme.colors.error
        : theme.colors.background.card};

  color: ${({ $variant, theme }) =>
    $variant === "primary" || $variant === "danger"
      ? theme.colors.text.inverse
      : theme.colors.text.primary};

  &:not(:disabled):hover {
    background-color: ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.colors.accent[600]
        : theme.colors.primary[50]};
    border-color: ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.colors.accent[600]
        : theme.colors.border.strong};
    filter: ${({ $variant }) =>
      $variant === "danger" ? "brightness(0.88)" : "none"};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.strong};
    outline-offset: 2px;
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.border.light};
    background-color: ${({ theme }) => theme.colors.background.page};
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    opacity: 1;
  }
`;
