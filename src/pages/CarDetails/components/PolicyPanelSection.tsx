import { Button } from "../../../components/Button";

import {
  PolicyActions,
  PolicyPanel,
  PolicyPanelHeader,
  PolicyPanelTitle,
  PolicyStatus,
  PolicySummary,
} from "../styles";

interface PolicyPanelSectionProps {
  hasActivePolicy: boolean;
  hasHistoryItems: boolean;
  policyTitleId: string;
  onAddClaim: () => void;
  onAddPolicy: () => void;
  onSeeHistory: () => void;
}

/**
 * Renders policy status and policy-related actions in view mode.
 */
export const PolicyPanelSection = ({
  hasActivePolicy,
  hasHistoryItems,
  policyTitleId,
  onAddClaim,
  onAddPolicy,
  onSeeHistory,
}: PolicyPanelSectionProps) => (
  <PolicyPanel aria-labelledby={policyTitleId}>
    <PolicyPanelHeader>
      <PolicySummary>
        <PolicyPanelTitle id={policyTitleId}>Policy</PolicyPanelTitle>
        <PolicyStatus $active={hasActivePolicy}>
          {hasActivePolicy ? "Active policy available" : "No active policy"}
        </PolicyStatus>
      </PolicySummary>
      <PolicyActions>
        <Button
          type="button"
          variant="secondary"
          data-testid="add-claim-button"
          disabled={!hasActivePolicy}
          title={
            hasActivePolicy
              ? "Add claim"
              : "Add claim requires an active policy"
          }
          onClick={onAddClaim}
        >
          Add claim
        </Button>
        <Button
          type="button"
          variant="secondary"
          data-testid="see-history-button"
          disabled={!hasHistoryItems}
          title={hasHistoryItems ? "See history" : "No history available"}
          onClick={onSeeHistory}
        >
          See history
        </Button>
        <Button
          type="button"
          data-testid="add-policy-button"
          disabled={hasActivePolicy}
          title={
            hasActivePolicy
              ? "A policy already exists for this car"
              : "Add policy"
          }
          onClick={onAddPolicy}
        >
          Add policy
        </Button>
      </PolicyActions>
    </PolicyPanelHeader>
  </PolicyPanel>
);
