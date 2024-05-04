// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import "./Pagination.css"
// const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
//   const pageNumbers = [];
//   const location = useLocation();
//   for (let i = 1; i <= Math.ceil(totalPosts / 4); i++) {
//     pageNumbers.push(i);
//   }
//   console.log(pageNumbers, postsPerPage, totalPosts, paginate)

//   return (
//     <nav>
//       <ul className='pagination'>
//         {pageNumbers.map(number => (
//           <li key={number} className='page-item'>
//             <Link onClick={() => paginate(number)} to={`${location.pathname}`} className='page-link'>
//               {number}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Pagination.css'; // Import the CSS file

interface PaginationProps {
  postsPerPage: number; // Number of posts per page
  totalPosts: number; // Total number of posts
  paginate: (pageNumber: number) => void; // Function to handle pagination
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const location = useLocation();

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <Link
              onClick={() => paginate(number)}
              to={`${location.pathname}?page=${number}`} // Add page query parameter
              className='page-link'
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
