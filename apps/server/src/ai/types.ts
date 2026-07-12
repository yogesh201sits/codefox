import { z } from "zod";
import {  FindingSchema,  ReviewResultSchema,} from "./schema";

export interface ReviewFile {
  filename: string;
  patch: string;
}

export type Finding = z.infer<typeof FindingSchema>;

export type ReviewResult = z.infer<typeof ReviewResultSchema>;