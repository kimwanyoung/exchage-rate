import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { dataRefetch } from "../pages/Main";

const DELETE_EXCHANGE_RATE = gql`
    mutation deleteExchangeRate($info: InputDeleteExchangeInfo) {
        deleteExchangeRate(info: $info) {
            src
            tgt
            rate
            date
        }
    }
`;

const ContentBox = ({ src, tgt, date, rate, setModalData, setModalOpen }) => {
    const [deleteExchangeRate] = useMutation(DELETE_EXCHANGE_RATE, {
        onCompleted: () => alert("삭제되었습니다."),
    });

    const handleDeleteExchangeRate = () => {
        deleteExchangeRate({
            variables: { info: { src: src, tgt: tgt, date: date } },
        });
        dataRefetch();
    };

    return (
        <BoxWrapper>
            <DataField size={15}>{src}</DataField>
            <DataField size={15}>{tgt}</DataField>
            <DataField size={20}>{rate}</DataField>
            <DataField size={20}>{date}</DataField>
            <ExeBtn
                color="178, 105, 224"
                onClick={() => {
                    setModalData((prev) => {
                        let newModalData = { ...prev };
                        newModalData = {
                            src: src,
                            tgt: tgt,
                            rate: rate,
                            date: date,
                        };
                        return newModalData;
                    });
                    setModalOpen(true);
                }}
            >
                Modify
            </ExeBtn>
            <ExeBtn color="224, 105, 145" onClick={handleDeleteExchangeRate}>
                Delete
            </ExeBtn>
        </BoxWrapper>
    );
};

export default ContentBox;

const BoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 0.9rem 1rem -20px;
    :hover {
        background-color: rgba(111, 218, 232, 0.5);
    }
`;

const DataField = styled.p`
    width: ${(props) => props.size}%;
`;

const ExeBtn = styled.button`
    width: 10%;
    height: 1.5rem;
    margin-right: 0.5rem;
    background-color: rgba(${(prop) => prop.color}, 0.3);
    outline: none;
    border: none;
    color: white;

    :hover {
        background-color: rgba(${(prop) => prop.color}, 0.7);
    }
`;
