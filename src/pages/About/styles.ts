import styled from 'styled-components';


export const Section = styled.section`
  margin-top: 32px;
`;

export const Subtitle = styled.h2`
  margin-bottom: 16px;
`;

export const Paragraph = styled.p`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const FeatureList = styled.ul`
  padding-left: 20px;
`;

export const FeatureItem = styled.li`
  margin-bottom: 12px;
  line-height: 1.6;
`;
