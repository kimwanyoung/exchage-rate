import React from "react";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import ContentBox from "../components/ContentBox";
import sampleData from "../mocks/sampleData";

const GET_EXCHANGE_RATE_ALL = gql`
    query getExchangeRates($amount: Int!) {
        getExchangeRates(amount: $amount) {
            src
            tgt
            rate
            date
        }
    }
`;

const CREATE_EXCHANGE_RATE = gql`
    mutation createExchangeRate($info: InputUpdateExchangeInfo) {
        createExchangeRate(info: $info) {
            src
            tgt
            date
            rate
        }
    }
`;

let refetcher;

const Main = () => {
    const { loading, error, data, refetch } = useQuery(GET_EXCHANGE_RATE_ALL, {
        variables: { amount: 100 },
    });
    refetcher = refetch;

    const [createExchangeRate] = useMutation(CREATE_EXCHANGE_RATE, () => {
        alert("테스트 데이터 생성 성공!");
    });
    const handleCreateTestData = () => {
        sampleData.forEach(({ src, tgt, rate, date }) =>
            createExchangeRate({
                variables: { info: { src, tgt, rate, date } },
            })
        );
        refetcher();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return (
        <MainWrapper>
            <CreateTestDataBtn onClick={handleCreateTestData}>
                Create Test Data
            </CreateTestDataBtn>
            <MainContentBox>
                <MainTitle>
                    <DataField size={15}>Src</DataField>
                    <DataField size={15}>Tgt</DataField>
                    <DataField size={25}>Rate</DataField>
                    <DataField size={25}>Date</DataField>
                </MainTitle>
                <ContentBoxWrapper>
                {data.getExchangeRates.map((props, idx) => (
                    <ContentBox {...props} key={idx} />
                ))}
                </ContentBoxWrapper>
            </MainContentBox>
        </MainWrapper>
    );
};

export function dataRefetch() {
    refetcher();
}
export default Main;

const MainWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;
const MainContentBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 3rem;
    width: 40%;
    height: 60%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    overflow-y: scroll;
`;

const MainTitle = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.06);
    font-weight: 600;
`;

const DataField = styled.p`
    width: ${(props) => props.size}%;
`;

const CreateTestDataBtn = styled.button`
    width: 12rem;
    height: 4rem;
    margin-right: 2rem;
    color: white;
    font-size: 1.2rem;
    border: none;
    border-radius: 1rem;
    background-color: rgba(20, 212, 106, 0.6);
    :hover {
        background-color: rgba(20, 212, 106, 0.9);
    }
`;

const ContentBoxWrapper = styled.div`
    width: 100%;
    height: 100%;
`