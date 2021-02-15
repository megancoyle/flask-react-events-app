import React from 'react';
import renderer from 'react-test-renderer';
import EventTable from '../EventTable';

test('renders EventTable correctly', () => {
  const tree = renderer.create(<EventTable />).toJSON();
  expect(tree).toMatchSnapshot();
});