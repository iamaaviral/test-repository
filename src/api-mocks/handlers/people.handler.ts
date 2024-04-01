import { rest } from "msw";

import { API_RESOURCE } from "../../app/shared/constant";
import { NEW_PEOPLE, PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";

const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}*`;

export const getPeople = rest.get(BASE_URL, (_req, _res, ctx) => {
  return delayedResponse(ctx.status(200), ctx.json(PEOPLE))
})

export const addPeople = rest.post(BASE_URL, (_req, _res, ctx) => {
  PEOPLE.push(NEW_PEOPLE);
  return delayedResponse(ctx.status(200), ctx.json({ok: true}))
});

export const handlers = [getPeople, addPeople];
