import React from 'react';
import styled, { keyframes } from 'styled-components';

const keyFrameSpinner = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`;

const SpinnerContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;
const Spinner = styled.svg`
    display: flex;
    width: 52px;
    height: 52px;
    animation: ${keyFrameSpinner} 500ms ease-in infinite;
`;

const Loader = () => (
    <SpinnerContainer>
        <Spinner width="52px" height="52px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g
                id="UI-Kit"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g id="03" transform="translate(-299.000000, -1392.000000)">
                    <g id="icons/Loader" transform="translate(293.000000, 1386.000000)">
                        <g id="Content/Loading_Dark" transform="translate(8.000000, 8.000000)">
                            <g id="Group" strokeWidth="4">
                                <path
                                    d="M47.7690074,23.8845037 C47.7690074,37.0756148 37.0756741,47.7689481 23.884563,47.7689481 C10.6934519,47.7689481 0.000118518518,37.0756148 0.000118518518,23.8845037 C0.000118518518,10.6933926 10.6934519,5.92592593e-05 23.884563,5.92592593e-05"
                                    id="Stroke-3"
                                    stroke="#FFFFFF"
                                    opacity="0.160447761"
                                />
                                <path
                                    d="M23.8845037,0 C37.0756148,0 47.7689481,10.6933333 47.7689481,23.8844444"
                                    id="Stroke-1"
                                    stroke="#927239"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </Spinner>
    </SpinnerContainer>
);

export default Loader;
