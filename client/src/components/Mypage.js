import styled from "styled-components";
import { useState, useRef } from "react";
import NoImage from "./image/NoImage.jpeg";

const MyapgeContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  border: 1px solid red;
  position: relative;
  width: 100%;
  height: 100vh;
`;

const MypageProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid yellow;
  width: 100%;
  height: 100vh;
  > .PhotoEdit {
    margin-top: 20px;
    text-align: center;
    background-color: #003150;
    text-decoration: none;
    border-color: #003150;
    padding: 20px;
    width: 20wh;
    height: 5%;
    color: rgb(255, 255, 255);
    cursor: grab;
    :hover {
      opacity: 0.8;
    }
  }
`;
const ProfileContainer = styled.div`
  border: 2px solid yellow;
  width: 100%;
  height: 100vh;
`;

const ProfilePhoto = styled.div`
  position: relative;
  border: 1px solid black;
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
const ProfilePhotoEdit = styled.div`
  border: 1px solid black;
  width: 150px;
  height: 200px;
`;

const MypageOngoinChall = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh;
`;

const MypageCompletedChall = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh;
`;
//백엔드의 S3에 이미지를 업로드
const Mypage = () => {
  const [selectedFile, setFile] = useState(null);

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
    setFile(temp);
  };

  const imageRef = useRef();
  //   const formData = new FormData(form);
  const onImgInputBtn = () => {
    imageRef.current.click();
  };
  return (
    <>
      <MyapgeContainer>
        <MypageProfile>
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
              onChange={e => handlePhoto(e)}
            />
          </ProfilePhoto>
          <button className="PhotoEdit" onClick={onImgInputBtn}>
            프로필 등록 및 수정
          </button>
        </MypageProfile>
        <MypageOngoinChall></MypageOngoinChall>
        <MypageCompletedChall></MypageCompletedChall>
      </MyapgeContainer>
    </>
  );
};

export default Mypage;
