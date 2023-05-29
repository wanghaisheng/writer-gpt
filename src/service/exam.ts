import { Question } from "@interface/questions";

import { GET_EXAM } from "@constants/api";

import { APIClient } from "./api";

// @desc       Get Exam
// @route      GET /exam
// @access     Public
export const getExam = () => APIClient.get<Question[]>(GET_EXAM);
