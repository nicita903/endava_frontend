import styled from 'styled-components';

export const DashboardPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const Hero = styled.section`
  position: relative;
  padding: 32px;
  overflow: hidden;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[800]},
    ${({ theme }) => theme.colors.primary[500]} 65%,
    ${({ theme }) => theme.colors.accent[500]}
  );
  box-shadow: 0 16px 36px rgb(51 107 255 / 20%);
  color: ${({ theme }) => theme.colors.text.inverse};

  &::after {
    position: absolute;
    top: -80px;
    right: -60px;
    width: 240px;
    height: 240px;
    border: 40px solid rgb(255 255 255 / 8%);
    border-radius: 50%;
    content: '';
  }
`;

export const HeroLabel = styled.span`
  display: inline-block;
  margin-bottom: 12px;
  padding: 6px 10px;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 20px;
  background-color: rgb(255 255 255 / 10%);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const HeroTitle = styled.h1`
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 36px;
`;

export const HeroDescription = styled.p`
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.text.inverse};
  line-height: 1.6;
  opacity: 0.9;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  & > article:nth-child(3)::before {
    background: ${({ theme }) => theme.colors.success};
  }

  & > article:nth-child(4)::before {
    background: ${({ theme }) => theme.colors.error};
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 520px);
`;