import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { __createAudio } from "../redux/module/createAudio";
import CreateRadioButton from "../components/CreateRadioButton";
import CreateRadioInputs from "../components/CreateRadioInputs";

function Createradio() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");

  return (
    <CrRadioContainer>
      <CrRadioContainerBox>
        <Navbar
          toNavigate={"/"}
          iconleft={<AiOutlineArrowLeft size={20} />}
          title={"앨범 만들기"}
        />
        <CreateRadioButton />

        <CreateRadioInputs
          setFormformImagin={setFormformImagin}
          setPreview={setPreview}
          preview={preview}
          formImagin={formImagin}
        />
      </CrRadioContainerBox>
    </CrRadioContainer>
  );
}

export default Createradio;

const CrRadioContainer = styled.div`
  //border: 1px solid red;
  height: 100%;
  padding: 0 20px;
  overflow-y: auto;
`;

const CrRadioContainerBox = styled.div`
  //border: 1px solid black;
  position: relative;
  z-index: 999;
`;