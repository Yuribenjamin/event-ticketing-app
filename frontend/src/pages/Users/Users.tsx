import React from 'react';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import QueryHandler from '../../hocs/QueryHandler';

import { useGetUsersQuery, useCreateUserMutation } from '../../graphql/generated';
import { userReducer } from './lib/createUser.reducer';

import { UsersStyles } from './Users.styles';
import { STRINGS } from '../../constant/strings';
import { NavigationProp } from './Users.types';

const Users: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data, loading, error } = useGetUsersQuery();
  const [createUser, { loading: creatingUser }] = useCreateUserMutation();

  const [state, dispatch] = React.useReducer(userReducer, {
    name: '',
    email: '',
    showForm: false,
  });

  const handleSelectUser = (userId: string) => navigation.navigate('Events', { userId });

  const handleCreateUser = async () => {
    if (!state.name || !state.email) return;
    try {
      const { data } = await createUser({
        variables: { Name: state.name, Email: state.email },
      });
      if (data?.createUser) {
        handleSelectUser(data.createUser.id);
      }
    } catch (e) {
      console.error(STRINGS.USERS.CREATE_ERROR, e);
    }
  };

  return (
    <View style={UsersStyles.container}>
      <Text style={UsersStyles.heading}>{STRINGS.USERS.TITLE}</Text>

      {state.showForm && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={UsersStyles.formContainer}>
          <TextInput
            value={state.name}
            onChangeText={(text) => dispatch({ type: 'SET_NAME', payload: text })}
            placeholder={STRINGS.USERS.NAME}
            style={UsersStyles.input}
          />
          <TextInput
            value={state.email}
            onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
            placeholder={STRINGS.USERS.EMAIL}
            keyboardType="email-address"
            style={UsersStyles.input}
          />
          <TouchableOpacity style={UsersStyles.createButton} onPress={handleCreateUser} disabled={creatingUser}>
            <Text style={UsersStyles.createButtonText}>
              {creatingUser ? STRINGS.USERS.CREATING : STRINGS.USERS.CREATE_BUTTON}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}

      <QueryHandler loading={loading} error={error} data={data?.getUsers}>
        <FlatList
          data={data?.getUsers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={UsersStyles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectUser(item.id)} style={UsersStyles.card}>
              <View>
                <Text style={UsersStyles.userName}>{item.name}</Text>
                <Text style={UsersStyles.userEmail}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </QueryHandler>

      <FAB style={UsersStyles.fab} icon={state.showForm ? 'close' : 'plus'} onPress={() => dispatch({ type: 'TOGGLE_FORM' })} />
    </View>
  );
};

export default Users;