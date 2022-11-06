import App from '../../context/App';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TutorialGuideContainer from './TutorialGuideContainer';
import { useTranslation } from 'react-i18next';

export interface ITutorialContainer {
  title: string | string[];
  contents: string;
  offset: {
    top: number;
    left: number;
    diameter: number;
    adjustEffectX: number;
    adjustEffectY: number;
  }
}

const TutorialBox = (props: { currentSection: number }) => {
  const { currentSection } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation('tutorial');
  const [mainCurrentNum, setMainCurrentNum] = useState(1);
  const [detailCurrentNum, setDetailCurrentNum] = useState(1);
  const [isFirstShow, setIsFirstShow] = useState(true);
  const currentPage = (currentSection === 0) ? 'main' : 'detail';
  const isArtworkEditTutorial = (currentPage === 'detail' && detailCurrentNum === 1);
  const element = (currentNum: number) => document.getElementById(`${currentPage}-tutorial-container-${currentNum.toString()}`)!;

  const tutorial = {
    mainTutorial: [
      { title: t('main.artworkSettings.title'),
        contents: t('main.salesSettings.contents'),
        // offset: { top: 7, left: -308, diameter: artworkViewSize, adjustEffectX: 0, adjustEffectY: 0 }
      },
      { title: t('main.salesSettings.title'),
        contents: t('main.salesSettings.contents'),
        offset: { top: 13, left: 98, diameter: 0, adjustEffectX: 0, adjustEffectY: 0 }
      },
      { title: t('main.checkList.title'),
        contents: t('main.checkList.contents'),
        offset: { top: 45, left: 140, diameter: 0, adjustEffectX: 0, adjustEffectY: 0 }
      },
      { title: t('main.register.title'),
        contents: t('main.register.contents'),
        offset: { top: -90, left: 330, diameter: 0, adjustEffectX: 0, adjustEffectY: 0 }
      },
    ],
    detailTutorial: [
      { title: t('detail.editArtwork.title'),
        contents: t('detail.editArtwork.contents'),
        // offset: { top: editorSize.height * 0.31, left: editorSize.width * 0.7, diameter: editorSize.height, adjustEffectX: (editorSize.width -editorSize.height)/2, adjustEffectY: -100 }
      },
      { title: t('detail.copyInformation.title'),
        contents: t('detail.copyInformation.contents'),
        offset: { top: 0, left: 120, diameter: 350, adjustEffectX: 300, adjustEffectY: -85 }
      },
      { title: t('detail.setAdvancedOptions.title'),
        contents: t('detail.setAdvancedOptions.contents'),
        offset: { top: -5, left: -340, diameter: 400, adjustEffectX: 340, adjustEffectY: -100 }
      },
      { title: [t('detail.saveSetting.title'), t('detail.applyAllProducts.title')],
        contents: [t('detail.saveSetting.contents'), t('detail.applyAllProducts.contents')],
        offset: { top: -105, left: -350, diameter: 400, adjustEffectX: -300, adjustEffectY: -170 }
      },
      { title: t('detail.modifyCategoryProducts.title'),
        contents: t('detail.modifyCategoryProducts.contents'),
        offset: { top: -5, left: 230, diameter: 400, adjustEffectX: -300, adjustEffectY: -170 }
      },
      { title: t('detail.detailedDescription.title'),
        contents: t('detail.detailedDescription.contents'),
        offset: { top: -5, left: 120, diameter: 400, adjustEffectX: -200, adjustEffectY: -170 }
      },
      { title: t('detail.setRepresentative.title'),
        contents: t('detail.setRepresentative.contents'),
        offset: { top: 0, left: -340, diameter: 275, adjustEffectX: 250, adjustEffectY: -125 }
      },
      { title: t('detail.toList.title'),
        contents: t('detail.toList.contents'),
        offset: { top: 0, left: -340, diameter: 250, adjustEffectX: 300, adjustEffectY: -110 }
      }
    ]
  }

  const skipHandler = () => {
    if (currentPage === 'main') {
      setMainCurrentNum(tutorial.mainTutorial.length + 1);
    } else {
      setDetailCurrentNum(tutorial.detailTutorial.length + 1);
      setIsFirstShow(false);
      App.localStorage.set('user-id', App.sessionStorage.getId());
    }
    document.body.style.overflow = 'auto';
    document.body.style.height = '100%';
    document.body.style.pointerEvents = 'auto';
  }

  const clickHandler = (currentNum: number, totalLength: number) => {
    const notShow = (!element(2) && currentNum === 1) || (!element(5) && currentNum === 4);

    switch (currentPage) {
      case 'detail':
        setDetailCurrentNum(prev => (notShow) ? prev + 2 : prev + 1);
        window.scrollBy(0, element(currentNum)?.getBoundingClientRect()!.top - 150);

        if (currentNum === totalLength) {
          skipHandler();
          window.scrollTo(0, 0);
        }
        break;
      case 'main':
        setMainCurrentNum(prev => prev + 1);
        window.scrollBy(0, element(currentNum + 1)?.getBoundingClientRect()!.top -600);

        if (currentNum === totalLength) {
          window.scrollTo(0, 1000);
          skipHandler();
        }
        break;
      default: break;
    }
  };

  useEffect(() => {
    if (isFirstShow) {
      (async() => {
        document.body.style.height = '';
        document.body.style.overflow = 'hidden';
      })();
      document.body.style.pointerEvents = 'none';
      document.getElementById('tutorial')!.style.pointerEvents = 'auto';
    }
  }, [isFirstShow, currentPage]);

  return (
    <div>
      {(tutorial[`${currentPage}Tutorial`] as unknown as ITutorialContainer[]).map((container:ITutorialContainer, idx: number) => {
        const clientOffset = element(idx + 1)?.getBoundingClientRect();
        if (!clientOffset) return null;

        const offsetX = window.scrollX + container.offset.left + clientOffset.left;
        const offsetY = window.scrollY + container.offset.top + clientOffset.top;

        return (
          <div key={idx}>
            {/* {
             currentPage === 'detail' &&
             <TutorialEffectContainer
                offsetX={offsetX}
                offsetY={offsetY}
                container={container}
                currentNum={detailCurrentNum}
                idx={idx}
              />
            } */}
            <TutorialGuideContainer
              offsetX={offsetX}
              offsetY={offsetY}
              container={container}
              idx={idx}
              currentNum={currentPage === 'main' ? mainCurrentNum : detailCurrentNum}
              currentPage={currentPage}
              tutorialLength={(tutorial[`${currentPage}Tutorial`] as unknown as ITutorialContainer[]).length}
              clickHandler={clickHandler}
              skipHandler={skipHandler}
            />
          </div>
        )}
      )}
    </div>
  )
}

export default TutorialBox;