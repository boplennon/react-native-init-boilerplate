import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { persistCache } from 'apollo-cache-persist';
import _ from 'lodash';
import CrossBusyIndicator from '../core/CrossBusyIndicator';
import styles from '../styles';
import { IResolvers } from 'graphql-tools';

export interface ICrossApolloOptions {
  /**
   * Backend Uri
   */
  uri?: string;
  /**
   * Token to add as authentication header. Optional.
   */
  token?: string;
  /**
   * The GraphQL Resolvers. Optional.
   */
  resolvers?: Array<IResolvers<any, any>>;
  /**
   * The {@link InitialState} for local cache. Optional.
   */
  initialState?: any;
  /**
   * Handler for GraphQL errors. Optional.
   */
  errorCallback?: (error: Error) => void;
}

interface ICrossApolloState {
  isLoaded: boolean;
  apolloClient: any;
}

/**
 * Higher Order Component function that wraps the {@param AppRootComponent} in ApolloProvider, passing props
 */
export class CrossApolloClient extends React.Component<
  ICrossApolloOptions,
  ICrossApolloState
> {
  constructor(props: ICrossApolloOptions) {
    super(props);
    this.state = {
      isLoaded: false,
      apolloClient: null,
    };
  }

  async createClient() {
    const inMemoryCache = new InMemoryCache();

    // Cache persist
    // @ts-ignore - bad mapping to RN 0.57
    await persistCache({
      cache: inMemoryCache,
      storage: AsyncStorage,
      key: 'apolloStorage',
      debug: __DEV__,
    });

    // Client
    const httpLink = new HttpLink({
      uri: this.props.uri || 'http://localhost:4000/graphql',
      headers: {
        authorization: 'Bearer ' + this.props.token,
      },
    });

    // Local state
    const stateLink = withClientState({
      cache: inMemoryCache,
      defaults: this.props.initialState,
      resolvers: this.props.resolvers,
    });

    // Error handler
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        if (!_.isNil(this.props.errorCallback)) {
          this.props.errorCallback(graphQLErrors[0]);
        }
      }

      if (networkError) {
        if (!_.isNil(this.props.errorCallback)) {
          this.props.errorCallback(networkError);
        }
      }
    });

    const apolloClient = new ApolloClient({
      link: ApolloLink.from([errorLink, stateLink, httpLink]),
      cache: inMemoryCache,
    });

    this.setState({ isLoaded: true, apolloClient });
  }

  componentWillMount() {
    this.createClient();
  }

  render() {
    if (!this.state.isLoaded) {
      return <CrossBusyIndicator isBusy message='Ansluter...' />;
    }

    return (
      <ApolloProvider client={this.state.apolloClient}>
        <View style={styles.container}>{this.props.children}</View>
      </ApolloProvider>
    );
  }
}

export default CrossApolloClient;
