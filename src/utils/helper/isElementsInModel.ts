import {isSame} from '~/components/elemental/hooks/use_navigate';
import {model} from '~/data/model';

export function isElementInModel(name: string) {
  return model.screens.some(screen =>
    screen.metaData.components.some(component => isSame(component, name)),
  );
}
