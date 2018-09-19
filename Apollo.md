[![Crossplatform](https://crossplatform.se/wp-content/uploads/2018/05/Crossplatform-Sweden-AB-01_web.jpg)](https://www.crossplatform.se/)  
Copyright © Crossplatform Sweden AB

<!-- language-all: javascript -->

# GraphQL Apollo

Implementation of GraphQL Apollo Client using **TypeScript**.

**Remarks:** GraphQL is written as **`extend`** to not cause conflicts:

    extend type Query {
        getParkingClient: Parking!
    }

    extend type Mutation {
        saveParkingClient(newParking: ParkingInput!): Boolean!
    }

**See also:**

- **[Frontend ReadMe](../mobile/README.md)**

- **[Backend ReadMe](../backend/README.md)**

- **[Solution ReadMe](../README.md)**

## Table of Contents Apollo

- [Background](#background)
- [Apollo Provider](#apollo-provider)
- [Apollo HOC and styling](#apollo-hoc-and-styling)
- [Implement backend](#implement-backend)
  - [Backend GraphQL](#backend-graphql)
  - [Frontend GraphQL Tag](#frontend-graphql-tag)
  - [Component](#component)
- [Using Client Cache](#using-client-cache)
  - [GraphQL](#graphql)
  - [Mutation](#mutation)
  - [Components](#components)
  - [Resolver](#resolver)
  - [CombineResolvers](#combineresolvers)
  - [InitialState](#initialstate)
- [Types Generation](#types-generation)
  - [Add a GraphQL Type](#add-a-graphql-type)
  - [Generate TypeScript](#generate-typescript)
- [Test with Jest and Enzyme](#test-with-jest-and-enzyme)
  - [Testing Components](#testing-components)
  - [Testing resolver functions](#testing-resolver-functions)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# Background

As most React (Native) projects we handled our global **state** using the **[Redux](https://redux.js.org "Official documentation")** framework. While this gave us a global store where all the apps state data was available it required a whole lot of "boilerplate" code and required a lot of work to achieve very little.

Enter **[GraphQL](https://graphql.org/ "Official documentation")**; initially a solution for our backend to simplify writing endpoints (i.e REST) in a modern way (created by Facebook).  
However, to call the GraphQL API from client there is the **[Apollo library](https://www.learnapollo.com/introduction/get-started "Getting started with Apollo")**, supported by React and React-Native since it has no platform specific requirements other than **fetch**.

Apollo itself was initially designed to handle requests to GraphQL API:s. But it also supports _local state_ like Redux. In fact it initially used Redux, but eventually abandonned it since there was no need to complicate things when Apollo could basically replace Redux's state management.

This is why we decided to remove Redux entirely and re-build using Apollo and GraphQL for client state as well as server requests.

# Apollo Provider

Our mobile project(s) now use `<ApolloProvider>` as root element and then wrap our navigator. The provider handles the state (in cache), errors, and GraphQL client for calling the backend.

- **[React Apollo tutorial](https://www.robinwieruch.de/react-apollo-client-example/ "A minimal example by Robin Wieruch")**

We standarlized this to the **`ApolloClientBase.tsx`** higher order component, that can be reused in any project. It allows you to provide backend uri, initial state in cache, resolvers etc in it's constructor, as seen in our **`AppContainer.tsx`** file:

    // mobile/source/AppContainer.tsx
    const uri = 'http://localhost:4000/graphql';

    const AppContainer = ApolloClientBase(
      () => <AppNavigator />,
      uri,
      null,
      CombineResolvers,
      InitialState,
      (err: Error) => {
        if (__DEV__) {
          console.log('** ERROR **');
          console.log(err);
        } else if (Sentry) {
          Sentry.captureException(err);
        }
      }
    );

# Apollo HOC and styling

We've seen that complex structure in the Apollo HOCs `<Query>` and `<Mutation>`, usually extended, cause styling issues.

So try to have the HOC only contain one single component - the (pure) React component, and not any additional `<View>` or styling.

Better to have the (pure) React component handle styles and the `<ApolloFeedback>` component, where it fits on the page.

E.G **should** look like this

    export interface IProps extends IApolloProps {
      parkingResult: GetParkingClientQuery;	}

    export class ParkingListComponentPure extends React.Component<IProps, IState>{
    	...
    	<ApolloFeedback {...this.props} />
    }

    class GetParkingsQueryComponent extends Query<GetParkingsQuery>{ };

    const ParkingListComponent = () => (
        <GetParkingsQueryComponent query={GetParkingsGql}>
            {({ data, loading, error, client }) => (
                <ParkingListComponentPure
                    loading={loading}
                    error={error}
                    client={client}
                    parkingsResponse={data} />
            )
            }
        </GetParkingsQueryComponent>
    )

    export default ParkingListComponent;

Should **not** look like this

    ```
    export class ParkingListComponentPure extends React.Component<IProps, IState>{
     ...
    const ParkingListComponent = () => (
    <View style={Theme.container}>
        <GetParkingsQueryComponent query={GetParkingsGql}>
            {({ data, loading, error }) => {
                return (
                <ScrollView>
                    <View>
                        <ParkingListComponentPure parkingsResponse={data} />
                        <ApolloFeedback error={error} loading={loading} loadingMessage="Hämtar annonser..." />
                    </View>```

# Implement backend

To implement a query / mutation from backend we need to write a `gql` that asks that GraphQL **object**, selecting properties specified in the backend **`*.graphql`** file. We'll look from the client side perspective.

## Backend GraphQL

This is what's defined in backend: **`/graphql/user/user.graphql`**:

    type User {
      id: ID!
      accessToken: String!
      firstName: String!
      lastName: String!
      ...
    }

    input UserInput {
      id: ID
      accessToken: String!
      firstName: String!
      lastName: String!
      ....
    }

    type Query {
      getUsers: [User!]!
      getUser(id: String!): User!
    }

    type Mutation {
      saveUser(user: UserInput!): User!
    }

## Frontend GraphQL Tag

In the mobile client's **`user/mutations`** folder we have `SaveUserMutationGql.tsx`:

    // user/mutations/SaveUserMutationGql.tsx
    import gql from "graphql-tag";


    const SaveUserMutationGql = gql`
    mutation SaveUser($userInput: UserInput!) {
      saveUser(user: $userInput) {
        id
      }
    }
    `

    export default SaveUserMutationGql;

The mutation uses the existing mutation from backend - **saveUser** and its existing GraphQL **`Input`** - **UserInput**.
This is all that's required for [Types Generation](#types-generation) to provide us with the corresponding **TypeScript** types.

These can then be imported from the **/mobile/source/parkera-generated** folder, where they're copied in to (excluded from Git).

## Component

The mindset here is to write **small isolated** components that provide easy **readability** and high **testability**, giving us a good _test coverage_. This provides our code with good quality and makes working with it as painless as possible.

Let's look at **`SaveUserButton.tsx`** - used to save a user.

    // user/components/SaveUserButton.ts
    import * as React from 'react';
    import { Button } from "react-native-elements";
    import { Mutation, MutationFn } from 'react-apollo';
    import SaveUserMutationGql from '../mutations/SaveUserMutationGql';
    import { UserInput, SaveUserMutation } from '../../parkera-generated/client';

    interface IPropsPure {
        SaveUser: MutationFn<SaveUserMutation, UserInput>
    }

    const SaveUserButtonPure = ({ SaveUser }: IPropsPure) =>
        (
            <Button
                // @ts-ignore
                medium
                style={{ margin: 10 }}
                icon={{ name: 'save', type: 'font-awesome' }}
                title="Spara"
                onPress={() => SaveUser()}
            />
        )

    class SaveUserMutationComponent extends Mutation<SaveUserMutation, UserInput> { }

    interface IProps {
        userInput: UserInput
    }

    const SaveUserButton = ({ userInput }: IProps) => (
        <SaveUserMutationComponent
            mutation={SaveUserMutationGql}
            variables={userInput}>
            {(SaveUser) =>
                (<SaveUserButtonPure SaveUser={SaveUser} />)
            }
        </SaveUserMutationComponent>
    );

    export default SaveUserButton;

This is written as one file (`tsx`) containing _three_ components: one **_React_** component (**pure** if possible) - like **`SaveUserButtonPure`** below and one **_Apollo Query or Mutation_** component - like **`SaveUserMutationComponent`** below.  
Finally **SaveUserButton** implements them both, handles the result of the mutation (or query).

The pure React component is used by tests to for example click the button using **Jest and Enzyme**, while the Apollo component is used by the actual app to call the **Query** or **Mutation**.

**SaveUserButtonPure**  
A stateless component that takes a GraphQL **Mutation** and calls it on the button click. It recieves the mutation from the **`SaveUserButton`** component.

**SaveUserMutationComponent**  
An Apollo **`<Mutation>`** component that strictly types the mutation and variables.

**SaveUserButton**  
Implements `SaveUserMutationComponent` using the **gql** **`SaveUserMutationGql`** to send the new / changed user as a variable.

# Using Client Cache

When it's appropriate the client can keep specific data in the local cache, e.g. a new user that's not yet been saved to the backend.

## GraphQL

Let's look at the local **Parking** that the user is creating through multiple pages before saving to backend.
// ParkingClient.graphql
type ParkingResponse {
parking: Parking!
}
extend type Query {
parkingclient: ParkingResponse!
}
extend type Mutation {
saveParkingClient(newParking: ParkingInput!): Boolean!
}

We're using types defined in the backend here: Parking, ParkingInput - but they are standard GraphQL **Type** and **Input**, respectivly.

When passing an object like **`newParking`**, we need to use an **Input** type.

## Mutation

Looking at saving data first, we define a `gql` string based on the above **Mutation**:

    // mutations/ParkingClientMutationGql.ts
    import gql from 'graphql-tag';

    const ParkingClientMutationGql = gql`
        mutation SaveParkingClient($newParking: ParkingInput!) {
            saveParkingClient(newParking: $newParking) @client
        }
    `;

    export default ParkingClientMutationGql;

Ensure the types match and the mutation type (not alias) - **`saveParkingClient`** - including casing.

## Components

Ensure [Generation](#types-generation) passes without errors and use the generated TypeScript to type check the **Query**:

    // ParkingClientQueryComponent.tsx
    import { GetParkingClientQuery } from '../../parkera-generated/client/queries';

    class ParkingClientQueryComponent extends Query<GetParkingClientQuery> {  }

The `data` type of the Query above is **`GetParkingClientQuery`**, generated from the Gql:

    // parkera-generated/client/queries.ts
    export interface GetParkingClientQuery {
      parkingclient:  {
        __typename: "ParkingResponse",
        parking:  {
          __typename: "Parking",
          ...

Using the **Query** Component in our page gives us a typed **`data`** object:

    // components/PicturePage.tsx
    import ApolloFeedback from '../../apollo/components/ApolloFeedback';
    import GetParkingClientQueryGql from '../queries/GetParkingClientQueryGql';
    import ParkingClientQueryComponent from './ParkingClientQueryComponent';
    import { GetParkingClientQuery } from '../../parkera-generated/client/queries';

    export interface IProps {
      parkingResult: GetParkingClientQuery
    }

    export class PicturesPagePure extends React.Component<IProps, IState> {
    	...
    }

    const PicturesPage = () => (
      <View style={Theme.container}>
        <ScrollView>
          <ParkingClientQueryComponent query={GetParkingClientQueryGql}>
            {({ data, loading, error }) =>
              <View style={Theme.container}>
                <PicturesPagePure parkingResult={data} />
                <ApolloFeedback error={error} loading={loading} loadingMessage="Hämtar annons..." />
              </View>
            }
          </ParkingClientQueryComponent>
        </ScrollView>
      </View>

Similarily, the Mutation Component types `data` and more importantly **`Variables`**.

    // ParkingNavigationComponent.tsx
    import { SaveParkingClientMutationVariables, GetParkingClientQuery } from '../../parkera-generated/client';
    import ParkingClientMutationGql from '../mutations/ParkingClientMutationGql';
    interface IProps {
      parkingResult: GetParkingClientQuery
      nextPageNavigationConstant: NavigationConstants
      hasCancel: boolean
    }

    export class ParkingClientMutationComponent extends Mutation<boolean, SaveParkingClientMutationVariables> { }

    const ParkingNavigationComponent = ({ parkingResult, nextPageNavigationConstant, hasCancel }: IProps) => {
    ...
    return (
    <View style={{ paddingStart: 10 }}>
      <ParkingClientMutationComponent
        mutation={ParkingClientMutationGql}
        variables={inputParking}>
        {(ParkingClientMutation) => (
          <ParkingNavigationPure
            disabled={_.isNil(parkingResult.parkingclient.parking)}
            ParkingClientMutation={ParkingClientMutation}
            navigateConstant={nextPageNavigationConstant}
            hasCancel={hasCancel} />)
        }
      </ParkingClientMutationComponent>
    </View>

);
}

Using the Mutation like above would populate the variables as soon as they are passed to **`ParkingClientMutationComponent`**.

The mutation function **`ParkingClientMutation`** has the signature **`MutationFn<boolean, SaveParkingClientMutationVariables>`**, and recives the variables as input.

So alternately we can pass the variables directly to the function if we like:
const newParking: ParkingInput = {...};
ParkingClientMutation({ variables: { newParking } });

## Resolver

Now that we're implementing the mutation we can write the resolver to update client cache.

    // resolvers/SaveParkingClientResolver
    import { CacheContainer } from '../../Types';
    import GetParkingClientQueryGql from '../queries/GetParkingClientQueryGql';
    import _ from 'lodash';
    import { CreateParkingClient } from '../ParkingFactory';
    import { SaveParkingClientMutationVariables, GetParkingClientQuery } from '../../parkera-generated/client';

    export const ParkingClientChangedAsync = (
        _parent: any,
        variables: SaveParkingClientMutationVariables,
        cachecontainer: CacheContainer): boolean => {
        if (_.isNil(variables)) {
            return false;
        }

        const newData: GetParkingClientQuery = CreateParkingClient({ parkingData: variables.newParking });

        console.log('** saveParkingClient resolver writing data **');
        console.log(newData);

        cachecontainer.cache.writeQuery({ query: GetParkingClientQueryGql, data: newData });
        return true;
    }

    const SaveParkingClientResolver = {
        Mutation: {
            saveParkingClient: ParkingClientChangedAsync
        }
    }

    export default SaveParkingClientResolver;

Apollo provides our resolver with some fixed parameters:

- **`_parent`** - parent resolver if any
- **`variables`** - the variables we passed in the component step, above.
- **`cacheContainer`** - the Apollo cache manager allowing us to read and write to cache.

The important part is that:

A) We write to the **Gql Query** that's used to retrive the cache: **`GetParkingClientQueryGql`**
B) The **data** we write is the (generated) type for above query: **`GetParkingClientQuery`**

Finally, the **`SaveParkingClientResolver`** export links the **`ParkingClientChangedAsync`** to the name - **`saveParkingClient`** - used in the Mutation Gql **`ParkingClientMutationGql`**.

## CombineResolvers

To make our resolver available when the mutation is called, we link it in a Combine Resolver class:

    import _ from 'lodash';
    import LoginToFacebook from './login/resolvers/LoginToFacebook';
    import LoginToGoogle from './login/resolvers/LoginToGoogle';
    import SaveParkingClientResolver from './parking/resolvers/SaveParkingClientResolver';

    // TODO: add GraphQL resolvers here
    const CombineResolvers = _.merge(
      LoginToFacebook,
      LoginToGoogle,
      SaveParkingClientResolver
    );

    export type CombineResolvers = typeof CombineResolvers;
    export default CombineResolvers;

...which is evenutally passed to the Apollo Client:

    const stateLink = withClientState({
      cache: inMemoryCache,
      defaults: options.initialState,
      resolvers: options.resolvers,
    });
    ...
    const apolloClient = new ApolloClient({
      link: ApolloLink.from([errorLink, stateLink, httpLink]),
      cache: inMemoryCache,
    });

Above we can see that **`initialState`** is also passed to the client, detailed below.

## InitialState

As we initially request a local cache object it will not exist, unless we defined its initial state.

We ca write factory methods to produce the expected object - `CreateParkingClient()` - as a property with the expected name - `parkingclient`.

    // InitialState.ts
    import { CreateParkingClient } from './parking/ParkingFactory';

    const InitialState = {
      parkingclient: CreateParkingClient()
    };

    export type InitialState = typeof InitialState;
    export default InitialState;

In this case **`parkingclient`** is the exact name defined in **`ParkingClient.graphql:`**, as we saw earlier:

    // graphql/ParkingClient.graphql:
    extend type Query {
        parkingclient: ParkingResponse!
    }

Our factory `CreateParkingClient` would have to produce an object of the type **`GetParkingClientQuery`**, generated from the Query Gql:

    // parkera-generated/client/queries.ts
    export interface GetParkingClientQuery {
      parkingclient:  {
        __typename: "ParkingResponse",
        parking:  {
          __typename: "Parking",
          ...

# Types Generation

In order of GraphQL to understand complex type parameters we must define these and use our **generation** scripts.

This is done by creating `graphql` files (seen above) that generate TypeScript definitions (replacing our previous **`types.ts`** files).

See also

- **[Solution ReadMe](README.md#generate-typescript-from-graphql)**

## Add a GraphQL Type

Add types to backend using GraphQL files and implement on client as seen in the above examples.

## Generate TypeScript

Install packages and run the generation script from root or mobile folder:

> yarn generate

If you got errors, the terminal output will tell you what's wrong. If successfull the generated types will be found in **`source/parkera-generated`** for mobile and backend projects.

# Test with Jest and Enzyme

## Testing Components

Ensure you've exported a **pure** React component like GoogleLoginPure

    // login/components/GoogleLoginPure.tsx
    export const GoogleLoginPure = ({ onPress }: { onPress: Function }) => {>;
        return (
            <SocialIcon
                title='Logga in med Google'
                button
                onPress={() => onPress()}
                type='google-plus-official'
            />);
    };

You can then import the pure component to your Jest test and create a shallow wrapper using **[Enzyme](https://github.com/airbnb/enzyme "Enzyme documentation")**:

    // login/componets/GoogleLoginComponent.test.tsx
    import React from 'react';
    import { SocialIcon } from 'react-native-elements';
    import { shallow } from 'enzyme';
    import { GoogleLoginPure } from './GoogleLoginComponent';

    jest.unmock('react-native');
    jest.unmock('react-native-elements');

    function setup() {
      const enzymeWrapper = shallow(<GoogleLoginPure onPress={() => {console.log('click google'); }} />);

      return { enzymeWrapper };
    }

Using this wrapper we can then proceed to test properties and functions using **[Enzyme](https://github.com/airbnb/enzyme "Enzyme documentation")**:

    // login/componets/GoogleLoginComponent.test.tsx
    describe('components', () => {
      describe('GoogleLogin', () => {
          const { enzymeWrapper } = setup();
          const loginBase = enzymeWrapper;

          it('should match snapshot', () => {
            expect(loginBase).toMatchSnapshot();
          });

        it('type should be google-plus-official', () => {
          const buttonGoogle = loginBase
            .find(SocialIcon)
            .at(0)
            .props();
          expect(buttonGoogle.type).toEqual('google-plus-official');
        });

        it('should be able to press', () => {
          const buttonGoogle = loginBase
            .find(SocialIcon)
            .at(0)
            .props();
          buttonGoogle.onPress();
        });
      });
    });

Proceed to write small tests that evaluate the different scenarios for the component; **[negative result](https://smartbear.com/learn/automated-testing/negative-testing/ "Testing negative result")**, conditional rendering based on props values etc.

## Testing resolver functions

The resolver is just a functions, so all we have to do is provide an mock for Apollo InMemoryCache:

    // __mocks__/apollo-cache-inmemory.js
    const mock = {
        read: () => { },
        write: () => { },
        diff: () => { },
        watch: () => { },
        evict: () => { },
        reset: () => { },
        removeOptimistic: () => { },
        performTransaction: () => { },
        recordOptimisticTransaction: () => { },
        transformDocument: () => { },
        readQuery: () => { },
        readFragment: () => { },
        writeQuery: () => { },
        writeFragment: () => { },
    };

Which then can be used for the cache argument to the resolver:

    // login/resolvers/LoginToGoogle.test.ts
    import * as loginTypes from '../types';
    import { LoginToGoogleAsync } from './LoginToGoogle';
    import { InMemoryCache } from 'apollo-cache-inmemory';

    ...

    const inMemoryMock = new InMemoryCache();

    ...

    describe('resolvers', () => {
      describe('LoginToGoogle', () => {

        test('Snapshot should match', async () => {
          const actualResult = await LoginToGoogleAsync(null, {}, { cache: inMemoryMock });
          expect(actualResult).toMatchSnapshot();
        });

        test('Should return success result', async () => {
          const actualResult = await LoginToGoogleAsync(null, {}, { cache: inMemoryMock });

          expect(actualResult).toBeTruthy();
        });
      })
    });

You could also test **[negative result](https://smartbear.com/learn/automated-testing/negative-testing/ "Testing negative result")** to ensure these are also handled correctly.

We leave out **`try / catch`** for both good practise and also Apollo will return these to our components in the **`error`** parameter.

<!--
**``**
-->
