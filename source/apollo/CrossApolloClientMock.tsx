import * as React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  IResolvers,
} from 'graphql-tools';
import { SchemaLink } from 'apollo-link-schema';

export interface IApolloClientMockOptions {
  resolvers?: Array<IResolvers<any, any>>;
  schemaString: string;
}

interface ICrossApolloClientMockState {
  isLoaded: boolean;
  apolloClient: any;
}

export interface ICrossApolloClientMockProps extends ViewProps {
  options: IApolloClientMockOptions;
}

/**
 * Default options to provide as the second parameter to ApolloClientMock
 */
export const DefaultOptions: IApolloClientMockOptions = {
  schemaString: `
  type Booking {
    id: String!
    startDate: String!
    endDate: String
    description: String
  }
  
  input CreateBookingInput {
    startDate: String!
    endDate: String
    userID: ID!
  }`,
};

/**
 * Higher Order Component function that wraps the {@param AppRootComponent} in ApolloProvider, passing props
 */
export class CrossApolloClientMock extends React.Component<
  ICrossApolloClientMockProps,
  ICrossApolloClientMockState
> {
  constructor(props: ICrossApolloClientMockProps) {
    super(props);
    this.state = {
      isLoaded: false,
      apolloClient: null,
    };
  }

  createClient() {
    const inMemoryCache = new InMemoryCache();

    const executeSchema = makeExecutableSchema({
      typeDefs: this.props.options.schemaString || '',
      resolvers: this.props.options.resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    });

    // Add mocks, modifies schema in place
    addMockFunctionsToSchema({ schema: executeSchema });

    const schemaLink = new SchemaLink({ schema: executeSchema });

    const apolloClient = new ApolloClient({
      link: ApolloLink.from([schemaLink]),
      cache: inMemoryCache,
    });

    this.setState({ isLoaded: true, apolloClient });
  }

  componentWillMount() {
    this.createClient();
  }

  render() {
    if (!this.state.isLoaded) {
      return <Text>Loading</Text>;
    }

    return (
      <ApolloProvider client={this.state.apolloClient}>
        <View style={{ flex: 1 }}>{this.props.children}</View>
      </ApolloProvider>
    );
  }
}

export default CrossApolloClientMock;
