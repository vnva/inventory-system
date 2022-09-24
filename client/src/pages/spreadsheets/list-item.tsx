import {
  Box,
  Flex,
  Heading,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface ISpreadsheetsListItemProps {
  id: string;
  name: string;
  description?: string;
  hidden: boolean;
}

export const SpreadsheetsListItem: React.FC<
  ISpreadsheetsListItemProps
> = props => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box bg={backgroundColor} borderRadius="lg" px={4} py={3}>
      <Flex justifyContent="space-between">
        <Box>
          <Heading
            size="sm"
            as={Link}
            to={`/spreadsheets/${props.id}`}
            _hover={{ textDecoration: 'underline' }}
          >
            {props.name}
          </Heading>
        </Box>
        <Box>
          <Tag size="sm" colorScheme={props.hidden ? 'red' : 'green'}>
            {props.hidden ? 'Скрыта' : 'Открыта'}
          </Tag>
        </Box>
      </Flex>
      <Box>
        <Text fontSize="xs" color="gray.500">
          {props.description}
        </Text>
      </Box>
    </Box>
  );
};
