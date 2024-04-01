import { useMemo, useState } from "react";
import { AxiosError } from "axios";
import { API_RESOURCE } from "../../../shared/constant";
import { useAxios } from "../../../shared/context";
import { Person } from "../model";

interface AddPeopleQueryState {
  loading: boolean;
  error?: AxiosError;
  addPerson: (person: Person) => Promise<void>;
}

export const useAddPeopleQuery = (): AddPeopleQueryState => {
  const axios = useAxios();

  const addPerson = async (person: Person) => {
    setState({ ...state, loading: true });
    try {
      await axios.post(`/${API_RESOURCE.PEOPLE}`, person);
      setState({ loading: false, error: undefined, addPerson })
    } catch (error) {
      setState({ ...state, error: error as AxiosError, loading: false })
    }
  };

  const [state, setState] = useState<AddPeopleQueryState>({ loading: false, addPerson });

  const value = useMemo(() => ({ ...state, addPerson }), [state]);

  return value;
};