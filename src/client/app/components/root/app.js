import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    color: #000;
    background: #f9f9f9;
    font-weight: 400;
    padding: 0 24px;
    height: 100%;
`;

const App = ({ test }) => {
    return <AppContainer>Here goes the code {test}</AppContainer>;
};
App.propTypes = {
    test: string.isRequired,
};

export default App;
