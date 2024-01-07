import { RESOURCE_PATH, IMAGE_FORMATS } from "./constants.js";

export const getResourceJpgPath = path => `${RESOURCE_PATH}${path}${IMAGE_FORMATS.JPG}`;
export const getResourcePng = path => `${RESOURCE_PATH}${path}${IMAGE_FORMATS.PNG}`;