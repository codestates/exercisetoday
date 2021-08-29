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
  console.log("유저 인포", userInfo);
  const deleteModalHandler = () => {
    setDeleteOpen(!deleteOpen);
  };
  const [passwordEdit, setPasswordEdit] = useState({
    curPassword: "",
    newPassword: "",
    newPasswordMatch: "",
  });

  const passwordHandler = () => {
    const { curPassword, newPassword, newPasswordMatch } = passwordEdit;

    if (newPassword !== newPasswordMatch) {
      setErrorMessage("신규 비밀번호가 일치하지 않습니다");
    } else {
      setErrorMessage("");
    }
  };

  const handleInputValue = (key) => (e) => {
    if (key === "nick_name") {
      setUserInfo({ ...userInfo, nick_name: e.target.value });
    }
    setPasswordEdit({ ...passwordEdit, [key]: e.target.value });
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
  const onNickNameBtn = () => {
    nickNameRef.current.focus();
    setNickName(!nickNameEditClick);
    if (nickNameEditClick === true) {
      nickNameRef.current.blur();
    }
  };
  console.log("------>", passwordEdit);
  return (
    <>
      <MypageContainer>
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
                  value={userInfo.nick_name}
                  onChange={handleInputValue("nick_name")}
                  name="nick_name"
                  readonly
                />
                <NickNameEditBtn onClick={onNickNameBtn}>
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
        <MypageOngoinChall>
          <OngoingChallenge />
        </MypageOngoinChall>
        <MypageCompletedChall>
          <CompletedChallenge />
        </MypageCompletedChall>
      </MypageContainer>
    </>
  );
};

export default Mypage;

const ProfileAndContent = styled.div`
  margin: 5% 0% 0% 5%;
  width: 10%;
  > .PhotoEdit {
    margin-top: 20px;
    text-decoration: none;
    border: 1px solid rgb(0, 0, 0);
    padding: 20px;
    height: 12%;
    width: 100%;
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
  // * ------
  // * ------

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
  width: 150px;
  height: 200px;
  > .photo {
    display: none;
  }
  > .photoPreview {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
const PasswordEditBtn = styled.button`
  position: relative;
  height: 2rem;
  left: 13%;
  width: 10%;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.4);
  color: rgb(0, 0, 0);
  cursor: grab;
  :hover {
    border-color: rgba(0, 0, 0, 0.9);
  }
`;

const MypageOngoinChall = styled.div`
  background-color: white;
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
  font-size: 1.2rem;
  margin: 1% 0% 0% 3%;
  width: 15%;
  height: 2rem;
  border: none;
  color: rgb(0, 0, 0);
`;
const NickNameEditBtn = styled.button`
  position: relative;
  height: 2rem;
  left: 28%;
  width: 10%;
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
  // ? 콘텐트

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

const ErrMessage = styled.div`
  width: 20rem;
  font-size: 15px;
  color: red;
`;

const SubmitBtn = styled.button`
  margin: 5% 0% 0% 41%;
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
