import express from "express";
import {
  getInterests,
  getInterestsById,
} from "../controllers/interestController";

const interestRouter = express.Router();

interestRouter.get("/", getInterests);

interestRouter.get("/:id", getInterestsById);

export default interestRouter;
