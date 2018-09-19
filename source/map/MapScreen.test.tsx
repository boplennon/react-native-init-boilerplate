import React from 'react';
import { shallow } from 'enzyme';

import MapScreen from './MapScreen';

jest.mock('@mapbox/react-native-mapbox-gl', () => ({
    UserTrackingModes: { Follow: 'Follow' },
    StyleURL: { Street: 'Street' },
    setAccessToken: jest.fn(),
    MapView: 'View'
}));

function setup() {
    return shallow(
        // @ts-ignore - Enzyme TypeScript issues
        <MapScreen />
    );
}

describe('components', () => {
    describe('MapScreen', () => {
        it('renders correctly with defaults', () => {
            const wrapper = setup();
            expect(wrapper).toMatchSnapshot();
        });
    });
});