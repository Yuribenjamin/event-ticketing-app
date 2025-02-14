import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateEventDto = {
  availableTickets: Scalars['Int']['input'];
  date: Scalars['DateTime']['input'];
  isSoldOut?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  totalTickets: Scalars['Int']['input'];
};

export type CreateUserDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  availableTickets: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isFutureEvent: Scalars['Boolean']['output'];
  isSoldOut: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  totalTickets: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
  createUser: User;
  purchaseTickets: Order;
};


export type MutationCreateEventArgs = {
  createEvent: CreateEventDto;
};


export type MutationCreateUserArgs = {
  createUser: CreateUserDto;
};


export type MutationPurchaseTicketsArgs = {
  purchaseTicketsData: PurchaseTicketsDto;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  event: Event;
  eventId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  orderNumber: Scalars['String']['output'];
  purchaseDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  ticketCount: Scalars['Int']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type PurchaseTicketsDto = {
  eventId: Scalars['String']['input'];
  ticketCount: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getEvent: Event;
  getEvents: Array<Event>;
  getOrders: Array<Order>;
  getUser: User;
  getUsers: Array<User>;
};


export type QueryGetEventArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PurchaseTicketsMutationVariables = Exact<{
  purchaseTicketsData: PurchaseTicketsDto;
}>;


export type PurchaseTicketsMutation = { __typename?: 'Mutation', purchaseTickets: { __typename?: 'Order', orderNumber: string, ticketCount: number, event: { __typename?: 'Event', name: string } } };

export type CreateUserMutationVariables = Exact<{
  Name: Scalars['String']['input'];
  Email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string } };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'Event', id: string, name: string, date: any, availableTickets: number, isSoldOut: boolean }> };

export type GetEventQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEventQuery = { __typename?: 'Query', getEvent: { __typename?: 'Event', id: string, name: string, date: any, availableTickets: number, isSoldOut: boolean } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string, email: string }> };


export const PurchaseTicketsDocument = gql`
    mutation PurchaseTickets($purchaseTicketsData: PurchaseTicketsDto!) {
  purchaseTickets(purchaseTicketsData: $purchaseTicketsData) {
    orderNumber
    event {
      name
    }
    ticketCount
  }
}
    `;
export type PurchaseTicketsMutationFn = Apollo.MutationFunction<PurchaseTicketsMutation, PurchaseTicketsMutationVariables>;

/**
 * __usePurchaseTicketsMutation__
 *
 * To run a mutation, you first call `usePurchaseTicketsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePurchaseTicketsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [purchaseTicketsMutation, { data, loading, error }] = usePurchaseTicketsMutation({
 *   variables: {
 *      purchaseTicketsData: // value for 'purchaseTicketsData'
 *   },
 * });
 */
export function usePurchaseTicketsMutation(baseOptions?: Apollo.MutationHookOptions<PurchaseTicketsMutation, PurchaseTicketsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PurchaseTicketsMutation, PurchaseTicketsMutationVariables>(PurchaseTicketsDocument, options);
      }
export type PurchaseTicketsMutationHookResult = ReturnType<typeof usePurchaseTicketsMutation>;
export type PurchaseTicketsMutationResult = Apollo.MutationResult<PurchaseTicketsMutation>;
export type PurchaseTicketsMutationOptions = Apollo.BaseMutationOptions<PurchaseTicketsMutation, PurchaseTicketsMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($Name: String!, $Email: String!) {
  createUser(createUser: {name: $Name, email: $Email}) {
    id
    name
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      Name: // value for 'Name'
 *      Email: // value for 'Email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetEventsDocument = gql`
    query GetEvents {
  getEvents {
    id
    name
    date
    availableTickets
    isSoldOut
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventDocument = gql`
    query GetEvent($id: String!) {
  getEvent(id: $id) {
    id
    name
    date
    availableTickets
    isSoldOut
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables> & ({ variables: GetEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export function useGetEventSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventSuspenseQueryHookResult = ReturnType<typeof useGetEventSuspenseQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;