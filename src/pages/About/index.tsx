import { Section } from "./styles";

import { ABOUT_CONTENT } from "./constants";
import { Header } from "../../components/Header";
import { RenderList } from "../../components/RenderList";

export const About = () => {
  const {
    title,
    introduction,
    offerTitle,
    features,
    whyChooseUsTitle,
    whyChooseUsDescription,
    commitmentTitle,
    commitmentDescription,
  } = ABOUT_CONTENT;

  return (
    <div data-testid="about-page">
      <Header title={title} data-testid="about-header" description={introduction}/>
     
      <Section data-testid="about-offer-section">
        <Header title={offerTitle} as="h2" data-testid="about-offer" />

        <RenderList items={features} data-testid="about-features-list" />
      </Section>

      <Section data-testid="about-why-choose-us-section">
        <Header title={whyChooseUsTitle} description={whyChooseUsDescription} as="h2" data-testid="about-why-choose-us" />
      </Section>

      <Section data-testid="about-commitment-section">
        <Header title={commitmentTitle} description={commitmentDescription} as="h2" data-testid="about-commitment" />
      </Section>
    </div>
  );
};
