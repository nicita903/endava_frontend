import { render, screen } from '../../test-utils';
import { About } from './index';
import { ABOUT_CONTENT } from './constants';

describe('About', () => {
  it('renders the about page', () => {
    render(<About />);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('renders the title and introduction', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: ABOUT_CONTENT.title,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(ABOUT_CONTENT.introduction)
    ).toBeInTheDocument();
  });

  it('renders all feature items', () => {
    render(<About />);

    ABOUT_CONTENT.features.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders why choose us section', () => {
    render(<About />);

    expect(
      screen.getByTestId('about-why-choose-us-section')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: ABOUT_CONTENT.whyChooseUsTitle,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(ABOUT_CONTENT.whyChooseUsDescription)
    ).toBeInTheDocument();
  });

  it('renders commitment section', () => {
    render(<About />);

    expect(
      screen.getByTestId('about-commitment-section')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: ABOUT_CONTENT.commitmentTitle,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(ABOUT_CONTENT.commitmentDescription)
    ).toBeInTheDocument();
  });
});
