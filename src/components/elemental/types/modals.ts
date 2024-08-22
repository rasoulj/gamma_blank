export type Modal = {
  closeButton?: boolean;
  Body: React.FC<any> | React.ReactElement;
  Container?: React.FC<any>;
  id?: string | number;
  title?: string;
  navbarModal?: boolean;
};
