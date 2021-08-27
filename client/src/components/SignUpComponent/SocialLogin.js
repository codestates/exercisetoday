import styled from "styled-components";

const SocialLoginButton = styled.button`
  width: 40%;
  margin: 10px 30px;
  font-size: 20px;
  color: white;
  border-radius: 10px;
`;

const LoginWithGoogle = styled(SocialLoginButton)`
  background: #001193;
`;

const LoginWithFaceBook = styled(SocialLoginButton)`
  background: #001193;
`;

const SocialLogin = () => {
  return (
    <>
      <LoginWithGoogle>GOOGLE로 회원가입</LoginWithGoogle>
      <LoginWithFaceBook>FACEBOOK로 회원가입</LoginWithFaceBook>
    </>
  );
};

export default SocialLogin;
