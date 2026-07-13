import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const PolicyPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.card};
`;

export const PolicyPanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const PolicySummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
`;

export const PolicyPanelTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
`;

export const PolicyStatus = styled.p<{ $active: boolean }>`
  margin: 0;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.policy.active : theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 600;
`;

export const PolicyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    align-items: stretch;
    width: 100%;

    button {
      flex: 1 1 140px;
    }
  }
`;

export const HistoryTableWrapper = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SubmitError = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
`;
