import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const DeleteContainer = styled.div`
  display: felx;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: ${(props) => (props.isvisible ? "auto" : "none")};
`;
const DeleteBack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.8rem;
  width: 580px;
  height: 220px;
`;
const CloseModal = styled.div`
  margin: 0.5rem 0 0 32.5rem;
  text-align: center;
  font-size: 35px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
const DeleteText = styled.div`
  margin-top: 0.5rem;
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.3rem;
  text-align: center;
  width: 100%;
  height: 20px;
`;
const InputBox = styled.input`
  flex: 60%;
  margin: 2rem 0 0 0.5rem;
  height: 2.3rem;
`;
const DeleteBtn = styled.button`
  flex: 30%;
  margin: 2rem 0 0 3rem;
  width: 15rem;
  height: 3.5vh;
  color: white;
  background-color: rgba(150, 0, 0, 0.6);
  border: none;
  cursor: grab;
  :hover {
    background-color: rgba(120, 0, 0, 0.6);
  }
`;
const ErrMessage = styled.div`
  position: absolute;
  margin: 5rem 0 0 0.5rem;
  width: 20rem;
  font-size: 16px;
  color: red;
`;
const Container = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

const Delete = ({ visible, setVisible, deleteUserInfo, token }) => {
  const [InputCheck, setInputCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleInputValue = (e) => {
    setInputCheck(e.target.value);
    if (e.target.value === "") {
      setErrorMessage("");
    }
  };
  const handleCloseModal = () => {
    setVisible(false);
    setErrorMessage("");
    setInputCheck("");
  };
  const checkDeleteValue = () => {
    if (InputCheck === "회원탈퇴") {
      axios({
        method: "DELETE",
        url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user",
        headers: { authorization: token },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "ok") {
            deleteUserInfo();
            setVisible(false);
            setInputCheck("");
            alert("회원탈퇴가 완료되었습니다");
            history.push("/");
            localStorage.clear();
          } else {
            console.log("User Delete Error", res.data.message);
          }
        })
        .catch((err) => console.log("User Delete Error", err));
    } else {
      setErrorMessage("회원탈퇴 입력을 다시 확인해주세요");
    }
  };
  return (
    <>
      <DeleteContainer isvisible={visible}>
        <DeleteBack>
          <CloseModal onClick={handleCloseModal}>&times;</CloseModal>
          <DeleteText>
            회원 탈퇴를 원하시면 아래에 "회원탈퇴"를 입력해 주세요
          </DeleteText>
          <Container>
            <InputBox
              type="text"
              name="deleteInputBox"
              value={InputCheck}
              onChange={(e) => handleInputValue(e)}
            />
            <ErrMessage>{errorMessage}</ErrMessage>
            <DeleteBtn onClick={checkDeleteValue}>회원탈퇴</DeleteBtn>
          </Container>
        </DeleteBack>
      </DeleteContainer>
    </>
  );
};

export default Delete;
