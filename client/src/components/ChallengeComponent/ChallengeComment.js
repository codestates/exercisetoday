import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const CommentsContainer = styled.article`
  border: 1px solid;
  padding: 3px;
  background: white;
`;

const SingleCommentContainer = styled.section`
  margin: 1px 0;
  font-family: system-ui;
  display: flex;
  border: 1px solid;
  padding: 3px;
  cursor: default;
  font-size: 15px;
  background: rgba(120, 158, 255, 0.3);
`;

const ChallengeOnGoing = styled.div`
  min-width: 100px;
  max-width: 150px;
  display: inline-block;
  margin-left: 0.5%;
  padding: 3px;
  height: 23px;
  font-weight: bold;
  text-align: center;
`;

const CommentNickName = styled.div`
  min-width: 210px;
  max-width: 250px;
  margin: 0 3px;
  padding: 3px;
  font-weight: bold;
  border-right-style: solid;
  border-left-style: solid;
`;

const Comment = styled.div`
  padding: 3px;
  font-weight: bold;
`;

const UserCommentContainer = styled.div`
  border: 1px solid;
  height: 4rem;
  display: flex;
`;

const UserComment = styled.textarea`
  order: 1;
  flex: 95;
  padding: 0.5em;
  vertical-align: top;
  resize: none;
  font-weight: bold;
  ::placeholder {
    font-weight: bold;
  }
`;
const CommentSubmit = styled.button`
  order: 2;
  flex: 5;
  font-size: 15px;
`;

const ChallengeComment = ({ challengeInfo, token, userData }) => {
  const [myComment, setMyComment] = useState("");
  const [userComments, setUserComments] = useState([]);

  const { challenge_id } = challengeInfo;
  const { user_id } = userData;

  const handleMyComment = e => {
    setMyComment(e.target.value);
  };

  const handleSubmitMyComment = () => {
    axios({
      method: "POST",
      url: "http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/challenge/comment",
      data: { user_id, challenge_id, comment_content: myComment },
      headers: { authorization: token },
    })
      .then(() => {
        setMyComment("");
        axios({
          method: "GET",
          url: `http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/challenge/comment?challenge_id=${challenge_id}`,
        })
          .then(res => {
            setUserComments(res.data.data.comments);
          })
          .catch(err => {
            console.log("comment err", err);
          });
      })
      .catch(err => console.log("comment submit err", err));
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://ec2-3-36-51-146.ap-northeast-2.compute.amazonaws.com/challenge/comment?challenge_id=${challenge_id}`,
    })
      .then(res => {
        if (res.data.message) {
          setUserComments(res.data.data.comments);
        }
      })
      .catch(err => {
        console.log("comment err", err);
      });
  }, []);

  return (
    <>
      <CommentsContainer>
        {userComments.length === 0
          ? "아직 댓글이 없습니다. 첫 댓글을 작성해 주세요"
          : userComments.map(comment => {
              return (
                <SingleCommentContainer key={comment.comment_id}>
                  <ChallengeOnGoing>
                    진행도: {comment.progress_rate}%
                  </ChallengeOnGoing>
                  <CommentNickName>
                    {comment.user_nickname}
                    <sup> 경험치: {Math.round(comment.user_exp)}</sup>
                  </CommentNickName>
                  <Comment>{comment.comment_content}</Comment>
                </SingleCommentContainer>
              );
            })}
        <form onSubmit={e => e.preventDefault()}>
          <UserCommentContainer>
            <UserComment
              minLength="1"
              maxLength="80"
              value={myComment}
              placeholder="최대 80글자 까지 입력가능 / 공백 포함"
              onChange={e => handleMyComment(e)}
            ></UserComment>
            <CommentSubmit type="submit" onClick={handleSubmitMyComment}>
              등록
            </CommentSubmit>
          </UserCommentContainer>
        </form>
      </CommentsContainer>
    </>
  );
};

export default ChallengeComment;
