import React from "react";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import styled from "styled-components";
import Button from "../elements/Button";
import { useSelector } from "react-redux";
import { __createClip } from "../redux/module/createClip";

function CreateRadioInputs({
  setFormformImagin,
  setPreview,
  preview,
  formImagin,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const btninfo = useSelector((state) => state.radioButn[0]);

  const onChangeimge = (e) => {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append("audioclipImage", img);
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
    formData.append("title", btninfo.title);
    formData.append("name", data.title);
    formData.append("contents", data.introduction);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }
    for (const keval of formData) console.log(keval);
    //dispatch(__createAudio(formData));
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <CrRadioButtonSpanBox>
          <span>앨범 이름*</span>
          <CrRadioPublicScopButton>
            <Input
              register={register}
              type={"text"}
              name={"title"}
              placeholder={"앨범 제목을 입력해주세요."}
              validation={{
                required: "앨범 제목을 입력해주세요.",
              }}
              errors={errors}
            />
          </CrRadioPublicScopButton>
        </CrRadioButtonSpanBox>
        <CrRadioButtonSpanBox>
          <span>앨범 소개</span>
          <CrRadioPublicScopButton>
            <Input
              register={register}
              type={"text"}
              name={"introduction"}
              placeholder={"앨범 정보를 입력해주세요."}
              validation={{
                required: "앨범 정보를 입력해주세요.",
              }}
              errors={errors}
            />
          </CrRadioPublicScopButton>
        </CrRadioButtonSpanBox>
        <CrRadioButtonSpanBox>
          <span>이미지</span>
          <CrRadioPublicScopButton>
            <CrFileInput type="file" accept="image/*" onChange={onChangeimge} />
          </CrRadioPublicScopButton>
          <CrPreviewDiv>
            {preview ? (
              <div>
                <CrRadioImg src={preview} alt="Preview" />
              </div>
            ) : (
              <CrPreviewDivSpan>
                <span>이미지를 업로드 해주세요.</span>
              </CrPreviewDivSpan>
            )}
          </CrPreviewDiv>
        </CrRadioButtonSpanBox>
        <CrRadioButtonNext>
          <Button lgBtn>만들기</Button>
        </CrRadioButtonNext>
      </form>
    </>
  );
}

export default CreateRadioInputs;

const CrRadioButtonSpanBox = styled.div`
  margin-top: 40px;
`;

const CrRadioPublicScopButton = styled.div`
  margin-top: 10px;
`;

const CrFileInput = styled.input`
  margin-bottom: 30px;
  ::file-selector-button {
    width: 370px;
    height: 48px;
    background: #f1f2f6;
    border-radius: 10px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #262626;
      color: white;
    }
  }
`;

const CrPreviewDiv = styled.div`
  height: 400px;
`;

const CrPreviewDivSpan = styled.div`
  border: 1px solid black;
  height: 400px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 20px;
    font-weight: bolder;
  }
`;

const CrRadioImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 400px;
  border-radius: 10px;
`;

const CrRadioButtonNext = styled.div`
  margin-right: 10px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
`;
