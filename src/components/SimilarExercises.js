import React from "react";
import { Box, Typography, Stack } from "@mui/material";

import HorizontalScrollBar from "./HorizontalScrollBar";
import Loader from "./Loader";

const SimilarExercises = ({ similarTarget, similarEquipment }) => {
  return (
    <>
      <Box sx={{ mt: { lg: "100px", xs: "0" } }} mb="80px">
        <Typography variant="h3" mb="30px" mt={8}>
          Exercises that target the same muscle group
        </Typography>
        <Stack
          direction={"row"}
          sx={{ p: "2", position: "relative", width: "100%" }}
        >
          {similarTarget.length ? (
            <HorizontalScrollBar data={similarTarget} isBodyPart={false} />
          ) : (
            <Loader />
          )}
        </Stack>
        <Typography variant="h3" mb="30px" mt={8}>
          Exercises that use the same Equipment
        </Typography>
        <Stack
          direction={"row"}
          sx={{ p: "2", position: "relative", width: "100%" }}
        >
          {similarEquipment.length ? (
            <HorizontalScrollBar data={similarEquipment} isBodyPart={false} />
          ) : (
            <Loader />
          )}
        </Stack>
      </Box>
    </>
  );
};

export default SimilarExercises;
