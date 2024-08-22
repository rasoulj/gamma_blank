import React from 'react';
import {Image} from 'native-base';
import {Intro1, Intro2, Intro3, Top} from '~/assets';
import {randomString} from '~/utils/helper';
import dayjs from 'dayjs';
import relativeTimeFrom from 'dayjs/plugin/relativeTime';
import UploadMedia from '../molecules/UploadMedia';
import {UploadFile} from '..';

export {Alert} from 'react-native';

export const globalValiables = {};

dayjs.extend(relativeTimeFrom);

export * from 'native-base';
export * from '~/utils/methods';
export * from '~/utils/responsive';
export * from './hooks/use_get_current_user';
export * from './hooks/use_get_photo_gallery';
export * from '~/assets/iconset';

//export all elements
export const AUTH_KEY = 'auth' + randomString(10);
export const API = 'api' + randomString(10);
export {default as theme} from '~/theme';
export {getColor} from './helper';
export {default as Button} from '../atoms/Button';
export {default as FlatList} from '../atoms/FlatList';
export {default as Image} from '../atoms/Image';
export {default as IconButton} from './IconButton';
export {default as ActionSheet} from '../atoms/ActionSheet';
export {default as Box} from '../atoms/Box';
export {default as Center} from '../atoms/Center';
export {default as Checkbox} from '../atoms/Checkbox';
export {default as Heading} from './Heading';
export {default as IMG} from '../atoms/Image';
export {default as Input} from '../atoms/Input';
export {default as Pressable} from '../atoms/Pressable';
export {default as Select} from '../atoms/Select';
export {default as Chat} from '../organisms/Chat';
export {default as Payment} from '../molecules/Payment';
export {default as Plan} from '../molecules/Plan';
export {default as Signin} from '../molecules/Auth/Signin';
export {default as Signup} from '../molecules/Auth/Signup';
export {default as CheckEmail} from '../molecules/Auth/CheckEmail';
export {default as ResetPass} from '../molecules/Auth/ResetPass';
export {default as Switch} from '../atoms/Switch';
export {default as Typography} from '../atoms/Typography';
export {default as VStack} from '../atoms/VStack';
export {default as Layer} from '../atoms/Layer';
export {default as ListItem} from '../molecules/ListItem';
export {default as Scrollable} from '../atoms/Scrollable';
export {default as SelectForm} from '../atoms/SelectForm';
export {default as Form} from '../atoms/Form';
export {default as FormInput} from '../atoms/FormInput';
export {default as FormTextInput} from '../atoms/FormTextInput';
export {default as SubmitButton} from '../atoms/SubmitButton';
export {default as TextArea} from '../atoms/TextArea';
export {default as FormTextArea} from '../atoms/FormTextArea';
export {default as FormSelect} from '../atoms/FormSelect';
export {default as UploadMedia} from '../molecules/UploadFile';
export {default as ElementalProvider} from '../atoms/Provider';
export {default as TabsNavigation} from '../atoms/BottomTab';
export {default as InfiniteScroll} from '../atoms/InfiniteScroll';
export {default as LoadIndicator} from '../atoms/LoadIndicator';
export {default as Wrappable} from '../atoms/Wrappable';
export {graphqlFetcher} from '../atoms/Provider/AuthProvider';
export {default as useAuth} from './hooks/useAuth';
export {default as cache} from './cache';
export {default as useQuery} from './cache/use_query';
export {default as useMutation} from './cache/use_mutation';
export {default as Toasts, useToast} from '../atoms/Toast';
export {default as Modals, useModal} from './modals';
export {default as RelativeLayout} from '../atoms/RelativeLayout';
export {default as Splash} from '../molecules/SplashScreen';
export {default as Tabs} from '../atoms/Tabs';
export {default as useDebounce} from './hooks/useDebounce';
export {default as useNavigate} from './hooks/use_navigate';
export {default as FormCheckbox} from '../atoms/FormCheckbox';
export {default as DrawerKit} from '../atoms/DrawerKit';
export {default as BubbleMessage} from '../molecules/BubbleMessage';
export {default as Card} from '../atoms/Card';
export {default as RangeSlider} from '../molecules/RangeSlider';
export {default as useDrawer} from './hooks/useDrawer';
export {default as Drawer} from '../atoms/Drawer';
export {default as Rating} from '../molecules/Rating';
export {default as CustomCarousel} from '../atoms/CustomCarousel';
export {default as FormDatePicker} from '../atoms/FormDatePicker';
export {default as Calendar} from '../molecules/Calender';
export {default as Chart} from '../molecules/Chart';
export {default as VideoPlayer} from '../atoms/Video';
export {default as Accordion} from '../atoms/Accordion';
export {default as Onboarding} from '../molecules/Onboarding';
export {default as PaymentSuccess} from '../molecules/Payment/success';
export {default as PaymentFailed} from '../molecules/Payment/failed';
export {
  default as useFormula,
  useUpdateFormulaData,
  updateFormulaData,
} from './hooks/use_formula';
export {default as Share} from '../molecules/Share';
export {default as Calender} from '../molecules/Calender';
export {default as ResetPassword} from '../molecules/Auth/ResetPass';
export {default as ChatHistory} from '../molecules/chatList';
export {default as NFT} from './Nft';
export {default as NFTMint} from '../molecules/NftMint';
export {default as LiveStream} from '../organisms/LiveStream';
export {default as SignINPhoneConfirmation} from '../molecules/SignINPhoneConfirmation';
export {default as PhonConfirmation} from '../molecules/PhonConfirmation';
export {default as Notification} from '../organisms/Notification';
export {default as ItemListAndSearch} from '../molecules/ItemListAndSearch';
export {default as PostList} from '../organisms/Post/PostList';
export {default as ItemDetails} from '../molecules/ItemDetails';
export {default as ProfileUpdate} from '../molecules/EditProfile';
export {default as OrderItem} from '../organisms/ShoppingBasket';
export {default as ShoppingBasket} from '../organisms/ShoppingBasket';
export {default as useNavigationPersist} from './hooks/useNavigationPersist';
export {default as Header} from '../atoms/Header';
export {default as CategoryIcons} from '../molecules/CategoryIcons';
export {default as Ticket} from '../molecules/EventRegistrationTicket';
export {default as SearchByMap} from '../molecules/SearchByMap';
export {default as Expandable} from '../atoms/Expandable';
export {default as ToothSelector} from '../molecules/Tooth/ToothSelector';
export {default as SocialActions} from '../molecules/SocialActions';
export {default as CreateItem} from '../organisms/Product/CreateProduct';
export {default as CreateEvent} from '../molecules/CreateEvent';
export {default as EventList} from '../organisms/Event';
export {default as EventDetails} from '../organisms/Event/EventDetails';
export {default as PersonList} from '../molecules/PersonList';
export {default as CustomFormInput} from '../atoms/CustomFormInput';
export {default as SelectImage} from '../atoms/SelectImage';
export {default as CustomFormDatePicker} from '../atoms/CustomFormDatePicker';
export {default as Profile} from '../molecules/profile';
export {default as Settings} from '../molecules/settings';
export {default as Gallery} from '../molecules/gallery';
export {default as Support} from '../molecules/support';
export {default as CategoryImages} from '../molecules/CategoryImages';
export {default as ProfileGallery} from '../molecules/ProfileGallery';
export {default as OrderHistory} from '../molecules/OrderHistory';
export {default as Icon} from './icon_component';
export {default as CustomColorPicker} from '../atoms/CustomColorPicker';
export {default as Map} from '../molecules/SearchByMap';
export {default as EventManagement} from '../molecules/EventManagement';
export {default as EventRegistrationDetail} from '../molecules/EventRegistrationDetail';
export {default as useOnceScreens} from './hooks/useOnceScreens';
export {default as Screen} from '../atoms/Screen';
export {default as RateReview} from '../molecules/Rate-Review';
export {default as ContactList} from '../molecules/chatList/Contact';
export {default as DirectMessage} from '../molecules/chatList/DirectMessage';
export {default as Follows} from '../molecules/Follow';
export {default as UserNetwork} from '../molecules/Follow';
export {default as DropDown} from '../atoms/DropDown';
export {default as useKeyboard} from './hooks/useKeyboard';
export {default as CustomSwitch} from '../atoms/CustomSwitch';
export {default as Tracking} from '../molecules/Tracking';
export {default as SwipeList} from '../molecules/SwipeList';
export {default as useTypography} from './hooks/useTypography';
export {default as Favorites} from '../molecules/Favorites';
export {default as Categories} from '../molecules/Category';
export {default as ProductDetails} from '../organisms/Product/ProductDetail';
export {default as Mic} from '../molecules/Mic';
export {default as Description} from '../atoms/Description';
export {default as FullScreenImage} from '../molecules/FullScreenImage';
export {default as VideoCallModal} from '../molecules/VideoCallModal';
export {default as ChatGPT} from '../molecules/ChatGPT';
export {default as Translation} from '../molecules/Translation';
export {default as UploadFile} from '../molecules/UploadFile';
export {default as Ranger} from '../molecules/Ranger';
export {default as chatGPT} from '../../utils/chatGPT';
export {default as sendEmail} from '../../utils/sendEmail';
export {default as sendSms} from '../../utils/sendSms';
export {default as translator} from '../../utils/translator';
export {default as URL} from '../molecules/UrlElement';
export {default as useSpeech} from './hooks/useSpeech';
export {default as documentRecognizer} from '~/utils/formReconizer';
export {default as Matching} from '../organisms/Matching';
export {default as MatchSubscription} from '../organisms/Matching/MatchSubscription';
export {default as MatchList} from '../molecules/MatchList';
export {default as MatchAccount} from '../molecules/MatchAccount';
export {default as MatchingAccount} from '../molecules/MatchAccount';
export {default as EditEvent} from '../molecules/EditEvent';
export {default as EcommerceHome} from '../organisms/EcommerceHome';
export {default as ShippingAddress} from '../organisms/ShippingAddress';
export {default as Layout} from '../atoms/layout';
export {default as SchedulePreviewItem} from '../molecules/SchedulePreview/SchedulePreviewItem';
export {default as SchedulePreview} from '../molecules/SchedulePreview';
export {default as RepeatScheduleDropDown} from '../molecules/WorkingSchedule/RepeatScheduleDropDown';
export {default as WorkingScheduleItem} from '../molecules/WorkingSchedule/WorkingScheduleItem';
export {default as CustomDaySelectionSheet} from '../molecules/WorkingSchedule/CustomDaySelectionSheet';
export {default as WorkingScheduleItems} from '../molecules/WorkingSchedule/WorkingScheduleItems';
export {default as RadioButton} from '../molecules/WorkingSchedule/RadioButton';
export {default as CustomRadioGroup} from '../molecules/WorkingSchedule/CustomRadioGroup';
export {default as SelectGalleryImage} from '../molecules/GalleryStyle/SelectGalleryImage';
export {default as ConfirmationActionSheet} from '../molecules/GalleryStyle/ConfirmationActionSheet';
export {default as GalleryStyle} from '../molecules/GalleryStyle';
export {default as WorkingSchedule} from '../molecules/WorkingSchedule';
export {default as CustomDropdown} from '../atoms/CustomDropdown';
//export icons
export {default as ArrowBackIcon} from '~/assets/icons/ArrowBack.icon';
export {default as GoogleIcon} from '~/assets/icons/Google.icon';
export {default as LinkedInIcon} from '~/assets/icons/linkedin.icon.new';
export {default as FacebookIcon} from '~/assets/icons/Facebook.icon';
export {default as MailIcon} from '~/assets/icons/Mail.icon';
export {default as HomeIcon} from '~/assets/icons/Home.icon';
export {default as ExploreIcon} from '~/assets/icons/Explore.icon';
export {default as UserIcon} from '~/assets/icons/User.icon';
export {default as User2Icon} from '~/assets/icons/user2icon';
export {default as BellIcon} from '~/assets/icons/Bell.icon';
export {default as PlusIcon} from '~/assets/icons/Plus.icon';
export {default as CameraIcon} from '~/assets/icons/Camera.icon';
export {default as PhotoIcon} from '~/assets/icons/Photo.icon';
export {default as CategoriesIcon} from '~/assets/icons/Categories.icon';
export {default as CommentsIcon} from '~/assets/icons/Comments.icon';
export {default as MessagesIcon} from '~/assets/icons/Message.icon';
export {default as HeartIcon} from '~/assets/icons/Heart.icon';
export {default as ShareIcon} from '~/assets/icons/Share.icon';
export {default as SendIcon} from '~/assets/icons/Send.icon';
export {default as MenuIcon} from '~/assets/icons/Menu.icon';
export {default as MenuBarIcon} from '~/assets/icons/Menu.icon';
export {default as CloseIcon} from '~/assets/icons/Close.icon';
export {default as CommunityIcon} from '~/assets/icons/Community.icon';
export {default as DeleteIcon} from '~/assets/icons/Delete.icon';
export {default as EditIcon} from '~/assets/icons/Edit.icon';
export {default as FilterIcon} from '~/assets/icons/Filter.icon';
export {default as HandIcon} from '~/assets/icons/Hand.icon';
export {default as LockIcon} from '~/assets/icons/Lock.icon';
export {default as LogoutIcon} from '~/assets/icons/Logout.icon';
export {default as NotificationIcon} from '~/assets/icons/Notification.icon';
export {default as SettingsIcon} from '~/assets/icons/Settings.icon';
export {default as DeactivateIcon} from '~/assets/icons/Deactivate.icon';
export {default as DotIcon} from '~/assets/icons/Dot.icon';
export {default as SearchIcon} from '~/assets/icons/Search.icon';
export {default as ColorfulGoogleIcon} from '~/assets/icons/ColorfulGoogle.Icon';
export {default as ColorfulFacebookIcon} from '~/assets/icons/ColorfulFacebook.Icon';
export {default as ColorfulCloseIcon} from '~/assets/icons/ColorfulClose.Icon';
export {default as ColorfulStarIcon} from '~/assets/icons/ColorfulStar.Icon';
export {default as ColorfulHeartIcon} from '~/assets/icons/ColorfulHeart.Icon';
export {default as CircleHamburgerIcon} from '~/assets/icons/CircleHamburger.Icon';
export {default as CircleFilterIcon} from '~/assets/icons/CircleFilter.Icon';
export {default as CryptomatchDrawerLogo} from '~/assets/icons/CryptomatchDrawerLogo';
export {default as FHomeIcon} from '~/assets/icons/FHome.Icon';
export {default as FMessageIcon} from '~/assets/icons/FMessage.Icon';
export {default as FUserIcon} from '~/assets/icons/FUser.Icon';
export {default as AUserIcon} from '~/assets/icons/AUser.Icon';
export {default as FUsersIcon} from '~/assets/icons/FUsers.Icon';
export {default as CoffeeIcon} from '~/assets/icons/coffee.icon';
export {default as AlertIcon} from '~/assets/icons/alert.icon';
export {default as WomanIcon} from '~/assets/icons/Woman.icon';
export {default as FBalanceIcon} from '~/assets/icons/fbalance.icon';
export {default as MeditationIcon} from '~/assets/icons/kickoff/meditation.icon';
export {default as ClockIcon} from '~/assets/icons/kickoff/clock.icon';
export {default as SortIcon} from '~/assets/icons/kickoff/sort.icon';
export {default as ArrowRightIcon} from '~/assets/icons/kickoff/arrow_right.icon';
export {default as ArrowDownIcon} from '~/assets/icons/kickoff/arrow_down.icon';
export {default as ArrowUpIcon} from '~/assets/icons/kickoff/arrow_up.icon';
export {default as BarreIcon} from '~/assets/icons/kickoff/barre.icon';
export {default as BicycleIcon} from '~/assets/icons/kickoff/bicycle.icon';
export {default as BookmarkIcon} from '~/assets/icons/kickoff/bookmark.icon';
export {default as CardioIcon} from '~/assets/icons/kickoff/cardio.icon';
export {default as CyclingIcon} from '~/assets/icons/kickoff/cycling.icon';
export {default as DrawerTouchIcon} from '~/assets/icons/kickoff/drawer_touch.icon';
export {default as DumbbleIcon} from '~/assets/icons/kickoff/dumbbell.icon';
export {default as EllipticalIcon} from '~/assets/icons/kickoff/elliptical.icon';
export {default as MeditationSIcon} from '~/assets/icons/kickoff/meditationS.icon';
export {default as MetricIcon} from '~/assets/icons/kickoff/metric.icon';
export {default as PlayTriangleIcon} from '~/assets/icons/kickoff/play_triangle.icon';
export {default as RunningIcon} from '~/assets/icons/kickoff/running.icon';
export {default as SettingIcon} from '~/assets/icons/kickoff/setting.icon';
export {default as SignOutIcon} from '~/assets/icons/kickoff/sign_out.icon';
export {default as TrashIcon} from '~/assets/icons/kickoff/trash.icon';
export {default as TreadmillIcon} from '~/assets/icons/kickoff/treadmill.icon';
export {default as YogaIcon} from '~/assets/icons/kickoff/yoga.icon';
export {default as ExportIcon} from '~/assets/icons/Export.icon';
export {default as CupIcon} from '~/assets/icons/Cup.icon';
export {default as AddIcon} from '~/assets/icons/Add.icon';
export {default as ProfileIcon} from '~/assets/icons/Profile.icon';
export {default as AppearanceIcon} from '~/assets/icons/Appearance.icon';
export {default as AccountSupportIcon} from '~/assets/icons/AccountSupport.icon';
export {default as InstagramIcon} from '~/assets/icons/Instagram.icon';
export {default as WhatsappIcon} from '~/assets/icons/Whatsapp.icon';
export {default as TelegramIcon} from '~/assets/icons/Telegram.icon';
export {default as GoogleDarkIcon} from '~/assets/icons/GoogleDark.icon';
export {default as FacebookDarkIcon} from '~/assets/icons/FacebookDark.icon';
export {default as ArrowButtonIcon} from '~/assets/icons/ArrowButton.icon';
export {default as FilmDarkIcon} from '~/assets/icons/FilmDark.icon';
export {default as ChatIcon} from '~/assets/icons/Chat.icon';
export {default as EndCallIcon} from '~/assets/icons/EndCall.icon';
export {default as MicIcon} from '~/assets/icons/Mic.icon';
export {default as PhoneIcon} from '~/assets/icons/Phone.icon';
export {default as PromoTagIcon} from '~/assets/icons/PromoTag.icon';
export {default as PencilIcon} from '~/assets/icons/Pencil.icon';
export {default as MinesIcon} from '~/assets/icons/Mines.icon';
export {default as PencilEditIcon} from '~/assets/icons/PencilEdit.icon';
export {default as Location2Icon} from '~/assets/icons/Location2.icon';
export {default as ChevronUpIcon} from '~/assets/icons/ChevronUp.icon';
export {default as ChevronDownIcon} from '~/assets/icons/ChevronDown.icon';
export {default as AProfileIcon} from '~/assets/icons/kickoff/profile.icon';
export {default as QuestionIcon} from '~/assets/icons/kickoff/question.icon';
export {default as LikeIcon} from '~/assets/icons/kickoff/like.icon';
export {default as FileIcon} from '~/assets/icons/marketplace/File.icon';
export {default as ProfilePlaceholderIcon} from '~/assets/icons/marketplace/ProfilePlaceholder.icon';
export {default as NextIcon} from '~/assets/icons/event/Next.icon';
export {default as EventLocationIcon} from '~/assets/icons/EvenLocationIcon';
export {default as EventHeartIcon} from '~/assets/icons/event/EventHeart.icon';
export {default as NArrowBackIcon} from '~/assets/icons/NArrowBackIcon.icon';
export {default as OutlineFileIcon} from '~/assets/icons/marketplace/OutlineFile.icon';
export {default as RoundedOutlineUserIcon} from '~/assets/icons/marketplace/RoundedOutlineUser.icon';
export {default as RoundedOutlineHomeIcon} from '~/assets/icons/marketplace/RoundedOutlineHome.icon';
export {default as ColorWalletIcon} from '~/assets/icons/color_wallet.icon';
export {default as LikedHeartIcon} from '~/assets/icons/LikeHeader.Icon';
export {default as FavoriteIcon} from '~/assets/icons/Favorite.Icon';
export {default as Home2Icon} from '~/assets/icons/Home2.Icon';
export {default as DesktopIcon} from '~/assets/icons/Desktop.Icon';
export {default as BrushIcon} from '~/assets/icons/Brush.Icon';
export {default as MobileIcon} from '~/assets/icons/MobileIcon.Icon';
export {default as FaceBrushIcon} from '~/assets/icons/FaceBrushIcon.Icon';
export {default as ToysIcon} from '~/assets/icons/ToysIcon.Icon';
export {default as FurnitureIcon} from '~/assets/icons/FurnitureIcon.Icon';
export {default as SportIcon} from '~/assets/icons/SportIcon.Icon';
export {default as BooksIcon} from '~/assets/icons/BooksIcon.Icon';
export {default as CarIcon} from '~/assets/icons/CarIcon.Icon';
export {default as SimpleWashingMachineIcon} from '~/assets/icons/SimpleWashingMachineIcon.Icon';
export {default as PlayIcon} from '~/assets/icons/Play.Icon';
export {default as PenIcon} from '~/assets/icons/Pen.icon';
export {default as TSearchIcon} from '~/assets/icons/event/TSearch.icon';
export {default as TicketIcon} from '~/assets/icons/event/Ticket.icon';
export {default as CalenderIcon} from '~/assets/icons/event/Calender.icon';
export {default as EventFilterIcon} from '~/assets/icons/event/EventFilter.icon';
export {default as EventManIcon} from '~/assets/icons/event/Man.icon';
export {default as EventPlusIcon} from '~/assets/icons/event/Plus.icon';
export {default as EditPenIcon} from '~/assets/icons/food_delivery/EditPen.icon';
export {default as RoundedOutlineShoppingCardIcon} from '~/assets/icons/food_delivery/RoundedOutlineShoppingCard.icon';
export {default as ReceiptIcon} from '~/assets/icons/food_delivery/Receipt.icon';
export {default as MotorbikeIcon} from '~/assets/icons/food_delivery/Motorbike.icon';
export {default as CancelIcon} from '~/assets/icons/food_delivery/Cancel.icon';
export {default as BagIcon} from '~/assets/icons/food_delivery/Bag.icon';
export {default as ProfilePlaceholder2Icon} from '~/assets/icons/food_delivery/ProfilePlaceholder2Icon.icon';
export {default as GearIcon} from '~/assets/icons/event/GearIcon.icon';
export {default as MarketPlusIcon} from '~/assets/icons/marketplace/MarketPlus.icon';
export {default as SuccessIcon} from '~/assets/icons/payment/success';
export {default as FailedIcon} from '~/assets/icons/payment/failed';
export {default as RoundedEditIcon} from '~/assets/icons/rounded.edit.icon';
export {default as RightIcon} from '~/assets/icons/right.icon';
export {default as BackIcon} from '~/assets/icons/back.icon';
export {default as Setting2Icon} from '~/assets/icons/setting.2.icon';
export {default as Trash2Icon} from '~/assets/icons/trash.2.icon';
export {default as Share2Icon} from '~/assets/icons/share.2.icon';
export {default as CHome} from '~/assets/categories_icon/CategoryHome.icon';
export {default as CMusic} from '~/assets/categories_icon/CategoryMusic.icon';
export {default as CTravel} from '~/assets/categories_icon/CategoryTravel.icon';
export {default as CBusiness} from '~/assets/categories_icon/CategoryBusiness.icon';
export {default as CConcert} from '~/assets/categories_icon/CategoryConcert.icon';
export {default as CArt} from '~/assets/categories_icon/CategoryArt.icon';
export {default as CFitness} from '~/assets/categories_icon/CategoryFitness.icon';
export {default as CSocial} from '~/assets/categories_icon/CategorySocial.icon';
export {default as CFood} from '~/assets/categories_icon/CategoryFood.icon';
export {default as CAdventure} from '~/assets/categories_icon/CategoryAdventure.icon';
export {default as CEducation} from '~/assets/categories_icon/CategoryEducation.icon';
export {default as CSports} from '~/assets/categories_icon/CategorySports.icon';
export {default as CFashion} from '~/assets/categories_icon/CategoryFashion.icon';
export {default as CFilm} from '~/assets/categories_icon/CategoryFilm.icon';
export {default as CHealth} from '~/assets/categories_icon/CategoryHealth.icon';
export {default as DownloadIcon} from '~/assets/icons/event/Download.icon';
export {default as CopyIcon} from '~/assets/icons/Copy.icon';
export {default as NCameraIcon} from '~/assets/icons/NCamera.icon';
export {default as NPhotoIcon} from '~/assets/icons/NImage.icon';
export {default as NChatIcon} from '~/assets/icons/NChat.icon';
export {default as NTelegramIcon} from '~/assets/icons/NTelegram.icon';
export {default as NWhatsAppIcon} from '~/assets/icons/NWhatsApp.icon';
export {default as EmailIcon} from '~/assets/icons/Email.icon';
export {default as MoreIcon} from '~/assets/icons/More.icon';
export {default as TwitterIcon} from '~/assets/icons/Twitter.icon';
export {default as SendIcon2} from '~/assets/icons/Send2.icon';
export {default as CommentsIcon2} from '~/assets/icons/Comment2.icon';
export {default as TreeDotIcon} from '~/assets/icons/TreeDot.icon';
export {default as SendIcon3} from '~/assets/icons/Send.icon3';
export {default as ReplyIcon} from '~/assets/icons/Reply.icon';
export {default as WarningIcon} from '~/assets/icons/Warning.icon';
export {default as VideoIcon} from '~/assets/icons/Video.icon';
export {default as VoiceIcon} from '~/assets/icons/Voice.icon';
export {default as MuteIcon} from '~/assets/icons/Mute.icon';
export {default as OnCameraIcon} from '~/assets/icons/OnCamera.icon';
export {default as OffCameraIcon} from '~/assets/icons/OffCamera.icon';
export {default as EqualizerIcon} from '~/assets/icons/Equalizer.icon';
export {default as EndCall2Icon} from '~/assets/icons/EndCall2.icon';
export {default as CallIcon} from '~/assets/icons/Call.icon';
export {default as DocumentIcon} from '~/assets/icons/Document.icon';
export {default as HideIcon} from '~/assets/icons/Hide.icon';
export {default as BlockIcon} from '~/assets/icons/Block.icon';
export {default as ReportIcon} from '~/assets/icons/Report.icon';
export {default as RemoveUserIcon} from '~/assets/icons/RemoveUser.icon';
export {default as TickIcon} from '~/assets/icons/Tick.icon';
export {default as AddUserIcon} from '~/assets/icons/AddUser.icon';
export {default as NInstagramIcon} from '~/assets/icons/NInstagram.icon';
export {default as NFacebookIcon} from '~/assets/icons/NFacebook.icon';
export {default as Message2Icon} from '~/assets/icons/Message2.icon';
export {default as ContactIcon} from '~/assets/icons/Contact.icon';
export {default as Success2Icon} from '~/assets/icons/Success.icon';
export {default as CheckMailIcon} from '~/assets/icons/CheckMail.icon';
export {default as MessageSolidIcon} from '~/assets/icons/MessageSolid.icon';
export {default as TelegramSolidIcon} from '~/assets/icons/TelegramSolid.icon';
export {default as TwitterSolidIcon} from '~/assets/icons/TwitterSolid.icon';
export {default as WhatsAppSolidIcon} from '~/assets/icons/WhatsappSolid.icon';
export {default as EmailSolidIcon} from '~/assets/icons/EmailSolid.icon';
export {default as MoreSolidIcon} from '~/assets/icons/MoreSolid.icon';
export {default as XIcon} from '~/assets/icons/X.icon';
export function Intro1Image({style}) {
  style.marginLeft = 'auto';
  style.marginRight = 'auto';

  return <Image source={Intro1} style={style} />;
}

export function Intro2Image({style}) {
  style.marginLeft = 'auto';
  style.marginRight = 'auto';

  return <Image source={Intro2} style={style} />;
}

export function Intro3Image({style}) {
  style.marginLeft = 'auto';
  style.marginRight = 'auto';

  return <Image source={Intro3} style={style} />;
}

export function TopHeaderIcon({style}) {
  return <Image source={Top} style={style} />;
}

export const relativeTime = (input: string | Date, format): String => {
  return dayjs(input || new Date()).format(format || 'MM/DD/YYYY');
};

export const relativeTimeFromNow = (input: string | Date): string => {
  return dayjs(input || new Date()).fromNow();
};

export function convertTimeSpanToTime(timeSpan: string): string {
  const customTimeSpan = timeSpan
    ?.replace('PT', '')
    ?.replace('M', '')
    ?.split('H')
    ?.filter(i => i !== '');

  if (!timeSpan?.length) {
    return '';
  }

  if (customTimeSpan?.length === 1) {
    customTimeSpan.push('00');
  }

  return customTimeSpan
    .map(item => (item.length === 1 ? `0${item}` : item))
    .join(':');
}

export function toTimeSpan(date: string) {
  try {
    let d = new Date(date);
    let time = d.toLocaleTimeString('en-US').split(':');
    return `PT${time[0]}H${time[1]}M`;
  } catch (error) {}
}

export {useIsFocused, useRoute} from '@react-navigation/native';
export {useWindowDimensions, TouchableWithoutFeedback} from 'react-native';

declare global {
  interface String {
    camelize(): string;
  }
}

String.prototype.camelize = function () {
  return this.toLowerCase().replace(/^./, w => w.toUpperCase());
};

export function replaceValueWithContent(string: string = '', data: any = {}) {
  string = string.replace(
    /\\{.*?Output(\\s+)?\\}/g,
    typeof data === 'object' ? JSON.stringify(data) : data,
  );

  if (data instanceof Object) {
    Object.entries(data).forEach(([key, value]: [string, string]) => {
      string = string.replace(new RegExp('{' + key + '}', 'g'), value);
    });
  }

  Object.entries(globalValiables).forEach(([key, value]: [string, string]) => {
    string = string.replace(new RegExp('{' + key + '}', 'g'), value);
  });

  return string;
}

export function UploadImage(props) {
  return <UploadFile {...props} type="image" />;
}

export function UploadVideo(props) {
  return <UploadFile {...props} type="video" />;
}
