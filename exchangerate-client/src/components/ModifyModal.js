import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useState } from "react";
import { dataRefetch } from "../pages/Main";

const POST_EXCHANGE_RATE = gql`
    mutation postExchangeRate($info: InputUpdateExchangeInfo) {
        postExchangeRate(info: $info) {
            src
            tgt
            rate
            date
        }
    }
`;

const ModifyModal = ({ src, tgt, rate, date, setModalOpen }) => {
    const [modifyRate, setModifyRate] = useState(rate);
    const [postExchangeRate] = useMutation(POST_EXCHANGE_RATE, {
        onCompleted: () => {
            dataRefetch();
            alert("수정하였습니다 !");
        },
    });

    const handleModifyExchangeInfo = () => {
        postExchangeRate({
            variables: {
                info: { src: src, tgt: tgt, rate: modifyRate, date: date },
            },
        });
        setModalOpen(false);
    };
    return (
        <ModalWrapper>
            <ModalContent>
                <PostRateTitle>환율 정보 수정 </PostRateTitle>
                <InputWrapper>
                    <Title>Src</Title>
                    <Title>Tgt</Title>
                    <Title>Rate</Title>
                    <Title>Date</Title>
                </InputWrapper>
                <InputWrapper>
                    <Title>{src}</Title>
                    <Title>{tgt}</Title>
                    <InputRate
                        onChange={(e) => {
                            setModifyRate(e.target.value * 1);
                        }}
                        defaultValue={rate}
                    />
                    <Title>{date}</Title>
                </InputWrapper>
                <ModifyBtn onClick={handleModifyExchangeInfo}>
                    {" "}
                    수정하기 !
                </ModifyBtn>
            </ModalContent>
        </ModalWrapper>
    );
};

export default ModifyModal;

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40rem;
    height: 10rem;
    padding: 1rem;
    background-color: white;
`;

const PostRateTitle = styled.h2`
    font-size: 1.3rem;
    font-weight: 700;
`;
const InputWrapper = styled.form`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 3rem;
    margin-top: 1rem;
`;

const Title = styled.p`
    width: 5rem;
    font-size: 1rem;
    font-weight: 600;
`;

const InputRate = styled.input`
    width: 5rem;
    height: 1rem;
`;

const ModifyBtn = styled.button`
    width: 100%;
    height: 3rem;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    background-color: rgba(114, 230, 232, 0.5);
    :hover {
        background-color: rgba(114, 230, 232, 0.8);
    }
`;
