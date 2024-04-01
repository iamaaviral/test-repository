import { rest } from "msw";

import { API_RESOURCE } from "../../app/shared/constant";
import { PEOPLE } from "../fixtures";
import { delayedResponse } from "../utils";

const BASE_URL = `/mock-api/${API_RESOURCE.PEOPLE}*`;

// const PAGE_SIZE = 10; // Number of items per page

export const getPeople = rest.get(BASE_URL, (_req, _res, ctx) => {

  // const name = _req.url.searchParams.get("name");
  // let allPeopleData = PEOPLE
  
  // if(name) {
  //   allPeopleData = PEOPLE.filter(eachPerson => eachPerson.name.toLowerCase().includes(name.toLowerCase()))
  // }

  // const page = parseInt(_req.url.searchParams.get('page') || '1', 10);
  // const startIndex = (page - 1) * PAGE_SIZE;
  // const endIndex = startIndex + PAGE_SIZE;
  // const paginatedData = allPeopleData.slice(startIndex, endIndex);

  return delayedResponse(ctx.status(200), ctx.json(PEOPLE))
}
);

export const handlers = [getPeople];
