import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import NoImage from "../image/NoImage.jpeg";
import Delete from "./Delete";
import OngoingChallenge from "./OngoingChallenge";
import CompletedChallenge from "./CompletedChallenge";
import axios from "axios";

const ChallengeContainer = styled.div`
  margin-top: 20px;
  flex: 1;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

const PhotoBtn = styled.button`
  margin-top: 10px;
  text-decoration: none;
  padding: 17px;
  width: 10rem;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.4);
  color: rgb(0, 0, 0);
  cursor: pointer;
  :hover {
    border-color: rgba(0, 0, 0, 0.9);
  }
`;

const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
`;

const MypageContainer = styled.div`
  margin-top: 5rem;
  flex-direction: column;
  border: 1.1rem solid;
  border-color: #003150;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const ProfilePhoto = styled.div`
  position: relative;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 10rem;
  > .photo {
    display: none;
  }
  > .photoPreview {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const NickNameEditBtn = styled.button`
  display: ${props => (props.visible ? "auto" : "none")};
  position: relative;
  margin-top: 3px;
  left: 4%;
  width: 7%;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  color: rgb(0, 0, 0);
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const EditPasswordContainer = styled.div`
  display: ${props => (props.visible ? "auto" : "none")};
`;

const InputBox = styled.input`
  margin-bottom: 5%;
  width: 160%;
  height: 2.5vh;
`;

const InputBoxNickName = styled.input`
  display: ${props => (props.visibleNick ? "auto" : "none")};
  font-size: 1.2rem;
  margin: 0.85% 0% 0% 2.9%;
  width: 20%;
  height: 2rem;
  border: 0.5px solid gray;
  color: rgb(0, 0, 0);
`;

const TextNickName = styled.input`
  display: ${props => (props.visibleNickText ? "none" : "auto")};
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
  left: 35%;
  width: 8rem;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.4);
  color: rgb(0, 0, 0);
  cursor: pointer;
  :hover {
    border-color: rgba(0, 0, 0, 0.9);
  }
  display: ${props => (props.visible ? "auto" : "none")};
`;

const NickNameEditOpenBtn = styled.button`
  position: relative;
  height: 2rem;
  left: ${props => (props.visible ? 17.9 : 30)}%;
  width: 8rem;
  background-color: white;
  border-color: rgba(0, 0, 0, 0.4);
  color: rgb(0, 0, 0);
  cursor: pointer;
  :hover {
    border-color: rgba(0, 0, 0, 0.9);
  }
`;

const PasswordBtn = styled.button`
  margin-top: 22%;
  width: 4.5rem;
  height: 2rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ProfileTitle = styled.div`
  margin: 1% 5% 0% 5%;
  color: rgba(0, 0, 0, 0.7);
  width: 28%;
`;

const PasswordEditText = styled.div`
  font-size: 1.2rem;
  margin-top: 3%;
  color: rgba(30, 20, 20, 0.5);
  width: 10vw;
`;

const ProfileContent = styled.div`
  padding: 1.5%;
  width: 100%;
  display: flex;
`;

const ProfileData = styled.div`
  margin: 1% 0% 0% 3%;
  width: 10%;
  font-size: 1.2rem;
  border-color: #003150;
  color: rgb(0, 0, 0);
`;

const BorderBottom = styled.div`
  width: 60rem;
  border-bottom: 2px solid;
  border-color: rgba(0, 49, 80, 0.3);
  margin-left: 3%;
  margin-right: 10%;
`;

const DeleteBtn = styled.button`
  width: 7rem;
  height: 2.5rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const ErrMessage = styled.div`
  width: 20rem;
  font-size: 15px;
  position: absolute;
  color: red;
`;

const SubmitBtn = styled.button`
  width: 7rem;
  height: 2.5rem;
  color: white;
  background-color: rgba(150, 0, 0, 0.6);
  border: none;
  cursor: pointer;
  :hover {
    background-color: rgba(120, 0, 0, 0.7);
  }
`;

const MypageTitle = styled.div`
  margin-left: 42px;
  color: rgba(0, 49, 80, 0.3);
  font-size: 5rem;
`;

const DelAndSubBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5% 0 0 17%;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const MypageTopContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
  justify-content: center;
  align-items: center;
`;

const ProfileBack = styled.div`
  height: 80vh;
  @media screen and (max-width: 908px) {
    height: 100vh;
  }
`;

const Mypage = ({ userData, deleteUserInfo, token, handleUserInfo }) => {
  const [passBtnIsOpen, setPassBtnIsOpen] = useState(true);
  const [userInfo, setUserInfo] = useState(userData);
  const [passwordEditClick, setPasswordEditClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [nickNameEditClick, setNickName] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const [challengeList, setChallengeList] = useState(null);
  const [completedList, setCompletedList] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    newPassword: "",
    newPasswordMatch: "",
    nick_name: userInfo.user_nickname,
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/photo?user_id=${userData.user_id}`,
    })
      .then(res => {
        console.log(res.data.data);
        if (res.data.message === "ok") {
          if (res.data.data === null) {
            setUserPhoto(null);
          } else {
            setUserPhoto(res.data.data);
          }
        }
      })
      .catch(err => console.log("Photo Error", err));

    axios({
      method: "GET",
      url: `http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/challenge?user_id=${userData.user_id}`,
    })
      .then(res => {
        if (res.data.message === "ok") {
          let ongoingChallData = [];
          let completedChallData = [];
          res.data.data.challenges.forEach(el => {
            if (el.progress_rate === 100) {
              completedChallData.push(el);
            } else {
              ongoingChallData.push(el);
            }
          });
          setCompletedList(completedChallData);
          setChallengeList(ongoingChallData);
        }
      })
      .catch(err => console.log("challenges Error", err));
    if (token.slice(0, 5) === "kakao") {
      setPassBtnIsOpen(false);
    }
  }, []);

  const deleteModalHandler = () => {
    setDeleteOpen(!deleteOpen);
  };
  const userInfoUpdate = () => {
    axios({
      method: "PUT",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user",
      data: {
        user_id: userInfo.user_id,
        user_nickname: newUserInfo.nick_name,
        user_password: newUserInfo.newPassword,
      },
      headers: { authorization: token },
    })
      .then(res => {
        if (res.data.data) {
          const { user_nickname } = res.data.data;
          setUserInfo({ ...userInfo, user_nickname });
          handleUserInfo(userInfo);
        } else {
          console.log("userInfoUpdate Error", res.data.message);
        }
      })
      .catch(err => console.log("userInfoUpdate Error", err));

    if (userPhoto !== null && newPhoto !== userPhoto) {
      axios({
        method: "PUT",
        url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/user/photo",
        data: { user_photo: userPhoto },
        headers: {
          authorization: token,
        },
      })
        .then(res => {
          if (res.data.message === "ok") {
            setNewPhoto(res.data.data);
            setUserPhoto(res.data.data);
          } else {
            console.log("User Photo Error", res.data.message);
          }
        })
        .catch(err => console.log("User Photo Error", err));
    }
  };

  const handleInputValue = key => e => {
    if (key === "nick_name") {
      setNewUserInfo({ nick_name: e.target.value });
    } else if (
      key === "newPasswordMatch" &&
      newUserInfo.newPassword !== e.target.value
    ) {
      setNewUserInfo({ ...newUserInfo, [key]: e.target.value });
      setErrorMessage("?????? ??????????????? ???????????? ????????????");
    } else {
      setNewUserInfo({ ...newUserInfo, [key]: e.target.value });
      setErrorMessage("");
    }
  };

  const passwordEditClickHandler = () => {
    setPasswordEditClick(!passwordEditClick);
    setNewUserInfo({
      newPassword: "",
      newPasswordMatch: "",
    });
    setErrorMessage("");
  };

  const handlePhoto = e => {
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

  const imageRef = useRef();

  const onImgInputBtn = () => {
    imageRef.current.click();
  };

  const handleNickEdit = msg => {
    if (newUserInfo.nick_name !== userInfo.user_nickname) {
      if (msg === "done") {
        setUserInfo({ ...userInfo, user_nickname: newUserInfo.nick_name });
      } else {
        setNewUserInfo({ nick_name: userInfo.user_nickname });
      }
    }
    setNickName(!nickNameEditClick);
  };

  return (
    <MypageContainer>
      <ProfileBack>
        <MypageTitle>MYPAGE</MypageTitle>
        <MypageTopContainer>
          <PhotoContainer>
            <ProfilePhoto>
              <img
                className="photoPreview"
                alt="????????? ??????"
                src={!userPhoto ? NoImage : userPhoto}
              />
              <input
                className="photo"
                ref={imageRef}
                type="file"
                accpet="image/*"
                name="profile"
                onChange={e => handlePhoto(e)}
              />
            </ProfilePhoto>
            <PhotoBtn onClick={onImgInputBtn}>????????? ?????? ??? ??????</PhotoBtn>
          </PhotoContainer>
          <ProfileContentContainer>
            <ProfileContent>
              <ProfileTitle>?????????</ProfileTitle>
              <ProfileData>{userInfo.user_email}</ProfileData>
            </ProfileContent>
            <BorderBottom />
            <ProfileContent>
              <ProfileTitle>????????????</ProfileTitle>
              <ProfileData>
                {passwordEditClick ? null : "*****"}
                <EditPasswordContainer visible={passwordEditClick}>
                  <PasswordEditText>?????? ????????????</PasswordEditText>
                  <InputBox
                    type="password"
                    value={newUserInfo.newPassword}
                    onChange={handleInputValue("newPassword")}
                  />
                  <PasswordEditText>?????? ???????????? ??????</PasswordEditText>
                  <InputBox
                    type="password"
                    value={newUserInfo.newPasswordMatch}
                    onChange={handleInputValue("newPasswordMatch")}
                  />
                  <ErrMessage>{errorMessage}</ErrMessage>
                  <PasswordBtn
                    onClick={() => setPasswordEditClick(!passwordEditClick)}
                  >
                    ??????
                  </PasswordBtn>
                </EditPasswordContainer>
              </ProfileData>
              <PasswordEditBtn
                onClick={passwordEditClickHandler}
                visible={passBtnIsOpen}
              >
                {passwordEditClick ? "????????????" : "???????????? ??????"}
              </PasswordEditBtn>
            </ProfileContent>
            <BorderBottom />
            <ProfileContent>
              <ProfileTitle>?????????</ProfileTitle>
              <InputBoxNickName
                type="text"
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
              <NickNameEditBtn
                visible={nickNameEditClick}
                onClick={() => handleNickEdit("done")}
              >
                ??????
              </NickNameEditBtn>
              <NickNameEditOpenBtn
                visible={nickNameEditClick}
                onClick={handleNickEdit}
              >
                {nickNameEditClick ? "????????????" : "????????? ??????"}
              </NickNameEditOpenBtn>
            </ProfileContent>
            <BorderBottom />
            <ProfileContent>
              <ProfileTitle>?????????</ProfileTitle>
              <ProfileData>{userInfo.user_exp}</ProfileData>
            </ProfileContent>
            <BorderBottom />
            <DelAndSubBtnContainer>
              <SubmitBtn onClick={userInfoUpdate}>??????</SubmitBtn>
              <DeleteBtn onClick={() => deleteModalHandler()}>
                ????????????
              </DeleteBtn>
            </DelAndSubBtnContainer>
          </ProfileContentContainer>
        </MypageTopContainer>
      </ProfileBack>
      <Delete
        token={token}
        visible={deleteOpen}
        setVisible={deleteModalHandler}
        deleteUserInfo={deleteUserInfo}
      />
      <ChallengeContainer>
        <OngoingChallenge challengeList={challengeList} />
      </ChallengeContainer>
      <ChallengeContainer>
        <CompletedChallenge completedList={completedList} />
      </ChallengeContainer>
    </MypageContainer>
  );
};

export default Mypage;
