import {useQuery, gql} from '@apollo/client';
import styled from "styled-components";

const ContentBox = ({src, tgt, date, rate}) => {
  return (
    <BoxWrapper>
      <DataField size={15}>{src}</DataField>
      <DataField size={15}>{tgt}</DataField>
      <DataField size={25}>{rate}</DataField>
      <DataField size={25}>{date}</DataField>
    </BoxWrapper>
  )
}

export default ContentBox;

const BoxWrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width: 100%;
  height: 5rem;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 0.9rem 1rem -20px;
`

const DataField = styled.p`
 width: ${props => props.size}%;
`