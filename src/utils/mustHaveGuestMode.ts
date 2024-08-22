import {model} from '~/data/model';

export const guestModelElements = [
  'EcommerceHomeScreen',
  'ProductListScreen',
  'ProductDetailsScreen',
  'ShoppingBasketScreen',
  'ProductHomescreen',
  'ProductHomeScreen',
  'ProductCategoryScreen',
  'EducationHomeScreen',
];

export default function mustHaveGuestMode() {
  return model.screens.some(screen => guestModelElements.includes(screen.name));
}
