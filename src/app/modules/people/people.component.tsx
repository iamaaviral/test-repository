import { useState } from "react";

import { Person } from "./model";
import { usePeopleQuery } from "./query";

import Input from "../../components/Input/input";
import Pagination from "../../components/Pagination/pagination";

import "./people.css";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

export function People() {
  const { data: people, loading, error } = usePeopleQuery();
  const [searchText, setSearchText] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [displayPerPage, setDisplayPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const filteredPeople = sortedPeople.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * displayPerPage;
  const endIndex = Math.min(filteredPeople.length, startIndex + displayPerPage);
  const displayedPeople = filteredPeople.slice(startIndex, endIndex);

  const renderCells = ({ name, show, actor, movies, dob }: Person) => (
    <>
      <td>{name}</td>
      <td>{show}</td>
      <td>{actor}</td>
      <td>{dob}</td>
      <td>{movies.map(({ title }) => title).join(", ")}</td>
    </>
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    const sorted = sortedPeople.slice().sort((a, b) => {
      return newDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setSortedPeople(sorted);
  };

  if (people?.length && sortedPeople.length === 0) {
    const sorted = people.slice().sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setSortedPeople(sorted);
  }

  const handleDisplayPerPageChange = (totalItems: number) => {
    setDisplayPerPage(totalItems);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (people === undefined || error) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  return (
    <div className="people-wrapper">
      <div className="searchBar">
        <Input
          onChange={handleSearch}
          value={searchText}
          placeholder="Search"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th
              role="columnheader"
              onClick={handleSort}
              aria-sort={sortDirection === "asc" ? "ascending" : "descending"}
            >
              Name
            </th>
            <th>Show</th>
            <th>Actor/Actress</th>
            <th>Date of birth</th>
            <th>Movies</th>
          </tr>
        </thead>
        {displayedPeople.length === 0 && <div className="no-result"><h2>No People Available.</h2></div>}
        <tbody>
          {displayedPeople.map((people) => (
            <tr key={people.id}>{renderCells(people)}</tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredPeople.length}
        itemsPerPage={displayPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleDisplayPerPageChange}
      />
    </div>
  );
}
