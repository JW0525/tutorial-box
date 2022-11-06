import styled from "@emotion/styled";
import TutorialBox from './TutorialBox';

const TutorialLayout = styled.div`
  position: absolute;
  z-index: 1000;
`

const Tutorial = (props: { currentSection: number; }) => {
  const { currentSection } = props;

  return (
    <TutorialLayout>
      <TutorialBox currentSection={currentSection} />
    </TutorialLayout>
  )
}

export default Tutorial;









