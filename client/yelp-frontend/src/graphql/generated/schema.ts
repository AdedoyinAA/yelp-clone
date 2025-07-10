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
};

export type Mutation = {
  __typename?: 'Mutation';
  addRestaurant?: Maybe<Array<Maybe<Restaurant>>>;
  addReview?: Maybe<Review>;
  deleteRestaurant?: Maybe<Array<Maybe<Restaurant>>>;
  updateRestaurant?: Maybe<Restaurant>;
};


export type MutationAddRestaurantArgs = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price_range: Scalars['Int']['input'];
};


export type MutationAddReviewArgs = {
  name: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  restaurant_id: Scalars['Int']['input'];
  review: Scalars['String']['input'];
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateRestaurantArgs = {
  id: Scalars['ID']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price_range: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  restaurant?: Maybe<Array<Maybe<Restaurant>>>;
  restaurants?: Maybe<Array<Maybe<Restaurant>>>;
};


export type QueryRestaurantArgs = {
  id: Scalars['ID']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  average_rating?: Maybe<Scalars['Float']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price_range: Scalars['Int']['output'];
  reviews?: Maybe<Array<Maybe<Review>>>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  restaurant_id: Scalars['Int']['output'];
  review: Scalars['String']['output'];
};

export type AddRestaurantMutationVariables = Exact<{
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  price_range: Scalars['Int']['input'];
}>;


export type AddRestaurantMutation = { __typename?: 'Mutation', addRestaurant?: Array<{ __typename?: 'Restaurant', id: string, name: string, location: string, price_range: number } | null> | null };

export type AddReviewMutationVariables = Exact<{
  restaurant_id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  review: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview?: { __typename?: 'Review', id: string, name: string, review: string, rating: number } | null };

export type DeleteRestaurantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRestaurantMutation = { __typename?: 'Mutation', deleteRestaurant?: Array<{ __typename?: 'Restaurant', id: string } | null> | null };

export type GetRestaurantDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRestaurantDetailsQuery = { __typename?: 'Query', restaurant?: Array<{ __typename?: 'Restaurant', id: string, name: string, location: string, price_range: number, count?: number | null, average_rating?: number | null, reviews?: Array<{ __typename?: 'Review', id: string, restaurant_id: number, name: string, review: string, rating: number } | null> | null } | null> | null };

export type GetRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRestaurantsQuery = { __typename?: 'Query', restaurants?: Array<{ __typename?: 'Restaurant', id: string, name: string, location: string, price_range: number, count?: number | null, average_rating?: number | null } | null> | null };

export type GetRestaurantQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRestaurantQuery = { __typename?: 'Query', restaurant?: Array<{ __typename?: 'Restaurant', id: string, name: string, location: string, price_range: number } | null> | null };

export type UpdateRestaurantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  location: Scalars['String']['input'];
  price_range: Scalars['Int']['input'];
}>;


export type UpdateRestaurantMutation = { __typename?: 'Mutation', updateRestaurant?: { __typename?: 'Restaurant', id: string, name: string, location: string, price_range: number } | null };


export const AddRestaurantDocument = gql`
    mutation AddRestaurant($name: String!, $location: String!, $price_range: Int!) {
  addRestaurant(name: $name, location: $location, price_range: $price_range) {
    id
    name
    location
    price_range
  }
}
    `;
export type AddRestaurantMutationFn = Apollo.MutationFunction<AddRestaurantMutation, AddRestaurantMutationVariables>;

/**
 * __useAddRestaurantMutation__
 *
 * To run a mutation, you first call `useAddRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRestaurantMutation, { data, loading, error }] = useAddRestaurantMutation({
 *   variables: {
 *      name: // value for 'name'
 *      location: // value for 'location'
 *      price_range: // value for 'price_range'
 *   },
 * });
 */
export function useAddRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<AddRestaurantMutation, AddRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRestaurantMutation, AddRestaurantMutationVariables>(AddRestaurantDocument, options);
      }
export type AddRestaurantMutationHookResult = ReturnType<typeof useAddRestaurantMutation>;
export type AddRestaurantMutationResult = Apollo.MutationResult<AddRestaurantMutation>;
export type AddRestaurantMutationOptions = Apollo.BaseMutationOptions<AddRestaurantMutation, AddRestaurantMutationVariables>;
export const AddReviewDocument = gql`
    mutation AddReview($restaurant_id: Int!, $name: String!, $review: String!, $rating: Int!) {
  addReview(
    restaurant_id: $restaurant_id
    name: $name
    review: $review
    rating: $rating
  ) {
    id
    name
    review
    rating
  }
}
    `;
export type AddReviewMutationFn = Apollo.MutationFunction<AddReviewMutation, AddReviewMutationVariables>;

/**
 * __useAddReviewMutation__
 *
 * To run a mutation, you first call `useAddReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReviewMutation, { data, loading, error }] = useAddReviewMutation({
 *   variables: {
 *      restaurant_id: // value for 'restaurant_id'
 *      name: // value for 'name'
 *      review: // value for 'review'
 *      rating: // value for 'rating'
 *   },
 * });
 */
export function useAddReviewMutation(baseOptions?: Apollo.MutationHookOptions<AddReviewMutation, AddReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReviewMutation, AddReviewMutationVariables>(AddReviewDocument, options);
      }
export type AddReviewMutationHookResult = ReturnType<typeof useAddReviewMutation>;
export type AddReviewMutationResult = Apollo.MutationResult<AddReviewMutation>;
export type AddReviewMutationOptions = Apollo.BaseMutationOptions<AddReviewMutation, AddReviewMutationVariables>;
export const DeleteRestaurantDocument = gql`
    mutation DeleteRestaurant($id: ID!) {
  deleteRestaurant(id: $id) {
    id
  }
}
    `;
export type DeleteRestaurantMutationFn = Apollo.MutationFunction<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;

/**
 * __useDeleteRestaurantMutation__
 *
 * To run a mutation, you first call `useDeleteRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRestaurantMutation, { data, loading, error }] = useDeleteRestaurantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>(DeleteRestaurantDocument, options);
      }
export type DeleteRestaurantMutationHookResult = ReturnType<typeof useDeleteRestaurantMutation>;
export type DeleteRestaurantMutationResult = Apollo.MutationResult<DeleteRestaurantMutation>;
export type DeleteRestaurantMutationOptions = Apollo.BaseMutationOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;
export const GetRestaurantDetailsDocument = gql`
    query GetRestaurantDetails($id: ID!) {
  restaurant(id: $id) {
    id
    name
    location
    price_range
    count
    average_rating
    reviews {
      id
      restaurant_id
      name
      review
      rating
    }
  }
}
    `;

/**
 * __useGetRestaurantDetailsQuery__
 *
 * To run a query within a React component, call `useGetRestaurantDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRestaurantDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRestaurantDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRestaurantDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetRestaurantDetailsQuery, GetRestaurantDetailsQueryVariables> & ({ variables: GetRestaurantDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRestaurantDetailsQuery, GetRestaurantDetailsQueryVariables>(GetRestaurantDetailsDocument, options);
      }
export function useGetRestaurantDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRestaurantDetailsQuery, GetRestaurantDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRestaurantDetailsQuery, GetRestaurantDetailsQueryVariables>(GetRestaurantDetailsDocument, options);
        }
export function useGetRestaurantDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRestaurantDetailsQuery, GetRestaurantDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRestaurantDetailsQuery, GetRestaurantDetailsQueryVariables>(GetRestaurantDetailsDocument, options);
        }
export type GetRestaurantDetailsQueryHookResult = ReturnType<typeof useGetRestaurantDetailsQuery>;
export type GetRestaurantDetailsLazyQueryHookResult = ReturnType<typeof useGetRestaurantDetailsLazyQuery>;
export type GetRestaurantDetailsSuspenseQueryHookResult = ReturnType<typeof useGetRestaurantDetailsSuspenseQuery>;
export type GetRestaurantDetailsQueryResult = Apollo.QueryResult<GetRestaurantDetailsQuery, GetRestaurantDetailsQueryVariables>;
export const GetRestaurantsDocument = gql`
    query GetRestaurants {
  restaurants {
    id
    name
    location
    price_range
    count
    average_rating
  }
}
    `;

/**
 * __useGetRestaurantsQuery__
 *
 * To run a query within a React component, call `useGetRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRestaurantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRestaurantsQuery(baseOptions?: Apollo.QueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(GetRestaurantsDocument, options);
      }
export function useGetRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(GetRestaurantsDocument, options);
        }
export function useGetRestaurantsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRestaurantsQuery, GetRestaurantsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(GetRestaurantsDocument, options);
        }
export type GetRestaurantsQueryHookResult = ReturnType<typeof useGetRestaurantsQuery>;
export type GetRestaurantsLazyQueryHookResult = ReturnType<typeof useGetRestaurantsLazyQuery>;
export type GetRestaurantsSuspenseQueryHookResult = ReturnType<typeof useGetRestaurantsSuspenseQuery>;
export type GetRestaurantsQueryResult = Apollo.QueryResult<GetRestaurantsQuery, GetRestaurantsQueryVariables>;
export const GetRestaurantDocument = gql`
    query GetRestaurant($id: ID!) {
  restaurant(id: $id) {
    id
    name
    location
    price_range
  }
}
    `;

/**
 * __useGetRestaurantQuery__
 *
 * To run a query within a React component, call `useGetRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRestaurantQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRestaurantQuery(baseOptions: Apollo.QueryHookOptions<GetRestaurantQuery, GetRestaurantQueryVariables> & ({ variables: GetRestaurantQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRestaurantQuery, GetRestaurantQueryVariables>(GetRestaurantDocument, options);
      }
export function useGetRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRestaurantQuery, GetRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRestaurantQuery, GetRestaurantQueryVariables>(GetRestaurantDocument, options);
        }
export function useGetRestaurantSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRestaurantQuery, GetRestaurantQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRestaurantQuery, GetRestaurantQueryVariables>(GetRestaurantDocument, options);
        }
export type GetRestaurantQueryHookResult = ReturnType<typeof useGetRestaurantQuery>;
export type GetRestaurantLazyQueryHookResult = ReturnType<typeof useGetRestaurantLazyQuery>;
export type GetRestaurantSuspenseQueryHookResult = ReturnType<typeof useGetRestaurantSuspenseQuery>;
export type GetRestaurantQueryResult = Apollo.QueryResult<GetRestaurantQuery, GetRestaurantQueryVariables>;
export const UpdateRestaurantDocument = gql`
    mutation UpdateRestaurant($id: ID!, $name: String!, $location: String!, $price_range: Int!) {
  updateRestaurant(
    id: $id
    name: $name
    location: $location
    price_range: $price_range
  ) {
    id
    name
    location
    price_range
  }
}
    `;
export type UpdateRestaurantMutationFn = Apollo.MutationFunction<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;

/**
 * __useUpdateRestaurantMutation__
 *
 * To run a mutation, you first call `useUpdateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRestaurantMutation, { data, loading, error }] = useUpdateRestaurantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      location: // value for 'location'
 *      price_range: // value for 'price_range'
 *   },
 * });
 */
export function useUpdateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>(UpdateRestaurantDocument, options);
      }
export type UpdateRestaurantMutationHookResult = ReturnType<typeof useUpdateRestaurantMutation>;
export type UpdateRestaurantMutationResult = Apollo.MutationResult<UpdateRestaurantMutation>;
export type UpdateRestaurantMutationOptions = Apollo.BaseMutationOptions<UpdateRestaurantMutation, UpdateRestaurantMutationVariables>;