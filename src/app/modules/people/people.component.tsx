import { useState } from "react";

import { Person } from "./model";
import { usePeopleQuery } from "./query";

import "./people.css";
import Input from "../../components/Input/input";

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1

export function People() {
  const { data: people, loading, error } = usePeopleQuery();
  const [searchText, setSearchText] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [displayPerPage, setDisplayPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const renderCells = ({ name, show, actor, movies, dob }: Person) => (
    <>
      <td>{name}</td>
      <td>{show}</td>
      <td>{actor}</td>
      <td>{dob}</td>
      <td>{ movies.map(({ title }) => title).join(", ")}</td>
    </>
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    const sorted = sortedPeople.slice().sort((a, b) => {
      return newDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
    setSortedPeople(sorted);
  };

  const handleDisplayPerPageChange = (value: string) => {
    setDisplayPerPage(parseInt(value));
    setCurrentPage(1); 
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(DEFAULT_PAGE);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.ceil(filteredPeople.length / displayPerPage));
  };

  if (loading) {
    return <p>Fetching People...</p>;
  }

  if (people === undefined || error) {
    return <h2>Oops! looks like something went wrong!</h2>;
  }

  if (people && sortedPeople.length === 0) {
    const sorted = people.slice().sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setSortedPeople(sorted);
  }

  const filteredPeople = sortedPeople.filter(person =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );
    
  const totalPeople = filteredPeople.length;
  const totalPages = Math.ceil(totalPeople / displayPerPage);

  const startIndex = (currentPage - 1) * displayPerPage;;
  const endIndex = Math.min(filteredPeople.length, startIndex + displayPerPage);
  const displayedPeople = filteredPeople.slice(startIndex, endIndex);


  return (
    <>
    <div className="searchBar">
          <Input
            onChange={handleSearch}
            value={searchText}
            placeholder="Search"
            label="Search"
          />
    </div>
    <table>
      <thead>
        <tr>
          <th role="columnheader" onClick={handleSort} aria-sort={sortDirection === 'asc' ? 'ascending' : 'descending'}>Name</th>
          <th>Show</th>
          <th>Actor/Actress</th>
          <th>Date of birth</th>
          <th>Movies</th>
        </tr>
      </thead>

      <tbody>
        {displayedPeople.length === 0 &&  <h2>No People Available.</h2> }
        {
          displayedPeople.map((people, index) => (
            <tr key={people.id}>{renderCells(people)}</tr>
          ))
        }
      </tbody>
    </table>
    <div>
        <p>Showing {startIndex + 1}-{endIndex} of {totalPeople}</p>
        <button onClick={handleFirstPage} disabled={currentPage === DEFAULT_PAGE}>First</button>
        <button onClick={handlePreviousPage} disabled={currentPage === DEFAULT_PAGE}>Previous</button>
        <select value={displayPerPage} onChange={(e) => handleDisplayPerPageChange(e.target.value)} aria-label="Select number of people displayed">
          {[10, 15, 20].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
      </div>
    </>
  );
}
