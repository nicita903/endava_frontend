export interface RenderListItem {
  id: string | number;
  text: string;
}

export interface RenderListProps {
  title?: string;
  items: RenderListItem[];
  'data-testid'?: string;
}