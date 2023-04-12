import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Button from "../elements/Button";
import ProfileMidumContainer from "../components/ProfileMidumContainer";
import { useDispatch, useSelector } from "react-redux";
import { __updateProfile } from "../redux/module/updateProfile";
import { pageswitch } from "../redux/module/reduxState/profileModifyButton";
import Input from "../elements/Input";
import { useForm } from "react-hook-form";
import { getLocalStorage } from "../util/localStorage";
import { useNavigate, useParams } from "react-router";
import isLogin from "../util/checkCookie";

function Profile() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const [pageState] = useState(false);
  const user = JSON.parse(getLocalStorage("userInfo"));
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const selectBtn = useSelector((state) => state.profileButn);
  const getUserInfo = useSelector((state) => state?.gettingProfile?.profile);
  const modiSwitch = useSelector((state) => state?.profileButn);

  const onChangeimge = (e) => {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append("profileImageUrl", img);
    const reader = new FileReader();
    setFormformImagin(formImg);
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (img) {
      reader.readAsDataURL(img);
    } else {
      setPreview("");
    }
  };

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("nickname", data.nickname);
    formData.append("memberInfo", data.memberInfo);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }

    dispatch(__updateProfile({ userId: user.id, profileInfo: formData }));
    dispatch(pageswitch(!selectBtn));
    reset();
  };

  const onPageClick = () => {
    dispatch(pageswitch(false));
    setPreview("");
  };

  const onPageModiClick = () => {
    dispatch(pageswitch(!pageState));
  };

  return (
    <ProfileContainer>
      <ProfileNavbarfixed>
        <Navbar
          toNavigate={-1}
          iconleft={<AiOutlineArrowLeft size={20} onClick={onPageClick} />}
          title={"프로필"}
          iconright={
            id === user.userName && !modiSwitch ? (
              <MdOutlineModeEdit onClick={onPageModiClick} size={20} />
            ) : null
          }
        />
      </ProfileNavbarfixed>
      <ProfileTop>
        <ProfileTopPhoto>
          {preview ? (
            <div>
              <ProfileImg src={preview} alt="Preview" />
            </div>
          ) : (
            <ProfileImg src={getUserInfo?.profileImageUrl} alt="Preview" />
          )}
        </ProfileTopPhoto>
        <ProfileTopName>
          <ProfileTopnicknameMembername>
            <ProfileTopMembername>{getUserInfo?.nickname}</ProfileTopMembername>
          </ProfileTopnicknameMembername>
          <ProfileTopnicknameMembername>
            <span>@{getUserInfo?.membername}</span>
          </ProfileTopnicknameMembername>
        </ProfileTopName>
      </ProfileTop>
      {selectBtn ? (
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <ProfileMidumInput>
              <span>닉네임</span>
              <ProfileMidumInputbox>
                <Input
                  register={register}
                  type={"text"}
                  name={"nickname"}
                  placeholder={"닉네임을 입력해주세요."}
                  validation={{
                    required: "닉네임을 입력해주세요.",
                  }}
                />
              </ProfileMidumInputbox>
            </ProfileMidumInput>
          </div>
          <ProfileBottom>
            <div>
              <ProfileBottomTitle>
                <span>자기소개</span>
              </ProfileBottomTitle>
              <Input
                textarea
                asFor={"textarea"}
                register={register}
                type={"text"}
                name={"memberInfo"}
                placeholder={"자기소개를 입력해주세요."}
                validation={{
                  required: "자기소개를 입력해주세요.",
                }}
              />
            </div>
          </ProfileBottom>
          <ProfileButtonSpanBox>
            <span>이미지</span>
            <ProfilePublicScopButton>
              <ProfileFileInput
                type="file"
                accept="image/*"
                onChange={onChangeimge}
              />
            </ProfilePublicScopButton>
          </ProfileButtonSpanBox>
          <ProfileBottomButton>
            <Button lgBtn>완료</Button>
          </ProfileBottomButton>
        </form>
      ) : (
        <ProfileMidumContainer />
      )}
    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
  padding: 0rem 1.25rem;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }
`;

const ProfileNavbarfixed = styled.div`
  background-color: white;
  position: fixed;
  width: 28.75rem; ;
`;

const ProfileTop = styled.div`
  height: 12.5rem;
  display: flex;
  align-items: center;
  margin-top: 5rem;
`;

const ProfileTopPhoto = styled.div`
  border-radius: 50%;
  width: 7.5rem;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50%;
`;

const ProfileTopnicknameMembername = styled.div`
  margin-bottom: 0.625rem;
  margin-left: 0.625rem;
  position: relative;
  bottom: 0.625rem;
`;

const ProfileTopMembername = styled.span`
  font-size: 1.25rem;
  font-weight: bolder;
`;

const ProfileTopName = styled.div`
  margin-top: 1.25rem;
`;

const ProfileMidumInput = styled.div`
  margin-bottom: 3.125rem;
`;

const ProfileMidumInputbox = styled.div`
  width: 28.75rem;
  height: 3rem;
  border-radius: 0.625rem;
  border: none;
  background-color: #f1f2f6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.625rem;
  margin-top: 1.25rem;
`;

const ProfileBottom = styled.div`
  margin-top: 3.125rem;
`;

const ProfileBottomTitle = styled.div`
  margin-bottom: 1.25rem;
`;

const ProfileBottomButton = styled.div`
  padding: 1.25rem;
  width: 100%;
  height: 11.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProfileButtonSpanBox = styled.div`
  margin-top: 2.5rem;
`;

const ProfilePublicScopButton = styled.div`
  margin-top: 0.625rem;
`;

const ProfileFileInput = styled.input`
  margin-bottom: 1.875rem;
  ::file-selector-button {
    width: 23.125rem;
    height: 3rem;
    background: #f1f2f6;
    border-radius: 0.625rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #262626;
      color: white;
    }
  }
`;
