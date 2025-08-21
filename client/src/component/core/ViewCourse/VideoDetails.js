import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Video player library styles
import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

// API + Redux
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

// Common button component
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  //already parameter me hai id
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const playerRef = useRef(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
// stae variable to save  videodata
  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load current video
  useEffect(() => {
    if (!courseSectionData?.length) return;
    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`);
      return;
    }

    const section = courseSectionData.find((c) => c._id === sectionId);
    if (!section) return;

    const video = section.subSection?.find((v) => v._id === subSectionId);
    if (!video) return;

    setVideoData(video);
    setPreviewSource(courseEntireData?.thumbnail || "");
    setVideoEnded(false);
  }, [
    courseSectionData,
    courseEntireData,
    courseId,
    sectionId,
    subSectionId,
    location.pathname,
    navigate,
  ]);
  // to check its first video
  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex((d) => d._id === sectionId);
    if (sectionIndex < 0) return false;

    const subIndex = courseSectionData[sectionIndex]?.subSection?.findIndex(
      (d) => d._id === subSectionId
    );
    if (subIndex < 0) return false;

    return sectionIndex === 0 && subIndex === 0;
  };
  // is last video so we show button according to this
  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex((d) => d._id === sectionId);
    if (sectionIndex < 0) return false;

    const subIndex = courseSectionData[sectionIndex]?.subSection?.findIndex(
      (d) => d._id === subSectionId
    );
    if (subIndex < 0) return false;

    const totalSections = courseSectionData.length;
    const totalSubsections =
      courseSectionData[sectionIndex]?.subSection?.length || 0;

    return sectionIndex === totalSections - 1 && subIndex === totalSubsections - 1;
  };

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex((d) => d._id === sectionId);
    if (sectionIndex < 0) return;

    const subIndex = courseSectionData[sectionIndex]?.subSection?.findIndex(
      (d) => d._id === subSectionId
    );
    if (subIndex < 0) return;

    const totalSubsections = courseSectionData[sectionIndex]?.subSection?.length || 0;

    if (subIndex < totalSubsections - 1) {
    // same section ke next video pe jao
      const nextSubId = courseSectionData[sectionIndex]?.subSection[subIndex + 1]?._id;
      if (nextSubId) {
        //iss vifeo pr jao
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubId}`
        );
      }
    } else {
      // dirrent section ki first video
      const nextSection = courseSectionData[sectionIndex + 1];
      if (nextSection?._id && nextSection.subSection?.length) {
        // isi video pe jao
        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
        );
      }
    }
  };

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex((d) => d._id === sectionId);
    if (sectionIndex < 0) return;

    const subIndex = courseSectionData[sectionIndex]?.subSection?.findIndex(
      (d) => d._id === subSectionId
    );
    if (subIndex < 0) return;

    if (subIndex > 0) {
      const prevSubId = courseSectionData[sectionIndex]?.subSection[subIndex - 1]?._id;
      if (prevSubId) {
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubId}`
        );
      }
    } else {
      const prevSection = courseSectionData[sectionIndex - 1];
      if (prevSection?._id && prevSection.subSection?.length) {
        const prevSubId =
          prevSection.subSection[prevSection.subSection.length - 1]?._id;
        if (prevSubId) {
          navigate(
            `/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSubId}`
          );
        }
      }
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId, subsectionId: subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData?.videoUrl ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          muted={false}       // Ensure sound
          autoPlay={false}    // Avoid autoplay restrictions
          src={videoData.videoUrl}
          onEnded={() => setVideoEnded(true)}
          onPlay={() => {
            if (playerRef.current) playerRef.current.muted = false;
          }}
        >
          <BigPlayButton position="center" />

          {videoEnded && videoData && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
              className="absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures?.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}

              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // we use seek to set rewatch i.e seek(0) again statr viseo fron start
                    playerRef.current.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button disabled={loading} onClick={goToPrevVideo} className="blackButton">
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button disabled={loading} onClick={goToNextVideo} className="blackButton">
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title || ""}</h1>
      <p className="pt-2 pb-6">{videoData?.description || ""}</p>
    </div>
  );
};

export default VideoDetails;
