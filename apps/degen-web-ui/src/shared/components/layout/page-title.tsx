import { Box, Text, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { BaseProps } from '../../../core/interfaces/app-props.interface';

export interface PageTitleProps extends BaseProps {
  title: string;
  description?: string;
  sectionContent?: any;
}

export function PageTitle({
  title,
  description,
  children,
  sectionContent,
}: PageTitleProps) {
  return (
    <Box className="col-span-12 mb-4">
      <Box className="flex flex-row items-center mb-2">
        <Heading fontSize="4xl" className="mr-4">
          {title}
        </Heading>
        <Box className="flex flex-grow items-center justify-end">{sectionContent}</Box>
      </Box>
      {description ? (
        <Text color="gray.500" className="mb-2">
          {description}
        </Text>
      ) : (
        <Box className="mb-2">{children}</Box>
      )}
    </Box>
  );
}
