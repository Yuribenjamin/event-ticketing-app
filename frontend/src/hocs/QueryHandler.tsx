import React from 'react';
import { View, Text } from 'react-native';
import { QueryHandlerProps } from './QueryHandler.types';
import { QueryHandlerStyles } from './QueryHandler.styles';
import { STRINGS } from '../constant/strings';

const QueryHandler = <T,>({ loading, error, data, children }: QueryHandlerProps<T>) => {
  if (loading) return <Text style={QueryHandlerStyles.loadingText}>{STRINGS.COMMON.LOADING}</Text>;
  if (error) return <Text style={QueryHandlerStyles.errorText}>{STRINGS.COMMON.ERROR} {error.message}</Text>;
  if (!data) return <Text style={QueryHandlerStyles.errorText}>{STRINGS.COMMON.NO_DATA}</Text>;

  return <View style={QueryHandlerStyles.container}>{children}</View>;
};

export default QueryHandler;