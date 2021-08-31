import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const DeleteContainer = styled.div`
  display: felx;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.35);
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
  width: 40%;
  height: 350px;
  > .deleteExit {
    margin-top: 2rem;
    text-align: center;
    font-size: 25px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
`;
const DeleteText = styled.div`
  margin-top: 3rem;
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.3rem;
  text-align: center;
  width: 100%;
  height: 20px;
`;
const DeleteInput = styled.input`
  margin-top: 3rem;
  width: 71%;
  height: 2.3rem;
`;
const DeleteBtn = styled.button`
  margin-top: 3rem;
  width: 5rem;
  height: 3vh;
  color: white;
  background-color: rgba(80, 0, 0, 0.6);
  border: none;
  cursor: grab;
  :hover {
    background-color: rgba(120, 0, 0, 0.6);
  }
`;
const ErrMessage = styled.div`
  text-align: center;
  width: 20rem;
  font-size: 15px;
  color: red;
`;

const Delete = ({ visible, setVisible, deleteUserInfo }) => {
  const [delInputCheck, setDelInputCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleDelInputValue = (e) => {
    setDelInputCheck(e.target.value);
  };
  const checkDeleteValue = () => {
    if (delInputCheck === "회원탈퇴") {
      axios({
        method: "DELETE",
        url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "ok") {
            deleteUserInfo();
            setVisible(false);
            setDelInputCheck("");
            alert("회원탈퇴가 완료되었습니다");
            history.push("/");
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
          <div className="deleteExit" onClick={() => setVisible(false)}>
            X
          </div>
          <DeleteText>
            회원 탈퇴를 원하시면 "회원탈퇴"라고 아래에 입력해 주세요
          </DeleteText>
          <DeleteInput
            type="text"
            name="deleteInputBox"
            value={delInputCheck}
            onChange={(e) => handleDelInputValue(e)}
          />
          <ErrMessage>{errorMessage}</ErrMessage>
          <DeleteBtn onClick={checkDeleteValue}> 회원탈퇴 </DeleteBtn>
        </DeleteBack>
      </DeleteContainer>
    </>
  );
};

export default Delete;
