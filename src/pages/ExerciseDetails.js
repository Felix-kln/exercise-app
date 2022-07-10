import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [similarTargetExercises, setSimilarTargetExercises] = useState([]);
  const [similarEquipmentExercises, setSimilarEquipmentExercises] = useState(
    []
  );

  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const ytSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";
      const exerciseUrl = "https://exercisedb.p.rapidapi.com";
      const data = await fetchData(
        `${exerciseUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(data);

      const { name, target, equipment } = data;

      const exerciseVideosData = await fetchData(
        `${ytSearchUrl}/search?query=${name}`,
        youtubeOptions
      );

      const filteredExerciseVideos = exerciseVideosData.contents.filter(
        (item) => {
          if (item.video) return item;
          else return;
        }
      );
      setExerciseVideos(filteredExerciseVideos);

      const similarTargetData = await fetchData(
        `${exerciseUrl}/exercises/target/${target}`,
        exerciseOptions
      );
      setSimilarTargetExercises(similarTargetData.slice(0, 9));
      const similarEquipmentData = await fetchData(
        `${exerciseUrl}/exercises/equipment/${equipment}`,
        exerciseOptions
      );
      setSimilarEquipmentExercises(similarEquipmentData.slice(0, 12));
    };
    fetchExerciseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        similarTarget={similarTargetExercises}
        similarEquipment={similarEquipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetails;
