import styled from "styled-components";
import { useState, useRef } from "react";
import NoImage from "../image/NoImage.jpeg";
import { datas } from "./dummyData";
import Delete from "./Delete";
import OngoingChallenge from "./OngoingChallenge";
import CompletedChallenge from "./CompletedChallenge";
//백엔드의 S3에 이미지를 업로드

const Mypage = () => {
  const [selectedFile, setFile] = useState(null);
  const [userInfo, setUserInfo] = useState(...datas);
  const [passwordEditClick, setPasswordEditClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [nickNameEditClick, setNickName] = useState(false);
  const [curErrorMessage, setCurErrorMessage] = useState("");

  const deleteModalHandler = () => {
    setDeleteOpen(!deleteOpen);
  };
  const [passwordEdit, setPasswordEdit] = useState({
    curPassword: "",
    newPassword: "",
    newPasswordMatch: "",
    nick_name: userInfo.nick_name,
  });

  const passwordHandler = () => {
    if (userInfo.password !== passwordEdit.curPassword) {
      setCurErrorMessage("현재 비밀번호가 일치하지 않습니다");
    } else {
      setCurErrorMessage("");
    }
  };

  const handleInputValue = (key) => (e) => {
    if (key === "nick_name") {
      setPasswordEdit({ nick_name: e.target.value });
    } else if (key === "curPassword" && userInfo.password !== e.target.value) {
      setPasswordEdit({ ...passwordEdit, [key]: e.target.value });
    } else if (
      key === "newPasswordMatch" &&
      passwordEdit.newPassword !== e.target.value
    ) {
      setPasswordEdit({ ...passwordEdit, [key]: e.target.value });
      setErrorMessage("신규 비밀번호가 일치하지 않습니다");
    } else {
      setPasswordEdit({ ...passwordEdit, [key]: e.target.value });
      setErrorMessage("");
    }
  };
  const passwordEditClickHandler = () => {
    setPasswordEditClick(!passwordEditClick);
    setPasswordEdit({
      curPassword: "",
      newPassword: "",
      newPasswordMatch: "",
    });
    setErrorMessage("");
  };

  const handlePhoto = (e) => {
    const temp = [];
    const photoToAdd = e.target.files;
    if (photoToAdd.length === 0) {
      return;
    }
    for (let i = 0; i < photoToAdd.length; i++) {
      temp.push({
        id: photoToAdd[i].name,
        file: photoToAdd[i],
        url: URL.createObjectURL(photoToAdd[i]),
      });
    }
    setFile(temp);
  };

  console.log("프로필사진 id, url", selectedFile);
  const imageRef = useRef();
  const nickNameRef = useRef();

  const onImgInputBtn = () => {
    imageRef.current.click();
  };
  const changeNickBtn = () => {
    if (passwordEdit.nick_name !== userInfo.nick_name) {
      setUserInfo({ ...userInfo, nick_name: passwordEdit.nick_name });
    }
    setNickName(!nickNameEditClick);
  };
  const onNickNameBtn = () => {
    if (passwordEdit.nick_name !== userInfo.nick_name) {
      setPasswordEdit({ nick_name: userInfo.nick_name });
    }
    setNickName(!nickNameEditClick);
    if (nickNameEditClick === false) {
      nickNameRef.current.focus();
    } else {
      nickNameRef.current.blur();
    }
  };
  console.log("------>", passwordEdit);
  return (
    <>
      <MypageContainer>
        {/* <MypageTitle> 육회비빔밥님, 회원정보</MypageTitle> */}
        <MypageProfile>
          <div className="firstContent">
            <ProfileAndContent>
              <ProfilePhoto>
                <img
                  className="photoPreview"
                  alt="프로필 사진"
                  src={!selectedFile ? NoImage : selectedFile[0].url}
                />
                <input
                  className="photo"
                  ref={imageRef}
                  type="file"
                  accpet="image/*"
                  name="profile"
                  onChange={(e) => handlePhoto(e)}
                />
              </ProfilePhoto>
              <button className="PhotoEdit" onClick={onImgInputBtn}>
                프로필 등록 및 수정
              </button>
            </ProfileAndContent>
            <ProfileAndContent2>
              <ProfileContent>
                <ProfileTitle>이메일</ProfileTitle>
                <div className="userContent">{userInfo.email}</div>
              </ProfileContent>
              <BorderBottom />
              <ProfileContent>
                <ProfileTitle>비밀번호</ProfileTitle>
                <div className="userContent">
                  {passwordEditClick ? null : (
                    <div className="userContent">*****</div>
                  )}
                  <EditPasswordContainer visible={passwordEditClick}>
                    현재 비밀번호
                    <InputBox
                      type="password"
                      value={passwordEdit.curPassword}
                      placeholder="현재 비밀번호를 입력하세요"
                      onChange={handleInputValue("curPassword")}
                    />
                    <ErrMessage>{curErrorMessage}</ErrMessage>
                    신규 비밀번호
                    <InputBox
                      type="password"
                      value={passwordEdit.newPassword}
                      onChange={handleInputValue("newPassword")}
                    />
                    신규 비밀번호 확인
                    <InputBox
                      type="password"
                      value={passwordEdit.newPasswordMatch}
                      onChange={handleInputValue("newPasswordMatch")}
                    />
                    <ErrMessage>{errorMessage}</ErrMessage>
                    <PasswordBtn onClick={() => passwordHandler()}>
                      완료
                    </PasswordBtn>
                  </EditPasswordContainer>
                </div>
                <PasswordEditBtn onClick={passwordEditClickHandler}>
                  {passwordEditClick ? "변경취소" : "비밀번호 변경"}
                </PasswordEditBtn>
              </ProfileContent>
              <BorderBottom />
              <ProfileContent>
                <ProfileTitle>닉네임</ProfileTitle>
                <InputBoxNickName
                  type="text"
                  ref={nickNameRef}
                  value={passwordEdit.nick_name}
                  onChange={handleInputValue("nick_name")}
                  visibleNick={nickNameEditClick}
                  name="nick_name"
                />
                <TextNickName
                  type="text"
                  visibleNickText={nickNameEditClick}
                  value={userInfo.nick_name}
                  readOnly
                />
                <NickNameHandleBtn
                  visible={nickNameEditClick}
                  onClick={changeNickBtn}
                >
                  완료
                </NickNameHandleBtn>
                <NickNameEditBtn
                  visible={nickNameEditClick}
                  onClick={onNickNameBtn}
                >
                  {nickNameEditClick ? "변경취소" : "닉네임 변경"}
                </NickNameEditBtn>
              </ProfileContent>
              <BorderBottom />
              <ProfileContent>
                <ProfileTitle>레벨</ProfileTitle>
                <div className="userContent">{userInfo.level}</div>
              </ProfileContent>
              <BorderBottom />
              <ProfileContent>
                <ProfileTitle>휴대전화</ProfileTitle>
                <div className="userContent">
                  010-****-{userInfo.mobile.slice(7)}
                </div>
              </ProfileContent>
              <BorderBottom />
              <SubmitBtn>제출</SubmitBtn>
              <DeleteBtn onClick={() => deleteModalHandler()}>
                회원탈퇴
              </DeleteBtn>
              <Delete visible={deleteOpen} setVisible={deleteModalHandler} />
            </ProfileAndContent2>
          </div>
        </MypageProfile>
        <OngoingChallContent>현재 진행중인 챌린지</OngoingChallContent>
        <MypageOngoinChall>
          <OngoingChallenge />
        </MypageOngoinChall>
        <OngoingChallContent>완료된 챌린지</OngoingChallContent>
        <MypageCompletedChall>
          <CompletedChallenge />
        </MypageCompletedChall>
      </MypageContainer>
    </>
  );
};

export default Mypage;
const MypageTitle = styled.div`
  position: absolute;
  font-size: 2rem;
  margin: 2% 0% 0% 4%;
`;
const OngoingChallContent = styled.div`
  border-top: 3px solid;
  border-color: #003150;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 5% 0% 3% 3%;
  font-size: 2rem;
  @media screen and (max-width: 1024px) {
    margin: 0%;
    width: 10%;
    height: 10%;
  }
`;
const ProfileAndContent = styled.div`
  margin: 5% 0% 0% 5%;
  > .PhotoEdit {
    margin-top: 20px;
    text-decoration: none;
    padding: 20px;
    width: 10rem;
    background-color: white;
    border-color: rgba(0, 0, 0, 0.4);
    color: rgb(0, 0, 0);
    cursor: grab;
    :hover {
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const ProfileAndContent2 = styled.div`
  margin: 5% 0% 0% 5%;
  width: 90%;
`;
const MypageContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  border: 1.1rem solid;
  border-color: #003150;
`;

const MypageProfile = styled.div`
  > .firstContent {
    // ? firstContent
    display: flex;
  }
  > .password {
    margin-top: 20px;
    text-align: center;
    padding: 20px;
    width: 20wh;
    height: 2%;
    border-color: #003150;
    color: rgb(0, 0, 0);
  }
`;

const ProfilePhoto = styled.div`
  margin: 50% 0% 0% 3%;
  position: relative;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.4);
  width: 90%;
  height: 10rem;
  > .photo {
    display: none;
  }
  > .photoPreview {
    // ?
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const MypageOngoinChall = styled.div`
  background-color: white;
`;

const NickNameHandleBtn = styled.button`
  display: ${(props) => (props.visible ? "auto" : "none")};
  position: relative;
  margin-top: 19px;
  left: 4%;
  width: 4%;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  color: rgb(0, 0, 0);
  cursor: grab;
  :hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const MypageCompletedChall = styled.div`
  //  ? ! 66
`;

const EditPasswordContainer = styled.div`
  display: ${(props) => (props.visible ? "auto" : "none")};
`;
const InputBox = styled.input`
  margin-bottom: 5%;
  width: 100%;
  height: 4vh;
`;

const InputBoxNickName = styled.input`
  display: ${(props) => (props.visibleNick ? "auto" : "none")};
  font-size: 1.2rem;
  margin: 1% 0% 0% 3%;
  width: 15%;
  height: 2rem;
  border: 0.5px solid gray;
  color: rgb(0, 0, 0);
`;
const TextNickName = styled.input`
  display: ${(props) => (props.visibleNickText ? "none" : "auto")};
  font-size: 1.2rem;
  margin: 1% 0% 0% 3%;
  width: 15%;
  height: 2rem;
  border: none;
  color: rgb(0, 0, 0);
`;
const PasswordEditBtn = styled.button`
  position: relative;
  height: 2rem;
  left: 13%;
  width: 8rem;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.4);
  color: rgb(0, 0, 0);
  cursor: grab;
  :hover {
    border-color: rgba(0, 0, 0, 0.9);
  }
`;
const NickNameEditBtn = styled.button`
  position: relative;
  height: 2rem;
  left: ${(props) => (props.visible ? 24 : 28)}%;
  width: 8rem;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.4);
  color: rgb(0, 0, 0);
  cursor: grab;
  :hover {
    border-color: rgba(0, 0, 0, 0.9);
  }
`;
const PasswordBtn = styled.button`
  width: 5rem;
  height: 2.5rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: grab;
  :hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ProfileTitle = styled.div`
  margin-top: 1%;
  color: rgba(0, 0, 0, 0.7);
  margin-left: 3%;
  width: 30%;
`;

const ProfileContent = styled.div`
  padding: 1.5%;
  display: flex;
  > .userContent {
    margin: 1% 0% 0% 3%;
    width: 30%;
    font-size: 1.2rem;
    border-color: #003150;
    color: rgb(0, 0, 0);
  }
`;

const BorderBottom = styled.div`
  border-bottom: 2px solid;
  border-color: #003150;
  margin-left: 3%;
  margin-right: 10%;
`;
const DeleteBtn = styled.button`
  margin: 2% 0% 0% 9%;
  width: 5vw;
  height: 2.5rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: grab;
  :hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ErrMessage = styled.div`
  width: 20rem;
  font-size: 15px;
  color: red;
`;

const SubmitBtn = styled.button`
  margin: 5% 0% 0% 37%;
  width: 5rem;
  height: 2.5rem;
  color: white;
  background-color: rgba(80, 0, 0, 0.6);
  border: none;
  cursor: grab;
  :hover {
    background-color: rgba(120, 0, 0, 0.6);
  }
  @media all and (max-width: 1024px) {
    width: 3rem;
  }
`;
