import React from 'react';
import ProfileScreen from './ProfileScreen';
import TestRenderer from 'react-test-renderer';

function setup() {
    return TestRenderer.create(
        <ProfileScreen />
    );
}

describe('components', () => {
    describe('<ProfileScreen />', () => {
        it('renders correctly with defaults', () => {
            const wrapper = setup();
            expect(wrapper.toJSON()).toMatchSnapshot();
        });
    });
});