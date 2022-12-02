import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import ContentBox from "../components/ContentBox";

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

const Main = () => {
    const { loading, error, data } = useQuery(GET_EXCHANGE_RATE_ALL, {
        variables: { amount: 5 },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    console.log(data);
    return (
        <MainWrapper>
            <MainContentBox>
                <MainTitle>
                    <DataField size={15}>Src</DataField>
                    <DataField size={15}>Tgt</DataField>
                    <DataField size={25}>Rate</DataField>
                    <DataField size={25}>Date</DataField>
                </MainTitle>
                {data.getExchangeRates.map((props) => (
                    <ContentBox {...props} />
                ))}
            </MainContentBox>
        </MainWrapper>
    );
};

export default Main;

const MainWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
`;
const MainContentBox = styled.div`
    position: relative;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 3rem;
    width: 40%;
    height: 60%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const MainTitle = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: rgba(0,0,0,0.06);
    font-weight: 600;
`;

const DataField = styled.p`
 width: ${props => props.size}%;
`