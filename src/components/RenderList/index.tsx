import { Container, List, ListItem, Title } from './styles';
import type { RenderListProps } from './types';

export const RenderList = ({
  title,
  items,
  'data-testid': dataTestId,
}: RenderListProps) => {
  return (
    <Container data-testid={`${dataTestId}-container`}>
      {title && <Title>{title}</Title>}

      <List data-testid={`${dataTestId}-list`}>
        {items.map((item) => (
          <ListItem key={item.id} data-testid={`${dataTestId}-list-item-${item.id}`}>
            {item.text}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};