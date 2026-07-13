import { Container, Description, Title, TopContainer } from './styles';
import type { HeaderProps } from './types';

export const Header = ({ title, description, as='h1', actions , "data-testid": dataTestId = 'header' }: HeaderProps) => {
  return (
    <Container data-testid={`${dataTestId}-container`} >
      <TopContainer data-testid={`${dataTestId}-top-container`}>
        <Title as={as} data-testid={`${dataTestId}-title`}>{title}</Title>
         {actions}
      </TopContainer>
        {description && <Description data-testid={`${dataTestId}-description`}>{description}</Description>}
    </Container>
  );
};