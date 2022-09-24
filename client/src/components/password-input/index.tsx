import { useState } from 'react';
import {
  Button,
  Icon,
  Input,
  InputElementProps,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { forwardRef } from 'react';

export const PasswordInput = forwardRef<HTMLInputElement, InputElementProps>(
  (props, ref) => {
    const [isHidden, setIsHidden] = useState(true);

    const handleClick = () => setIsHidden(!isHidden);

    return (
      <InputGroup>
        <Input
          {...props}
          ref={ref}
          pr="3rem"
          type={isHidden ? 'password' : 'text'}
        />
        <InputRightElement width="3rem">
          <Button
            w={3}
            colorScheme="teal"
            variant="ghost"
            h="1.75rem"
            size="sm"
            onClick={handleClick}
          >
            {isHidden ? <Icon as={FiEye} /> : <Icon as={FiEyeOff} />}
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  }
);
