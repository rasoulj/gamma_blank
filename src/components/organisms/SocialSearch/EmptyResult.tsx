import {VStack} from 'native-base';
import {EmptyResultIcon} from '~/assets/iconset';
import {Typography} from '~/components/elemental';

const EmptyResult = ({
  EmptySvg = EmptyResultIcon,
  text = 'No result!',
}: {
  EmptySvg?: any;
  text?: string;
}) => {
  return (
    <VStack flex="1" alignItems="center" justifyContent="center" space="6">
      <EmptySvg />
      <Typography
        color="gray.400"
        fontWeight="500"
        fontSize="xl"
        w="90%"
        textAlign="center">
        {text}
      </Typography>
    </VStack>
  );
};

export default EmptyResult;
