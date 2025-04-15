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

export type GetRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRestaurantsQuery = { __typename?: 'Query', restaurants?: Array<{ __typename?: 'Restaurant', id: string, name: string, location: string, price_range: number, count?: number | null, average_rating?: number | null } | null> | null };



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

