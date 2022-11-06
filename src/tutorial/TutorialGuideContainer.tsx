import styled from '@emotion/styled';
import textCss from '../../asset/styles/textCss';
import { palette, radius } from '../../asset/styles/baseStyle';
import { ITutorialContainer } from './TutorialBox';
import { useTranslation } from 'react-i18next';

const TutorialGuideBox = styled.div<{currentNum: number, currentPage: string, idx: number, arrowDirection:string}>`
  ${textCss.white13Thin}
  display: ${props => props.currentNum === (props.idx + 1) ? 'block' : 'none'};
  position: absolute; 
  width: 320px;
  padding: 20px 16px 44px;
  ${radius.small};
  background-color: ${palette.green.light};
  line-height: normal;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  z-index: 100;
  white-space: pre-line;

  animation: animate 1s;
  @keyframes animate {
    from {
      opacity: 0.7;
    }
    to {
      opacity: 1;
    }
  }
  
  .arrow {
    position: absolute;
    top: ${props => (props.currentNum === 4) ? '120px' : '10px'};
    width: 10px;
    right: 10px;
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
    box-sizing: border-box;
    ${props => props.arrowDirection === 'right' ? 
      ({ left: '320px', borderLeft: `8px solid ${palette.green.light}` }) 
        : 
      ({ right: '320px', borderRight: `8px solid ${palette.green.light}` })
    }
  }

  p {
    margin: 0;
    width: fit-content;

    b {
      font-weight: normal;
      color: #ffe64c;
    }

    &.order {
      font-size: 12px;
      height: 17px;
    }

    &.title {
      height: 100%;
      margin-bottom: 10px;
      font-size: 18px;
    }

    &.description {
      margin-bottom: 30px;
      font-weight: normal;
    }

    &.skip {
      position: absolute;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  
  span {
    position: absolute;
    right: 16px;
    bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 40px;
    ${radius.medium};
    background-color: ${palette.green.dark};
    box-sizing: border-box;
    cursor: pointer;
  }
`

const TutorialGuideContainer = (props:{
  offsetX: number;
  offsetY: number;
  idx: number;
  currentNum: number;
  currentPage: string;
  container: ITutorialContainer;
  tutorialLength: number;
  clickHandler: Function;
  skipHandler: Function;
}) => {
  const { offsetX, offsetY, currentNum, idx, currentPage, container, tutorialLength, clickHandler, skipHandler } = props;
  const isHavingOptionCopy = document.getElementById(`${currentPage}-tutorial-container-optionCopy`);
  const { t } = useTranslation('common');

  const title = (currentPage === 'detail' && currentNum === 4 && !isHavingOptionCopy)
    ? container.title[0]
    : container.title;
  const contents = (currentPage === 'detail' && currentNum === 4 && !isHavingOptionCopy)
    ? container.contents[0]
    : Array.isArray(container.contents)
      ? container.contents.toString().replace(',','')
      : container.contents

  return (
    <TutorialGuideBox
      idx={idx}
      style={{ top: `${offsetY}px`, left: `${offsetX}px` }}
      currentNum={currentNum}
      currentPage={currentPage}
      arrowDirection={container.offset.left < 0 ? 'right' : 'left'}
    >
      <div>
        <div className='arrow' />
        <p className='title'>{title}</p>
        <p className='description'
           dangerouslySetInnerHTML={{ __html: contents}}
        />
        {
          (tutorialLength > 1 && tutorialLength !== currentNum) &&
          <p className='skip' onClick={() => skipHandler!()}>{t('tutorial.terminate')}</p>
        }
        <span onClick={() => clickHandler(currentNum, tutorialLength)}>
          {tutorialLength === (idx + 1) ? `${t('tutorial.end')}` : `${t('tutorial.next')}` }
        </span>
      </div>
    </TutorialGuideBox>
  )
}

export default TutorialGuideContainer;