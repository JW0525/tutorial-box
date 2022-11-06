import styled from '@emotion/styled';
import { ITutorialContainer } from './TutorialBox';

const TutorialEffectLayout = styled.div<{ top: number, left: number, currentNum:number, idx: number, diameter: number }>`
  display: ${props => props.currentNum === (props.idx + 1) ? 'block' : 'none'};
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: ${props => props.diameter}px;
  height: ${props => props.diameter}px;
  background-color: transparent;
  border-radius: 50%;
  z-index: 50;
  box-shadow: 1px 1px 1px 500em rgba(1, 1, 1, 0.8);
  
  animation: animate 2.5s;
  @keyframes animate {
    from {
      background-color: rgba(1, 1, 1, 0.5);
    }
    to {
      background-color: transparent;
    }
  }
`;

const TutorialEffectContainer = (props: {
  offsetX: number;
  offsetY: number;
  container: ITutorialContainer;
  currentNum: number;
  idx: number;
}) => {
  const { offsetX, offsetY, container, currentNum, idx } = props;

  return (
    <TutorialEffectLayout
      top={offsetY + container.offset.adjustEffectY}
      left={offsetX + container.offset.adjustEffectX}
      diameter={container.offset.diameter}
      currentNum={currentNum}
      idx={idx}
    />
  )
}

export default TutorialEffectContainer;