import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import NoImage from "../image/NoImage.jpeg";
import { datas } from "./dummyData";
import Delete from "./Delete";
import OngoingChallenge from "./OngoingChallenge";
import CompletedChallenge from "./CompletedChallenge";
import axios from "axios";
//백엔드의 S3에 이미지를 업로드

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
  display: flex;
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

const Mypage = ({ userData, deleteUserInfo }) => {
  const [userInfo, setUserInfo] = useState(userData);
  const [passwordEditClick, setPasswordEditClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [nickNameEditClick, setNickName] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [challengeList, setChallengeList] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    curPassword: "",
    newPassword: "",
    newPasswordMatch: "",
    nick_name: userInfo.user_nickname,
  });
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/photo",
      data: { user_id: userData.user_id },
    })
      .then((res) => {
        if (res.data.message) {
          if (res.data.user_photo === null) {
            setUserPhoto(NoImage);
          } else {
            setUserPhoto(res.data.user_photo); //blob제거 split(" ")[1]
          }
        }
      })
      .catch((err) => console.log("Photo Error", err));

    axios({
      method: "GET",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/challenge",
      data: { user_id: userData.user_id },
    })
      .then((res) => {
        if (res.data.message) {
          setChallengeList(res.data.challenges);
        }
      })
      .catch((err) => console.log("challenges Error", err));
  }, []);
  const deleteModalHandler = () => {
    setDeleteOpen(!deleteOpen);
  };
  //이름바꾸기, 완료버튼누를때 미ㅣ리뜨기 제출전에..

  const userInfoUpdate = () => {
    axios({
      method: "PUT",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user",
      data: {
        user_id: userData.user_id,
        user_nickname: newUserInfo.nick_name,
        user_password: newUserInfo.newPassword,
      },
    })
      .then((res) => {
        if (res.data.data) {
          const { user_nickname } = res.data.data;
          setUserInfo({ ...userInfo, user_nickname });
        } else {
          console.log("userInfoUpdate Error", res.data.message);
        }
      })
      .catch((err) => console.log("userInfoUpdate Error", err));
    if (userPhoto !== null) {
      axios({
        method: "PUT",
        url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/user/photo",
        data: { user_photo: userPhoto.slice(5) },
      })
        .then((res) => {
          if (res.data.message === "ok") {
            setUserPhoto(res.data.user_photo); //blob제거
          } else {
            console.log("User Photo Error", res.data.message);
          }
        })
        .catch((err) => console.log("User Photo Error", err));
    }
  };

  const handleInputValue = (key) => (e) => {
    if (key === "nick_name") {
      setNewUserInfo({ nick_name: e.target.value });
    } else if (key === "curPassword") {
      setNewUserInfo({ ...newUserInfo, [key]: e.target.value });
    } else if (
      key === "newPasswordMatch" &&
      newUserInfo.newPassword !== e.target.value
    ) {
      setNewUserInfo({ ...newUserInfo, [key]: e.target.value });
      setErrorMessage("신규 비밀번호가 일치하지 않습니다");
    } else {
      setNewUserInfo({ ...newUserInfo, [key]: e.target.value });
      setErrorMessage("");
    }
  };
  const passwordEditClickHandler = () => {
    setPasswordEditClick(!passwordEditClick);
    setNewUserInfo({
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
    setUserPhoto(temp[0].url);
  };

  console.log("프로필사진 id, url", userPhoto);
  const imageRef = useRef();
  const nickNameRef = useRef();

  const onImgInputBtn = () => {
    imageRef.current.click();
  };
  const changeNickBtn = () => {
    if (newUserInfo.nick_name !== userInfo.user_nickname) {
      setUserInfo({ ...userInfo, nick_name: newUserInfo.nick_name });
    }
    setNickName(!nickNameEditClick);
  };
  const onNickNameBtn = () => {
    if (newUserInfo.nick_name !== userInfo.user_nickname) {
      setNewUserInfo({ nick_name: userInfo.user_nickname });
    }
    setNickName(!nickNameEditClick);
    if (nickNameEditClick === false) {
      nickNameRef.current.focus();
    } else {
      nickNameRef.current.blur();
    }
  };

  return (
    <>
      <MypageContainer>
        {/* <MypageTitle> 육회비빔밥님, 회원정보</MypageTitle> */}
        <MypageProfile>
          <ProfileAndContent>
            <ProfilePhoto>
              <img
                className="photoPreview"
                alt="프로필 사진"
                src={!userPhoto ? NoImage : userPhoto}
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
              <div className="userContent">{userInfo.user_email}</div>
            </ProfileContent>
            <BorderBottom />
            <ProfileContent>
              <ProfileTitle>비밀번호</ProfileTitle>
              <div className="userContent">
                {passwordEditClick ? null : (
                  <div className="userContent">*****</div>
                )}
                <EditPasswordContainer visible={passwordEditClick}>
                  신규 비밀번호
                  <InputBox
                    type="password"
                    value={newUserInfo.newPassword}
                    onChange={handleInputValue("newPassword")}
                  />
                  신규 비밀번호 확인
                  <InputBox
                    type="password"
                    value={newUserInfo.newPasswordMatch}
                    onChange={handleInputValue("newPasswordMatch")}
                  />
                  <ErrMessage>{errorMessage}</ErrMessage>
                  <PasswordBtn onClick={null}>완료</PasswordBtn>
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
                value={newUserInfo.nick_name}
                onChange={handleInputValue("nick_name")}
                visibleNick={nickNameEditClick}
                name="nick_name"
              />
              <TextNickName
                type="text"
                visibleNickText={nickNameEditClick}
                value={userInfo.user_nickname}
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
              <ProfileTitle>경험치</ProfileTitle>
              <div className="userContent">{userInfo.user_exp}</div>
            </ProfileContent>
            <BorderBottom />
            <SubmitBtn onClick={userInfoUpdate}>제출</SubmitBtn>
            <DeleteBtn onClick={() => deleteModalHandler()}>회원탈퇴</DeleteBtn>
            <Delete
              visible={deleteOpen}
              setVisible={deleteModalHandler}
              deleteUserInfo={deleteUserInfo}
            />
          </ProfileAndContent2>
        </MypageProfile>
        <OngoingChallContent challengeList={challengeList}>
          현재 진행중인 챌린지
        </OngoingChallContent>
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
