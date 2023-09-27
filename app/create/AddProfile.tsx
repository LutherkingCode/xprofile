"use client";

import { useState } from "react";
import { deployProfile } from "@/backend/deployProfile";
import InputStep1 from "@/components/addProfileForm/inputStep1";
import InputStep2 from "@/components/addProfileForm/inputStep2";
import InputStep3 from "@/components/addProfileForm/inputStep3";
import InputStep4 from "@/components/addProfileForm/inputStep4";
import PreviewStep1 from "@/components/addProfileForm/previewStep1";
import PreviewStep2 from "@/components/addProfileForm/previewStep2";
import PreviewStep3 from "@/components/addProfileForm/previewStep3";

const predefinedTags = [
  {
    value: "coder",
    label: "🖥️Coder",
  },
  {
    value: "gamer",
    label: "🎮Gamer",
  },
  {
    value: "designer",
    label: "🎨Designer",
  },
  {
    value: "photographer",
    label: "📷Photographer",
  },
  {
    value: "musician",
    label: "🎵Musician",
  },
  {
    value: "pirate",
    label: "🏴‍☠️Pirate",
  },
  {
    value: "waffle",
    label: "🧇Waffle",
  },
];

const AddProfile = () => {
  const [data, setData] = useState<any>({
    username: "Username",
    github: "identicon",
    twitter: "tweethandle",
    description: "this is a description",
    color: "#00FFFF",
    tags: [predefinedTags[0].label, predefinedTags[1].label],
    socials: [
      {
        link: "",
        type: "instagram",
      },
      {
        link: "",
        type: "linkedin",
      },
      {
        link: "",
        type: "reddit",
      },
      {
        link: "",
        type: "youtube",
      },
      {
        link: "",
        type: "paypal",
      },
    ],
    links: [],
    location: "",
  });
  const [formStep, setFormStep] = useState<number>(1);
  const [linkCount, setLinkCount] = useState<number>(0);

  const handleDeploy = async () => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("github", data.github);
    formData.append("twitter", data.twitter);
    formData.append("description", data.description);
    formData.append("color", data.color);
    data.tags.forEach((tag: string) => {
      formData.append("tags", tag);
    });
    formData.append("socials", JSON.stringify(data.socials));
    // formData.append("socials", newSocial);
    formData.append("location", data.location);
    data.links.forEach((link: string) => {
      formData.append("links", link);
    });

    try {
      // console.log(JSON.parse(formData.get("socials") as string));
      await deployProfile(formData);
      // router.replace("/explore");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex md:flex-row flex-col gap-5 md:gap-0 w-full min-h-screen pt-20">
      <section className="md:flex-1 flex items-center justify-center ">
        {/* Step 1 */}
        <InputStep1
          data={data}
          setData={setData}
          formStep={formStep}
          setFormStep={setFormStep}
        />

        {/* Step 2 */}
        <InputStep2
          data={data}
          setData={setData}
          formStep={formStep}
          setFormStep={setFormStep}
        />

        {/* Step 3 */}
        <InputStep3
          data={data}
          setData={setData}
          formStep={formStep}
          setFormStep={setFormStep}
          linkCount={linkCount}
          setLinkCount={setLinkCount}
        />

        {/* Step 4 */}
        <InputStep4
          data={data}
          setData={setData}
          formStep={formStep}
          setFormStep={setFormStep}
          handleDeploy={handleDeploy}
        />
      </section>
      {/* ----------------------END OF FORM---------------------- */}

      {/* ----------------------PREVIEW---------------------- */}
      <section className="md:flex-1 flex items-center justify-center">
        {/* Step 1 */}
        <PreviewStep1 data={data} formStep={formStep} />

        {/* Step 2 */}
        <PreviewStep2 data={data} formStep={formStep} />

        {/* Step 3 */}
        <PreviewStep3 data={data} formStep={formStep} />
      </section>
    </div>
  );
};

export default AddProfile;
